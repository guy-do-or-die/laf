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
  DEPLOYED_ADDRESS=$(jq -r '.transactions[0].contractAddress' "$BROADCAST_FILE")
else
  DEPLOYED_ADDRESS=$(echo "$DEPLOY_JSON" | jq -r '.returns.contractAddress')
fi

if [ -n "$DEPLOYED_ADDRESS" ]; then
  echo "
✅ Deployment successful!"
  echo "📍 LAF contract deployed at: $DEPLOYED_ADDRESS"
  echo "🔗 View on Etherscan: ${ETHERSCAN_API_URL%/v2/api*}/address/$DEPLOYED_ADDRESS"
fi