# LAF (Looking for Art Friends)

A smart contract system built with Foundry that helps track lost items using blockchain technology.

## Overview

The LAF project consists of two main contracts:

1. **LAF.sol** - The main contract that:
   - Uses ERC1155 token standard
   - Manages item registration and tracking
   - Implements a clone factory pattern to create new Item instances
   - Stores mappings from secret hashes (as addresses) to Item contract instances
   - Has functions for registering, marking items as lost, found, and returned

2. **Item.sol** - The individual item contract that:
   - Stores owner information
   - Stores a secret hash (as address) for verification
   - Tracks item status (lost, found, returned)
   - Validates secret phrases when items are found

## Running Instructions

### Prerequisites

- [Foundry](https://book.getfoundry.sh/getting-started/installation) - Smart contract development toolkit
- [Node.js](https://nodejs.org/) (v16 or later)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd laf
   ```

2. Install Foundry dependencies:
   ```bash
   forge install
   ```

3. Install Node.js dependencies (for the frontend, if applicable):
   ```bash
   npm install
   ```

### Compiling Smart Contracts

```bash
forge build
```

### Running Tests

```bash
forge test
```

For verbose output with gas reports:

```bash
forge test -vv --gas-report
```

### Deploying Contracts

#### Local Development

1. Start a local Anvil chain:
   ```bash
   anvil
   ```

2. Deploy the contracts to the local chain:
   ```bash
   forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --broadcast --private-key <private-key>
   ```

#### Testnet Deployment

1. Create a `.env` file with your private key and RPC URL:
   ```
   PRIVATE_KEY=your_private_key
   RPC_URL=your_rpc_url
   ETHERSCAN_API_KEY=your_etherscan_api_key
   ```

2. Deploy to a testnet (e.g., Sepolia):
   ```bash
   forge script script/Deploy.s.sol --rpc-url $RPC_URL --broadcast --verify --etherscan-api-key $ETHERSCAN_API_KEY
   ```

### Interacting with Deployed Contracts

You can interact with the deployed contracts using the Forge CLI:

```bash
forge cast call <contract-address> "functionName(paramTypes)" <args> --rpc-url <rpc-url>
```

Or for sending transactions:

```bash
forge cast send <contract-address> "functionName(paramTypes)" <args> --private-key <private-key> --rpc-url <rpc-url>
```

## Frontend Application (if applicable)

If the project includes a frontend application:

```bash
npm run dev
```

This will start the development server, typically at http://localhost:3000.

## License

[MIT](LICENSE) or specify your license