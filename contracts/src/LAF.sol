// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./Item.sol";

contract LAF is ERC1155Supply, Ownable {

    using Clones for address;

    Item public immutable itemImplementation;
    mapping(address => address) public items;
    uint256 public itemsCount;

    event ItemRegistered(address indexed owner, address indexed hash);

    constructor() ERC1155("") Ownable(msg.sender) {
        itemImplementation = new Item();
    } 

    function registerItem(address secretHash) external onlyOwner {
        require(secretHash != address(0), "Secret hash is empty");
        require(items[secretHash] == address(0), "Item already exists");

        Item item = Item(address(itemImplementation).clone());
        item.initialize(msg.sender, secretHash);
        items[secretHash] = address(item);
        itemsCount++;

        emit ItemRegistered(msg.sender, secretHash);
    }

    function getItem(address hash) internal view returns (Item) {
        require(items[hash] != address(0), "Item does not exist");
        return Item(items[hash]);
    }

    function lost(address secretHash) external {
        Item item = getItem(secretHash);
        require(item.owner() == msg.sender, "Not the owner");
        
        item.lost();
    }

    function found(address secretHash, string calldata secret) external {
        Item item = getItem(secretHash);

        item.found(secret);
    }

    function returned(address secretHash) external {
        Item item = getItem(secretHash);
        require(item.owner() == msg.sender, "Not the owner");

        item.returned();
    }
}
