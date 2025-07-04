// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";


contract Item is Initializable {

    address public immutable factory;

    address public owner;
    address public secretHash;

    bool public isLost;
    bool public isFound;
    bool public isReturned;

    constructor() {
        factory = address(msg.sender);
        _disableInitializers();
    }

    function initialize(address _owner, address _secretHash) external initializer {
        require(msg.sender == factory, "Only factory can initialize");
        owner = _owner;
        secretHash = _secretHash;
    }

    function lost() external {
        require(msg.sender == factory, "Only factory can call this function");
        isLost = true;
    }

    function found(string calldata _secret) external {
        require(msg.sender == factory, "Only factory can call this function");
        address hashAsAddress = address(uint160(uint256(keccak256(bytes(_secret)))));
        require(secretHash == hashAsAddress, "Invalid secret");
        isFound = true;
    }

    function returned() external {
        require(msg.sender == factory, "Only factory can call this function");
        isReturned = true;
    }
}
