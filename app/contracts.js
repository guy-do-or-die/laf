import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Clones
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const clonesAbi = [
  { type: 'error', inputs: [], name: 'CloneArgumentsTooLong' },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Config
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const configAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'BASIS_POINTS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DAY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_CHARITY_FEE_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_FEE_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_IMMEDIATE_REWARD_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_CHARITY_FEE_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_FEE_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_IMMEDIATE_REWARD_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MONTH',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'WEEK',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'config',
    outputs: [
      { name: 'rewardToken', internalType: 'address', type: 'address' },
      { name: 'minReward', internalType: 'uint256', type: 'uint256' },
      { name: 'immediateRewardBps', internalType: 'uint256', type: 'uint256' },
      { name: 'minCharityFeeBps', internalType: 'uint256', type: 'uint256' },
      { name: 'minFeeBps', internalType: 'uint256', type: 'uint256' },
      { name: 'foundCooldown', internalType: 'uint256', type: 'uint256' },
      { name: 'returnCooldown', internalType: 'uint256', type: 'uint256' },
      { name: 'revokeLostCooldown', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ConfigOwnable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const configOwnableAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'BASIS_POINTS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DAY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'INCORRECT_VALUE',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_CHARITY_FEE_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_FEE_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_IMMEDIATE_REWARD_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_CHARITY_FEE_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_FEE_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_IMMEDIATE_REWARD_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MONTH',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'WEEK',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'config',
    outputs: [
      { name: 'rewardToken', internalType: 'address', type: 'address' },
      { name: 'minReward', internalType: 'uint256', type: 'uint256' },
      { name: 'immediateRewardBps', internalType: 'uint256', type: 'uint256' },
      { name: 'minCharityFeeBps', internalType: 'uint256', type: 'uint256' },
      { name: 'minFeeBps', internalType: 'uint256', type: 'uint256' },
      { name: 'foundCooldown', internalType: 'uint256', type: 'uint256' },
      { name: 'returnCooldown', internalType: 'uint256', type: 'uint256' },
      { name: 'revokeLostCooldown', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setFoundCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setImmediateRewardPercentage',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setMinCharityFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setMinFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setMinReward',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setReturnCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setRevokeLostCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_rewardToken', internalType: 'address', type: 'address' },
    ],
    name: 'setRewardToken',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Create2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const create2Abi = [
  { type: 'error', inputs: [], name: 'Create2EmptyBytecode' },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ECDSA
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ecdsaAbi = [
  { type: 'error', inputs: [], name: 'ECDSAInvalidSignature' },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'ECDSAInvalidSignatureLength',
  },
  {
    type: 'error',
    inputs: [{ name: 's', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ECDSAInvalidSignatureS',
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC1155
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc1155Abi = [
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'values',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidApprover',
  },
  {
    type: 'error',
    inputs: [
      { name: 'idsLength', internalType: 'uint256', type: 'uint256' },
      { name: 'valuesLength', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InvalidArrayLength',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidSender',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1155MissingApprovalForAll',
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC1155Supply
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc1155SupplyAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'exists',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'values',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidApprover',
  },
  {
    type: 'error',
    inputs: [
      { name: 'idsLength', internalType: 'uint256', type: 'uint256' },
      { name: 'valuesLength', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InvalidArrayLength',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidSender',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1155MissingApprovalForAll',
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc165Abi = [
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 */
export const erc20Abi = [
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
]

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 */
export const erc20Address = {
  8453: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  84532: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
}

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 */
export const erc20Config = { address: erc20Address, abi: erc20Abi }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const errorsAbi = [
  { type: 'error', inputs: [], name: 'FailedCall' },
  { type: 'error', inputs: [], name: 'FailedDeployment' },
  {
    type: 'error',
    inputs: [
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'MissingPrecompile',
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155Abi = [
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'values',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155ErrorsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidApprover',
  },
  {
    type: 'error',
    inputs: [
      { name: 'idsLength', internalType: 'uint256', type: 'uint256' },
      { name: 'valuesLength', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InvalidArrayLength',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidSender',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1155MissingApprovalForAll',
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155MetadataURI
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155MetadataUriAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'values',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155Receiver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155ReceiverAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1271
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1271Abi = [
  {
    type: 'function',
    inputs: [
      { name: 'hash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'isValidSignature',
    outputs: [{ name: 'magicValue', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'view',
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1271Wallet
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1271WalletAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'hash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'isValidSignature',
    outputs: [{ name: 'magicValue', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'view',
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20ErrorsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC2981
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc2981Abi = [
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'salePrice', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'royaltyInfo',
    outputs: [
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'royaltyAmount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ErrorsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ILAF
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ilafAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'charityAddress', internalType: 'address', type: 'address' },
      { name: 'charityTitle', internalType: 'string', type: 'string' },
      { name: 'charityUrl', internalType: 'string', type: 'string' },
    ],
    name: 'addCharity',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'charities',
    outputs: [
      { name: 'active', internalType: 'bool', type: 'bool' },
      { name: 'contractAddress', internalType: 'address', type: 'address' },
      { name: 'donated', internalType: 'uint256', type: 'uint256' },
      { name: 'title', internalType: 'string', type: 'string' },
      { name: 'url', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'charitiesCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'charityFeesDistributed',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'config',
    outputs: [
      {
        name: '',
        internalType: 'struct Config.ConfigData',
        type: 'tuple',
        components: [
          { name: 'rewardToken', internalType: 'address', type: 'address' },
          { name: 'minReward', internalType: 'uint256', type: 'uint256' },
          {
            name: 'immediateRewardBps',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'minCharityFeeBps',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'minFeeBps', internalType: 'uint256', type: 'uint256' },
          { name: 'foundCooldown', internalType: 'uint256', type: 'uint256' },
          { name: 'returnCooldown', internalType: 'uint256', type: 'uint256' },
          {
            name: 'revokeLostCooldown',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'feesDistributed',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'secretHash', internalType: 'address', type: 'address' },
      { name: 'secret', internalType: 'string', type: 'string' },
      { name: 'ownerSignature', internalType: 'bytes', type: 'bytes' },
      { name: 'finderSignature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'found',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'foundCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'itemImplementation',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'secretHash', internalType: 'address', type: 'address' }],
    name: 'items',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'itemsCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'secretHash', internalType: 'address', type: 'address' },
      { name: 'rewardAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'geoLocation', internalType: 'string', type: 'string' },
    ],
    name: 'lost',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lostCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'secretHash', internalType: 'address', type: 'address' },
      { name: 'comment', internalType: 'string', type: 'string' },
    ],
    name: 'registerItem',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'registeredCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'secretHash', internalType: 'address', type: 'address' },
      { name: 'charityIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'charityFee', internalType: 'uint256', type: 'uint256' },
      { name: 'fee', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'returned',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'returnedCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'secretHash', internalType: 'address', type: 'address' }],
    name: 'revokeLost',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardsDistributed',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'salePrice', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'royaltyInfo',
    outputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'foundCooldownSeconds',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'setFoundCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'immediateRewardBps', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setImmediateRewardPercentage',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'minCharityFeeBps', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setMinCharityFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'minFeeBps', internalType: 'uint256', type: 'uint256' }],
    name: 'setMinFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'minRewardAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setMinReward',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'returnCooldownSeconds',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'setReturnCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'revokeLostCooldownSeconds',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'setRevokeLostCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'rewardTokenAddress', internalType: 'address', type: 'address' },
    ],
    name: 'setRewardToken',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'treasuryAddress', internalType: 'address', type: 'address' },
    ],
    name: 'setTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'thumbDown',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'thumbUp',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'charityIndex', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'toggleActiveCharity',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'treasury',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'trust',
    outputs: [{ name: '', internalType: 'int256', type: 'int256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'pure',
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMulticall3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMulticall3Abi = [
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'returnData', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3Value[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3Value',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'blockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBasefee',
    outputs: [{ name: 'basefee', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'blockNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'getBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBlockNumber',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getChainId',
    outputs: [{ name: 'chainid', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockCoinbase',
    outputs: [{ name: 'coinbase', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockDifficulty',
    outputs: [{ name: 'difficulty', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockGasLimit',
    outputs: [{ name: 'gaslimit', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [{ name: 'timestamp', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'getEthBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLastBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryBlockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Initializable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const initializableAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Item
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const itemAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'BASIS_POINTS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DAY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_CHARITY_FEE_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_FEE_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_IMMEDIATE_REWARD_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_CHARITY_FEE_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_FEE_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_IMMEDIATE_REWARD_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MONTH',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'WEEK',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'comment',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'config',
    outputs: [
      { name: 'rewardToken', internalType: 'address', type: 'address' },
      { name: 'minReward', internalType: 'uint256', type: 'uint256' },
      { name: 'immediateRewardBps', internalType: 'uint256', type: 'uint256' },
      { name: 'minCharityFeeBps', internalType: 'uint256', type: 'uint256' },
      { name: 'minFeeBps', internalType: 'uint256', type: 'uint256' },
      { name: 'foundCooldown', internalType: 'uint256', type: 'uint256' },
      { name: 'returnCooldown', internalType: 'uint256', type: 'uint256' },
      { name: 'revokeLostCooldown', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'delegate',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'delegateUpdatedTs',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'detailsUpdatedTs',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'factory',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'finder',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_finder', internalType: 'address', type: 'address' }],
    name: 'found',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'foundTs',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'geo',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_secretHash', internalType: 'address', type: 'address' },
      { name: '_comment', internalType: 'string', type: 'string' },
      {
        name: '_config',
        internalType: 'struct Config.ConfigData',
        type: 'tuple',
        components: [
          { name: 'rewardToken', internalType: 'address', type: 'address' },
          { name: 'minReward', internalType: 'uint256', type: 'uint256' },
          {
            name: 'immediateRewardBps',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'minCharityFeeBps',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'minFeeBps', internalType: 'uint256', type: 'uint256' },
          { name: 'foundCooldown', internalType: 'uint256', type: 'uint256' },
          { name: 'returnCooldown', internalType: 'uint256', type: 'uint256' },
          {
            name: 'revokeLostCooldown',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isFound',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isLost',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isReturned',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_rewardAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_geo', internalType: 'string', type: 'string' },
    ],
    name: 'lost',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lostTs',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_charity', internalType: 'address', type: 'address' },
      { name: '_charityFee', internalType: 'uint256', type: 'uint256' },
      { name: '_fee', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'returned',
    outputs: [
      { name: 'rewardAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'charityFeeAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'feeAmount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'returnedTs',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'revokeLost',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'reward',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardToken',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'secretHash',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_delegate', internalType: 'address', type: 'address' }],
    name: 'updateDelegate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_comment', internalType: 'string', type: 'string' },
      { name: '_geo', internalType: 'string', type: 'string' },
    ],
    name: 'updateDetails',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LAF
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const lafAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_rewardToken', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'BASIS_POINTS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DAY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'INCORRECT_VALUE',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_CHARITY_FEE_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_FEE_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_IMMEDIATE_REWARD_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_CHARITY_FEE_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_FEE_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_IMMEDIATE_REWARD_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MONTH',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'WEEK',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_charityAddress', internalType: 'address', type: 'address' },
      { name: '_charityTitle', internalType: 'string', type: 'string' },
      { name: '_charityUrl', internalType: 'string', type: 'string' },
    ],
    name: 'addCharity',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'charities',
    outputs: [
      { name: 'active', internalType: 'bool', type: 'bool' },
      { name: 'contractAddress', internalType: 'address', type: 'address' },
      { name: 'donated', internalType: 'uint256', type: 'uint256' },
      { name: 'title', internalType: 'string', type: 'string' },
      { name: 'url', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'charitiesCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'charityFeesDistributed',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'config',
    outputs: [
      { name: 'rewardToken', internalType: 'address', type: 'address' },
      { name: 'minReward', internalType: 'uint256', type: 'uint256' },
      { name: 'immediateRewardBps', internalType: 'uint256', type: 'uint256' },
      { name: 'minCharityFeeBps', internalType: 'uint256', type: 'uint256' },
      { name: 'minFeeBps', internalType: 'uint256', type: 'uint256' },
      { name: 'foundCooldown', internalType: 'uint256', type: 'uint256' },
      { name: 'returnCooldown', internalType: 'uint256', type: 'uint256' },
      { name: 'revokeLostCooldown', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'exists',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'feesDistributed',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_secretHash', internalType: 'address', type: 'address' },
      { name: '_secret', internalType: 'string', type: 'string' },
      { name: '_ownerSignature', internalType: 'bytes', type: 'bytes' },
      { name: '_finderSignature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'found',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'foundCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'itemImplementation',
    outputs: [{ name: '', internalType: 'contract Item', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'items',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'itemsCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_secretHash', internalType: 'address', type: 'address' },
      { name: '_rewardAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_geoLocation', internalType: 'string', type: 'string' },
    ],
    name: 'lost',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lostCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_secretHash', internalType: 'address', type: 'address' },
      { name: '_comment', internalType: 'string', type: 'string' },
    ],
    name: 'registerItem',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'registeredCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_secretHash', internalType: 'address', type: 'address' },
      { name: '_charityIndex', internalType: 'uint256', type: 'uint256' },
      { name: '_charityFee', internalType: 'uint256', type: 'uint256' },
      { name: '_fee', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'returned',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'returnedCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_secretHash', internalType: 'address', type: 'address' }],
    name: 'revokeLost',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardsDistributed',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'salePrice', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'royaltyInfo',
    outputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setFoundCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setImmediateRewardPercentage',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setMinCharityFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setMinFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setMinReward',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setReturnCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setRevokeLostCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_rewardToken', internalType: 'address', type: 'address' },
    ],
    name: 'setRewardToken',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_treasury', internalType: 'address', type: 'address' }],
    name: 'setTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'thumbDown',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'thumbUp',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_charityIndex', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'toggleActiveCharity',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'treasury',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'trust',
    outputs: [{ name: '', internalType: 'int256', type: 'int256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'item', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'hash',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'charity',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'charityFeeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'CharityFeesDistributed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'Down',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'item', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'hash',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'treasury',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'feeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'FeesDistributed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'item', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'hash',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'finder',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'ItemFound',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'item', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'hash',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'rewardAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'geoLocation',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'ItemLost',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'item', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'hash',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'ItemRegistered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'item', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'hash',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'finder',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'ItemReturned',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'item', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'hash',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'ItemRevokedLost',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Minted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'item', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'hash',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'finder',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'rewardAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RewardsDistributed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'values',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'Up',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidApprover',
  },
  {
    type: 'error',
    inputs: [
      { name: 'idsLength', internalType: 'uint256', type: 'uint256' },
      { name: 'valuesLength', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InvalidArrayLength',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidSender',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1155MissingApprovalForAll',
  },
  { type: 'error', inputs: [], name: 'FailedDeployment' },
  {
    type: 'error',
    inputs: [
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
]

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const lafAddress = {
  8453: '0x0000000000000000000000000000000000000000',
  84532: '0x96610280410E19877C72eFEb53e8Fd45623c2b81',
}

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const lafConfig = { address: lafAddress, abi: lafAbi }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Meta
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const metaAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'exists',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'salePrice', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'royaltyInfo',
    outputs: [
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'royaltyAmount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'thumbDown',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'thumbUp',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'trust',
    outputs: [{ name: '', internalType: 'int256', type: 'int256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'Down',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'values',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'Up',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidApprover',
  },
  {
    type: 'error',
    inputs: [
      { name: 'idsLength', internalType: 'uint256', type: 'uint256' },
      { name: 'valuesLength', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InvalidArrayLength',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidSender',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1155MissingApprovalForAll',
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ownable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownableAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ReentrancyGuard
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const reentrancyGuardAbi = [
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SafeCast
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const safeCastAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'bits', internalType: 'uint8', type: 'uint8' },
      { name: 'value', internalType: 'int256', type: 'int256' },
    ],
    name: 'SafeCastOverflowedIntDowncast',
  },
  {
    type: 'error',
    inputs: [{ name: 'value', internalType: 'int256', type: 'int256' }],
    name: 'SafeCastOverflowedIntToUint',
  },
  {
    type: 'error',
    inputs: [
      { name: 'bits', internalType: 'uint8', type: 'uint8' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'SafeCastOverflowedUintDowncast',
  },
  {
    type: 'error',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'SafeCastOverflowedUintToInt',
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Strings
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stringsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'length', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'StringsInsufficientHexLength',
  },
  { type: 'error', inputs: [], name: 'StringsInvalidAddressFormat' },
  { type: 'error', inputs: [], name: 'StringsInvalidChar' },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UniversalSigValidator
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const universalSigValidatorAbi = [
  {
    type: 'function',
    inputs: [
      { name: '_signer', internalType: 'address', type: 'address' },
      { name: '_hash', internalType: 'bytes32', type: 'bytes32' },
      { name: '_signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'isValidSig',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_signer', internalType: 'address', type: 'address' },
      { name: '_hash', internalType: 'bytes32', type: 'bytes32' },
      { name: '_signature', internalType: 'bytes', type: 'bytes' },
      { name: 'allowSideEffects', internalType: 'bool', type: 'bool' },
      { name: 'tryPrepare', internalType: 'bool', type: 'bool' },
    ],
    name: 'isValidSigImpl',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_signer', internalType: 'address', type: 'address' },
      { name: '_hash', internalType: 'bytes32', type: 'bytes32' },
      { name: '_signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'isValidSigWithSideEffects',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [{ name: 'error', internalType: 'bytes', type: 'bytes' }],
    name: 'ERC1271Revert',
  },
  {
    type: 'error',
    inputs: [{ name: 'error', internalType: 'bytes', type: 'bytes' }],
    name: 'ERC6492CallFailed',
  },
  { type: 'error', inputs: [], name: 'ERC6492DeploySilentlyFailed' },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ValidateSigOffchain
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const validateSigOffchainAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_signer', internalType: 'address', type: 'address' },
      { name: '_hash', internalType: 'bytes32', type: 'bytes32' },
      { name: '_signature', internalType: 'bytes', type: 'bytes' },
    ],
    stateMutability: 'nonpayable',
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configAbi}__
 */
export const useReadConfig = /*#__PURE__*/ createUseReadContract({
  abi: configAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configAbi}__ and `functionName` set to `"BASIS_POINTS"`
 */
export const useReadConfigBasisPoints = /*#__PURE__*/ createUseReadContract({
  abi: configAbi,
  functionName: 'BASIS_POINTS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configAbi}__ and `functionName` set to `"DAY"`
 */
export const useReadConfigDay = /*#__PURE__*/ createUseReadContract({
  abi: configAbi,
  functionName: 'DAY',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configAbi}__ and `functionName` set to `"MAX_CHARITY_FEE_BPS"`
 */
export const useReadConfigMaxCharityFeeBps =
  /*#__PURE__*/ createUseReadContract({
    abi: configAbi,
    functionName: 'MAX_CHARITY_FEE_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configAbi}__ and `functionName` set to `"MAX_FEE_BPS"`
 */
export const useReadConfigMaxFeeBps = /*#__PURE__*/ createUseReadContract({
  abi: configAbi,
  functionName: 'MAX_FEE_BPS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configAbi}__ and `functionName` set to `"MAX_IMMEDIATE_REWARD_BPS"`
 */
export const useReadConfigMaxImmediateRewardBps =
  /*#__PURE__*/ createUseReadContract({
    abi: configAbi,
    functionName: 'MAX_IMMEDIATE_REWARD_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configAbi}__ and `functionName` set to `"MIN_CHARITY_FEE_BPS"`
 */
export const useReadConfigMinCharityFeeBps =
  /*#__PURE__*/ createUseReadContract({
    abi: configAbi,
    functionName: 'MIN_CHARITY_FEE_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configAbi}__ and `functionName` set to `"MIN_FEE_BPS"`
 */
export const useReadConfigMinFeeBps = /*#__PURE__*/ createUseReadContract({
  abi: configAbi,
  functionName: 'MIN_FEE_BPS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configAbi}__ and `functionName` set to `"MIN_IMMEDIATE_REWARD_BPS"`
 */
export const useReadConfigMinImmediateRewardBps =
  /*#__PURE__*/ createUseReadContract({
    abi: configAbi,
    functionName: 'MIN_IMMEDIATE_REWARD_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configAbi}__ and `functionName` set to `"MONTH"`
 */
export const useReadConfigMonth = /*#__PURE__*/ createUseReadContract({
  abi: configAbi,
  functionName: 'MONTH',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configAbi}__ and `functionName` set to `"WEEK"`
 */
export const useReadConfigWeek = /*#__PURE__*/ createUseReadContract({
  abi: configAbi,
  functionName: 'WEEK',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configAbi}__ and `functionName` set to `"config"`
 */
export const useReadConfigConfig = /*#__PURE__*/ createUseReadContract({
  abi: configAbi,
  functionName: 'config',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configOwnableAbi}__
 */
export const useReadConfigOwnable = /*#__PURE__*/ createUseReadContract({
  abi: configOwnableAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"BASIS_POINTS"`
 */
export const useReadConfigOwnableBasisPoints =
  /*#__PURE__*/ createUseReadContract({
    abi: configOwnableAbi,
    functionName: 'BASIS_POINTS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"DAY"`
 */
export const useReadConfigOwnableDay = /*#__PURE__*/ createUseReadContract({
  abi: configOwnableAbi,
  functionName: 'DAY',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"INCORRECT_VALUE"`
 */
export const useReadConfigOwnableIncorrectValue =
  /*#__PURE__*/ createUseReadContract({
    abi: configOwnableAbi,
    functionName: 'INCORRECT_VALUE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"MAX_CHARITY_FEE_BPS"`
 */
export const useReadConfigOwnableMaxCharityFeeBps =
  /*#__PURE__*/ createUseReadContract({
    abi: configOwnableAbi,
    functionName: 'MAX_CHARITY_FEE_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"MAX_FEE_BPS"`
 */
export const useReadConfigOwnableMaxFeeBps =
  /*#__PURE__*/ createUseReadContract({
    abi: configOwnableAbi,
    functionName: 'MAX_FEE_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"MAX_IMMEDIATE_REWARD_BPS"`
 */
export const useReadConfigOwnableMaxImmediateRewardBps =
  /*#__PURE__*/ createUseReadContract({
    abi: configOwnableAbi,
    functionName: 'MAX_IMMEDIATE_REWARD_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"MIN_CHARITY_FEE_BPS"`
 */
export const useReadConfigOwnableMinCharityFeeBps =
  /*#__PURE__*/ createUseReadContract({
    abi: configOwnableAbi,
    functionName: 'MIN_CHARITY_FEE_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"MIN_FEE_BPS"`
 */
export const useReadConfigOwnableMinFeeBps =
  /*#__PURE__*/ createUseReadContract({
    abi: configOwnableAbi,
    functionName: 'MIN_FEE_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"MIN_IMMEDIATE_REWARD_BPS"`
 */
export const useReadConfigOwnableMinImmediateRewardBps =
  /*#__PURE__*/ createUseReadContract({
    abi: configOwnableAbi,
    functionName: 'MIN_IMMEDIATE_REWARD_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"MONTH"`
 */
export const useReadConfigOwnableMonth = /*#__PURE__*/ createUseReadContract({
  abi: configOwnableAbi,
  functionName: 'MONTH',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"WEEK"`
 */
export const useReadConfigOwnableWeek = /*#__PURE__*/ createUseReadContract({
  abi: configOwnableAbi,
  functionName: 'WEEK',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"config"`
 */
export const useReadConfigOwnableConfig = /*#__PURE__*/ createUseReadContract({
  abi: configOwnableAbi,
  functionName: 'config',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"owner"`
 */
export const useReadConfigOwnableOwner = /*#__PURE__*/ createUseReadContract({
  abi: configOwnableAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link configOwnableAbi}__
 */
export const useWriteConfigOwnable = /*#__PURE__*/ createUseWriteContract({
  abi: configOwnableAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteConfigOwnableRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: configOwnableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setFoundCooldown"`
 */
export const useWriteConfigOwnableSetFoundCooldown =
  /*#__PURE__*/ createUseWriteContract({
    abi: configOwnableAbi,
    functionName: 'setFoundCooldown',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setImmediateRewardPercentage"`
 */
export const useWriteConfigOwnableSetImmediateRewardPercentage =
  /*#__PURE__*/ createUseWriteContract({
    abi: configOwnableAbi,
    functionName: 'setImmediateRewardPercentage',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setMinCharityFee"`
 */
export const useWriteConfigOwnableSetMinCharityFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: configOwnableAbi,
    functionName: 'setMinCharityFee',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setMinFee"`
 */
export const useWriteConfigOwnableSetMinFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: configOwnableAbi,
    functionName: 'setMinFee',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setMinReward"`
 */
export const useWriteConfigOwnableSetMinReward =
  /*#__PURE__*/ createUseWriteContract({
    abi: configOwnableAbi,
    functionName: 'setMinReward',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setReturnCooldown"`
 */
export const useWriteConfigOwnableSetReturnCooldown =
  /*#__PURE__*/ createUseWriteContract({
    abi: configOwnableAbi,
    functionName: 'setReturnCooldown',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setRevokeLostCooldown"`
 */
export const useWriteConfigOwnableSetRevokeLostCooldown =
  /*#__PURE__*/ createUseWriteContract({
    abi: configOwnableAbi,
    functionName: 'setRevokeLostCooldown',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setRewardToken"`
 */
export const useWriteConfigOwnableSetRewardToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: configOwnableAbi,
    functionName: 'setRewardToken',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteConfigOwnableTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: configOwnableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link configOwnableAbi}__
 */
export const useSimulateConfigOwnable = /*#__PURE__*/ createUseSimulateContract(
  { abi: configOwnableAbi },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateConfigOwnableRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: configOwnableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setFoundCooldown"`
 */
export const useSimulateConfigOwnableSetFoundCooldown =
  /*#__PURE__*/ createUseSimulateContract({
    abi: configOwnableAbi,
    functionName: 'setFoundCooldown',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setImmediateRewardPercentage"`
 */
export const useSimulateConfigOwnableSetImmediateRewardPercentage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: configOwnableAbi,
    functionName: 'setImmediateRewardPercentage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setMinCharityFee"`
 */
export const useSimulateConfigOwnableSetMinCharityFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: configOwnableAbi,
    functionName: 'setMinCharityFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setMinFee"`
 */
export const useSimulateConfigOwnableSetMinFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: configOwnableAbi,
    functionName: 'setMinFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setMinReward"`
 */
export const useSimulateConfigOwnableSetMinReward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: configOwnableAbi,
    functionName: 'setMinReward',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setReturnCooldown"`
 */
export const useSimulateConfigOwnableSetReturnCooldown =
  /*#__PURE__*/ createUseSimulateContract({
    abi: configOwnableAbi,
    functionName: 'setReturnCooldown',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setRevokeLostCooldown"`
 */
export const useSimulateConfigOwnableSetRevokeLostCooldown =
  /*#__PURE__*/ createUseSimulateContract({
    abi: configOwnableAbi,
    functionName: 'setRevokeLostCooldown',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setRewardToken"`
 */
export const useSimulateConfigOwnableSetRewardToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: configOwnableAbi,
    functionName: 'setRewardToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateConfigOwnableTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: configOwnableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link configOwnableAbi}__
 */
export const useWatchConfigOwnableEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: configOwnableAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link configOwnableAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchConfigOwnableOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: configOwnableAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc1155Abi}__
 */
export const useReadErc1155 = /*#__PURE__*/ createUseReadContract({
  abi: erc1155Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc1155BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc1155Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"balanceOfBatch"`
 */
export const useReadErc1155BalanceOfBatch = /*#__PURE__*/ createUseReadContract(
  { abi: erc1155Abi, functionName: 'balanceOfBatch' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadErc1155IsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: erc1155Abi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadErc1155SupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: erc1155Abi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"uri"`
 */
export const useReadErc1155Uri = /*#__PURE__*/ createUseReadContract({
  abi: erc1155Abi,
  functionName: 'uri',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc1155Abi}__
 */
export const useWriteErc1155 = /*#__PURE__*/ createUseWriteContract({
  abi: erc1155Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const useWriteErc1155SafeBatchTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc1155Abi,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteErc1155SafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc1155Abi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteErc1155SetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc1155Abi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc1155Abi}__
 */
export const useSimulateErc1155 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc1155Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const useSimulateErc1155SafeBatchTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc1155Abi,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateErc1155SafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc1155Abi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateErc1155SetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc1155Abi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc1155Abi}__
 */
export const useWatchErc1155Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc1155Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc1155Abi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchErc1155ApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc1155Abi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc1155Abi}__ and `eventName` set to `"TransferBatch"`
 */
export const useWatchErc1155TransferBatchEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc1155Abi,
    eventName: 'TransferBatch',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc1155Abi}__ and `eventName` set to `"TransferSingle"`
 */
export const useWatchErc1155TransferSingleEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc1155Abi,
    eventName: 'TransferSingle',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc1155Abi}__ and `eventName` set to `"URI"`
 */
export const useWatchErc1155UriEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc1155Abi,
    eventName: 'URI',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc1155SupplyAbi}__
 */
export const useReadErc1155Supply = /*#__PURE__*/ createUseReadContract({
  abi: erc1155SupplyAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc1155SupplyAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc1155SupplyBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: erc1155SupplyAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc1155SupplyAbi}__ and `functionName` set to `"balanceOfBatch"`
 */
export const useReadErc1155SupplyBalanceOfBatch =
  /*#__PURE__*/ createUseReadContract({
    abi: erc1155SupplyAbi,
    functionName: 'balanceOfBatch',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc1155SupplyAbi}__ and `functionName` set to `"exists"`
 */
export const useReadErc1155SupplyExists = /*#__PURE__*/ createUseReadContract({
  abi: erc1155SupplyAbi,
  functionName: 'exists',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc1155SupplyAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadErc1155SupplyIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: erc1155SupplyAbi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc1155SupplyAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadErc1155SupplySupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: erc1155SupplyAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc1155SupplyAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc1155SupplyTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: erc1155SupplyAbi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc1155SupplyAbi}__ and `functionName` set to `"uri"`
 */
export const useReadErc1155SupplyUri = /*#__PURE__*/ createUseReadContract({
  abi: erc1155SupplyAbi,
  functionName: 'uri',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc1155SupplyAbi}__
 */
export const useWriteErc1155Supply = /*#__PURE__*/ createUseWriteContract({
  abi: erc1155SupplyAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc1155SupplyAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const useWriteErc1155SupplySafeBatchTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc1155SupplyAbi,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc1155SupplyAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteErc1155SupplySafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc1155SupplyAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc1155SupplyAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteErc1155SupplySetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc1155SupplyAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc1155SupplyAbi}__
 */
export const useSimulateErc1155Supply = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc1155SupplyAbi },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc1155SupplyAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const useSimulateErc1155SupplySafeBatchTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc1155SupplyAbi,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc1155SupplyAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateErc1155SupplySafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc1155SupplyAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc1155SupplyAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateErc1155SupplySetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc1155SupplyAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc1155SupplyAbi}__
 */
export const useWatchErc1155SupplyEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: erc1155SupplyAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc1155SupplyAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchErc1155SupplyApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc1155SupplyAbi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc1155SupplyAbi}__ and `eventName` set to `"TransferBatch"`
 */
export const useWatchErc1155SupplyTransferBatchEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc1155SupplyAbi,
    eventName: 'TransferBatch',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc1155SupplyAbi}__ and `eventName` set to `"TransferSingle"`
 */
export const useWatchErc1155SupplyTransferSingleEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc1155SupplyAbi,
    eventName: 'TransferSingle',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc1155SupplyAbi}__ and `eventName` set to `"URI"`
 */
export const useWatchErc1155SupplyUriEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc1155SupplyAbi,
    eventName: 'URI',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc165Abi}__
 */
export const useReadErc165 = /*#__PURE__*/ createUseReadContract({
  abi: erc165Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc165Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadErc165SupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: erc165Abi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 */
export const useReadErc20 = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  address: erc20Address,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 */
export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 */
export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 */
export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  address: erc20Address,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 */
export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  address: erc20Address,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 */
export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 */
export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20Abi, address: erc20Address, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 */
export const useSimulateErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    address: erc20Address,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20Abi,
  address: erc20Address,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 */
export const useWatchErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    address: erc20Address,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e)
 */
export const useWatchErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    address: erc20Address,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1155Abi}__
 */
export const useReadIerc1155 = /*#__PURE__*/ createUseReadContract({
  abi: ierc1155Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIerc1155BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: ierc1155Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"balanceOfBatch"`
 */
export const useReadIerc1155BalanceOfBatch =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc1155Abi,
    functionName: 'balanceOfBatch',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadIerc1155IsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc1155Abi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadIerc1155SupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc1155Abi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc1155Abi}__
 */
export const useWriteIerc1155 = /*#__PURE__*/ createUseWriteContract({
  abi: ierc1155Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const useWriteIerc1155SafeBatchTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc1155Abi,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteIerc1155SafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc1155Abi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteIerc1155SetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc1155Abi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc1155Abi}__
 */
export const useSimulateIerc1155 = /*#__PURE__*/ createUseSimulateContract({
  abi: ierc1155Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const useSimulateIerc1155SafeBatchTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc1155Abi,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateIerc1155SafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc1155Abi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateIerc1155SetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc1155Abi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc1155Abi}__
 */
export const useWatchIerc1155Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ierc1155Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc1155Abi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchIerc1155ApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc1155Abi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc1155Abi}__ and `eventName` set to `"TransferBatch"`
 */
export const useWatchIerc1155TransferBatchEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc1155Abi,
    eventName: 'TransferBatch',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc1155Abi}__ and `eventName` set to `"TransferSingle"`
 */
export const useWatchIerc1155TransferSingleEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc1155Abi,
    eventName: 'TransferSingle',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc1155Abi}__ and `eventName` set to `"URI"`
 */
export const useWatchIerc1155UriEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc1155Abi,
    eventName: 'URI',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__
 */
export const useReadIerc1155MetadataUri = /*#__PURE__*/ createUseReadContract({
  abi: ierc1155MetadataUriAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIerc1155MetadataUriBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc1155MetadataUriAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"balanceOfBatch"`
 */
export const useReadIerc1155MetadataUriBalanceOfBatch =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc1155MetadataUriAbi,
    functionName: 'balanceOfBatch',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadIerc1155MetadataUriIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc1155MetadataUriAbi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadIerc1155MetadataUriSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc1155MetadataUriAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"uri"`
 */
export const useReadIerc1155MetadataUriUri =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc1155MetadataUriAbi,
    functionName: 'uri',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__
 */
export const useWriteIerc1155MetadataUri = /*#__PURE__*/ createUseWriteContract(
  { abi: ierc1155MetadataUriAbi },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const useWriteIerc1155MetadataUriSafeBatchTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc1155MetadataUriAbi,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteIerc1155MetadataUriSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc1155MetadataUriAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteIerc1155MetadataUriSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc1155MetadataUriAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__
 */
export const useSimulateIerc1155MetadataUri =
  /*#__PURE__*/ createUseSimulateContract({ abi: ierc1155MetadataUriAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const useSimulateIerc1155MetadataUriSafeBatchTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc1155MetadataUriAbi,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateIerc1155MetadataUriSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc1155MetadataUriAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateIerc1155MetadataUriSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc1155MetadataUriAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__
 */
export const useWatchIerc1155MetadataUriEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: ierc1155MetadataUriAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchIerc1155MetadataUriApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc1155MetadataUriAbi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `eventName` set to `"TransferBatch"`
 */
export const useWatchIerc1155MetadataUriTransferBatchEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc1155MetadataUriAbi,
    eventName: 'TransferBatch',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `eventName` set to `"TransferSingle"`
 */
export const useWatchIerc1155MetadataUriTransferSingleEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc1155MetadataUriAbi,
    eventName: 'TransferSingle',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `eventName` set to `"URI"`
 */
export const useWatchIerc1155MetadataUriUriEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc1155MetadataUriAbi,
    eventName: 'URI',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1155ReceiverAbi}__
 */
export const useReadIerc1155Receiver = /*#__PURE__*/ createUseReadContract({
  abi: ierc1155ReceiverAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1155ReceiverAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadIerc1155ReceiverSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc1155ReceiverAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc1155ReceiverAbi}__
 */
export const useWriteIerc1155Receiver = /*#__PURE__*/ createUseWriteContract({
  abi: ierc1155ReceiverAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc1155ReceiverAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 */
export const useWriteIerc1155ReceiverOnErc1155BatchReceived =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc1155ReceiverAbi,
    functionName: 'onERC1155BatchReceived',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc1155ReceiverAbi}__ and `functionName` set to `"onERC1155Received"`
 */
export const useWriteIerc1155ReceiverOnErc1155Received =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc1155ReceiverAbi,
    functionName: 'onERC1155Received',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc1155ReceiverAbi}__
 */
export const useSimulateIerc1155Receiver =
  /*#__PURE__*/ createUseSimulateContract({ abi: ierc1155ReceiverAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc1155ReceiverAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 */
export const useSimulateIerc1155ReceiverOnErc1155BatchReceived =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc1155ReceiverAbi,
    functionName: 'onERC1155BatchReceived',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc1155ReceiverAbi}__ and `functionName` set to `"onERC1155Received"`
 */
export const useSimulateIerc1155ReceiverOnErc1155Received =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc1155ReceiverAbi,
    functionName: 'onERC1155Received',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1271Abi}__
 */
export const useReadIerc1271 = /*#__PURE__*/ createUseReadContract({
  abi: ierc1271Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1271Abi}__ and `functionName` set to `"isValidSignature"`
 */
export const useReadIerc1271IsValidSignature =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc1271Abi,
    functionName: 'isValidSignature',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1271WalletAbi}__
 */
export const useReadIerc1271Wallet = /*#__PURE__*/ createUseReadContract({
  abi: ierc1271WalletAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1271WalletAbi}__ and `functionName` set to `"isValidSignature"`
 */
export const useReadIerc1271WalletIsValidSignature =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc1271WalletAbi,
    functionName: 'isValidSignature',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc2981Abi}__
 */
export const useReadIerc2981 = /*#__PURE__*/ createUseReadContract({
  abi: ierc2981Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc2981Abi}__ and `functionName` set to `"royaltyInfo"`
 */
export const useReadIerc2981RoyaltyInfo = /*#__PURE__*/ createUseReadContract({
  abi: ierc2981Abi,
  functionName: 'royaltyInfo',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc2981Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadIerc2981SupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc2981Abi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafAbi}__
 */
export const useReadIlaf = /*#__PURE__*/ createUseReadContract({ abi: ilafAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIlafBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: ilafAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"charities"`
 */
export const useReadIlafCharities = /*#__PURE__*/ createUseReadContract({
  abi: ilafAbi,
  functionName: 'charities',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"charitiesCount"`
 */
export const useReadIlafCharitiesCount = /*#__PURE__*/ createUseReadContract({
  abi: ilafAbi,
  functionName: 'charitiesCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"charityFeesDistributed"`
 */
export const useReadIlafCharityFeesDistributed =
  /*#__PURE__*/ createUseReadContract({
    abi: ilafAbi,
    functionName: 'charityFeesDistributed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"config"`
 */
export const useReadIlafConfig = /*#__PURE__*/ createUseReadContract({
  abi: ilafAbi,
  functionName: 'config',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"feesDistributed"`
 */
export const useReadIlafFeesDistributed = /*#__PURE__*/ createUseReadContract({
  abi: ilafAbi,
  functionName: 'feesDistributed',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"foundCount"`
 */
export const useReadIlafFoundCount = /*#__PURE__*/ createUseReadContract({
  abi: ilafAbi,
  functionName: 'foundCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"itemImplementation"`
 */
export const useReadIlafItemImplementation =
  /*#__PURE__*/ createUseReadContract({
    abi: ilafAbi,
    functionName: 'itemImplementation',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"items"`
 */
export const useReadIlafItems = /*#__PURE__*/ createUseReadContract({
  abi: ilafAbi,
  functionName: 'items',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"itemsCount"`
 */
export const useReadIlafItemsCount = /*#__PURE__*/ createUseReadContract({
  abi: ilafAbi,
  functionName: 'itemsCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"lostCount"`
 */
export const useReadIlafLostCount = /*#__PURE__*/ createUseReadContract({
  abi: ilafAbi,
  functionName: 'lostCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"registeredCount"`
 */
export const useReadIlafRegisteredCount = /*#__PURE__*/ createUseReadContract({
  abi: ilafAbi,
  functionName: 'registeredCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"returnedCount"`
 */
export const useReadIlafReturnedCount = /*#__PURE__*/ createUseReadContract({
  abi: ilafAbi,
  functionName: 'returnedCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"rewardsDistributed"`
 */
export const useReadIlafRewardsDistributed =
  /*#__PURE__*/ createUseReadContract({
    abi: ilafAbi,
    functionName: 'rewardsDistributed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"royaltyInfo"`
 */
export const useReadIlafRoyaltyInfo = /*#__PURE__*/ createUseReadContract({
  abi: ilafAbi,
  functionName: 'royaltyInfo',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadIlafSupportsInterface = /*#__PURE__*/ createUseReadContract(
  { abi: ilafAbi, functionName: 'supportsInterface' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"treasury"`
 */
export const useReadIlafTreasury = /*#__PURE__*/ createUseReadContract({
  abi: ilafAbi,
  functionName: 'treasury',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"trust"`
 */
export const useReadIlafTrust = /*#__PURE__*/ createUseReadContract({
  abi: ilafAbi,
  functionName: 'trust',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"uri"`
 */
export const useReadIlafUri = /*#__PURE__*/ createUseReadContract({
  abi: ilafAbi,
  functionName: 'uri',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafAbi}__
 */
export const useWriteIlaf = /*#__PURE__*/ createUseWriteContract({
  abi: ilafAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"addCharity"`
 */
export const useWriteIlafAddCharity = /*#__PURE__*/ createUseWriteContract({
  abi: ilafAbi,
  functionName: 'addCharity',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"found"`
 */
export const useWriteIlafFound = /*#__PURE__*/ createUseWriteContract({
  abi: ilafAbi,
  functionName: 'found',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"lost"`
 */
export const useWriteIlafLost = /*#__PURE__*/ createUseWriteContract({
  abi: ilafAbi,
  functionName: 'lost',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteIlafMint = /*#__PURE__*/ createUseWriteContract({
  abi: ilafAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"registerItem"`
 */
export const useWriteIlafRegisterItem = /*#__PURE__*/ createUseWriteContract({
  abi: ilafAbi,
  functionName: 'registerItem',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"returned"`
 */
export const useWriteIlafReturned = /*#__PURE__*/ createUseWriteContract({
  abi: ilafAbi,
  functionName: 'returned',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"revokeLost"`
 */
export const useWriteIlafRevokeLost = /*#__PURE__*/ createUseWriteContract({
  abi: ilafAbi,
  functionName: 'revokeLost',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"setFoundCooldown"`
 */
export const useWriteIlafSetFoundCooldown =
  /*#__PURE__*/ createUseWriteContract({
    abi: ilafAbi,
    functionName: 'setFoundCooldown',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"setImmediateRewardPercentage"`
 */
export const useWriteIlafSetImmediateRewardPercentage =
  /*#__PURE__*/ createUseWriteContract({
    abi: ilafAbi,
    functionName: 'setImmediateRewardPercentage',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"setMinCharityFee"`
 */
export const useWriteIlafSetMinCharityFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: ilafAbi,
    functionName: 'setMinCharityFee',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"setMinFee"`
 */
export const useWriteIlafSetMinFee = /*#__PURE__*/ createUseWriteContract({
  abi: ilafAbi,
  functionName: 'setMinFee',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"setMinReward"`
 */
export const useWriteIlafSetMinReward = /*#__PURE__*/ createUseWriteContract({
  abi: ilafAbi,
  functionName: 'setMinReward',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"setReturnCooldown"`
 */
export const useWriteIlafSetReturnCooldown =
  /*#__PURE__*/ createUseWriteContract({
    abi: ilafAbi,
    functionName: 'setReturnCooldown',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"setRevokeLostCooldown"`
 */
export const useWriteIlafSetRevokeLostCooldown =
  /*#__PURE__*/ createUseWriteContract({
    abi: ilafAbi,
    functionName: 'setRevokeLostCooldown',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"setRewardToken"`
 */
export const useWriteIlafSetRewardToken = /*#__PURE__*/ createUseWriteContract({
  abi: ilafAbi,
  functionName: 'setRewardToken',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"setTreasury"`
 */
export const useWriteIlafSetTreasury = /*#__PURE__*/ createUseWriteContract({
  abi: ilafAbi,
  functionName: 'setTreasury',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"thumbDown"`
 */
export const useWriteIlafThumbDown = /*#__PURE__*/ createUseWriteContract({
  abi: ilafAbi,
  functionName: 'thumbDown',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"thumbUp"`
 */
export const useWriteIlafThumbUp = /*#__PURE__*/ createUseWriteContract({
  abi: ilafAbi,
  functionName: 'thumbUp',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"toggleActiveCharity"`
 */
export const useWriteIlafToggleActiveCharity =
  /*#__PURE__*/ createUseWriteContract({
    abi: ilafAbi,
    functionName: 'toggleActiveCharity',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafAbi}__
 */
export const useSimulateIlaf = /*#__PURE__*/ createUseSimulateContract({
  abi: ilafAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"addCharity"`
 */
export const useSimulateIlafAddCharity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ilafAbi,
    functionName: 'addCharity',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"found"`
 */
export const useSimulateIlafFound = /*#__PURE__*/ createUseSimulateContract({
  abi: ilafAbi,
  functionName: 'found',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"lost"`
 */
export const useSimulateIlafLost = /*#__PURE__*/ createUseSimulateContract({
  abi: ilafAbi,
  functionName: 'lost',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateIlafMint = /*#__PURE__*/ createUseSimulateContract({
  abi: ilafAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"registerItem"`
 */
export const useSimulateIlafRegisterItem =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ilafAbi,
    functionName: 'registerItem',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"returned"`
 */
export const useSimulateIlafReturned = /*#__PURE__*/ createUseSimulateContract({
  abi: ilafAbi,
  functionName: 'returned',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"revokeLost"`
 */
export const useSimulateIlafRevokeLost =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ilafAbi,
    functionName: 'revokeLost',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"setFoundCooldown"`
 */
export const useSimulateIlafSetFoundCooldown =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ilafAbi,
    functionName: 'setFoundCooldown',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"setImmediateRewardPercentage"`
 */
export const useSimulateIlafSetImmediateRewardPercentage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ilafAbi,
    functionName: 'setImmediateRewardPercentage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"setMinCharityFee"`
 */
export const useSimulateIlafSetMinCharityFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ilafAbi,
    functionName: 'setMinCharityFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"setMinFee"`
 */
export const useSimulateIlafSetMinFee = /*#__PURE__*/ createUseSimulateContract(
  { abi: ilafAbi, functionName: 'setMinFee' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"setMinReward"`
 */
export const useSimulateIlafSetMinReward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ilafAbi,
    functionName: 'setMinReward',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"setReturnCooldown"`
 */
export const useSimulateIlafSetReturnCooldown =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ilafAbi,
    functionName: 'setReturnCooldown',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"setRevokeLostCooldown"`
 */
export const useSimulateIlafSetRevokeLostCooldown =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ilafAbi,
    functionName: 'setRevokeLostCooldown',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"setRewardToken"`
 */
export const useSimulateIlafSetRewardToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ilafAbi,
    functionName: 'setRewardToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"setTreasury"`
 */
export const useSimulateIlafSetTreasury =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ilafAbi,
    functionName: 'setTreasury',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"thumbDown"`
 */
export const useSimulateIlafThumbDown = /*#__PURE__*/ createUseSimulateContract(
  { abi: ilafAbi, functionName: 'thumbDown' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"thumbUp"`
 */
export const useSimulateIlafThumbUp = /*#__PURE__*/ createUseSimulateContract({
  abi: ilafAbi,
  functionName: 'thumbUp',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"toggleActiveCharity"`
 */
export const useSimulateIlafToggleActiveCharity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ilafAbi,
    functionName: 'toggleActiveCharity',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useReadIMulticall3 = /*#__PURE__*/ createUseReadContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBasefee"`
 */
export const useReadIMulticall3GetBasefee = /*#__PURE__*/ createUseReadContract(
  { abi: iMulticall3Abi, functionName: 'getBasefee' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockHash"`
 */
export const useReadIMulticall3GetBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getBlockHash',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockNumber"`
 */
export const useReadIMulticall3GetBlockNumber =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getBlockNumber',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getChainId"`
 */
export const useReadIMulticall3GetChainId = /*#__PURE__*/ createUseReadContract(
  { abi: iMulticall3Abi, functionName: 'getChainId' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockCoinbase"`
 */
export const useReadIMulticall3GetCurrentBlockCoinbase =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockCoinbase',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockDifficulty"`
 */
export const useReadIMulticall3GetCurrentBlockDifficulty =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockDifficulty',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockGasLimit"`
 */
export const useReadIMulticall3GetCurrentBlockGasLimit =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockGasLimit',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockTimestamp"`
 */
export const useReadIMulticall3GetCurrentBlockTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getEthBalance"`
 */
export const useReadIMulticall3GetEthBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getEthBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getLastBlockHash"`
 */
export const useReadIMulticall3GetLastBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getLastBlockHash',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useWriteIMulticall3 = /*#__PURE__*/ createUseWriteContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useWriteIMulticall3Aggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useWriteIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useWriteIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useWriteIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useWriteIMulticall3TryAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'tryAggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useWriteIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useSimulateIMulticall3 = /*#__PURE__*/ createUseSimulateContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useSimulateIMulticall3Aggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useSimulateIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useSimulateIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useSimulateIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useSimulateIMulticall3TryAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useSimulateIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link initializableAbi}__
 */
export const useWatchInitializableEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: initializableAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link initializableAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchInitializableInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: initializableAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__
 */
export const useReadItem = /*#__PURE__*/ createUseReadContract({ abi: itemAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"BASIS_POINTS"`
 */
export const useReadItemBasisPoints = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'BASIS_POINTS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"DAY"`
 */
export const useReadItemDay = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'DAY',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"MAX_CHARITY_FEE_BPS"`
 */
export const useReadItemMaxCharityFeeBps = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'MAX_CHARITY_FEE_BPS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"MAX_FEE_BPS"`
 */
export const useReadItemMaxFeeBps = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'MAX_FEE_BPS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"MAX_IMMEDIATE_REWARD_BPS"`
 */
export const useReadItemMaxImmediateRewardBps =
  /*#__PURE__*/ createUseReadContract({
    abi: itemAbi,
    functionName: 'MAX_IMMEDIATE_REWARD_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"MIN_CHARITY_FEE_BPS"`
 */
export const useReadItemMinCharityFeeBps = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'MIN_CHARITY_FEE_BPS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"MIN_FEE_BPS"`
 */
export const useReadItemMinFeeBps = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'MIN_FEE_BPS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"MIN_IMMEDIATE_REWARD_BPS"`
 */
export const useReadItemMinImmediateRewardBps =
  /*#__PURE__*/ createUseReadContract({
    abi: itemAbi,
    functionName: 'MIN_IMMEDIATE_REWARD_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"MONTH"`
 */
export const useReadItemMonth = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'MONTH',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"WEEK"`
 */
export const useReadItemWeek = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'WEEK',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"comment"`
 */
export const useReadItemComment = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'comment',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"config"`
 */
export const useReadItemConfig = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'config',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"delegate"`
 */
export const useReadItemDelegate = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'delegate',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"delegateUpdatedTs"`
 */
export const useReadItemDelegateUpdatedTs = /*#__PURE__*/ createUseReadContract(
  { abi: itemAbi, functionName: 'delegateUpdatedTs' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"detailsUpdatedTs"`
 */
export const useReadItemDetailsUpdatedTs = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'detailsUpdatedTs',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"factory"`
 */
export const useReadItemFactory = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'factory',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"finder"`
 */
export const useReadItemFinder = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'finder',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"foundTs"`
 */
export const useReadItemFoundTs = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'foundTs',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"geo"`
 */
export const useReadItemGeo = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'geo',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"isFound"`
 */
export const useReadItemIsFound = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'isFound',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"isLost"`
 */
export const useReadItemIsLost = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'isLost',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"isReturned"`
 */
export const useReadItemIsReturned = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'isReturned',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"lostTs"`
 */
export const useReadItemLostTs = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'lostTs',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"owner"`
 */
export const useReadItemOwner = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"returnedTs"`
 */
export const useReadItemReturnedTs = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'returnedTs',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"reward"`
 */
export const useReadItemReward = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'reward',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"rewardToken"`
 */
export const useReadItemRewardToken = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'rewardToken',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"secretHash"`
 */
export const useReadItemSecretHash = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'secretHash',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itemAbi}__
 */
export const useWriteItem = /*#__PURE__*/ createUseWriteContract({
  abi: itemAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"found"`
 */
export const useWriteItemFound = /*#__PURE__*/ createUseWriteContract({
  abi: itemAbi,
  functionName: 'found',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteItemInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: itemAbi,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"lost"`
 */
export const useWriteItemLost = /*#__PURE__*/ createUseWriteContract({
  abi: itemAbi,
  functionName: 'lost',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"returned"`
 */
export const useWriteItemReturned = /*#__PURE__*/ createUseWriteContract({
  abi: itemAbi,
  functionName: 'returned',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"revokeLost"`
 */
export const useWriteItemRevokeLost = /*#__PURE__*/ createUseWriteContract({
  abi: itemAbi,
  functionName: 'revokeLost',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"updateDelegate"`
 */
export const useWriteItemUpdateDelegate = /*#__PURE__*/ createUseWriteContract({
  abi: itemAbi,
  functionName: 'updateDelegate',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"updateDetails"`
 */
export const useWriteItemUpdateDetails = /*#__PURE__*/ createUseWriteContract({
  abi: itemAbi,
  functionName: 'updateDetails',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itemAbi}__
 */
export const useSimulateItem = /*#__PURE__*/ createUseSimulateContract({
  abi: itemAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"found"`
 */
export const useSimulateItemFound = /*#__PURE__*/ createUseSimulateContract({
  abi: itemAbi,
  functionName: 'found',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateItemInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itemAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"lost"`
 */
export const useSimulateItemLost = /*#__PURE__*/ createUseSimulateContract({
  abi: itemAbi,
  functionName: 'lost',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"returned"`
 */
export const useSimulateItemReturned = /*#__PURE__*/ createUseSimulateContract({
  abi: itemAbi,
  functionName: 'returned',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"revokeLost"`
 */
export const useSimulateItemRevokeLost =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itemAbi,
    functionName: 'revokeLost',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"updateDelegate"`
 */
export const useSimulateItemUpdateDelegate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itemAbi,
    functionName: 'updateDelegate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"updateDetails"`
 */
export const useSimulateItemUpdateDetails =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itemAbi,
    functionName: 'updateDetails',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link itemAbi}__
 */
export const useWatchItemEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: itemAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link itemAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchItemInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: itemAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLaf = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"BASIS_POINTS"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafBasisPoints = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'BASIS_POINTS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"DAY"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafDay = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'DAY',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"INCORRECT_VALUE"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafIncorrectValue = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'INCORRECT_VALUE',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"MAX_CHARITY_FEE_BPS"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafMaxCharityFeeBps = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'MAX_CHARITY_FEE_BPS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"MAX_FEE_BPS"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafMaxFeeBps = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'MAX_FEE_BPS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"MAX_IMMEDIATE_REWARD_BPS"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafMaxImmediateRewardBps =
  /*#__PURE__*/ createUseReadContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'MAX_IMMEDIATE_REWARD_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"MIN_CHARITY_FEE_BPS"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafMinCharityFeeBps = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'MIN_CHARITY_FEE_BPS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"MIN_FEE_BPS"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafMinFeeBps = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'MIN_FEE_BPS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"MIN_IMMEDIATE_REWARD_BPS"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafMinImmediateRewardBps =
  /*#__PURE__*/ createUseReadContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'MIN_IMMEDIATE_REWARD_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"MONTH"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafMonth = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'MONTH',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"WEEK"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafWeek = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'WEEK',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"balanceOfBatch"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafBalanceOfBatch = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'balanceOfBatch',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"charities"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafCharities = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'charities',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"charitiesCount"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafCharitiesCount = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'charitiesCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"charityFeesDistributed"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafCharityFeesDistributed =
  /*#__PURE__*/ createUseReadContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'charityFeesDistributed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"config"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafConfig = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'config',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"exists"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafExists = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'exists',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"feesDistributed"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafFeesDistributed = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'feesDistributed',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"foundCount"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafFoundCount = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'foundCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafIsApprovedForAll = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"itemImplementation"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafItemImplementation = /*#__PURE__*/ createUseReadContract(
  { abi: lafAbi, address: lafAddress, functionName: 'itemImplementation' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"items"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafItems = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'items',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"itemsCount"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafItemsCount = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'itemsCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"lostCount"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafLostCount = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'lostCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafOwner = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"registeredCount"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafRegisteredCount = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'registeredCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"returnedCount"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafReturnedCount = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'returnedCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"rewardsDistributed"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafRewardsDistributed = /*#__PURE__*/ createUseReadContract(
  { abi: lafAbi, address: lafAddress, functionName: 'rewardsDistributed' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"royaltyInfo"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafRoyaltyInfo = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'royaltyInfo',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafSupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"treasury"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafTreasury = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'treasury',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"trust"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafTrust = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'trust',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"uri"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useReadLafUri = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'uri',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWriteLaf = /*#__PURE__*/ createUseWriteContract({
  abi: lafAbi,
  address: lafAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"addCharity"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWriteLafAddCharity = /*#__PURE__*/ createUseWriteContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'addCharity',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"found"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWriteLafFound = /*#__PURE__*/ createUseWriteContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'found',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"lost"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWriteLafLost = /*#__PURE__*/ createUseWriteContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'lost',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWriteLafMint = /*#__PURE__*/ createUseWriteContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"registerItem"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWriteLafRegisterItem = /*#__PURE__*/ createUseWriteContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'registerItem',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWriteLafRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"returned"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWriteLafReturned = /*#__PURE__*/ createUseWriteContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'returned',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"revokeLost"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWriteLafRevokeLost = /*#__PURE__*/ createUseWriteContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'revokeLost',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWriteLafSafeBatchTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWriteLafSafeTransferFrom = /*#__PURE__*/ createUseWriteContract(
  { abi: lafAbi, address: lafAddress, functionName: 'safeTransferFrom' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWriteLafSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setFoundCooldown"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWriteLafSetFoundCooldown = /*#__PURE__*/ createUseWriteContract(
  { abi: lafAbi, address: lafAddress, functionName: 'setFoundCooldown' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setImmediateRewardPercentage"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWriteLafSetImmediateRewardPercentage =
  /*#__PURE__*/ createUseWriteContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setImmediateRewardPercentage',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setMinCharityFee"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWriteLafSetMinCharityFee = /*#__PURE__*/ createUseWriteContract(
  { abi: lafAbi, address: lafAddress, functionName: 'setMinCharityFee' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setMinFee"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWriteLafSetMinFee = /*#__PURE__*/ createUseWriteContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'setMinFee',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setMinReward"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWriteLafSetMinReward = /*#__PURE__*/ createUseWriteContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'setMinReward',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setReturnCooldown"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWriteLafSetReturnCooldown =
  /*#__PURE__*/ createUseWriteContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setReturnCooldown',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setRevokeLostCooldown"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWriteLafSetRevokeLostCooldown =
  /*#__PURE__*/ createUseWriteContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setRevokeLostCooldown',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setRewardToken"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWriteLafSetRewardToken = /*#__PURE__*/ createUseWriteContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'setRewardToken',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setTreasury"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWriteLafSetTreasury = /*#__PURE__*/ createUseWriteContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'setTreasury',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"thumbDown"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWriteLafThumbDown = /*#__PURE__*/ createUseWriteContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'thumbDown',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"thumbUp"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWriteLafThumbUp = /*#__PURE__*/ createUseWriteContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'thumbUp',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"toggleActiveCharity"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWriteLafToggleActiveCharity =
  /*#__PURE__*/ createUseWriteContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'toggleActiveCharity',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWriteLafTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useSimulateLaf = /*#__PURE__*/ createUseSimulateContract({
  abi: lafAbi,
  address: lafAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"addCharity"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useSimulateLafAddCharity = /*#__PURE__*/ createUseSimulateContract(
  { abi: lafAbi, address: lafAddress, functionName: 'addCharity' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"found"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useSimulateLafFound = /*#__PURE__*/ createUseSimulateContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'found',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"lost"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useSimulateLafLost = /*#__PURE__*/ createUseSimulateContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'lost',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useSimulateLafMint = /*#__PURE__*/ createUseSimulateContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"registerItem"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useSimulateLafRegisterItem =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'registerItem',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useSimulateLafRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"returned"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useSimulateLafReturned = /*#__PURE__*/ createUseSimulateContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'returned',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"revokeLost"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useSimulateLafRevokeLost = /*#__PURE__*/ createUseSimulateContract(
  { abi: lafAbi, address: lafAddress, functionName: 'revokeLost' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useSimulateLafSafeBatchTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useSimulateLafSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useSimulateLafSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setFoundCooldown"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useSimulateLafSetFoundCooldown =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setFoundCooldown',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setImmediateRewardPercentage"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useSimulateLafSetImmediateRewardPercentage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setImmediateRewardPercentage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setMinCharityFee"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useSimulateLafSetMinCharityFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setMinCharityFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setMinFee"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useSimulateLafSetMinFee = /*#__PURE__*/ createUseSimulateContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'setMinFee',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setMinReward"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useSimulateLafSetMinReward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setMinReward',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setReturnCooldown"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useSimulateLafSetReturnCooldown =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setReturnCooldown',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setRevokeLostCooldown"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useSimulateLafSetRevokeLostCooldown =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setRevokeLostCooldown',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setRewardToken"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useSimulateLafSetRewardToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setRewardToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setTreasury"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useSimulateLafSetTreasury =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setTreasury',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"thumbDown"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useSimulateLafThumbDown = /*#__PURE__*/ createUseSimulateContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'thumbDown',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"thumbUp"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useSimulateLafThumbUp = /*#__PURE__*/ createUseSimulateContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'thumbUp',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"toggleActiveCharity"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useSimulateLafToggleActiveCharity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'toggleActiveCharity',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useSimulateLafTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWatchLafEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lafAbi,
  address: lafAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWatchLafApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafAbi,
    address: lafAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"CharityFeesDistributed"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWatchLafCharityFeesDistributedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafAbi,
    address: lafAddress,
    eventName: 'CharityFeesDistributed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"Down"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWatchLafDownEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lafAbi,
  address: lafAddress,
  eventName: 'Down',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"FeesDistributed"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWatchLafFeesDistributedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafAbi,
    address: lafAddress,
    eventName: 'FeesDistributed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"ItemFound"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWatchLafItemFoundEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafAbi,
    address: lafAddress,
    eventName: 'ItemFound',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"ItemLost"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWatchLafItemLostEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafAbi,
    address: lafAddress,
    eventName: 'ItemLost',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"ItemRegistered"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWatchLafItemRegisteredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafAbi,
    address: lafAddress,
    eventName: 'ItemRegistered',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"ItemReturned"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWatchLafItemReturnedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafAbi,
    address: lafAddress,
    eventName: 'ItemReturned',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"ItemRevokedLost"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWatchLafItemRevokedLostEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafAbi,
    address: lafAddress,
    eventName: 'ItemRevokedLost',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"Minted"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWatchLafMintedEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: lafAbi, address: lafAddress, eventName: 'Minted' },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWatchLafOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafAbi,
    address: lafAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"RewardsDistributed"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWatchLafRewardsDistributedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafAbi,
    address: lafAddress,
    eventName: 'RewardsDistributed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"TransferBatch"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWatchLafTransferBatchEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafAbi,
    address: lafAddress,
    eventName: 'TransferBatch',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"TransferSingle"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWatchLafTransferSingleEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafAbi,
    address: lafAddress,
    eventName: 'TransferSingle',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"URI"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWatchLafUriEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lafAbi,
  address: lafAddress,
  eventName: 'URI',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"Up"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x96610280410e19877c72efeb53e8fd45623c2b81)
 */
export const useWatchLafUpEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lafAbi,
  address: lafAddress,
  eventName: 'Up',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link metaAbi}__
 */
export const useReadMeta = /*#__PURE__*/ createUseReadContract({ abi: metaAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link metaAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadMetaBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: metaAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link metaAbi}__ and `functionName` set to `"balanceOfBatch"`
 */
export const useReadMetaBalanceOfBatch = /*#__PURE__*/ createUseReadContract({
  abi: metaAbi,
  functionName: 'balanceOfBatch',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link metaAbi}__ and `functionName` set to `"exists"`
 */
export const useReadMetaExists = /*#__PURE__*/ createUseReadContract({
  abi: metaAbi,
  functionName: 'exists',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link metaAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadMetaIsApprovedForAll = /*#__PURE__*/ createUseReadContract({
  abi: metaAbi,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link metaAbi}__ and `functionName` set to `"royaltyInfo"`
 */
export const useReadMetaRoyaltyInfo = /*#__PURE__*/ createUseReadContract({
  abi: metaAbi,
  functionName: 'royaltyInfo',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link metaAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadMetaSupportsInterface = /*#__PURE__*/ createUseReadContract(
  { abi: metaAbi, functionName: 'supportsInterface' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link metaAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadMetaTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: metaAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link metaAbi}__ and `functionName` set to `"trust"`
 */
export const useReadMetaTrust = /*#__PURE__*/ createUseReadContract({
  abi: metaAbi,
  functionName: 'trust',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link metaAbi}__ and `functionName` set to `"uri"`
 */
export const useReadMetaUri = /*#__PURE__*/ createUseReadContract({
  abi: metaAbi,
  functionName: 'uri',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link metaAbi}__
 */
export const useWriteMeta = /*#__PURE__*/ createUseWriteContract({
  abi: metaAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link metaAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const useWriteMetaSafeBatchTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: metaAbi,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link metaAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteMetaSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: metaAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link metaAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteMetaSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: metaAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link metaAbi}__ and `functionName` set to `"thumbDown"`
 */
export const useWriteMetaThumbDown = /*#__PURE__*/ createUseWriteContract({
  abi: metaAbi,
  functionName: 'thumbDown',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link metaAbi}__ and `functionName` set to `"thumbUp"`
 */
export const useWriteMetaThumbUp = /*#__PURE__*/ createUseWriteContract({
  abi: metaAbi,
  functionName: 'thumbUp',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link metaAbi}__
 */
export const useSimulateMeta = /*#__PURE__*/ createUseSimulateContract({
  abi: metaAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link metaAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const useSimulateMetaSafeBatchTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: metaAbi,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link metaAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateMetaSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: metaAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link metaAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateMetaSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: metaAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link metaAbi}__ and `functionName` set to `"thumbDown"`
 */
export const useSimulateMetaThumbDown = /*#__PURE__*/ createUseSimulateContract(
  { abi: metaAbi, functionName: 'thumbDown' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link metaAbi}__ and `functionName` set to `"thumbUp"`
 */
export const useSimulateMetaThumbUp = /*#__PURE__*/ createUseSimulateContract({
  abi: metaAbi,
  functionName: 'thumbUp',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link metaAbi}__
 */
export const useWatchMetaEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: metaAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link metaAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchMetaApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: metaAbi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link metaAbi}__ and `eventName` set to `"Down"`
 */
export const useWatchMetaDownEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: metaAbi,
  eventName: 'Down',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link metaAbi}__ and `eventName` set to `"TransferBatch"`
 */
export const useWatchMetaTransferBatchEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: metaAbi,
    eventName: 'TransferBatch',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link metaAbi}__ and `eventName` set to `"TransferSingle"`
 */
export const useWatchMetaTransferSingleEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: metaAbi,
    eventName: 'TransferSingle',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link metaAbi}__ and `eventName` set to `"URI"`
 */
export const useWatchMetaUriEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: metaAbi,
  eventName: 'URI',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link metaAbi}__ and `eventName` set to `"Up"`
 */
export const useWatchMetaUpEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: metaAbi,
  eventName: 'Up',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const useReadOwnable = /*#__PURE__*/ createUseReadContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"owner"`
 */
export const useReadOwnableOwner = /*#__PURE__*/ createUseReadContract({
  abi: ownableAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const useWriteOwnable = /*#__PURE__*/ createUseWriteContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteOwnableRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ownableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteOwnableTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ownableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const useSimulateOwnable = /*#__PURE__*/ createUseSimulateContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateOwnableRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ownableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateOwnableTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ownableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ownableAbi}__
 */
export const useWatchOwnableEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ownableAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchOwnableOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ownableAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link universalSigValidatorAbi}__
 */
export const useWriteUniversalSigValidator =
  /*#__PURE__*/ createUseWriteContract({ abi: universalSigValidatorAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link universalSigValidatorAbi}__ and `functionName` set to `"isValidSig"`
 */
export const useWriteUniversalSigValidatorIsValidSig =
  /*#__PURE__*/ createUseWriteContract({
    abi: universalSigValidatorAbi,
    functionName: 'isValidSig',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link universalSigValidatorAbi}__ and `functionName` set to `"isValidSigImpl"`
 */
export const useWriteUniversalSigValidatorIsValidSigImpl =
  /*#__PURE__*/ createUseWriteContract({
    abi: universalSigValidatorAbi,
    functionName: 'isValidSigImpl',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link universalSigValidatorAbi}__ and `functionName` set to `"isValidSigWithSideEffects"`
 */
export const useWriteUniversalSigValidatorIsValidSigWithSideEffects =
  /*#__PURE__*/ createUseWriteContract({
    abi: universalSigValidatorAbi,
    functionName: 'isValidSigWithSideEffects',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link universalSigValidatorAbi}__
 */
export const useSimulateUniversalSigValidator =
  /*#__PURE__*/ createUseSimulateContract({ abi: universalSigValidatorAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link universalSigValidatorAbi}__ and `functionName` set to `"isValidSig"`
 */
export const useSimulateUniversalSigValidatorIsValidSig =
  /*#__PURE__*/ createUseSimulateContract({
    abi: universalSigValidatorAbi,
    functionName: 'isValidSig',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link universalSigValidatorAbi}__ and `functionName` set to `"isValidSigImpl"`
 */
export const useSimulateUniversalSigValidatorIsValidSigImpl =
  /*#__PURE__*/ createUseSimulateContract({
    abi: universalSigValidatorAbi,
    functionName: 'isValidSigImpl',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link universalSigValidatorAbi}__ and `functionName` set to `"isValidSigWithSideEffects"`
 */
export const useSimulateUniversalSigValidatorIsValidSigWithSideEffects =
  /*#__PURE__*/ createUseSimulateContract({
    abi: universalSigValidatorAbi,
    functionName: 'isValidSigWithSideEffects',
  })
