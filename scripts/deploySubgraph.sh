#!/bin/bash

# Script to deploy subgraph with correct contract address and save URL
set -e

# Parse arguments
VERSION_LABEL=""
AUTO_INCREMENT=true

while [[ $# -gt 0 ]]; do
    case $1 in
        --version-label)
            VERSION_LABEL="$2"
            AUTO_INCREMENT=false
            shift 2
            ;;
        --no-increment)
            AUTO_INCREMENT=false
            shift
            ;;
        *)
            shift
            ;;
    esac
done

# Source environment variables
if [ -f .env ]; then
    source .env
else
    echo "Error: .env file not found"
    exit 1
fi

# Check if CHAIN_NAME is set
if [ -z "$CHAIN_NAME" ]; then
    echo "Error: CHAIN_NAME environment variable not set"
    exit 1
fi

# Get contract address based on chain name
CONTRACT_VAR="CONTRACT_${CHAIN_NAME}"
CONTRACT_ADDRESS=${!CONTRACT_VAR}

if [ -z "$CONTRACT_ADDRESS" ]; then
    echo "Error: Contract address not found for chain $CHAIN_NAME"
    echo "Expected environment variable: $CONTRACT_VAR"
    exit 1
fi

echo "Updating subgraph.yaml with contract address: $CONTRACT_ADDRESS"

# Try to get start block from networks.json first
NETWORK_KEY="$CHAIN_NAME"
if [ "$CHAIN_NAME" = "base_sepolia" ]; then
    NETWORK_KEY="base-sepolia"
fi

START_BLOCK=""
if [ -f "graph/networks.json" ]; then
    echo "Checking networks.json for deployment block..."
    NETWORKS_START_BLOCK=$(jq -r ".\"$NETWORK_KEY\".LAF.startBlock // empty" graph/networks.json 2>/dev/null || echo "")
    NETWORKS_ADDRESS=$(jq -r ".\"$NETWORK_KEY\".LAF.address // empty" graph/networks.json 2>/dev/null || echo "")
    
    if [ -n "$NETWORKS_START_BLOCK" ] && [ "$NETWORKS_START_BLOCK" != "null" ]; then
        START_BLOCK="$NETWORKS_START_BLOCK"
        echo "✅ Using start block from networks.json: $START_BLOCK"
        
        # If networks.json has the same contract address, prefer it
        if [ "$NETWORKS_ADDRESS" = "$CONTRACT_ADDRESS" ]; then
            echo "✅ Contract address matches networks.json: $CONTRACT_ADDRESS"
        else
            echo "⚠️  Contract address mismatch - .env: $CONTRACT_ADDRESS, networks.json: $NETWORKS_ADDRESS"
            echo "Using address from .env file"
        fi
    fi
fi

# If no start block from networks.json, try to get current block
if [ -z "$START_BLOCK" ]; then
    echo "Getting current block number as fallback..."
    echo "🔗 Querying RPC: $RPC_URL"
    CURRENT_BLOCK=$(cast block-number --rpc-url "$RPC_URL" 2>/dev/null || echo "")
    if [ -n "$CURRENT_BLOCK" ]; then
        echo "📊 Current block: $CURRENT_BLOCK"
    else
        echo "⚠️  Failed to get current block number from RPC"
    fi
    
    if [ -n "$CURRENT_BLOCK" ] && [ "$CURRENT_BLOCK" -gt 0 ]; then
        # Subtract a few blocks to be safe (in case there's a delay)
        START_BLOCK=$((CURRENT_BLOCK - 10))
        echo "Current block: $CURRENT_BLOCK, using startBlock: $START_BLOCK"
    else
        echo "⚠️  Could not get current block number, will use existing startBlock from subgraph.yaml"
    fi
fi

# Update subgraph.yaml
echo "Updating subgraph.yaml..."
sed -i "s/address: \".*\"/address: \"$CONTRACT_ADDRESS\"/" graph/subgraph.yaml

if [ -n "$START_BLOCK" ]; then
    sed -i "s/startBlock: [0-9]*/startBlock: $START_BLOCK/" graph/subgraph.yaml
    echo "✅ Subgraph configuration updated successfully"
    echo "Contract address: $CONTRACT_ADDRESS"
    echo "Start block: $START_BLOCK"
else
    echo "✅ Subgraph configuration updated successfully"
    echo "Contract address: $CONTRACT_ADDRESS"
    echo "Start block: [unchanged]"
fi

# Handle version labeling
VERSION_FILE=".subgraph-version"

if [ "$AUTO_INCREMENT" = true ] && [ -z "$VERSION_LABEL" ]; then
    # Read current version or start at 1
    if [ -f "$VERSION_FILE" ]; then
        CURRENT_VERSION=$(cat "$VERSION_FILE")
        # Validate it's a number
        if ! [[ "$CURRENT_VERSION" =~ ^[0-9]+$ ]]; then
            CURRENT_VERSION=0
        fi
    else
        CURRENT_VERSION=0
    fi
    
    # Increment version
    NEW_VERSION=$((CURRENT_VERSION + 1))
    VERSION_LABEL="$NEW_VERSION"
    
    # Save new version
    echo "$NEW_VERSION" > "$VERSION_FILE"
    
    echo "📈 Auto-incremented version: $CURRENT_VERSION → $NEW_VERSION"
fi

# Build deploy command
DEPLOY_CMD="graph deploy laf"
if [ -n "$VERSION_LABEL" ]; then
    DEPLOY_CMD="$DEPLOY_CMD --version-label \"$VERSION_LABEL\""
fi

echo "Deploying subgraph..."
echo "Command: $DEPLOY_CMD"

# Change to graph directory and deploy with real-time output
cd graph
echo "🚀 Running: $DEPLOY_CMD"
echo "📋 Real-time deployment log:"
echo "───────────────────────────────────────────────────────────────"

# Execute with real-time output and capture to temp file for URL extraction
TEMP_OUTPUT=$(mktemp)
if eval $DEPLOY_CMD 2>&1 | tee "$TEMP_OUTPUT"; then
    DEPLOY_EXIT_CODE=0
    DEPLOY_OUTPUT=$(cat "$TEMP_OUTPUT")
else
    DEPLOY_EXIT_CODE=$?
    DEPLOY_OUTPUT=$(cat "$TEMP_OUTPUT")
fi
rm -f "$TEMP_OUTPUT"

echo "───────────────────────────────────────────────────────────────"

# Check if deployment was successful
if [ $DEPLOY_EXIT_CODE -ne 0 ]; then
    echo "❌ Subgraph deployment failed"
    exit $DEPLOY_EXIT_CODE
fi

# Extract subgraph URL from output (strip ANSI color codes)
SUBGRAPH_URL=$(echo "$DEPLOY_OUTPUT" | grep -E "Queries \(HTTP\):" | awk '{print $3}' | sed 's/\x1b\[[0-9;]*m//g' | head -1)

if [ -n "$SUBGRAPH_URL" ]; then
    echo "\n🎉 Subgraph deployed successfully!"
    echo "Subgraph URL: $SUBGRAPH_URL"
    
    # Save URL to .env file
    cd ..
    ENV_VAR="VITE_GRAPH_URL"
    
    # Update or add the VITE_GRAPH_URL in .env
    if grep -q "^$ENV_VAR=" .env; then
        # Update existing line
        sed -i "s|^$ENV_VAR=.*|$ENV_VAR=$SUBGRAPH_URL|" .env
    else
        # Add new line
        echo "$ENV_VAR=$SUBGRAPH_URL" >> .env
    fi
    
    echo "✅ Updated $ENV_VAR in .env file"
else
    echo "⚠️  Could not extract subgraph URL from deployment output"
fi
