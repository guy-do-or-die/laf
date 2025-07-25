// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import {LAFErrors} from "./LAFErrors.sol";

import "./ILAF.sol";
import "./Config.sol";


/// @title LAF is... lost and found item contract 
/// @notice Manages the lifecycle of a single item in the LAF system
/// @dev Uses minimal proxy pattern for gas-efficient deployment
contract LAFItem is Config, Initializable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    event RewardUpdated(uint256 oldReward, uint256 newReward);
    event DetailsUpdated(string comment, string geo);
    event DelegateUpdated(address oldDelegate, address newDelegate);
    event Withdrawn(uint256 amount);

    enum Status {
        None,
        Registered,
        Lost,
        Found,
        Returned
    }

    IERC20 public token;
    Status public status;

    address public immutable factory;

    address public owner;
    address public finder;
    address public delegate;

    address public secretHash;

    string public comment;
    string public geo;

    uint256 public reward;
    uint256 public supportReward;
    uint256 public immediateRewardPaid;
    uint256 public delegateFee;
    uint256 public cycle;

    uint256 public statusUpdatedTs;
    uint256 public detailsUpdatedTs;
    uint256 public delegateUpdatedTs;

    modifier onlyFactory() {
        if (msg.sender != factory) revert LAFErrors.OnlyFactory();
        _;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert LAFErrors.OnlyOwner();
        _;
    }

    modifier onlyStatus(Status _status) {
        if (status != _status) revert LAFErrors.InvalidStatus();
        _;
    }

    modifier onlyStatuses(Status _status1, Status _status2) {
        if (status != _status1 && status != _status2) revert LAFErrors.InvalidStatus();
        _;
    }

    modifier afterCooldown(uint256 cooldownPeriod) {
        if (block.timestamp < statusUpdatedTs + cooldownPeriod) {
            revert LAFErrors.CooldownNotMet(statusUpdatedTs + cooldownPeriod - block.timestamp);
        }
        _;
    }

    modifier onlyOwnerOrDelegate() {
        if (msg.sender != owner && msg.sender != delegate) {
            revert LAFErrors.InvalidSender();
        }
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
    ) external
        initializer
        onlyFactory
    {
        owner = _owner;
        comment = _comment;
        secretHash = _secretHash;
        config = _config;

        token = IERC20(config.rewardToken);

        status = Status.Registered;
        statusUpdatedTs = block.timestamp;
    }

    /// @notice Mark the item as lost and set a reward
    /// @param _rewardAmount Amount of reward tokens offered for finding the item
    /// @param _geo Geohash of the last known location
    function lost(
        uint256 _rewardAmount,
        string calldata _geo
    ) external
        onlyFactory
        onlyStatuses(Status.Registered, Status.Returned)
    {
        uint256 minReward = config.minReward;
        if (_rewardAmount < minReward) revert LAFErrors.RewardTooLow(_rewardAmount, minReward);

        token.safeTransferFrom(owner, address(this), _rewardAmount);

        reward = _rewardAmount;
        geo = _geo;

        status = Status.Lost;
        statusUpdatedTs = block.timestamp;

        _resetCycle();
    }

    /// @notice Mark the item as found by providing the correct secret
    /// @param _finder Address of the person who found the item
    function found(
        address _finder
    ) external
        onlyFactory
        onlyStatus(Status.Lost)
        afterCooldown(config.foundCooldown)
    {
        uint256 immediateRewardBps = config.immediateRewardBps;
        uint256 immediateReward = (reward * immediateRewardBps) / BASIS_POINTS;
        
        token.safeTransfer(_finder, immediateReward);
        immediateRewardPaid = immediateReward;

        finder = _finder;
        status = Status.Found;
        statusUpdatedTs = block.timestamp;
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
    ) external
        onlyFactory
        onlyStatus(Status.Found)
        afterCooldown(config.returnCooldown)
        returns (
            uint256 rewardAmount,
            uint256 charityFeeAmount,
            uint256 feeAmount,
            uint256 delegateFeeAmount
        )
    {
        (charityFeeAmount, feeAmount, delegateFeeAmount, rewardAmount)
            = _calculateFeeDistribution(_charityFee, _fee);

        _distributeReward(_charity, charityFeeAmount, feeAmount, delegateFeeAmount, rewardAmount);

        token.safeTransfer(finder, supportReward);

        status = Status.Returned;
        statusUpdatedTs = block.timestamp;
    }

    /// @notice Revoke the lost status and reclaim the reward
    function revokeLost() external
        onlyFactory
        onlyStatus(Status.Lost)
        afterCooldown(config.revokeLostCooldown)
    {
        token.safeTransfer(owner, reward);

        status = Status.Registered;
        statusUpdatedTs = block.timestamp;
    }

    /// @notice Mark the item as non returned
    /// @param initiator Address of the initiator of the non-return
    function nonReturn(address initiator) external
        onlyFactory
        onlyStatus(Status.Found)
        returns (
            Status resultStatus,
            address penaltyTarget
        )
    {
        ConfigData memory _config = config;
        uint256 timePassed = block.timestamp - statusUpdatedTs;

        resultStatus = Status.None;

        if (initiator == owner) {
            if (timePassed < _config.nonReturnCooldown + _config.nonReturnGracePeriod)
                revert LAFErrors.CooldownNotMet(_config.nonReturnCooldown + _config.nonReturnGracePeriod - timePassed);

            resultStatus = Status.Registered;
            penaltyTarget = finder;
        } else if (initiator == finder) {
            if (timePassed < _config.nonReturnCooldown)
                revert LAFErrors.CooldownNotMet(_config.nonReturnCooldown - timePassed);

            uint256 nonReturnRewardBps = config.nonReturnRewardBps - config.immediateRewardBps;
            token.safeTransfer(finder, reward * nonReturnRewardBps / BASIS_POINTS);

            resultStatus = Status.Returned;
            penaltyTarget = owner;
        } else {
            revert LAFErrors.InvalidSender();
        }

        status = resultStatus;
        statusUpdatedTs = block.timestamp;
    }

    /// @notice Sponsor the reward for an item
    /// @param amount Amount of tokens to sponsor the reward
    function support(address supporter, uint256 amount) external
        onlyFactory
        onlyStatus(Status.Lost)
    {
        token.safeTransferFrom(supporter, address(this), amount);
        supportReward += amount;
    }

    /// @notice Transfer a share of the support reward to a charity
    /// @param _charityAddress Address of the charity
    /// @param amount Amount of tokens to transfer
    function transferSupportRewardShare(address _charityAddress, uint256 amount) external
        onlyFactory
    {
        if (amount > supportReward) revert LAFErrors.InvalidValue();
        token.safeTransfer(_charityAddress, amount);
        supportReward -= amount;
    }

    /// @notice Update the reward amount
    /// @param _rewardAmount New reward amount
    function updateReward(
        uint256 _rewardAmount
    ) external
        onlyOwner
        onlyStatuses(Status.Lost, Status.Found)
        nonReentrant
    {
        if (_rewardAmount < config.minReward)
            revert LAFErrors.RewardTooLow(_rewardAmount, config.minReward);

        uint256 oldReward = reward;
        
        if (status == Status.Found && _rewardAmount < immediateRewardPaid) {
            revert LAFErrors.RewardTooLow(_rewardAmount, immediateRewardPaid);
        }
        
        if (_rewardAmount > oldReward) {
            token.safeTransferFrom(owner, address(this), _rewardAmount - oldReward);
        } else if (_rewardAmount < oldReward) {
            token.safeTransfer(owner, oldReward - _rewardAmount);
        }

        reward = _rewardAmount;
        
        emit RewardUpdated(oldReward, _rewardAmount);
    }

    /// @notice Update the item details
    /// @param _comment New description or comment about the item
    /// @param _geo New geohash of the last known location
    function updateDetails(
        string calldata _comment,
        string calldata _geo
    ) external
        onlyOwner
        onlyStatus(Status.Lost)
    {
        if (bytes(_comment).length == 0) revert LAFErrors.EmptyValue();
        if (bytes(_geo).length == 0) revert LAFErrors.EmptyValue();
        
        comment = _comment;
        geo = _geo;
        
        detailsUpdatedTs = block.timestamp;

        emit DetailsUpdated(_comment, _geo);
    }

    /// @notice Update the delegate address that can confirm return on behalf of the owner
    /// @param _delegate Address of the delegate
    function updateDelegate(
        address _delegate,
        uint256 _delegateFee
    ) external
        onlyOwner
        onlyStatus(Status.Found)
    {
        if (_delegate == address(0) || _delegate == owner) revert LAFErrors.InvalidValue();

        if (_delegateFee < MIN_DELEGATE_FEE_BPS || _delegateFee > MAX_DELEGATE_FEE_BPS)
            revert LAFErrors.InvalidDelegateFee(_delegateFee, MIN_DELEGATE_FEE_BPS, MAX_DELEGATE_FEE_BPS);
        
        address oldDelegate = delegate;
        delegate = _delegate;
        delegateFee = _delegateFee;
        
        delegateUpdatedTs = block.timestamp;

        emit DelegateUpdated(oldDelegate, _delegate);
    }

    /// @notice Withdraw tokens from the contract
    function withdraw() external
        onlyOwner
        onlyStatuses(Status.Registered, Status.Returned)
        nonReentrant
    {
        token.safeTransfer(owner, token.balanceOf(address(this)));
    }

    /// @notice Validate and calculate fee distributions
    /// @param _charityFee Charity fee in basis points
    /// @param _fee Platform fee in basis points
    /// @return charityFeeAmount Calculated charity fee amount
    /// @return feeAmount Calculated platform fee amount
    /// @return delegateFeeAmount Calculated delegate fee amount
    /// @return rewardAmount Remaining reward for finder
    function _calculateFeeDistribution(
        uint256 _charityFee,
        uint256 _fee
    ) internal view
        returns (
            uint256 charityFeeAmount,
            uint256 feeAmount,
            uint256 delegateFeeAmount,
            uint256 rewardAmount
        )
    {
        ConfigData memory _config = config;
        
        // Validate fee ranges
        if (_charityFee < _config.minCharityFeeBps || _charityFee > MAX_CHARITY_FEE_BPS)
            revert LAFErrors.InvalidCharityFee(_charityFee, _config.minCharityFeeBps, MAX_CHARITY_FEE_BPS);

        if (_fee < _config.minFeeBps || _fee > MAX_FEE_BPS)
            revert LAFErrors.InvalidFee(_fee, _config.minFeeBps, MAX_FEE_BPS);

        // Validate total fees don't exceed 100%
        uint256 totalFeeBps = _charityFee + _fee + delegateFee;
        if (totalFeeBps > BASIS_POINTS) revert LAFErrors.InvalidValue();

        // Calculate fee amounts on total reward
        charityFeeAmount = (reward * _charityFee) / BASIS_POINTS;
        feeAmount = (reward * _fee) / BASIS_POINTS;
        
        if (delegateFee > 0 && delegate != address(0))
            delegateFeeAmount = (reward * delegateFee) / BASIS_POINTS;

        // Remaining reward for finder = total reward - fees - already paid immediate reward
        uint256 totalDistribution = charityFeeAmount + feeAmount + delegateFeeAmount + immediateRewardPaid;
        if (totalDistribution > reward) revert LAFErrors.InvalidValue();
        
        rewardAmount = reward - totalDistribution;
    }

    /// @notice Distribute the reward to the finder, charity, fee, and delegate
    /// @param _charity Address of the charity to receive a portion of the reward
    /// @param _charityFeeAmount Amount of tokens sent to the charity
    /// @param _feeAmount Amount of tokens sent to the platform treasury
    /// @param _delegateFeeAmount Amount of tokens sent to the delegate
    /// @param _rewardAmount Amount of tokens sent to the finder
    function _distributeReward(
        address _charity,
        uint256 _charityFeeAmount,
        uint256 _feeAmount,
        uint256 _delegateFeeAmount,
        uint256 _rewardAmount
    ) internal {
        address treasury = ILAF(factory).treasury();

        token.safeTransfer(_charity, _charityFeeAmount);
        token.safeTransfer(treasury, _feeAmount);

        if (delegateFee > 0 && delegate != address(0))
            token.safeTransfer(delegate, _delegateFeeAmount);

        token.safeTransfer(finder, _rewardAmount);
    }

    /// @notice Reset the item state
    function _resetCycle () internal {
        reward = 0;
        supportReward = 0;
        immediateRewardPaid = 0;
        delegateFee = 0;
        detailsUpdatedTs = 0;
        delegateUpdatedTs = 0;
        cycle++;
    }

}
