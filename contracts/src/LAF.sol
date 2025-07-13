// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import "./Item.sol";
import "./Meta.sol";


contract LAF is Meta, Ownable, ReentrancyGuard {

    using Clones for address;

    Item public immutable itemImplementation;
    address public immutable rewardToken;

    mapping(address => address) public items;

    uint256 public itemsCount;

    uint256 public registeredNumber;
    uint256 public lostNumber;
    uint256 public foundNumber;
    uint256 public returnedNumber;
    uint256 public rewardsDistributed;

    event ItemRegistered(address indexed item, address hash, address indexed owner);
    event ItemLost(address indexed item, address hash, address indexed owner, uint256 indexed rewardAmount, string geoLocation);
    event ItemFound(address indexed item, address hash, address indexed owner, address indexed finder);
    event ItemReturned(address indexed item, address hash, address indexed owner);

    constructor(address _rewardToken) Meta() Ownable(msg.sender) {
        require(_rewardToken != address(0), "Reward token address cannot be zero");
        rewardToken = _rewardToken;
        itemImplementation = new Item();
    } 

    function registerItem(address _secretHash, string calldata _comment) external nonReentrant {
        require(_secretHash != address(0), "Secret hash is empty");
        require(items[_secretHash] == address(0), "Item already exists");

        address owner = msg.sender;

        address itemAddress = address(itemImplementation).clone();
        Item item = Item(itemAddress);

        item.initialize(owner, _secretHash, _comment, rewardToken);
        items[_secretHash] = itemAddress;
        itemsCount++;

        _mint(owner, REGISTERED, 1, "");

        registeredNumber++;

        emit ItemRegistered(itemAddress, _secretHash, owner);
    }

    function getItem(address hash) internal view returns (Item) {
        require(items[hash] != address(0), "Item does not exist");
        return Item(items[hash]);
    }

    function lost(address _secretHash, uint256 _rewardAmount, string calldata _geoLocation) external nonReentrant {
        Item item = getItem(_secretHash);
        require(item.owner() == msg.sender, "Not the owner");
        require(_rewardAmount > 0, "Reward amount must be greater than 0");
        
        item.lost(_rewardAmount, _geoLocation);

        _mint(item.owner(), LOST, 1, "");

        lostNumber++;

        emit ItemLost(address(item), _secretHash, item.owner(), _rewardAmount, _geoLocation);
    }

    function found(address _secretHash, string calldata _secret) external nonReentrant {
        Item item = getItem(_secretHash);

        item.found(msg.sender, _secret);

        _mint(item.finder(), FOUND, 1, "");

        foundNumber++;

        emit ItemFound(address(item), _secretHash, item.owner(), msg.sender);
    }

    function returned(address _secretHash) external nonReentrant {
        Item item = getItem(_secretHash);
        require(item.owner() == msg.sender, "Not the owner");

        item.returned();

        _mint(item.finder(), RETURNED, 1, "");

        _mintWithTrust(item.owner(), UP, 1, "");
        _mintWithTrust(item.finder(), UP, 2, "");

        returnedNumber++;

        emit ItemReturned(address(item), _secretHash, msg.sender);
    }

}
