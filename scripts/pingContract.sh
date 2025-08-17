#!/bin/bash
set -e

# Load environment variables
if [ -f .env ]; then
  source .env
else
  echo "Error: .env file not found"
  exit 1
fi

# Configuration
KEYS_FILE="ping_keys.json"
NUM_KEYS=100
RPC_URL="https://mainnet.base.org"
CONTRACT_ADDRESS="$CONTRACT_BASE"

# Check if contract address is set
if [ -z "$CONTRACT_ADDRESS" ]; then
  echo "Error: CONTRACT_BASE not found in .env file"
  exit 1
fi

echo "🚀 Starting ping script for contract: $CONTRACT_ADDRESS"
echo "📊 Generating $NUM_KEYS private keys and sending ping transactions"

# Function to generate keys
generate_keys() {
  echo "🔑 Generating $NUM_KEYS private keys..."
  
  # Create JSON structure
  echo "{" > "$KEYS_FILE"
  echo "  \"keys\": [" >> "$KEYS_FILE"
  
  for i in $(seq 1 $NUM_KEYS); do
    # Generate private key and address
    PRIVATE_KEY=$(cast wallet new | grep "Private key:" | awk '{print $3}')
    ADDRESS=$(cast wallet address "$PRIVATE_KEY")
    
    # Add to JSON (with comma except for last entry)
    if [ $i -eq $NUM_KEYS ]; then
      echo "    {\"index\": $i, \"privateKey\": \"$PRIVATE_KEY\", \"address\": \"$ADDRESS\"}" >> "$KEYS_FILE"
    else
      echo "    {\"index\": $i, \"privateKey\": \"$PRIVATE_KEY\", \"address\": \"$ADDRESS\"}," >> "$KEYS_FILE"
    fi
    
    # Progress indicator
    if [ $((i % 10)) -eq 0 ]; then
      echo "Generated $i/$NUM_KEYS keys..."
    fi
  done
  
  echo "  ]," >> "$KEYS_FILE"
  echo "  \"contract\": \"$CONTRACT_ADDRESS\"," >> "$KEYS_FILE"
  echo "  \"network\": \"base\"," >> "$KEYS_FILE"
  echo "  \"generated\": \"$(date -Iseconds)\"" >> "$KEYS_FILE"
  echo "}" >> "$KEYS_FILE"
  
  echo "✅ Keys generated and saved to $KEYS_FILE"
}

# Function to check balances
check_balances() {
  echo "💰 Checking balances of generated addresses..."
  
  TOTAL_BALANCE=0
  FUNDED_COUNT=0
  
  # Read addresses from JSON and check balances
  ADDRESSES=$(jq -r '.keys[].address' "$KEYS_FILE")
  
  for ADDRESS in $ADDRESSES; do
    BALANCE=$(cast balance "$ADDRESS" --rpc-url "$RPC_URL")
    BALANCE_ETH=$(cast to-unit "$BALANCE" ether)
    
    if [ "$BALANCE" != "0" ]; then
      FUNDED_COUNT=$((FUNDED_COUNT + 1))
      echo "  $ADDRESS: $BALANCE_ETH ETH"
      # Add to total (in wei)
      TOTAL_BALANCE=$(echo "$TOTAL_BALANCE + $BALANCE" | bc)
    fi
  done
  
  if [ $FUNDED_COUNT -eq 0 ]; then
    echo "❌ No addresses have been funded yet!"
    echo "Please send ETH to the addresses listed in $KEYS_FILE"
    echo ""
    echo "You can use this command to view addresses:"
    echo "jq -r '.keys[].address' $KEYS_FILE"
    return 1
  else
    TOTAL_ETH=$(cast to-unit "$TOTAL_BALANCE" ether)
    echo "✅ $FUNDED_COUNT/$NUM_KEYS addresses funded with total: $TOTAL_ETH ETH"
    return 0
  fi
}

# Function to send ping transactions
send_pings() {
  echo "📡 Sending ping transactions to contract..."
  
  SUCCESS_COUNT=0
  FAILED_COUNT=0
  
  # Read keys from JSON
  KEYS_DATA=$(jq -r '.keys[] | @base64' "$KEYS_FILE")
  
  for KEY_DATA in $KEYS_DATA; do
    # Decode JSON data
    KEY_INFO=$(echo "$KEY_DATA" | base64 --decode)
    INDEX=$(echo "$KEY_INFO" | jq -r '.index')
    PRIVATE_KEY=$(echo "$KEY_INFO" | jq -r '.privateKey')
    ADDRESS=$(echo "$KEY_INFO" | jq -r '.address')
    
    # Check if address has balance
    BALANCE=$(cast balance "$ADDRESS" --rpc-url "$RPC_URL")
    
    if [ "$BALANCE" = "0" ]; then
      echo "  ❌ Skipping $ADDRESS (index $INDEX) - no balance"
      FAILED_COUNT=$((FAILED_COUNT + 1))
      continue
    fi
    
    echo "  📡 Sending ping from $ADDRESS (index $INDEX)..."
    
    # Send ping transaction (calling ping() function)
    # Assuming your contract has a ping() function - adjust if different
    TX_RESULT=$(cast send "$CONTRACT_ADDRESS" \
      "ping()" \
      --private-key "$PRIVATE_KEY" \
      --rpc-url "$RPC_URL" \
      --gas-limit 100000 \
      2>&1)
    
    if echo "$TX_RESULT" | grep -q "transactionHash"; then
      TX_HASH=$(echo "$TX_RESULT" | grep "transactionHash" | awk '{print $2}')
      echo "    ✅ Success! TX: $TX_HASH"
      SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    else
      echo "    ❌ Failed: $TX_RESULT"
      FAILED_COUNT=$((FAILED_COUNT + 1))
    fi
    
    # Small delay to avoid rate limiting
    sleep 0.5
  done
  
  echo ""
  echo "📊 Summary:"
  echo "  ✅ Successful pings: $SUCCESS_COUNT"
  echo "  ❌ Failed pings: $FAILED_COUNT"
  echo "  📊 Total attempts: $((SUCCESS_COUNT + FAILED_COUNT))"
}

# Function to show addresses for funding
show_addresses() {
  if [ ! -f "$KEYS_FILE" ]; then
    echo "❌ Keys file not found. Run with 'generate' first."
    exit 1
  fi
  
  echo "📋 Generated addresses for funding:"
  echo ""
  jq -r '.keys[] | "[\(.index)] \(.address)"' "$KEYS_FILE"
  echo ""
  echo "💡 You can fund multiple addresses at once using a tool like:"
  echo "   - Disperse.app"
  echo "   - Or write a simple funding script"
}

# Function to create a funding helper script
create_funding_script() {
  FUNDING_SCRIPT="scripts/fundPingAddresses.sh"
  
  cat > "$FUNDING_SCRIPT" << 'EOF'
#!/bin/bash
set -e

# Load environment variables
if [ -f .env ]; then
  source .env
else
  echo "Error: .env file not found"
  exit 1
fi

KEYS_FILE="ping_keys.json"
AMOUNT_ETH="${1:-0.001}"  # Default 0.001 ETH per address
FUNDING_KEY="${FORGE_KEY:-default}"  # Use FORGE_KEY from .env or 'default'
RPC_URL="https://mainnet.base.org"

echo "💰 Funding addresses with $AMOUNT_ETH ETH each..."
echo "🔑 Using account: $FUNDING_KEY"

if [ ! -f "$KEYS_FILE" ]; then
  echo "❌ Keys file not found. Run pingContract.sh generate first."
  exit 1
fi

# Get addresses from JSON
ADDRESSES=$(jq -r '.keys[].address' "$KEYS_FILE")
COUNT=$(echo "$ADDRESSES" | wc -l)

echo "📊 Found $COUNT addresses to fund"
echo "💸 Total cost: $(echo "$COUNT * $AMOUNT_ETH" | bc) ETH (plus gas)"

read -p "Continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Cancelled."
  exit 0
fi

SUCCESS=0
FAILED=0

for ADDRESS in $ADDRESSES; do
  echo "💸 Funding $ADDRESS..."
  
  if cast send "$ADDRESS" \
    --value "${AMOUNT_ETH}ether" \
    --account "$FUNDING_KEY" \
    --rpc-url "$RPC_URL"; then
    echo "  ✅ Success"
    SUCCESS=$((SUCCESS + 1))
  else
    echo "  ❌ Failed"
    FAILED=$((FAILED + 1))
  fi
  
  sleep 1
done

echo ""
echo "📊 Funding Summary:"
echo "  ✅ Successful: $SUCCESS"
echo "  ❌ Failed: $FAILED"
EOF

  chmod +x "$FUNDING_SCRIPT"
  echo "✅ Created funding helper script: $FUNDING_SCRIPT"
  echo "Usage: $FUNDING_SCRIPT [amount_in_eth]"
  echo "Example: $FUNDING_SCRIPT 0.002"
}

# Main script logic
case "${1:-help}" in
  "generate")
    generate_keys
    create_funding_script
    echo ""
    echo "🎯 Next steps:"
    echo "1. Fund the addresses: ./scripts/fundPingAddresses.sh 0.001"
    echo "2. Check balances: $0 check"
    echo "3. Send pings: $0 ping"
    ;;
  
  "check")
    if [ ! -f "$KEYS_FILE" ]; then
      echo "❌ Keys file not found. Run '$0 generate' first."
      exit 1
    fi
    check_balances
    ;;
  
  "ping")
    if [ ! -f "$KEYS_FILE" ]; then
      echo "❌ Keys file not found. Run '$0 generate' first."
      exit 1
    fi
    
    if check_balances; then
      send_pings
    else
      exit 1
    fi
    ;;
  
  "addresses")
    show_addresses
    ;;
  
  "clean")
    if [ -f "$KEYS_FILE" ]; then
      rm "$KEYS_FILE"
      echo "🗑️  Removed $KEYS_FILE"
    fi
    if [ -f "scripts/fundPingAddresses.sh" ]; then
      rm "scripts/fundPingAddresses.sh"
      echo "🗑️  Removed funding script"
    fi
    ;;
  
  *)
    echo "🏓 LAF Contract Ping Tool"
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  generate   - Generate $NUM_KEYS private keys and save to $KEYS_FILE"
    echo "  check      - Check balances of generated addresses"
    echo "  ping       - Send ping transactions from funded addresses"
    echo "  addresses  - Show all generated addresses for funding"
    echo "  clean      - Remove generated keys file"
    echo ""
    echo "Example workflow:"
    echo "  1. $0 generate"
    echo "  2. ./scripts/fundPingAddresses.sh 0.001"
    echo "  3. $0 check"
    echo "  4. $0 ping"
    echo ""
    echo "Target contract: $CONTRACT_ADDRESS"
    ;;
esac
