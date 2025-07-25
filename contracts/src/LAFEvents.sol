// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./LAFItem.sol";


library LAFEvents {

     event ItemRegistered(
        address indexed item,
        address secretHash,
        address indexed owner
    );
    event ItemLost(
        address indexed item,
        address secretHash,
        address indexed owner,
        uint256 indexed rewardAmount,
        string geo
    );
    event ItemRevokedLost(
        address indexed item,
        address secretHash,
        address indexed owner
    );
    event ItemFound(
        address indexed item,
        address secretHash,
        address indexed owner,
        address indexed finder
    );
    event ItemReturned(
        address indexed item,
        address secretHash,
        address indexed owner,
        address indexed finder
    );
    event ItemNonReturn(
        address indexed item,
        address secretHash,
        address indexed initiator,
        LAFItem.Status status
    );
    event ItemSupported(
        address indexed item,
        address secretHash,
        address indexed supporter,
        uint256 amount
    );

    event RewardsDistributed(
        address indexed item,
        address secretHash,
        address indexed owner,
        address indexed finder,
        uint256 rewardAmount
    );
    event SupportRewardsDistributed(
        address indexed item,
        address secretHash,
        address indexed owner,
        uint256 supportAmount
    );
    event CharityFeesDistributed(
        address indexed item,
        address secretHash,
        address indexed owner,
        address indexed charity,
        uint256 charityFeeAmount
    );
    event FeesDistributed(
        address indexed item,
        address secretHash,
        address indexed owner,
        address indexed treasury,
        uint256 feeAmount
    );
    event DelegateFeesDistributed(
        address indexed item,
        address secretHash,
        address indexed owner,
        address indexed delegate,
        uint256 delegateFeeAmount
    );

    event Minted(address indexed owner);
    event Pong(address indexed wallet);
   
}