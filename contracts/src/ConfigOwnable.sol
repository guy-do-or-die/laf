// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";

import {LAFErrors} from "./LAFErrors.sol";

import "./Config.sol";

contract ConfigOwnable is Config, Ownable {
   
    constructor() Ownable(msg.sender) {}

    /// @notice Set the minimum reward amount required when marking items as lost 
    function setMinReward(
        uint256 _value
    ) external onlyOwner {
        if (_value == 0) revert LAFErrors.IncorrectValue();

        config.minReward = _value;
    }

    /// @notice Set the minimum charity fee percentage
    function setMinCharityFeeBps(
        uint256 _value
    ) external onlyOwner {
        if (_value < MIN_CHARITY_FEE_BPS || _value > MAX_CHARITY_FEE_BPS)
            revert LAFErrors.InvalidRange(_value, MIN_CHARITY_FEE_BPS, MAX_CHARITY_FEE_BPS);

        config.minCharityFeeBps = _value;
    }

    /// @notice Set the minimum platform fee percentage
    function setMinFeeBps(
        uint256 _value
    ) external onlyOwner {
        if (_value < MIN_FEE_BPS || _value > MAX_FEE_BPS)
            revert LAFErrors.InvalidRange(_value, MIN_FEE_BPS, MAX_FEE_BPS);

        config.minFeeBps = _value;
    }

    /// @notice Set the percentage of reward given immediately to finder upon found
    function setImmediateRewardBps(
        uint256 _value
    ) external onlyOwner {
        if (_value < MIN_IMMEDIATE_REWARD_BPS || _value > MAX_IMMEDIATE_REWARD_BPS)
            revert LAFErrors.InvalidRange(_value, MIN_IMMEDIATE_REWARD_BPS, MAX_IMMEDIATE_REWARD_BPS);

        config.immediateRewardBps = _value;
    }

    /// @notice Set the percentage of reward given immediately to finder upon found
    function setNonReturnRewardBps(
        uint256 _value
    ) external onlyOwner {
        if (_value < MIN_NON_RETURN_REWARD_BPS || _value > MAX_NON_RETURN_REWARD_BPS)
            revert LAFErrors.InvalidRange(_value, MIN_NON_RETURN_REWARD_BPS, MAX_NON_RETURN_REWARD_BPS);

        config.nonReturnRewardBps = _value;
    }

    /// @notice Set the cooldown period before items can be returned after being found
    function setFoundCooldown(
        uint256 _value
    ) external onlyOwner {
        if (_value > DAY) revert LAFErrors.InvalidRange(_value, 0, DAY);

        config.foundCooldown = _value;
    }

    /// @notice Set the cooldown period before items can be returned after being found
    function setReturnCooldown(
        uint256 _value
    ) external onlyOwner {
        if (_value > WEEK) revert LAFErrors.InvalidRange(_value, 0, WEEK);

        config.returnCooldown = _value;
    }

    /// @notice Set the cooldown period before items can be returned after being found
    function setNonReturnCooldown(
        uint256 _value
    ) external onlyOwner {
        if (_value > YEAR) revert LAFErrors.InvalidRange(_value, 0, YEAR);

        config.nonReturnCooldown = _value;
    }

    /// @notice Set the cooldown period before items can be returned after being found
    function setNonReturnGracePeriod(
        uint256 _value
    ) external onlyOwner {
        if (_value > MONTH) revert LAFErrors.InvalidRange(_value, 0, MONTH);

        config.nonReturnGracePeriod = _value;
    }
 
    /// @notice Set the cooldown period before items can be returned after being found
    function setRevokeLostCooldown(
        uint256 _value
    ) external onlyOwner {
        if (_value > MONTH) revert LAFErrors.InvalidRange(_value, 0, MONTH);

        config.revokeLostCooldown = _value;
    }

}