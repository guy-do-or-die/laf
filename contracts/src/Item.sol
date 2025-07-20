// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

import "./ILAF.sol";
import "./Config.sol";

/// @title Item - Contract representing a lost and found item
/// @notice Manages the lifecycle of a single item in the LAF system
/// @dev Uses minimal proxy pattern for gas-efficient deployment
contract Item is Config, Initializable {

    address public immutable factory;
    address public rewardToken;

    address public owner;
    address public finder;
    address public delegate;

    address public secretHash;

    string public comment;
    string public geo;

    bool public isLost;
    bool public isFound;
    bool public isReturned;

    uint256 public reward;

    uint256 public lostTs;
    uint256 public foundTs;
    uint256 public returnedTs;

    uint256 public detailsUpdatedTs;
    uint256 public delegateUpdatedTs;

    uint256 public delegateFee;

    string constant private INVALID_STATE_ERROR = "Invalid state";
    string constant private INVALID_VALUE_ERROR = "Invalid value";
    string constant private TRANSFER_FAILED_ERROR = "Transfer failed";
    string constant private COOLDOWN_ERROR = "Cooldown not passed";

    modifier onlyFactory() {
        require(msg.sender == factory, "Only factory can call");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call");
        _;
    }

    constructor() {
        factory = address(msg.sender);
        _disableInitializers();
    }

    /// @notice Initialize a new Item contract
    /// @param _owner Address of the item owner
    /// @param _secretHash Hash of the secret used to identify the item
    /// @param _comment Description or comment about the item
    /// @param _config Configuration data for the item
    function initialize(
        address _owner,
        address _secretHash,
        string calldata _comment,
        ConfigData calldata _config
    ) external initializer onlyFactory {
        owner = _owner;
        comment = _comment;
        secretHash = _secretHash;
        config = _config;

        rewardToken = config.rewardToken;
    }

    /// @notice Mark the item as lost and set a reward
    /// @param _rewardAmount Amount of reward tokens offered for finding the item
    /// @param _geo Geohash location where the item was lost
    function lost(
        uint256 _rewardAmount,
        string calldata _geo
    ) external onlyFactory {
        require(!isLost, INVALID_STATE_ERROR);
        
        uint256 minReward = config.minReward;
        require(_rewardAmount >= minReward, "Reward is too low");

        require(
            IERC20(rewardToken).transferFrom(owner, address(this), _rewardAmount),
            TRANSFER_FAILED_ERROR
        );

        reward = _rewardAmount;
        geo = _geo;

        lostTs = block.timestamp;
        isLost = true;
    }

    /// @notice Mark the item as found by providing the correct secret
    /// @param _finder Address of the person who found the item
    function found(
        address _finder
    ) external onlyFactory {
        require(isLost && !isFound, INVALID_STATE_ERROR);

        uint256 foundCooldown = config.foundCooldown;
        uint256 immediateRewardBps = config.immediateRewardBps;

        require(block.timestamp - lostTs >= foundCooldown, COOLDOWN_ERROR);

        IERC20 token = IERC20(rewardToken);
        uint256 currentBalance = token.balanceOf(address(this));
        if (currentBalance > 0) {
            uint256 immediateReward = (currentBalance * immediateRewardBps) / BASIS_POINTS;
            
            if (immediateReward > 0) {
                require(token.transfer(_finder, immediateReward), TRANSFER_FAILED_ERROR);
            }
        }

        finder = _finder;

        foundTs = block.timestamp;
        isFound = true;
    }

    /// @notice Mark the item as returned to its owner and distribute rewards
    /// @param _charity Address of the charity to receive a portion of the reward
    /// @param _charityFee Percentage of reward to donate to charity (in basis points)
    /// @param _fee Percentage of reward for platform fee (in basis points)
    /// @return rewardAmount Amount of tokens sent to the finder
    /// @return charityFeeAmount Amount of tokens sent to the charity
    /// @return feeAmount Amount of tokens sent to the platform treasury
    /// @return delegateFeeAmount Amount of tokens sent to the delegate
    function returned(
        address _charity,
        uint256 _charityFee,
        uint256 _fee
    ) external onlyFactory returns (
        uint256 rewardAmount,
        uint256 charityFeeAmount,
        uint256 feeAmount,
        uint256 delegateFeeAmount
    ) {
        require(!isReturned && isFound, INVALID_STATE_ERROR);

        uint256 returnCooldown = config.returnCooldown;
        uint256 minCharityFeeBps = config.minCharityFeeBps;
        uint256 minFeeBps = config.minFeeBps;

        require(block.timestamp - foundTs >= returnCooldown, COOLDOWN_ERROR);

        require(_charityFee >= minCharityFeeBps && _charityFee <= MAX_CHARITY_FEE_BPS, "Invalid charity fee");
        require(_fee >= minFeeBps && _fee <= MAX_FEE_BPS, "Invalid fee");

        require(_charityFee + _fee + delegateFee < MAX_FEE_BPS, "Invalid fees");

        IERC20 token = IERC20(rewardToken);
        uint256 remainingBalance = token.balanceOf(address(this));

        charityFeeAmount = (remainingBalance * _charityFee) / BASIS_POINTS;
        feeAmount = (remainingBalance * _fee) / BASIS_POINTS;

        if (delegate != address(0) && delegateFee > 0) {
            delegateFeeAmount = (remainingBalance * delegateFee) / BASIS_POINTS;
        }

        rewardAmount = remainingBalance - charityFeeAmount - feeAmount - delegateFeeAmount;

        if (charityFeeAmount > 0) {
            require(token.transfer(_charity, charityFeeAmount), TRANSFER_FAILED_ERROR);
        }

        if (feeAmount > 0) {
            address treasuryAddress  = ILAF(factory).treasury();
            require(treasuryAddress != address(0), "Treasury address not set");
            require(token.transfer(treasuryAddress, feeAmount), TRANSFER_FAILED_ERROR);
        }

        if (delegate != address(0) && delegateFeeAmount > 0) {
            require(token.transfer(delegate, delegateFeeAmount), TRANSFER_FAILED_ERROR);
        }

        if (rewardAmount > 0) {
            require(token.transfer(finder, rewardAmount), TRANSFER_FAILED_ERROR);
        }

        returnedTs = block.timestamp;
        isReturned = true;
    }

    /// @notice Revoke the lost status and reclaim the reward
    function revokeLost() external onlyFactory {
        require(!isFound && !isReturned, INVALID_STATE_ERROR);

        uint256 revokeLostCooldown = config.revokeLostCooldown;
        require(block.timestamp - lostTs >= revokeLostCooldown, COOLDOWN_ERROR);

        IERC20 token = IERC20(rewardToken);
        uint256 balance = token.balanceOf(address(this));
        if (balance > 0) {
            require(token.transfer(owner, balance), TRANSFER_FAILED_ERROR);
        }

        reward = 0;

        lostTs = 0;
        isLost = false;
    }

    /// @notice Update the item details
    /// @param _comment New description or comment about the item
    /// @param _geo New geohash of the last known location
    function updateDetails(
        string calldata _comment,
        string calldata _geo
    ) external onlyOwner {
        require(!isFound && !isReturned, INVALID_STATE_ERROR);
        require(bytes(_comment).length > 0, INVALID_VALUE_ERROR);
        require(bytes(_geo).length > 0, INVALID_VALUE_ERROR);
        
        comment = _comment;
        geo = _geo;

        detailsUpdatedTs = block.timestamp;
    }

    /// @notice Update the delegate address that can confirm return on behalf of the owner
    /// @param _delegate Address of the delegate
    function updateDelegate(
        address _delegate,
        uint256 _delegateFee
    ) external onlyOwner {
        require(!isReturned, INVALID_STATE_ERROR);
        require(_delegate != address(0),INVALID_VALUE_ERROR);
        
        delegate = _delegate;
        delegateFee = _delegateFee;

        delegateUpdatedTs = block.timestamp;
    }

}
