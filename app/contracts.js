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
    name: 'MAX_DELEGATE_FEE_BPS',
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
    name: 'MAX_NON_RETURN_REWARD_BPS',
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
    name: 'MIN_DELEGATE_FEE_BPS',
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
    name: 'MIN_NON_RETURN_REWARD_BPS',
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
    name: 'YEAR',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'config',
    outputs: [
      { name: 'rewardToken', internalType: 'address', type: 'address' },
      { name: 'rewardTokenDecimals', internalType: 'uint8', type: 'uint8' },
      { name: 'minReward', internalType: 'uint256', type: 'uint256' },
      { name: 'minCharityFeeBps', internalType: 'uint256', type: 'uint256' },
      { name: 'minFeeBps', internalType: 'uint256', type: 'uint256' },
      { name: 'immediateRewardBps', internalType: 'uint256', type: 'uint256' },
      { name: 'nonReturnRewardBps', internalType: 'uint256', type: 'uint256' },
      { name: 'foundCooldown', internalType: 'uint256', type: 'uint256' },
      { name: 'returnCooldown', internalType: 'uint256', type: 'uint256' },
      { name: 'revokeLostCooldown', internalType: 'uint256', type: 'uint256' },
      { name: 'nonReturnCooldown', internalType: 'uint256', type: 'uint256' },
      {
        name: 'nonReturnGracePeriod',
        internalType: 'uint256',
        type: 'uint256',
      },
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
    name: 'MAX_CHARITY_FEE_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_DELEGATE_FEE_BPS',
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
    name: 'MAX_NON_RETURN_REWARD_BPS',
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
    name: 'MIN_DELEGATE_FEE_BPS',
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
    name: 'MIN_NON_RETURN_REWARD_BPS',
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
    name: 'YEAR',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'config',
    outputs: [
      { name: 'rewardToken', internalType: 'address', type: 'address' },
      { name: 'rewardTokenDecimals', internalType: 'uint8', type: 'uint8' },
      { name: 'minReward', internalType: 'uint256', type: 'uint256' },
      { name: 'minCharityFeeBps', internalType: 'uint256', type: 'uint256' },
      { name: 'minFeeBps', internalType: 'uint256', type: 'uint256' },
      { name: 'immediateRewardBps', internalType: 'uint256', type: 'uint256' },
      { name: 'nonReturnRewardBps', internalType: 'uint256', type: 'uint256' },
      { name: 'foundCooldown', internalType: 'uint256', type: 'uint256' },
      { name: 'returnCooldown', internalType: 'uint256', type: 'uint256' },
      { name: 'revokeLostCooldown', internalType: 'uint256', type: 'uint256' },
      { name: 'nonReturnCooldown', internalType: 'uint256', type: 'uint256' },
      {
        name: 'nonReturnGracePeriod',
        internalType: 'uint256',
        type: 'uint256',
      },
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
    name: 'setImmediateRewardBps',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setMinCharityFeeBps',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setMinFeeBps',
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
    name: 'setNonReturnCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setNonReturnGracePeriod',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setNonReturnRewardBps',
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
  { type: 'error', inputs: [], name: 'IncorrectValue' },
  {
    type: 'error',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'min', internalType: 'uint256', type: 'uint256' },
      { name: 'max', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidRange',
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
// IERC1363
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1363Abi = [
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
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approveAndCall',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'approveAndCall',
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
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferAndCall',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'transferAndCall',
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
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'transferFromAndCall',
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
    name: 'transferFromAndCall',
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
// IERC20Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20MetadataAbi = [
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
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
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
          { name: 'rewardTokenDecimals', internalType: 'uint8', type: 'uint8' },
          { name: 'minReward', internalType: 'uint256', type: 'uint256' },
          {
            name: 'minCharityFeeBps',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'minFeeBps', internalType: 'uint256', type: 'uint256' },
          {
            name: 'immediateRewardBps',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'nonReturnRewardBps',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'foundCooldown', internalType: 'uint256', type: 'uint256' },
          { name: 'returnCooldown', internalType: 'uint256', type: 'uint256' },
          {
            name: 'revokeLostCooldown',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'nonReturnCooldown',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'nonReturnGracePeriod',
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
    name: 'delegateFeesDistributed',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
      { name: '_signature', internalType: 'bytes', type: 'bytes' },
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
    inputs: [
      { name: '_secretHash', internalType: 'address', type: 'address' },
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
    inputs: [{ name: '_secretHash', internalType: 'address', type: 'address' }],
    name: 'nonReturn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'nonReturnCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ping',
    outputs: [],
    stateMutability: 'nonpayable',
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
    inputs: [{ name: '_treasury', internalType: 'address', type: 'address' }],
    name: 'setTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_secretHash', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'support',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'supportRewards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'supportRewardsCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'supportRewardsDistributed',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
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
    inputs: [
      { name: '_rewardToken', internalType: 'address', type: 'address' },
    ],
    name: 'updateRewardToken',
    outputs: [],
    stateMutability: 'nonpayable',
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ILAFItem
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ilafItemAbi = [
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
    name: 'cycle',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
    name: 'delegateFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
    inputs: [],
    name: 'geo',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'immediateRewardPaid',
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
    inputs: [],
    name: 'reward',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
    inputs: [],
    name: 'status',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'statusUpdatedTs',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'supportReward',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_delegate', internalType: 'address', type: 'address' },
      { name: '_delegateFee', internalType: 'uint256', type: 'uint256' },
    ],
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
    type: 'function',
    inputs: [
      { name: '_rewardAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'updateReward',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
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
    name: 'MAX_DELEGATE_FEE_BPS',
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
    name: 'MAX_NON_RETURN_REWARD_BPS',
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
    name: 'MIN_DELEGATE_FEE_BPS',
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
    name: 'MIN_NON_RETURN_REWARD_BPS',
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
    name: 'YEAR',
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
      { name: 'minCharityFeeBps', internalType: 'uint256', type: 'uint256' },
      { name: 'minFeeBps', internalType: 'uint256', type: 'uint256' },
      { name: 'immediateRewardBps', internalType: 'uint256', type: 'uint256' },
      { name: 'nonReturnRewardBps', internalType: 'uint256', type: 'uint256' },
      { name: 'foundCooldown', internalType: 'uint256', type: 'uint256' },
      { name: 'returnCooldown', internalType: 'uint256', type: 'uint256' },
      { name: 'revokeLostCooldown', internalType: 'uint256', type: 'uint256' },
      { name: 'nonReturnCooldown', internalType: 'uint256', type: 'uint256' },
      {
        name: 'nonReturnGracePeriod',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'cycle',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
    name: 'delegateFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
            name: 'minCharityFeeBps',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'minFeeBps', internalType: 'uint256', type: 'uint256' },
          {
            name: 'immediateRewardBps',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'nonReturnRewardBps',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'foundCooldown', internalType: 'uint256', type: 'uint256' },
          { name: 'returnCooldown', internalType: 'uint256', type: 'uint256' },
          {
            name: 'revokeLostCooldown',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'nonReturnCooldown',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'nonReturnGracePeriod',
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
    inputs: [{ name: 'initiator', internalType: 'address', type: 'address' }],
    name: 'nonReturn',
    outputs: [
      { name: 'resultStatus', internalType: 'enum Item.Status', type: 'uint8' },
    ],
    stateMutability: 'nonpayable',
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
      { name: 'delegateFeeAmount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
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
    name: 'secretHash',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'status',
    outputs: [{ name: '', internalType: 'enum Item.Status', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'statusUpdatedTs',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_delegate', internalType: 'address', type: 'address' },
      { name: '_delegateFee', internalType: 'uint256', type: 'uint256' },
    ],
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
    type: 'function',
    inputs: [
      { name: '_rewardAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'updateReward',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldDelegate',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newDelegate',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DelegateUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'comment',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      { name: 'geo', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'DetailsUpdated',
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
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldReward',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newReward',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RewardUpdated',
  },
  {
    type: 'error',
    inputs: [
      { name: 'timeRemaining', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'CooldownNotMet',
  },
  { type: 'error', inputs: [], name: 'EmptyValue' },
  {
    type: 'error',
    inputs: [
      { name: 'fee', internalType: 'uint256', type: 'uint256' },
      { name: 'min', internalType: 'uint256', type: 'uint256' },
      { name: 'max', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidCharityFee',
  },
  {
    type: 'error',
    inputs: [
      { name: 'fee', internalType: 'uint256', type: 'uint256' },
      { name: 'min', internalType: 'uint256', type: 'uint256' },
      { name: 'max', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidDelegateFee',
  },
  {
    type: 'error',
    inputs: [
      { name: 'fee', internalType: 'uint256', type: 'uint256' },
      { name: 'min', internalType: 'uint256', type: 'uint256' },
      { name: 'max', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidFee',
  },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'InvalidSender' },
  { type: 'error', inputs: [], name: 'InvalidStatus' },
  { type: 'error', inputs: [], name: 'InvalidValue' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  { type: 'error', inputs: [], name: 'OnlyFactory' },
  { type: 'error', inputs: [], name: 'OnlyOwner' },
  {
    type: 'error',
    inputs: [
      { name: 'provided', internalType: 'uint256', type: 'uint256' },
      { name: 'minimum', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'RewardTooLow',
  },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LAF
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const lafAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_rewardToken', internalType: 'address', type: 'address' },
      {
        name: '_charity',
        internalType: 'struct LAF.Charity',
        type: 'tuple',
        components: [
          { name: 'active', internalType: 'bool', type: 'bool' },
          { name: 'contractAddress', internalType: 'address', type: 'address' },
          { name: 'donated', internalType: 'uint256', type: 'uint256' },
          { name: 'title', internalType: 'string', type: 'string' },
          { name: 'url', internalType: 'string', type: 'string' },
        ],
      },
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
    name: 'MAX_CHARITY_FEE_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_DELEGATE_FEE_BPS',
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
    name: 'MAX_NON_RETURN_REWARD_BPS',
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
    name: 'MIN_DELEGATE_FEE_BPS',
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
    name: 'MIN_NON_RETURN_REWARD_BPS',
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
    name: 'YEAR',
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
    inputs: [
      { name: 'charityIndex', internalType: 'uint256', type: 'uint256' },
    ],
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
      { name: 'rewardTokenDecimals', internalType: 'uint8', type: 'uint8' },
      { name: 'minReward', internalType: 'uint256', type: 'uint256' },
      { name: 'minCharityFeeBps', internalType: 'uint256', type: 'uint256' },
      { name: 'minFeeBps', internalType: 'uint256', type: 'uint256' },
      { name: 'immediateRewardBps', internalType: 'uint256', type: 'uint256' },
      { name: 'nonReturnRewardBps', internalType: 'uint256', type: 'uint256' },
      { name: 'foundCooldown', internalType: 'uint256', type: 'uint256' },
      { name: 'returnCooldown', internalType: 'uint256', type: 'uint256' },
      { name: 'revokeLostCooldown', internalType: 'uint256', type: 'uint256' },
      { name: 'nonReturnCooldown', internalType: 'uint256', type: 'uint256' },
      {
        name: 'nonReturnGracePeriod',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'delegateFeesDistributed',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
      { name: '_signature', internalType: 'bytes', type: 'bytes' },
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
    outputs: [{ name: '', internalType: 'contract LAFItem', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'secretHash', internalType: 'address', type: 'address' }],
    name: 'items',
    outputs: [
      { name: 'contractAddress', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_secretHash', internalType: 'address', type: 'address' },
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
    inputs: [{ name: '_secretHash', internalType: 'address', type: 'address' }],
    name: 'nonReturn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'nonReturnCount',
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
    inputs: [],
    name: 'ping',
    outputs: [],
    stateMutability: 'nonpayable',
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
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setFoundCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setImmediateRewardBps',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setMinCharityFeeBps',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setMinFeeBps',
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
    name: 'setNonReturnCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setNonReturnGracePeriod',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setNonReturnRewardBps',
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
    inputs: [{ name: '_treasury', internalType: 'address', type: 'address' }],
    name: 'setTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_secretHash', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'support',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'supportRewards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'supportRewardsCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'supportRewardsDistributed',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
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
    inputs: [
      { name: '_rewardToken', internalType: 'address', type: 'address' },
    ],
    name: 'updateRewardToken',
    outputs: [{ name: 'decimals', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'nonpayable',
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
        name: 'secretHash',
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
      { name: 'item', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'secretHash',
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
        name: 'delegate',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'delegateFeeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DelegateFeesDistributed',
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
        name: 'secretHash',
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
        name: 'secretHash',
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
        name: 'secretHash',
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
      { name: 'geo', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'ItemLost',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'item', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'secretHash',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'initiator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'status',
        internalType: 'enum LAFItem.Status',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'ItemNonReturn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'item', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'secretHash',
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
        name: 'secretHash',
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
        name: 'secretHash',
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
      { name: 'item', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'secretHash',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'supporter',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ItemSupported',
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
      {
        name: 'wallet',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Pong',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'item', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'secretHash',
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
      { name: 'item', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'secretHash',
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
        name: 'supportAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'SupportRewardsDistributed',
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
  { type: 'error', inputs: [], name: 'EmptyValue' },
  { type: 'error', inputs: [], name: 'FailedDeployment' },
  { type: 'error', inputs: [], name: 'IncorrectValue' },
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
    inputs: [
      { name: 'required', internalType: 'uint256', type: 'uint256' },
      { name: 'available', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'InvalidCharity' },
  {
    type: 'error',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'min', internalType: 'uint256', type: 'uint256' },
      { name: 'max', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidRange',
  },
  { type: 'error', inputs: [], name: 'InvalidSecret' },
  { type: 'error', inputs: [], name: 'InvalidSender' },
  { type: 'error', inputs: [], name: 'InvalidStatus' },
  { type: 'error', inputs: [], name: 'InvalidValue' },
  { type: 'error', inputs: [], name: 'ItemAlreadyExists' },
  { type: 'error', inputs: [], name: 'ItemDoesNotExist' },
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
  {
    type: 'error',
    inputs: [
      { name: 'provided', internalType: 'uint256', type: 'uint256' },
      { name: 'minimum', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'RewardTooLow',
  },
  { type: 'error', inputs: [], name: 'TransferFailed' },
  { type: 'error', inputs: [], name: 'UnauthorizedAccess' },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
]

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const lafAddress = {
  8453: '0x0000000000000000000000000000000000000000',
  84532: '0x9bc899f84588844d16Ef867053ABEcD13fd68f14',
}

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const lafConfig = { address: lafAddress, abi: lafAbi }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LAFErrors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lafErrorsAbi = [
  { type: 'error', inputs: [], name: 'CharityNotActive' },
  {
    type: 'error',
    inputs: [
      { name: 'timeRemaining', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'CooldownNotMet',
  },
  { type: 'error', inputs: [], name: 'EmptyValue' },
  { type: 'error', inputs: [], name: 'IncorrectValue' },
  {
    type: 'error',
    inputs: [
      { name: 'required', internalType: 'uint256', type: 'uint256' },
      { name: 'available', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'InsufficientTokenBalance' },
  { type: 'error', inputs: [], name: 'InvalidCharity' },
  {
    type: 'error',
    inputs: [
      { name: 'fee', internalType: 'uint256', type: 'uint256' },
      { name: 'min', internalType: 'uint256', type: 'uint256' },
      { name: 'max', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidCharityFee',
  },
  {
    type: 'error',
    inputs: [
      { name: 'fee', internalType: 'uint256', type: 'uint256' },
      { name: 'min', internalType: 'uint256', type: 'uint256' },
      { name: 'max', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidDelegateFee',
  },
  {
    type: 'error',
    inputs: [
      { name: 'fee', internalType: 'uint256', type: 'uint256' },
      { name: 'min', internalType: 'uint256', type: 'uint256' },
      { name: 'max', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidFee',
  },
  { type: 'error', inputs: [], name: 'InvalidFinderSignature' },
  { type: 'error', inputs: [], name: 'InvalidOwnerSignature' },
  {
    type: 'error',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'min', internalType: 'uint256', type: 'uint256' },
      { name: 'max', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidRange',
  },
  { type: 'error', inputs: [], name: 'InvalidSecret' },
  { type: 'error', inputs: [], name: 'InvalidSender' },
  { type: 'error', inputs: [], name: 'InvalidStatus' },
  { type: 'error', inputs: [], name: 'InvalidValue' },
  { type: 'error', inputs: [], name: 'ItemAlreadyExists' },
  { type: 'error', inputs: [], name: 'ItemDoesNotExist' },
  { type: 'error', inputs: [], name: 'NonTransferableToken' },
  { type: 'error', inputs: [], name: 'OnlyFactory' },
  { type: 'error', inputs: [], name: 'OnlyOwner' },
  { type: 'error', inputs: [], name: 'OperationFailed' },
  {
    type: 'error',
    inputs: [
      { name: 'provided', internalType: 'uint256', type: 'uint256' },
      { name: 'minimum', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'RewardTooLow',
  },
  { type: 'error', inputs: [], name: 'TransferFailed' },
  { type: 'error', inputs: [], name: 'UnauthorizedAccess' },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LAFEvents
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lafEventsAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'item', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'secretHash',
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
      { name: 'item', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'secretHash',
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
        name: 'delegate',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'delegateFeeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DelegateFeesDistributed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'item', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'secretHash',
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
        name: 'secretHash',
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
        name: 'secretHash',
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
      { name: 'geo', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'ItemLost',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'item', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'secretHash',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'initiator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'status',
        internalType: 'enum LAFItem.Status',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'ItemNonReturn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'item', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'secretHash',
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
        name: 'secretHash',
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
        name: 'secretHash',
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
      { name: 'item', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'secretHash',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'supporter',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ItemSupported',
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
        name: 'wallet',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Pong',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'item', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'secretHash',
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
      { name: 'item', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'secretHash',
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
        name: 'supportAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'SupportRewardsDistributed',
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LAFItem
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lafItemAbi = [
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
    name: 'MAX_DELEGATE_FEE_BPS',
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
    name: 'MAX_NON_RETURN_REWARD_BPS',
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
    name: 'MIN_DELEGATE_FEE_BPS',
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
    name: 'MIN_NON_RETURN_REWARD_BPS',
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
    name: 'YEAR',
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
      { name: 'rewardTokenDecimals', internalType: 'uint8', type: 'uint8' },
      { name: 'minReward', internalType: 'uint256', type: 'uint256' },
      { name: 'minCharityFeeBps', internalType: 'uint256', type: 'uint256' },
      { name: 'minFeeBps', internalType: 'uint256', type: 'uint256' },
      { name: 'immediateRewardBps', internalType: 'uint256', type: 'uint256' },
      { name: 'nonReturnRewardBps', internalType: 'uint256', type: 'uint256' },
      { name: 'foundCooldown', internalType: 'uint256', type: 'uint256' },
      { name: 'returnCooldown', internalType: 'uint256', type: 'uint256' },
      { name: 'revokeLostCooldown', internalType: 'uint256', type: 'uint256' },
      { name: 'nonReturnCooldown', internalType: 'uint256', type: 'uint256' },
      {
        name: 'nonReturnGracePeriod',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'cycle',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
    name: 'delegateFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
    name: 'geo',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'immediateRewardPaid',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
          { name: 'rewardTokenDecimals', internalType: 'uint8', type: 'uint8' },
          { name: 'minReward', internalType: 'uint256', type: 'uint256' },
          {
            name: 'minCharityFeeBps',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'minFeeBps', internalType: 'uint256', type: 'uint256' },
          {
            name: 'immediateRewardBps',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'nonReturnRewardBps',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'foundCooldown', internalType: 'uint256', type: 'uint256' },
          { name: 'returnCooldown', internalType: 'uint256', type: 'uint256' },
          {
            name: 'revokeLostCooldown',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'nonReturnCooldown',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'nonReturnGracePeriod',
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
    inputs: [{ name: 'initiator', internalType: 'address', type: 'address' }],
    name: 'nonReturn',
    outputs: [
      {
        name: 'resultStatus',
        internalType: 'enum LAFItem.Status',
        type: 'uint8',
      },
      { name: 'penaltyTarget', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
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
      { name: 'delegateFeeAmount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
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
    name: 'secretHash',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'status',
    outputs: [{ name: '', internalType: 'enum LAFItem.Status', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'statusUpdatedTs',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'supporter', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'support',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'supportReward',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_charityAddress', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferSupportRewardShare',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_delegate', internalType: 'address', type: 'address' },
      { name: '_delegateFee', internalType: 'uint256', type: 'uint256' },
    ],
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
    type: 'function',
    inputs: [
      { name: '_rewardAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'updateReward',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldDelegate',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newDelegate',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'DelegateUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'comment',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      { name: 'geo', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'DetailsUpdated',
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
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldReward',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newReward',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RewardUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdrawn',
  },
  {
    type: 'error',
    inputs: [
      { name: 'timeRemaining', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'CooldownNotMet',
  },
  { type: 'error', inputs: [], name: 'EmptyValue' },
  {
    type: 'error',
    inputs: [
      { name: 'fee', internalType: 'uint256', type: 'uint256' },
      { name: 'min', internalType: 'uint256', type: 'uint256' },
      { name: 'max', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidCharityFee',
  },
  {
    type: 'error',
    inputs: [
      { name: 'fee', internalType: 'uint256', type: 'uint256' },
      { name: 'min', internalType: 'uint256', type: 'uint256' },
      { name: 'max', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidDelegateFee',
  },
  {
    type: 'error',
    inputs: [
      { name: 'fee', internalType: 'uint256', type: 'uint256' },
      { name: 'min', internalType: 'uint256', type: 'uint256' },
      { name: 'max', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidFee',
  },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'InvalidSender' },
  { type: 'error', inputs: [], name: 'InvalidStatus' },
  { type: 'error', inputs: [], name: 'InvalidValue' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  { type: 'error', inputs: [], name: 'OnlyFactory' },
  { type: 'error', inputs: [], name: 'OnlyOwner' },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  {
    type: 'error',
    inputs: [
      { name: 'provided', internalType: 'uint256', type: 'uint256' },
      { name: 'minimum', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'RewardTooLow',
  },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
]

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
// SafeERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const safeErc20Abi = [
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'currentAllowance', internalType: 'uint256', type: 'uint256' },
      { name: 'requestedDecrease', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'SafeERC20FailedDecreaseAllowance',
  },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configAbi}__ and `functionName` set to `"MAX_DELEGATE_FEE_BPS"`
 */
export const useReadConfigMaxDelegateFeeBps =
  /*#__PURE__*/ createUseReadContract({
    abi: configAbi,
    functionName: 'MAX_DELEGATE_FEE_BPS',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configAbi}__ and `functionName` set to `"MAX_NON_RETURN_REWARD_BPS"`
 */
export const useReadConfigMaxNonReturnRewardBps =
  /*#__PURE__*/ createUseReadContract({
    abi: configAbi,
    functionName: 'MAX_NON_RETURN_REWARD_BPS',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configAbi}__ and `functionName` set to `"MIN_DELEGATE_FEE_BPS"`
 */
export const useReadConfigMinDelegateFeeBps =
  /*#__PURE__*/ createUseReadContract({
    abi: configAbi,
    functionName: 'MIN_DELEGATE_FEE_BPS',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configAbi}__ and `functionName` set to `"MIN_NON_RETURN_REWARD_BPS"`
 */
export const useReadConfigMinNonReturnRewardBps =
  /*#__PURE__*/ createUseReadContract({
    abi: configAbi,
    functionName: 'MIN_NON_RETURN_REWARD_BPS',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configAbi}__ and `functionName` set to `"YEAR"`
 */
export const useReadConfigYear = /*#__PURE__*/ createUseReadContract({
  abi: configAbi,
  functionName: 'YEAR',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"MAX_CHARITY_FEE_BPS"`
 */
export const useReadConfigOwnableMaxCharityFeeBps =
  /*#__PURE__*/ createUseReadContract({
    abi: configOwnableAbi,
    functionName: 'MAX_CHARITY_FEE_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"MAX_DELEGATE_FEE_BPS"`
 */
export const useReadConfigOwnableMaxDelegateFeeBps =
  /*#__PURE__*/ createUseReadContract({
    abi: configOwnableAbi,
    functionName: 'MAX_DELEGATE_FEE_BPS',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"MAX_NON_RETURN_REWARD_BPS"`
 */
export const useReadConfigOwnableMaxNonReturnRewardBps =
  /*#__PURE__*/ createUseReadContract({
    abi: configOwnableAbi,
    functionName: 'MAX_NON_RETURN_REWARD_BPS',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"MIN_DELEGATE_FEE_BPS"`
 */
export const useReadConfigOwnableMinDelegateFeeBps =
  /*#__PURE__*/ createUseReadContract({
    abi: configOwnableAbi,
    functionName: 'MIN_DELEGATE_FEE_BPS',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"MIN_NON_RETURN_REWARD_BPS"`
 */
export const useReadConfigOwnableMinNonReturnRewardBps =
  /*#__PURE__*/ createUseReadContract({
    abi: configOwnableAbi,
    functionName: 'MIN_NON_RETURN_REWARD_BPS',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"YEAR"`
 */
export const useReadConfigOwnableYear = /*#__PURE__*/ createUseReadContract({
  abi: configOwnableAbi,
  functionName: 'YEAR',
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setImmediateRewardBps"`
 */
export const useWriteConfigOwnableSetImmediateRewardBps =
  /*#__PURE__*/ createUseWriteContract({
    abi: configOwnableAbi,
    functionName: 'setImmediateRewardBps',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setMinCharityFeeBps"`
 */
export const useWriteConfigOwnableSetMinCharityFeeBps =
  /*#__PURE__*/ createUseWriteContract({
    abi: configOwnableAbi,
    functionName: 'setMinCharityFeeBps',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setMinFeeBps"`
 */
export const useWriteConfigOwnableSetMinFeeBps =
  /*#__PURE__*/ createUseWriteContract({
    abi: configOwnableAbi,
    functionName: 'setMinFeeBps',
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setNonReturnCooldown"`
 */
export const useWriteConfigOwnableSetNonReturnCooldown =
  /*#__PURE__*/ createUseWriteContract({
    abi: configOwnableAbi,
    functionName: 'setNonReturnCooldown',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setNonReturnGracePeriod"`
 */
export const useWriteConfigOwnableSetNonReturnGracePeriod =
  /*#__PURE__*/ createUseWriteContract({
    abi: configOwnableAbi,
    functionName: 'setNonReturnGracePeriod',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setNonReturnRewardBps"`
 */
export const useWriteConfigOwnableSetNonReturnRewardBps =
  /*#__PURE__*/ createUseWriteContract({
    abi: configOwnableAbi,
    functionName: 'setNonReturnRewardBps',
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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setImmediateRewardBps"`
 */
export const useSimulateConfigOwnableSetImmediateRewardBps =
  /*#__PURE__*/ createUseSimulateContract({
    abi: configOwnableAbi,
    functionName: 'setImmediateRewardBps',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setMinCharityFeeBps"`
 */
export const useSimulateConfigOwnableSetMinCharityFeeBps =
  /*#__PURE__*/ createUseSimulateContract({
    abi: configOwnableAbi,
    functionName: 'setMinCharityFeeBps',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setMinFeeBps"`
 */
export const useSimulateConfigOwnableSetMinFeeBps =
  /*#__PURE__*/ createUseSimulateContract({
    abi: configOwnableAbi,
    functionName: 'setMinFeeBps',
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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setNonReturnCooldown"`
 */
export const useSimulateConfigOwnableSetNonReturnCooldown =
  /*#__PURE__*/ createUseSimulateContract({
    abi: configOwnableAbi,
    functionName: 'setNonReturnCooldown',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setNonReturnGracePeriod"`
 */
export const useSimulateConfigOwnableSetNonReturnGracePeriod =
  /*#__PURE__*/ createUseSimulateContract({
    abi: configOwnableAbi,
    functionName: 'setNonReturnGracePeriod',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link configOwnableAbi}__ and `functionName` set to `"setNonReturnRewardBps"`
 */
export const useSimulateConfigOwnableSetNonReturnRewardBps =
  /*#__PURE__*/ createUseSimulateContract({
    abi: configOwnableAbi,
    functionName: 'setNonReturnRewardBps',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1363Abi}__
 */
export const useReadIerc1363 = /*#__PURE__*/ createUseReadContract({
  abi: ierc1363Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadIerc1363Allowance = /*#__PURE__*/ createUseReadContract({
  abi: ierc1363Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIerc1363BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: ierc1363Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadIerc1363SupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc1363Abi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadIerc1363TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: ierc1363Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc1363Abi}__
 */
export const useWriteIerc1363 = /*#__PURE__*/ createUseWriteContract({
  abi: ierc1363Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteIerc1363Approve = /*#__PURE__*/ createUseWriteContract({
  abi: ierc1363Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"approveAndCall"`
 */
export const useWriteIerc1363ApproveAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc1363Abi,
    functionName: 'approveAndCall',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteIerc1363Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: ierc1363Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"transferAndCall"`
 */
export const useWriteIerc1363TransferAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc1363Abi,
    functionName: 'transferAndCall',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIerc1363TransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc1363Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"transferFromAndCall"`
 */
export const useWriteIerc1363TransferFromAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc1363Abi,
    functionName: 'transferFromAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc1363Abi}__
 */
export const useSimulateIerc1363 = /*#__PURE__*/ createUseSimulateContract({
  abi: ierc1363Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateIerc1363Approve =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc1363Abi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"approveAndCall"`
 */
export const useSimulateIerc1363ApproveAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc1363Abi,
    functionName: 'approveAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateIerc1363Transfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc1363Abi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"transferAndCall"`
 */
export const useSimulateIerc1363TransferAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc1363Abi,
    functionName: 'transferAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIerc1363TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc1363Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc1363Abi}__ and `functionName` set to `"transferFromAndCall"`
 */
export const useSimulateIerc1363TransferFromAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc1363Abi,
    functionName: 'transferFromAndCall',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc1363Abi}__
 */
export const useWatchIerc1363Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ierc1363Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc1363Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchIerc1363ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc1363Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc1363Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchIerc1363TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc1363Abi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useReadIerc20Metadata = /*#__PURE__*/ createUseReadContract({
  abi: ierc20MetadataAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadIerc20MetadataAllowance =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc20MetadataAbi,
    functionName: 'allowance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIerc20MetadataBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc20MetadataAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadIerc20MetadataDecimals =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc20MetadataAbi,
    functionName: 'decimals',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"name"`
 */
export const useReadIerc20MetadataName = /*#__PURE__*/ createUseReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadIerc20MetadataSymbol = /*#__PURE__*/ createUseReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadIerc20MetadataTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc20MetadataAbi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useWriteIerc20Metadata = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20MetadataAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteIerc20MetadataApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc20MetadataAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteIerc20MetadataTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc20MetadataAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIerc20MetadataTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc20MetadataAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useSimulateIerc20Metadata =
  /*#__PURE__*/ createUseSimulateContract({ abi: ierc20MetadataAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateIerc20MetadataApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc20MetadataAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateIerc20MetadataTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc20MetadataAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIerc20MetadataTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc20MetadataAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const useWatchIerc20MetadataEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: ierc20MetadataAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchIerc20MetadataApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc20MetadataAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchIerc20MetadataTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc20MetadataAbi,
    eventName: 'Transfer',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"delegateFeesDistributed"`
 */
export const useReadIlafDelegateFeesDistributed =
  /*#__PURE__*/ createUseReadContract({
    abi: ilafAbi,
    functionName: 'delegateFeesDistributed',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"lostCount"`
 */
export const useReadIlafLostCount = /*#__PURE__*/ createUseReadContract({
  abi: ilafAbi,
  functionName: 'lostCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"nonReturnCount"`
 */
export const useReadIlafNonReturnCount = /*#__PURE__*/ createUseReadContract({
  abi: ilafAbi,
  functionName: 'nonReturnCount',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"supportRewards"`
 */
export const useReadIlafSupportRewards = /*#__PURE__*/ createUseReadContract({
  abi: ilafAbi,
  functionName: 'supportRewards',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"supportRewardsCount"`
 */
export const useReadIlafSupportRewardsCount =
  /*#__PURE__*/ createUseReadContract({
    abi: ilafAbi,
    functionName: 'supportRewardsCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"supportRewardsDistributed"`
 */
export const useReadIlafSupportRewardsDistributed =
  /*#__PURE__*/ createUseReadContract({
    abi: ilafAbi,
    functionName: 'supportRewardsDistributed',
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"nonReturn"`
 */
export const useWriteIlafNonReturn = /*#__PURE__*/ createUseWriteContract({
  abi: ilafAbi,
  functionName: 'nonReturn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"ping"`
 */
export const useWriteIlafPing = /*#__PURE__*/ createUseWriteContract({
  abi: ilafAbi,
  functionName: 'ping',
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"setTreasury"`
 */
export const useWriteIlafSetTreasury = /*#__PURE__*/ createUseWriteContract({
  abi: ilafAbi,
  functionName: 'setTreasury',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"support"`
 */
export const useWriteIlafSupport = /*#__PURE__*/ createUseWriteContract({
  abi: ilafAbi,
  functionName: 'support',
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"updateRewardToken"`
 */
export const useWriteIlafUpdateRewardToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: ilafAbi,
    functionName: 'updateRewardToken',
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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"nonReturn"`
 */
export const useSimulateIlafNonReturn = /*#__PURE__*/ createUseSimulateContract(
  { abi: ilafAbi, functionName: 'nonReturn' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"ping"`
 */
export const useSimulateIlafPing = /*#__PURE__*/ createUseSimulateContract({
  abi: ilafAbi,
  functionName: 'ping',
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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"setTreasury"`
 */
export const useSimulateIlafSetTreasury =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ilafAbi,
    functionName: 'setTreasury',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"support"`
 */
export const useSimulateIlafSupport = /*#__PURE__*/ createUseSimulateContract({
  abi: ilafAbi,
  functionName: 'support',
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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafAbi}__ and `functionName` set to `"updateRewardToken"`
 */
export const useSimulateIlafUpdateRewardToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ilafAbi,
    functionName: 'updateRewardToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafItemAbi}__
 */
export const useReadIlafItem = /*#__PURE__*/ createUseReadContract({
  abi: ilafItemAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafItemAbi}__ and `functionName` set to `"comment"`
 */
export const useReadIlafItemComment = /*#__PURE__*/ createUseReadContract({
  abi: ilafItemAbi,
  functionName: 'comment',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafItemAbi}__ and `functionName` set to `"cycle"`
 */
export const useReadIlafItemCycle = /*#__PURE__*/ createUseReadContract({
  abi: ilafItemAbi,
  functionName: 'cycle',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafItemAbi}__ and `functionName` set to `"delegate"`
 */
export const useReadIlafItemDelegate = /*#__PURE__*/ createUseReadContract({
  abi: ilafItemAbi,
  functionName: 'delegate',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafItemAbi}__ and `functionName` set to `"delegateFee"`
 */
export const useReadIlafItemDelegateFee = /*#__PURE__*/ createUseReadContract({
  abi: ilafItemAbi,
  functionName: 'delegateFee',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafItemAbi}__ and `functionName` set to `"delegateUpdatedTs"`
 */
export const useReadIlafItemDelegateUpdatedTs =
  /*#__PURE__*/ createUseReadContract({
    abi: ilafItemAbi,
    functionName: 'delegateUpdatedTs',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafItemAbi}__ and `functionName` set to `"detailsUpdatedTs"`
 */
export const useReadIlafItemDetailsUpdatedTs =
  /*#__PURE__*/ createUseReadContract({
    abi: ilafItemAbi,
    functionName: 'detailsUpdatedTs',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafItemAbi}__ and `functionName` set to `"factory"`
 */
export const useReadIlafItemFactory = /*#__PURE__*/ createUseReadContract({
  abi: ilafItemAbi,
  functionName: 'factory',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafItemAbi}__ and `functionName` set to `"finder"`
 */
export const useReadIlafItemFinder = /*#__PURE__*/ createUseReadContract({
  abi: ilafItemAbi,
  functionName: 'finder',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafItemAbi}__ and `functionName` set to `"geo"`
 */
export const useReadIlafItemGeo = /*#__PURE__*/ createUseReadContract({
  abi: ilafItemAbi,
  functionName: 'geo',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafItemAbi}__ and `functionName` set to `"immediateRewardPaid"`
 */
export const useReadIlafItemImmediateRewardPaid =
  /*#__PURE__*/ createUseReadContract({
    abi: ilafItemAbi,
    functionName: 'immediateRewardPaid',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafItemAbi}__ and `functionName` set to `"owner"`
 */
export const useReadIlafItemOwner = /*#__PURE__*/ createUseReadContract({
  abi: ilafItemAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafItemAbi}__ and `functionName` set to `"reward"`
 */
export const useReadIlafItemReward = /*#__PURE__*/ createUseReadContract({
  abi: ilafItemAbi,
  functionName: 'reward',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafItemAbi}__ and `functionName` set to `"secretHash"`
 */
export const useReadIlafItemSecretHash = /*#__PURE__*/ createUseReadContract({
  abi: ilafItemAbi,
  functionName: 'secretHash',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafItemAbi}__ and `functionName` set to `"status"`
 */
export const useReadIlafItemStatus = /*#__PURE__*/ createUseReadContract({
  abi: ilafItemAbi,
  functionName: 'status',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafItemAbi}__ and `functionName` set to `"statusUpdatedTs"`
 */
export const useReadIlafItemStatusUpdatedTs =
  /*#__PURE__*/ createUseReadContract({
    abi: ilafItemAbi,
    functionName: 'statusUpdatedTs',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafItemAbi}__ and `functionName` set to `"supportReward"`
 */
export const useReadIlafItemSupportReward = /*#__PURE__*/ createUseReadContract(
  { abi: ilafItemAbi, functionName: 'supportReward' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ilafItemAbi}__ and `functionName` set to `"token"`
 */
export const useReadIlafItemToken = /*#__PURE__*/ createUseReadContract({
  abi: ilafItemAbi,
  functionName: 'token',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafItemAbi}__
 */
export const useWriteIlafItem = /*#__PURE__*/ createUseWriteContract({
  abi: ilafItemAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafItemAbi}__ and `functionName` set to `"updateDelegate"`
 */
export const useWriteIlafItemUpdateDelegate =
  /*#__PURE__*/ createUseWriteContract({
    abi: ilafItemAbi,
    functionName: 'updateDelegate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafItemAbi}__ and `functionName` set to `"updateDetails"`
 */
export const useWriteIlafItemUpdateDetails =
  /*#__PURE__*/ createUseWriteContract({
    abi: ilafItemAbi,
    functionName: 'updateDetails',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafItemAbi}__ and `functionName` set to `"updateReward"`
 */
export const useWriteIlafItemUpdateReward =
  /*#__PURE__*/ createUseWriteContract({
    abi: ilafItemAbi,
    functionName: 'updateReward',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ilafItemAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteIlafItemWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: ilafItemAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafItemAbi}__
 */
export const useSimulateIlafItem = /*#__PURE__*/ createUseSimulateContract({
  abi: ilafItemAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafItemAbi}__ and `functionName` set to `"updateDelegate"`
 */
export const useSimulateIlafItemUpdateDelegate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ilafItemAbi,
    functionName: 'updateDelegate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafItemAbi}__ and `functionName` set to `"updateDetails"`
 */
export const useSimulateIlafItemUpdateDetails =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ilafItemAbi,
    functionName: 'updateDetails',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafItemAbi}__ and `functionName` set to `"updateReward"`
 */
export const useSimulateIlafItemUpdateReward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ilafItemAbi,
    functionName: 'updateReward',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ilafItemAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateIlafItemWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ilafItemAbi,
    functionName: 'withdraw',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"MAX_DELEGATE_FEE_BPS"`
 */
export const useReadItemMaxDelegateFeeBps = /*#__PURE__*/ createUseReadContract(
  { abi: itemAbi, functionName: 'MAX_DELEGATE_FEE_BPS' },
)

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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"MAX_NON_RETURN_REWARD_BPS"`
 */
export const useReadItemMaxNonReturnRewardBps =
  /*#__PURE__*/ createUseReadContract({
    abi: itemAbi,
    functionName: 'MAX_NON_RETURN_REWARD_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"MIN_CHARITY_FEE_BPS"`
 */
export const useReadItemMinCharityFeeBps = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'MIN_CHARITY_FEE_BPS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"MIN_DELEGATE_FEE_BPS"`
 */
export const useReadItemMinDelegateFeeBps = /*#__PURE__*/ createUseReadContract(
  { abi: itemAbi, functionName: 'MIN_DELEGATE_FEE_BPS' },
)

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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"MIN_NON_RETURN_REWARD_BPS"`
 */
export const useReadItemMinNonReturnRewardBps =
  /*#__PURE__*/ createUseReadContract({
    abi: itemAbi,
    functionName: 'MIN_NON_RETURN_REWARD_BPS',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"YEAR"`
 */
export const useReadItemYear = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'YEAR',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"cycle"`
 */
export const useReadItemCycle = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'cycle',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"delegate"`
 */
export const useReadItemDelegate = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'delegate',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"delegateFee"`
 */
export const useReadItemDelegateFee = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'delegateFee',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"geo"`
 */
export const useReadItemGeo = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'geo',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"owner"`
 */
export const useReadItemOwner = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"reward"`
 */
export const useReadItemReward = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'reward',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"secretHash"`
 */
export const useReadItemSecretHash = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'secretHash',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"status"`
 */
export const useReadItemStatus = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'status',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"statusUpdatedTs"`
 */
export const useReadItemStatusUpdatedTs = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'statusUpdatedTs',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"token"`
 */
export const useReadItemToken = /*#__PURE__*/ createUseReadContract({
  abi: itemAbi,
  functionName: 'token',
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"nonReturn"`
 */
export const useWriteItemNonReturn = /*#__PURE__*/ createUseWriteContract({
  abi: itemAbi,
  functionName: 'nonReturn',
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"updateReward"`
 */
export const useWriteItemUpdateReward = /*#__PURE__*/ createUseWriteContract({
  abi: itemAbi,
  functionName: 'updateReward',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteItemWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: itemAbi,
  functionName: 'withdraw',
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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"nonReturn"`
 */
export const useSimulateItemNonReturn = /*#__PURE__*/ createUseSimulateContract(
  { abi: itemAbi, functionName: 'nonReturn' },
)

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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"updateReward"`
 */
export const useSimulateItemUpdateReward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: itemAbi,
    functionName: 'updateReward',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link itemAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateItemWithdraw = /*#__PURE__*/ createUseSimulateContract({
  abi: itemAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link itemAbi}__
 */
export const useWatchItemEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: itemAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link itemAbi}__ and `eventName` set to `"DelegateUpdated"`
 */
export const useWatchItemDelegateUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: itemAbi,
    eventName: 'DelegateUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link itemAbi}__ and `eventName` set to `"DetailsUpdated"`
 */
export const useWatchItemDetailsUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: itemAbi,
    eventName: 'DetailsUpdated',
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
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link itemAbi}__ and `eventName` set to `"RewardUpdated"`
 */
export const useWatchItemRewardUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: itemAbi,
    eventName: 'RewardUpdated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useReadLaf = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"BASIS_POINTS"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useReadLafDay = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'DAY',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"MAX_CHARITY_FEE_BPS"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useReadLafMaxCharityFeeBps = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'MAX_CHARITY_FEE_BPS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"MAX_DELEGATE_FEE_BPS"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useReadLafMaxDelegateFeeBps = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'MAX_DELEGATE_FEE_BPS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"MAX_FEE_BPS"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useReadLafMaxImmediateRewardBps =
  /*#__PURE__*/ createUseReadContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'MAX_IMMEDIATE_REWARD_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"MAX_NON_RETURN_REWARD_BPS"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useReadLafMaxNonReturnRewardBps =
  /*#__PURE__*/ createUseReadContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'MAX_NON_RETURN_REWARD_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"MIN_CHARITY_FEE_BPS"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useReadLafMinCharityFeeBps = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'MIN_CHARITY_FEE_BPS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"MIN_DELEGATE_FEE_BPS"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useReadLafMinDelegateFeeBps = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'MIN_DELEGATE_FEE_BPS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"MIN_FEE_BPS"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useReadLafMinImmediateRewardBps =
  /*#__PURE__*/ createUseReadContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'MIN_IMMEDIATE_REWARD_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"MIN_NON_RETURN_REWARD_BPS"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useReadLafMinNonReturnRewardBps =
  /*#__PURE__*/ createUseReadContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'MIN_NON_RETURN_REWARD_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"MONTH"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useReadLafWeek = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'WEEK',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"YEAR"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useReadLafYear = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'YEAR',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useReadLafConfig = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'config',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"delegateFeesDistributed"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useReadLafDelegateFeesDistributed =
  /*#__PURE__*/ createUseReadContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'delegateFeesDistributed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"exists"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useReadLafItemImplementation = /*#__PURE__*/ createUseReadContract(
  { abi: lafAbi, address: lafAddress, functionName: 'itemImplementation' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"items"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useReadLafItems = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'items',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"lostCount"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useReadLafLostCount = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'lostCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"nonReturnCount"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useReadLafNonReturnCount = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'nonReturnCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useReadLafRewardsDistributed = /*#__PURE__*/ createUseReadContract(
  { abi: lafAbi, address: lafAddress, functionName: 'rewardsDistributed' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"royaltyInfo"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useReadLafRoyaltyInfo = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'royaltyInfo',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"supportRewards"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useReadLafSupportRewards = /*#__PURE__*/ createUseReadContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'supportRewards',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"supportRewardsCount"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useReadLafSupportRewardsCount =
  /*#__PURE__*/ createUseReadContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'supportRewardsCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"supportRewardsDistributed"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useReadLafSupportRewardsDistributed =
  /*#__PURE__*/ createUseReadContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'supportRewardsDistributed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWriteLaf = /*#__PURE__*/ createUseWriteContract({
  abi: lafAbi,
  address: lafAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"addCharity"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWriteLafMint = /*#__PURE__*/ createUseWriteContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"nonReturn"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWriteLafNonReturn = /*#__PURE__*/ createUseWriteContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'nonReturn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"ping"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWriteLafPing = /*#__PURE__*/ createUseWriteContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'ping',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"registerItem"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWriteLafSafeTransferFrom = /*#__PURE__*/ createUseWriteContract(
  { abi: lafAbi, address: lafAddress, functionName: 'safeTransferFrom' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWriteLafSetFoundCooldown = /*#__PURE__*/ createUseWriteContract(
  { abi: lafAbi, address: lafAddress, functionName: 'setFoundCooldown' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setImmediateRewardBps"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWriteLafSetImmediateRewardBps =
  /*#__PURE__*/ createUseWriteContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setImmediateRewardBps',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setMinCharityFeeBps"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWriteLafSetMinCharityFeeBps =
  /*#__PURE__*/ createUseWriteContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setMinCharityFeeBps',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setMinFeeBps"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWriteLafSetMinFeeBps = /*#__PURE__*/ createUseWriteContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'setMinFeeBps',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setMinReward"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWriteLafSetMinReward = /*#__PURE__*/ createUseWriteContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'setMinReward',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setNonReturnCooldown"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWriteLafSetNonReturnCooldown =
  /*#__PURE__*/ createUseWriteContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setNonReturnCooldown',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setNonReturnGracePeriod"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWriteLafSetNonReturnGracePeriod =
  /*#__PURE__*/ createUseWriteContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setNonReturnGracePeriod',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setNonReturnRewardBps"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWriteLafSetNonReturnRewardBps =
  /*#__PURE__*/ createUseWriteContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setNonReturnRewardBps',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setReturnCooldown"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWriteLafSetRevokeLostCooldown =
  /*#__PURE__*/ createUseWriteContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setRevokeLostCooldown',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setTreasury"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWriteLafSetTreasury = /*#__PURE__*/ createUseWriteContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'setTreasury',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"support"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWriteLafSupport = /*#__PURE__*/ createUseWriteContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'support',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"thumbDown"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWriteLafTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"updateRewardToken"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWriteLafUpdateRewardToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'updateRewardToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useSimulateLaf = /*#__PURE__*/ createUseSimulateContract({
  abi: lafAbi,
  address: lafAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"addCharity"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useSimulateLafAddCharity = /*#__PURE__*/ createUseSimulateContract(
  { abi: lafAbi, address: lafAddress, functionName: 'addCharity' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"found"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useSimulateLafMint = /*#__PURE__*/ createUseSimulateContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"nonReturn"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useSimulateLafNonReturn = /*#__PURE__*/ createUseSimulateContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'nonReturn',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"ping"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useSimulateLafPing = /*#__PURE__*/ createUseSimulateContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'ping',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"registerItem"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useSimulateLafRevokeLost = /*#__PURE__*/ createUseSimulateContract(
  { abi: lafAbi, address: lafAddress, functionName: 'revokeLost' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useSimulateLafSetFoundCooldown =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setFoundCooldown',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setImmediateRewardBps"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useSimulateLafSetImmediateRewardBps =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setImmediateRewardBps',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setMinCharityFeeBps"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useSimulateLafSetMinCharityFeeBps =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setMinCharityFeeBps',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setMinFeeBps"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useSimulateLafSetMinFeeBps =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setMinFeeBps',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setMinReward"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useSimulateLafSetMinReward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setMinReward',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setNonReturnCooldown"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useSimulateLafSetNonReturnCooldown =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setNonReturnCooldown',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setNonReturnGracePeriod"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useSimulateLafSetNonReturnGracePeriod =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setNonReturnGracePeriod',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setNonReturnRewardBps"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useSimulateLafSetNonReturnRewardBps =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setNonReturnRewardBps',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setReturnCooldown"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useSimulateLafSetRevokeLostCooldown =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setRevokeLostCooldown',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"setTreasury"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useSimulateLafSetTreasury =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'setTreasury',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"support"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useSimulateLafSupport = /*#__PURE__*/ createUseSimulateContract({
  abi: lafAbi,
  address: lafAddress,
  functionName: 'support',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"thumbDown"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useSimulateLafTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafAbi}__ and `functionName` set to `"updateRewardToken"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useSimulateLafUpdateRewardToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafAbi,
    address: lafAddress,
    functionName: 'updateRewardToken',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWatchLafEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lafAbi,
  address: lafAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWatchLafCharityFeesDistributedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafAbi,
    address: lafAddress,
    eventName: 'CharityFeesDistributed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"DelegateFeesDistributed"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWatchLafDelegateFeesDistributedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafAbi,
    address: lafAddress,
    eventName: 'DelegateFeesDistributed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"Down"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWatchLafItemLostEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafAbi,
    address: lafAddress,
    eventName: 'ItemLost',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"ItemNonReturn"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWatchLafItemNonReturnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafAbi,
    address: lafAddress,
    eventName: 'ItemNonReturn',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"ItemRegistered"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWatchLafItemRevokedLostEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafAbi,
    address: lafAddress,
    eventName: 'ItemRevokedLost',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"ItemSupported"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWatchLafItemSupportedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafAbi,
    address: lafAddress,
    eventName: 'ItemSupported',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"Minted"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWatchLafMintedEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: lafAbi, address: lafAddress, eventName: 'Minted' },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWatchLafOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafAbi,
    address: lafAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"Pong"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWatchLafPongEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lafAbi,
  address: lafAddress,
  eventName: 'Pong',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"RewardsDistributed"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWatchLafRewardsDistributedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafAbi,
    address: lafAddress,
    eventName: 'RewardsDistributed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"SupportRewardsDistributed"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWatchLafSupportRewardsDistributedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafAbi,
    address: lafAddress,
    eventName: 'SupportRewardsDistributed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafAbi}__ and `eventName` set to `"TransferBatch"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
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
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x9bc899f84588844d16ef867053abecd13fd68f14)
 */
export const useWatchLafUpEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lafAbi,
  address: lafAddress,
  eventName: 'Up',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafEventsAbi}__
 */
export const useWatchLafEventsEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: lafEventsAbi },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafEventsAbi}__ and `eventName` set to `"CharityFeesDistributed"`
 */
export const useWatchLafEventsCharityFeesDistributedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafEventsAbi,
    eventName: 'CharityFeesDistributed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafEventsAbi}__ and `eventName` set to `"DelegateFeesDistributed"`
 */
export const useWatchLafEventsDelegateFeesDistributedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafEventsAbi,
    eventName: 'DelegateFeesDistributed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafEventsAbi}__ and `eventName` set to `"FeesDistributed"`
 */
export const useWatchLafEventsFeesDistributedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafEventsAbi,
    eventName: 'FeesDistributed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafEventsAbi}__ and `eventName` set to `"ItemFound"`
 */
export const useWatchLafEventsItemFoundEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafEventsAbi,
    eventName: 'ItemFound',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafEventsAbi}__ and `eventName` set to `"ItemLost"`
 */
export const useWatchLafEventsItemLostEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafEventsAbi,
    eventName: 'ItemLost',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafEventsAbi}__ and `eventName` set to `"ItemNonReturn"`
 */
export const useWatchLafEventsItemNonReturnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafEventsAbi,
    eventName: 'ItemNonReturn',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafEventsAbi}__ and `eventName` set to `"ItemRegistered"`
 */
export const useWatchLafEventsItemRegisteredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafEventsAbi,
    eventName: 'ItemRegistered',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafEventsAbi}__ and `eventName` set to `"ItemReturned"`
 */
export const useWatchLafEventsItemReturnedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafEventsAbi,
    eventName: 'ItemReturned',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafEventsAbi}__ and `eventName` set to `"ItemRevokedLost"`
 */
export const useWatchLafEventsItemRevokedLostEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafEventsAbi,
    eventName: 'ItemRevokedLost',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafEventsAbi}__ and `eventName` set to `"ItemSupported"`
 */
export const useWatchLafEventsItemSupportedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafEventsAbi,
    eventName: 'ItemSupported',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafEventsAbi}__ and `eventName` set to `"Minted"`
 */
export const useWatchLafEventsMintedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafEventsAbi,
    eventName: 'Minted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafEventsAbi}__ and `eventName` set to `"Pong"`
 */
export const useWatchLafEventsPongEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafEventsAbi,
    eventName: 'Pong',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafEventsAbi}__ and `eventName` set to `"RewardsDistributed"`
 */
export const useWatchLafEventsRewardsDistributedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafEventsAbi,
    eventName: 'RewardsDistributed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafEventsAbi}__ and `eventName` set to `"SupportRewardsDistributed"`
 */
export const useWatchLafEventsSupportRewardsDistributedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafEventsAbi,
    eventName: 'SupportRewardsDistributed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__
 */
export const useReadLafItem = /*#__PURE__*/ createUseReadContract({
  abi: lafItemAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"BASIS_POINTS"`
 */
export const useReadLafItemBasisPoints = /*#__PURE__*/ createUseReadContract({
  abi: lafItemAbi,
  functionName: 'BASIS_POINTS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"DAY"`
 */
export const useReadLafItemDay = /*#__PURE__*/ createUseReadContract({
  abi: lafItemAbi,
  functionName: 'DAY',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"MAX_CHARITY_FEE_BPS"`
 */
export const useReadLafItemMaxCharityFeeBps =
  /*#__PURE__*/ createUseReadContract({
    abi: lafItemAbi,
    functionName: 'MAX_CHARITY_FEE_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"MAX_DELEGATE_FEE_BPS"`
 */
export const useReadLafItemMaxDelegateFeeBps =
  /*#__PURE__*/ createUseReadContract({
    abi: lafItemAbi,
    functionName: 'MAX_DELEGATE_FEE_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"MAX_FEE_BPS"`
 */
export const useReadLafItemMaxFeeBps = /*#__PURE__*/ createUseReadContract({
  abi: lafItemAbi,
  functionName: 'MAX_FEE_BPS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"MAX_IMMEDIATE_REWARD_BPS"`
 */
export const useReadLafItemMaxImmediateRewardBps =
  /*#__PURE__*/ createUseReadContract({
    abi: lafItemAbi,
    functionName: 'MAX_IMMEDIATE_REWARD_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"MAX_NON_RETURN_REWARD_BPS"`
 */
export const useReadLafItemMaxNonReturnRewardBps =
  /*#__PURE__*/ createUseReadContract({
    abi: lafItemAbi,
    functionName: 'MAX_NON_RETURN_REWARD_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"MIN_CHARITY_FEE_BPS"`
 */
export const useReadLafItemMinCharityFeeBps =
  /*#__PURE__*/ createUseReadContract({
    abi: lafItemAbi,
    functionName: 'MIN_CHARITY_FEE_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"MIN_DELEGATE_FEE_BPS"`
 */
export const useReadLafItemMinDelegateFeeBps =
  /*#__PURE__*/ createUseReadContract({
    abi: lafItemAbi,
    functionName: 'MIN_DELEGATE_FEE_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"MIN_FEE_BPS"`
 */
export const useReadLafItemMinFeeBps = /*#__PURE__*/ createUseReadContract({
  abi: lafItemAbi,
  functionName: 'MIN_FEE_BPS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"MIN_IMMEDIATE_REWARD_BPS"`
 */
export const useReadLafItemMinImmediateRewardBps =
  /*#__PURE__*/ createUseReadContract({
    abi: lafItemAbi,
    functionName: 'MIN_IMMEDIATE_REWARD_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"MIN_NON_RETURN_REWARD_BPS"`
 */
export const useReadLafItemMinNonReturnRewardBps =
  /*#__PURE__*/ createUseReadContract({
    abi: lafItemAbi,
    functionName: 'MIN_NON_RETURN_REWARD_BPS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"MONTH"`
 */
export const useReadLafItemMonth = /*#__PURE__*/ createUseReadContract({
  abi: lafItemAbi,
  functionName: 'MONTH',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"WEEK"`
 */
export const useReadLafItemWeek = /*#__PURE__*/ createUseReadContract({
  abi: lafItemAbi,
  functionName: 'WEEK',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"YEAR"`
 */
export const useReadLafItemYear = /*#__PURE__*/ createUseReadContract({
  abi: lafItemAbi,
  functionName: 'YEAR',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"comment"`
 */
export const useReadLafItemComment = /*#__PURE__*/ createUseReadContract({
  abi: lafItemAbi,
  functionName: 'comment',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"config"`
 */
export const useReadLafItemConfig = /*#__PURE__*/ createUseReadContract({
  abi: lafItemAbi,
  functionName: 'config',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"cycle"`
 */
export const useReadLafItemCycle = /*#__PURE__*/ createUseReadContract({
  abi: lafItemAbi,
  functionName: 'cycle',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"delegate"`
 */
export const useReadLafItemDelegate = /*#__PURE__*/ createUseReadContract({
  abi: lafItemAbi,
  functionName: 'delegate',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"delegateFee"`
 */
export const useReadLafItemDelegateFee = /*#__PURE__*/ createUseReadContract({
  abi: lafItemAbi,
  functionName: 'delegateFee',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"delegateUpdatedTs"`
 */
export const useReadLafItemDelegateUpdatedTs =
  /*#__PURE__*/ createUseReadContract({
    abi: lafItemAbi,
    functionName: 'delegateUpdatedTs',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"detailsUpdatedTs"`
 */
export const useReadLafItemDetailsUpdatedTs =
  /*#__PURE__*/ createUseReadContract({
    abi: lafItemAbi,
    functionName: 'detailsUpdatedTs',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"factory"`
 */
export const useReadLafItemFactory = /*#__PURE__*/ createUseReadContract({
  abi: lafItemAbi,
  functionName: 'factory',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"finder"`
 */
export const useReadLafItemFinder = /*#__PURE__*/ createUseReadContract({
  abi: lafItemAbi,
  functionName: 'finder',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"geo"`
 */
export const useReadLafItemGeo = /*#__PURE__*/ createUseReadContract({
  abi: lafItemAbi,
  functionName: 'geo',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"immediateRewardPaid"`
 */
export const useReadLafItemImmediateRewardPaid =
  /*#__PURE__*/ createUseReadContract({
    abi: lafItemAbi,
    functionName: 'immediateRewardPaid',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"owner"`
 */
export const useReadLafItemOwner = /*#__PURE__*/ createUseReadContract({
  abi: lafItemAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"reward"`
 */
export const useReadLafItemReward = /*#__PURE__*/ createUseReadContract({
  abi: lafItemAbi,
  functionName: 'reward',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"secretHash"`
 */
export const useReadLafItemSecretHash = /*#__PURE__*/ createUseReadContract({
  abi: lafItemAbi,
  functionName: 'secretHash',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"status"`
 */
export const useReadLafItemStatus = /*#__PURE__*/ createUseReadContract({
  abi: lafItemAbi,
  functionName: 'status',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"statusUpdatedTs"`
 */
export const useReadLafItemStatusUpdatedTs =
  /*#__PURE__*/ createUseReadContract({
    abi: lafItemAbi,
    functionName: 'statusUpdatedTs',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"supportReward"`
 */
export const useReadLafItemSupportReward = /*#__PURE__*/ createUseReadContract({
  abi: lafItemAbi,
  functionName: 'supportReward',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"token"`
 */
export const useReadLafItemToken = /*#__PURE__*/ createUseReadContract({
  abi: lafItemAbi,
  functionName: 'token',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafItemAbi}__
 */
export const useWriteLafItem = /*#__PURE__*/ createUseWriteContract({
  abi: lafItemAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"found"`
 */
export const useWriteLafItemFound = /*#__PURE__*/ createUseWriteContract({
  abi: lafItemAbi,
  functionName: 'found',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteLafItemInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: lafItemAbi,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"lost"`
 */
export const useWriteLafItemLost = /*#__PURE__*/ createUseWriteContract({
  abi: lafItemAbi,
  functionName: 'lost',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"nonReturn"`
 */
export const useWriteLafItemNonReturn = /*#__PURE__*/ createUseWriteContract({
  abi: lafItemAbi,
  functionName: 'nonReturn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"returned"`
 */
export const useWriteLafItemReturned = /*#__PURE__*/ createUseWriteContract({
  abi: lafItemAbi,
  functionName: 'returned',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"revokeLost"`
 */
export const useWriteLafItemRevokeLost = /*#__PURE__*/ createUseWriteContract({
  abi: lafItemAbi,
  functionName: 'revokeLost',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"support"`
 */
export const useWriteLafItemSupport = /*#__PURE__*/ createUseWriteContract({
  abi: lafItemAbi,
  functionName: 'support',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"transferSupportRewardShare"`
 */
export const useWriteLafItemTransferSupportRewardShare =
  /*#__PURE__*/ createUseWriteContract({
    abi: lafItemAbi,
    functionName: 'transferSupportRewardShare',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"updateDelegate"`
 */
export const useWriteLafItemUpdateDelegate =
  /*#__PURE__*/ createUseWriteContract({
    abi: lafItemAbi,
    functionName: 'updateDelegate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"updateDetails"`
 */
export const useWriteLafItemUpdateDetails =
  /*#__PURE__*/ createUseWriteContract({
    abi: lafItemAbi,
    functionName: 'updateDetails',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"updateReward"`
 */
export const useWriteLafItemUpdateReward = /*#__PURE__*/ createUseWriteContract(
  { abi: lafItemAbi, functionName: 'updateReward' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteLafItemWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: lafItemAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafItemAbi}__
 */
export const useSimulateLafItem = /*#__PURE__*/ createUseSimulateContract({
  abi: lafItemAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"found"`
 */
export const useSimulateLafItemFound = /*#__PURE__*/ createUseSimulateContract({
  abi: lafItemAbi,
  functionName: 'found',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateLafItemInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafItemAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"lost"`
 */
export const useSimulateLafItemLost = /*#__PURE__*/ createUseSimulateContract({
  abi: lafItemAbi,
  functionName: 'lost',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"nonReturn"`
 */
export const useSimulateLafItemNonReturn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafItemAbi,
    functionName: 'nonReturn',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"returned"`
 */
export const useSimulateLafItemReturned =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafItemAbi,
    functionName: 'returned',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"revokeLost"`
 */
export const useSimulateLafItemRevokeLost =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafItemAbi,
    functionName: 'revokeLost',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"support"`
 */
export const useSimulateLafItemSupport =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafItemAbi,
    functionName: 'support',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"transferSupportRewardShare"`
 */
export const useSimulateLafItemTransferSupportRewardShare =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafItemAbi,
    functionName: 'transferSupportRewardShare',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"updateDelegate"`
 */
export const useSimulateLafItemUpdateDelegate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafItemAbi,
    functionName: 'updateDelegate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"updateDetails"`
 */
export const useSimulateLafItemUpdateDetails =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafItemAbi,
    functionName: 'updateDetails',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"updateReward"`
 */
export const useSimulateLafItemUpdateReward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafItemAbi,
    functionName: 'updateReward',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lafItemAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateLafItemWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lafItemAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafItemAbi}__
 */
export const useWatchLafItemEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lafItemAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafItemAbi}__ and `eventName` set to `"DelegateUpdated"`
 */
export const useWatchLafItemDelegateUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafItemAbi,
    eventName: 'DelegateUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafItemAbi}__ and `eventName` set to `"DetailsUpdated"`
 */
export const useWatchLafItemDetailsUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafItemAbi,
    eventName: 'DetailsUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafItemAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchLafItemInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafItemAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafItemAbi}__ and `eventName` set to `"RewardUpdated"`
 */
export const useWatchLafItemRewardUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafItemAbi,
    eventName: 'RewardUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lafItemAbi}__ and `eventName` set to `"Withdrawn"`
 */
export const useWatchLafItemWithdrawnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lafItemAbi,
    eventName: 'Withdrawn',
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
