// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./Config.sol";

contract ConfigOwnable is Config, Ownable {
   
    constructor() Ownable(msg.sender) {}

    string public constant INCORRECT_VALUE = "Incorrect value";

    function setRewardToken(
        address _rewardToken
    ) external onlyOwner {
        config.rewardToken = _rewardToken;
    }

    function setMinReward(
        uint256 _value
    ) external onlyOwner {
        require(_value > 0, INCORRECT_VALUE);
        config.minReward = _value;
    }

    function setImmediateRewardPercentage(
        uint256 _value
    ) external onlyOwner {
        require(_value >= MIN_IMMEDIATE_REWARD_BPS && _value <= MAX_IMMEDIATE_REWARD_BPS, INCORRECT_VALUE);
        config.immediateRewardBps = _value;
    }   

    function setMinCharityFee(
        uint256 _value
    ) external onlyOwner {
        require(_value >= MIN_CHARITY_FEE_BPS && _value <= MAX_CHARITY_FEE_BPS, INCORRECT_VALUE);
        config.minCharityFeeBps = _value;
    }

    function setMinFee(
        uint256 _value
    ) external onlyOwner {
        require(_value >= MIN_FEE_BPS && _value <= MAX_FEE_BPS, INCORRECT_VALUE);
        config.minFeeBps = _value;
    }

    function setFoundCooldown(
        uint256 _value
    ) external onlyOwner {
        require(_value <= DAY, INCORRECT_VALUE);
        config.foundCooldown = _value;
    }

    function setReturnCooldown(
        uint256 _value
    ) external onlyOwner {
        require(_value <= WEEK, INCORRECT_VALUE);
        config.returnCooldown = _value;
    }

    function setRevokeLostCooldown(
        uint256 _value
    ) external onlyOwner {
        require(_value <= MONTH, INCORRECT_VALUE);
        config.revokeLostCooldown = _value;
    }
   
}