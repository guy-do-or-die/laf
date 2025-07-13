# LAF is... Lost and Found

A decentralized lost-and-found platform with simple mechanics, rewards, reputation scores and community engagement.

🌐 **Live App**: [http://laf.is](http://laf.is)

## 🎯 What is LAF?

LAF (Lost and Found) is a Web3 application that creates a secure, trustless system for reporting and recovering lost items. Users can register their valuable items with secret id encoded in a QR code, report them as lost with rewards, and enable finders to claim rewards by simply scanning the QR code, getting in touch with the owner via embedded XMTP chat and returning the item to the owner.

## ✨ Key Features

- **📱 QR Codes**: Easy sharing of item information via QR codes
- **💰 Reward System**: ERC20 token-based incentives for finders
- **🏆 Reputation System**: ERC1155 badges for participants (registered, lost, found, returned)
- **🔐 Cryptographic Security**: Items are protected by secret hashes that only the owner knows
- **📍 Geolocation**: GPS coordinates for lost items to help finders
- **📊 Analytics**: The Graph Protocol integration for comprehensive data tracking

## 🏗️ Architecture

### Smart Contracts

- **LAF.sol**: Main factory contract managing the entire ecosystem
  - ERC1155 token standard for reputation badges
  - Clone factory pattern for gas-efficient item creation
  - Reward distribution and status tracking

- **Item.sol**: Individual item contracts created for each registered item
  - Stores owner, secret hash, and metadata
  - Manages item lifecycle (registered → lost → found → returned)
  - Handles reward distribution to finders

### Frontend Stack

- **React 18** with Vite for fast development
- **Wagmi** for Ethereum interactions
- **Privy** for wallet authentication
- **Tailwind CSS** with shadcn/ui components
- **Wouter** for client-side routing
- **QR Code Styling** for item sharing

### Data Layer

- **The Graph Protocol** for indexing blockchain events
- **GraphQL** for efficient data querying
- Real-time tracking of all item states and transactions

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) or Node.js 18+
- [Foundry](https://book.getfoundry.sh/getting-started/installation)
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd laf

# Install dependencies
bun install

# Install Foundry dependencies
forge install
```

### Development

```bash
# Start the development server
bun run dev
```

The app will be available at `http://localhost:5173`

> **Production**: The live application is deployed at [http://laf.is](http://laf.is)

### Smart Contract Development

```bash
# Compile contracts
forge build

# Run tests
forge test

# Deploy to local network
anvil # In another terminal
bun run contracts
```

## 📋 How It Works

1. **Register**: Users register valuable items with a secret phrase and description
2. **Generate QR**: System creates a QR code for easy item identification
3. **Report Lost**: If lost, owner reports the item with a reward amount and location
4. **Find & Claim**: Finders scan QR codes and enter the secret to claim rewards
5. **Return**: Items are marked as returned, completing the cycle

## 🌐 Deployment

### Testnet (Base Sepolia)
- LAF Contract: `0xA82667853e466C93D66B17037CfB106AaC3351c2`
- Reward Token: `0x036CbD53842c5426634e7929541eC2318f3dCF7e`

### Scripts

```bash
# Deploy contracts
bun run contracts

# Deploy subgraph
bun run graph

# Generate contract hooks 
bun run wagmi
```

## 🛠️ Configuration

Key configuration files:
- `wagmi.config.js` - Contract addresses and chain configuration
- `foundry.toml` - Solidity compiler settings
- `graph/subgraph.yaml` - The Graph indexing configuration

## 🧪 Testing

```bash
# Smart contract tests
forge test -vv

# Frontend tests (if implemented)
bun test
```

## 📊 The Graph Integration

The project includes a comprehensive subgraph that indexes:
- Item registrations, losses, findings, and returns
- Reward distributions and user interactions
- Geographic data for lost items
- Real-time status tracking

## 📄 License

MIT License - see LICENSE file for details
