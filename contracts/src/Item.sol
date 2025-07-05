// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";


contract Item is Initializable {

    address public immutable factory;

    address public owner;
    address public secretHash;
    string public comment;

    address public finder;

    bool public isLost;
    bool public isFound;
    bool public isReturned;

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

    function lost() external {
        require(msg.sender == factory, "Only factory can call this function");
        require(!isLost, "Already lost");
        isLost = true;
    }

    function found(address _finder, string calldata _secret) external {
        require(msg.sender == factory, "Only factory can call this function");
        require(isLost, "Not lost");
        require(!isFound, "Already found");

        address hashAsAddress = address(uint160(uint256(keccak256(bytes(_secret)))));
        require(secretHash == hashAsAddress, "Invalid secret");

        finder = _finder;
        isFound = true;
    }

    function returned() external {
        require(msg.sender == factory, "Only factory can call this function");
        require(!isReturned, "Already returned");
        require(isFound, "Not found");

        isReturned = true;
    }
}
