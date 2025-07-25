// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Config {

    uint256 public constant MIN_CHARITY_FEE_BPS = 1_00;
    uint256 public constant MAX_CHARITY_FEE_BPS = 20_00;

    uint256 public constant MIN_FEE_BPS = 0;
    uint256 public constant MAX_FEE_BPS = 20_00;

    uint256 public constant MIN_DELEGATE_FEE_BPS = 0;
    uint256 public constant MAX_DELEGATE_FEE_BPS = 20_00;

    uint256 public constant MIN_IMMEDIATE_REWARD_BPS = 0;
    uint256 public constant MAX_IMMEDIATE_REWARD_BPS = 20_00;

    uint256 public constant MIN_NON_RETURN_REWARD_BPS = 0;
    uint256 public constant MAX_NON_RETURN_REWARD_BPS = 100_00;

    uint256 public constant BASIS_POINTS = 100_00;

    uint256 public constant DAY = 60 * 60 * 24;
    uint256 public constant WEEK = DAY * 7;
    uint256 public constant MONTH = DAY * 30;
    uint256 public constant YEAR = DAY * 365;
 
    struct ConfigData {

        address rewardToken;
        uint8 rewardTokenDecimals;

        uint256 minReward;

        uint256 minCharityFeeBps;
        uint256 minFeeBps;

        uint256 immediateRewardBps;
        uint256 nonReturnRewardBps;

        uint256 foundCooldown;
        uint256 returnCooldown;
        uint256 revokeLostCooldown;

        uint256 nonReturnCooldown;
        uint256 nonReturnGracePeriod;

    }

    ConfigData public config;

}