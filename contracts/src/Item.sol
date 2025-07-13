// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract Item is Initializable {

    address public immutable factory;

    address public owner;
    address public secretHash;
    string public comment;

    address public finder;
    uint256 public reward;
    string public geo;

    bool public isLost;
    bool public isFound;
    bool public isReturned;

    uint256 public constant MINIMUM_REWARD = 1e6;
    uint256 public constant IMMEDIATE_REWARD_PERCENTAGE = 1;
    
    address private rewardToken;

    constructor() {
        factory = address(msg.sender);
        _disableInitializers();
    }

    function initialize(address _owner, address _secretHash, string calldata _comment, address _rewardToken) external initializer {
        require(msg.sender == factory, "Only factory can initialize");
        owner = _owner;
        comment = _comment;
        secretHash = _secretHash;
        rewardToken = _rewardToken;
    }

    function lost(uint256 _rewardAmount, string calldata _geo) external {
        require(msg.sender == factory, "Only factory can call this function");
        require(!isLost, "Already lost");
        require(_rewardAmount >= MINIMUM_REWARD, "Reward is too low");

        IERC20(rewardToken).transferFrom(owner, address(this), _rewardAmount);

        reward = _rewardAmount;
        geo = _geo;

        isLost = true;
    }

    function found(address _finder, string calldata _secret) external {
        require(msg.sender == factory, "Only factory can call this function");
        require(isLost, "Not lost");
        require(!isFound, "Already found");

        address hashAsAddress = address(uint160(uint256(keccak256(bytes(_secret)))));
        require(secretHash == hashAsAddress, "Invalid secret");

        finder = _finder;

        IERC20 token = IERC20(rewardToken);
        uint256 currentBalance = token.balanceOf(address(this));
        if (currentBalance > 0) {
            uint256 immediateReward = (currentBalance * IMMEDIATE_REWARD_PERCENTAGE) / 100;
            
            if (immediateReward > 0) {
                require(token.transfer(_finder, immediateReward), "Immediate reward transfer failed");
            }
        }

        isFound = true;
    }

    function returned() external {
        require(msg.sender == factory, "Only factory can call this function");
        require(!isReturned, "Already returned");
        require(isFound, "Not found");

        IERC20 token = IERC20(rewardToken);
        uint256 remainingBalance = token.balanceOf(address(this));
        if (finder != address(0) && remainingBalance > 0) {
            require(token.transfer(finder, remainingBalance), "Reward transfer failed");
        }

        isReturned = true;
    }
}
