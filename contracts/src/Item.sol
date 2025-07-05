// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";


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

    uint256 public constant MINIMUM_REWARD = 0.01 ether;
    uint256 public constant IMMEDIATE_REWARD_PERCENTAGE = 1;

    constructor() {
        factory = address(msg.sender);
        _disableInitializers();
    }

    function initialize(address _owner, address _secretHash, string calldata _comment) external initializer {
        require(msg.sender == factory, "Only factory can initialize");
        owner = _owner;
        comment = _comment;
        secretHash = _secretHash;
    }

    function lost(string calldata _geo) external payable {
        require(msg.sender == factory, "Only factory can call this function");
        require(!isLost, "Already lost");

        require(msg.value >= MINIMUM_REWARD, "Reward is too low");

        reward = msg.value;
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
        
        if (address(this).balance > 0) {
            uint256 immediateReward = (address(this).balance * IMMEDIATE_REWARD_PERCENTAGE) / 100;
            
            if (immediateReward > 0) {
                (bool success, ) = _finder.call{value: immediateReward}("");
                require(success, "Immediate reward transfer failed");
            }
        }

        isFound = true;
    }

    function returned() external {
        require(msg.sender == factory, "Only factory can call this function");
        require(!isReturned, "Already returned");
        require(isFound, "Not found");

        if (finder != address(0) && address(this).balance > 0) {
            (bool success, ) = finder.call{value: address(this).balance}("");
            require(success, "Reward transfer failed");
        }

        isReturned = true;
    }
}
