#!/bin/bash
set -e

# Load environment variables
echo "Checking for .env file..."
if [ -f .env ]; then
  echo "Found .env file, loading variables..."
  set -a  # automatically export all variables
  source .env
  set +a
  echo "Environment variables loaded."
else
  echo "No .env file found."
fi

# Set up deployment command with default account
echo "Using default account for deployment"
    DEPLOY_CMD=(
        forge script contracts/scripts/Deploy.s.sol
        --rpc-url "$RPC_URL"
        --account "$FORGE_KEY"
        --sender "$FORGE_SENDER"
        --broadcast
        -vvvv
    )

# Add verification if etherscan API key is available and we're not on local network
if [ -n "$ETHERSCAN_API_KEY" ] && [ "$CHAIN_NAME" != "local" ]; then
  DEPLOY_CMD+=(--verify --etherscan-api-key "$ETHERSCAN_API_KEY")
  
  # Add verifier URL if provided
  if [ -n "$ETHERSCAN_API_URL" ]; then
    DEPLOY_CMD+=(--verifier-url "$ETHERSCAN_API_URL")
  fi
  
  # Add verifier typeforge build
  DEPLOY_CMD+=(--verifier "etherscan")
fi

echo "🚀 Deploying to ${CHAIN_NAME} network with RPC URL: ${RPC_URL}"
DEPLOY_LOG_FILE="deploy-${CHAIN_NAME}.log"

"${DEPLOY_CMD[@]}" | tee "$DEPLOY_LOG_FILE"

DEPLOY_JSON=$(grep '^{' "$DEPLOY_LOG_FILE" || true)

if [ -z "$DEPLOY_JSON" ]; then
  echo "⚠️  JSON output not found in logs, using broadcast files"
  BROADCAST_FILE=$(ls -t contracts/broadcast/Deploy.s.sol/*/run-latest.json | head -1 2>/dev/null || echo "")
  if [ -n "$BROADCAST_FILE" ]; then
    DEPLOYED_ADDRESS=$(jq -r '.transactions[0].contractAddress' "$BROADCAST_FILE")
    DEPLOYED_BLOCK=$(jq -r '.transactions[0].transaction.blockNumber' "$BROADCAST_FILE")
    # Convert hex to decimal if needed
    if [[ "$DEPLOYED_BLOCK" == 0x* ]]; then
      DEPLOYED_BLOCK=$(printf "%d" $DEPLOYED_BLOCK)
    fi
  fi
else
  DEPLOYED_ADDRESS=$(echo "$DEPLOY_JSON" | jq -r '.returns.contractAddress')
  # Try to get block number from JSON output (if available)
  DEPLOYED_BLOCK=$(echo "$DEPLOY_JSON" | jq -r '.blockNumber // empty')
fi

if [ -n "$DEPLOYED_ADDRESS" ]; then
  echo "✅ Deployment successful!"
  echo "📍 LAF contract deployed at: $DEPLOYED_ADDRESS"
  if [ -n "$DEPLOYED_BLOCK" ]; then
    echo "📦 Deployed at block: $DEPLOYED_BLOCK"
  fi
  echo "🔗 View on Etherscan: ${ETHERSCAN_API_URL%/v2/api*}/address/$DEPLOYED_ADDRESS"
  
  ENV_VAR="CONTRACT_$CHAIN_NAME"
  
  if grep -q "$ENV_VAR=" .env; then
    sed -i "s|$ENV_VAR=.*|$ENV_VAR=$DEPLOYED_ADDRESS|g" .env
    echo "✏️ Updated $ENV_VAR in .env file"
  else
    echo "" >> .env
    echo "$ENV_VAR=$DEPLOYED_ADDRESS" >> .env
    echo "" >> .env
    echo "✏️ Added $ENV_VAR to .env file"
  fi
  
  # Update networks.json with new contract address and start block
  if [ -f "graph/networks.json" ] && [ -n "$DEPLOYED_BLOCK" ]; then
    echo "📝 Updating graph/networks.json with deployment info..."
    
    # Create backup
    cp graph/networks.json graph/networks.json.bak
    
    # Use jq to update the networks.json file
    NETWORK_KEY="$CHAIN_NAME"
    if [ "$CHAIN_NAME" = "base_sepolia" ]; then
      NETWORK_KEY="base-sepolia"
    fi
    
    jq ".\"$NETWORK_KEY\".LAF.address = \"$DEPLOYED_ADDRESS\" | .\"$NETWORK_KEY\".LAF.startBlock = $DEPLOYED_BLOCK" graph/networks.json > graph/networks.json.tmp
    mv graph/networks.json.tmp graph/networks.json
    
    echo "✅ Updated graph/networks.json with:"
    echo "   - Address: $DEPLOYED_ADDRESS"
    echo "   - Start Block: $DEPLOYED_BLOCK"
  fi
  
  echo "🔄 Run 'bun run wagmi' to update contract bindings with the new address"
  echo "🔄 Run 'bun run graph' to build and deploy the subgraph with the correct start block"
fi