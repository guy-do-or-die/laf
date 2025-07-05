// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import "./Item.sol";

contract LAF is ERC1155Supply, Ownable, ReentrancyGuard {

    using Clones for address;

    Item public immutable itemImplementation;
    mapping(address => address) public items;
    uint256 public itemsCount;

    event ItemRegistered(address indexed owner, address indexed hash);
    event ItemLost(address indexed owner, address indexed hash);
    event ItemFound(address indexed owner, address indexed hash);
    event ItemReturned(address indexed owner, address indexed hash);

    constructor() ERC1155("") Ownable(msg.sender) {
        itemImplementation = new Item();
    } 

    function registerItem(address _secretHash, string calldata _comment) external nonReentrant {
        require(_secretHash != address(0), "Secret hash is empty");
        require(items[_secretHash] == address(0), "Item already exists");

        Item item = Item(address(itemImplementation).clone());
        item.initialize(msg.sender, _secretHash, _comment);
        items[_secretHash] = address(item);
        itemsCount++;

        emit ItemRegistered(msg.sender, _secretHash);
    }

    function getItem(address hash) internal view returns (Item) {
        require(items[hash] != address(0), "Item does not exist");
        return Item(items[hash]);
    }

    function lost(address _secretHash) external nonReentrant {
        Item item = getItem(_secretHash);
        require(item.owner() == msg.sender, "Not the owner");
        
        item.lost();

        emit ItemLost(msg.sender, _secretHash);
    }

    function found(address _secretHash, string calldata _secret) external nonReentrant {
        Item item = getItem(_secretHash);

        item.found(msg.sender, _secret);

        emit ItemFound(msg.sender, _secretHash);
    }

    function returned(address _secretHash) external nonReentrant {
        Item item = getItem(_secretHash);
        require(item.owner() == msg.sender, "Not the owner");

        item.returned();

        emit ItemReturned(msg.sender, _secretHash);
    }
}
