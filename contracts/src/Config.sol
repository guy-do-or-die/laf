// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;


contract Config {

    uint256 public constant MIN_CHARITY_FEE_BPS = 100;
    uint256 public constant MAX_CHARITY_FEE_BPS = 3300;

    uint256 public constant MIN_FEE_BPS = 0;
    uint256 public constant MAX_FEE_BPS = 3300;

    uint256 public constant MIN_IMMEDIATE_REWARD_BPS = 0;
    uint256 public constant MAX_IMMEDIATE_REWARD_BPS = 3300;

    uint256 public constant BASIS_POINTS = 10_000;

    uint256 public constant DAY = 60 * 60 * 24;
    uint256 public constant WEEK = DAY * 7;
    uint256 public constant MONTH = DAY * 30;
 
    struct ConfigData {

        address rewardToken;

        uint256 minReward;

        uint256 immediateRewardBps;
        uint256 minCharityFeeBps;
        uint256 minFeeBps;

        uint256 foundCooldown;
        uint256 returnCooldown;
        uint256 revokeLostCooldown;

    }

    ConfigData public config;

}