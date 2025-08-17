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
  exit 1
fi

# Function to show usage
show_usage() {
  echo "Usage: $0 [base|base_sepolia] [contract_address]"
  echo ""
  echo "Networks:"
  echo "  base          - Verify contract on Base mainnet"
  echo "  base_sepolia  - Verify contract on Base Sepolia testnet"
  echo ""
  echo "Examples:"
  echo "  $0 base                    # Verify CONTRACT_BASE from .env"
  echo "  $0 base_sepolia           # Verify CONTRACT_BASE_SEPOLIA from .env"
  echo "  $0 base 0x123...          # Verify specific address on Base mainnet"
  echo ""
  echo "Note: Make sure you have ETHERSCAN_API_KEY set in your .env file"
}

# Check if network parameter is provided
if [ $# -eq 0 ]; then
  show_usage
  exit 1
fi

NETWORK=$1
CONTRACT_ADDRESS=$2

# Set network-specific variables
case $NETWORK in
  "base")
    RPC_URL="https://mainnet.base.org"
    VERIFIER_URL="https://api.basescan.org/api"
    ENV_VAR="CONTRACT_BASE"
    NETWORK_NAME="Base Mainnet"
    EXPLORER_URL="https://basescan.org"
    ;;
  "base_sepolia")
    RPC_URL="https://sepolia.base.org"
    VERIFIER_URL="https://api-sepolia.basescan.org/api"
    ENV_VAR="CONTRACT_BASE_SEPOLIA"
    NETWORK_NAME="Base Sepolia"
    EXPLORER_URL="https://sepolia.basescan.org"
    ;;
  *)
    echo "❌ Unsupported network: $NETWORK"
    echo "Supported networks: base, base_sepolia"
    exit 1
    ;;
esac

# Determine contract address to verify
if [ -n "$CONTRACT_ADDRESS" ]; then
  ADDRESS="$CONTRACT_ADDRESS"
  echo "🔍 Using provided contract address: $ADDRESS"
else
  ADDRESS="${!ENV_VAR}"
  if [ -z "$ADDRESS" ]; then
    echo "❌ No contract address found for $ENV_VAR in .env file"
    echo "Please either:"
    echo "  1. Provide address as second parameter: $0 $NETWORK 0x123..."
    echo "  2. Set $ENV_VAR in your .env file"
    exit 1
  fi
  echo "🔍 Using contract address from $ENV_VAR: $ADDRESS"
fi
# Check for Etherscan API key
if [ -z "$ETHERSCAN_API_KEY" ]; then
  echo "❌ ETHERSCAN_API_KEY not found in .env file"
  echo ""
  echo "To get a Basescan API key:"
  echo "  1. Go to https://basescan.org/"
  echo "  2. Create account or sign in"
  echo "  3. Go to 'API-KEYs' section"
  echo "  4. Create a new API key"
  echo "  5. Add ETHERSCAN_API_KEY=your_key_here to your .env file"
  exit 1
fi

echo "🚀 Verifying contract on $NETWORK_NAME"
echo "📍 Contract Address: $ADDRESS"
echo "🔗 Network RPC: $RPC_URL"
echo "🔍 Verifier: $VERIFIER_URL"

# Build verification command
VERIFY_CMD=(
  forge verify-contract
  "$ADDRESS"
  "contracts/src/LAF.sol:LAF"
  --rpc-url "$RPC_URL"
  --etherscan-api-key "$ETHERSCAN_API_KEY"
  --verifier etherscan
  --verifier-url "$VERIFIER_URL"
  --via-ir
  --watch
  -vvv
)

# Add constructor args if they exist (you can modify this if your contract has constructor args)
# if [ -n "$CONSTRUCTOR_ARGS" ]; then
#   VERIFY_CMD+=(--constructor-args "$CONSTRUCTOR_ARGS")
# fi

echo "⏳ Starting verification..."
echo "Command: ${VERIFY_CMD[*]}"
echo ""

# Execute verification
if "${VERIFY_CMD[@]}"; then
  echo ""
  echo "✅ Contract verification successful!"
  echo "🔗 View verified contract: $EXPLORER_URL/address/$ADDRESS#code"
else
  echo ""
  echo "❌ Contract verification failed!"
  echo ""
  echo "Common issues:"
  echo "  - Contract is already verified"
  echo "  - Wrong constructor arguments"
  echo "  - Compilation settings don't match"
  echo "  - Network/API issues"
  echo ""
  echo "You can also try verifying manually at:"
  echo "🔗 $EXPLORER_URL/verifyContract"
  exit 1
fi
