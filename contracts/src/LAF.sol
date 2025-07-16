// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import "./Item.sol";
import "./Meta.sol";
import "./ConfigOwnable.sol";
import "./Verifier.sol";


/// @title LAF is... lost and found items factory contract
/// @notice Main contract for the LAF decentralized lost and found system
/// @dev Implements item registration, lost/found/return lifecycle, and charity management
contract LAF is ConfigOwnable, Meta, ReentrancyGuard, Verifier {

    using Clones for address;

    Item public immutable itemImplementation;

    struct Charity {
        bool active;
        address contractAddress;
        uint256 donated;
        string title; 
        string url;
    }

    mapping(address => address) public items;
    mapping(uint256 => Charity) public charities;

    address public treasury;

    uint256 public itemsCount;
    uint256 public charitiesCount;
    uint256 public registeredCount;
    uint256 public lostCount;
    uint256 public foundCount;
    uint256 public returnedCount;

    uint256 public rewardsDistributed;
    uint256 public charityFeesDistributed;
    uint256 public feesDistributed;

    event ItemRegistered(address indexed item, address hash, address indexed owner);
    event ItemLost(address indexed item, address hash, address indexed owner, uint256 indexed rewardAmount, string geoLocation);
    event ItemRevokedLost(address indexed item, address hash, address indexed owner);
    event ItemFound(address indexed item, address hash, address indexed owner, address indexed finder);
    event ItemReturned(address indexed item, address hash, address indexed owner, address indexed finder);

    event RewardsDistributed(address indexed item, address hash, address indexed owner, address indexed finder, uint256 rewardAmount);
    event CharityFeesDistributed(address indexed item, address hash, address indexed owner, address indexed charity, uint256 charityFeeAmount);
    event FeesDistributed(address indexed item, address hash, address indexed owner, address indexed treasury, uint256 feeAmount);

    event Minted(address indexed owner);

    string constant private INVALID_SENDER_ERROR = "Invalid sender";
    string constant private EMPTY_VALUE_ERROR = "Empty value";  

    /// @notice Contract constructor
    /// @param _rewardToken Address of the ERC20 token used for rewards
    constructor(address _rewardToken) ConfigOwnable() Meta() {
        require(_rewardToken != address(0), "Reward token address cannot be zero");
        itemImplementation = new Item();

        config = ConfigData({
            rewardToken: _rewardToken,
            minReward: 1e6,
            immediateRewardBps: 100,
            minCharityFeeBps: 100,
            minFeeBps: 0,
            foundCooldown: 0,
            returnCooldown: 0,
            revokeLostCooldown: 0
        });

        addCharity(
            0xd16713A5D4Eb7E3aAc9D2228eB72f6f7328FADBD,
            "Protocol Guild",
            "https://protocolguild.io"
        );

        treasury = msg.sender;
    } 

    /// @notice Register a new item in the LAF system
    /// @param _secretHash Hash of the secret used to identify the item
    /// @param _comment Description or comment about the item
    function registerItem(
        address _secretHash,
        string calldata _comment
    ) external nonReentrant {
        require(_secretHash != address(0), EMPTY_VALUE_ERROR);
        require(items[_secretHash] == address(0), "Item already exists");

        address owner = msg.sender;

        address itemAddress = address(itemImplementation).clone();
        Item item = Item(itemAddress);

        ConfigData memory configCache = config;
        item.initialize(owner, _secretHash, _comment, configCache);
        items[_secretHash] = itemAddress;
        itemsCount++;

        _mint(owner, REGISTERED, 1, "");

        registeredCount++;

        emit ItemRegistered(itemAddress, _secretHash, owner);
    }

    /// @notice Get an item contract by its secret hash
    /// @param _secretHash Hash of the secret used to identify the item
    /// @return Item contract instance
    function _getItem(
        address _secretHash
    ) internal view returns (Item) {
        require(items[_secretHash] != address(0), "Item does not exist");
        return Item(items[_secretHash]);
    }

    /// @notice Mark an item as lost and set a reward
    /// @param _secretHash Hash of the secret used to identify the item
    /// @param _rewardAmount Amount of reward tokens offered for finding the item
    /// @param _geoLocation Geohash location where the item was lost
    function lost(
        address _secretHash,
        uint256 _rewardAmount,
        string calldata _geoLocation
    ) external nonReentrant {
        Item item = _getItem(_secretHash);

        address itemOwner = item.owner();
        require(itemOwner == msg.sender, INVALID_SENDER_ERROR);
        require(_rewardAmount >= config.minReward, "Reward is too low");

        item.lost(_rewardAmount, _geoLocation);

        _mint(itemOwner, LOST, 1, "");

        lostCount++;

        emit ItemLost(address(item), _secretHash, itemOwner, _rewardAmount, _geoLocation);
    }

    /// @notice Verify the secret with owner and finder signatures
    /// @param _itemOwner Address of the item owner
    /// @param _secretHash Hash of the secret used to identify the item
    /// @param _secret The plaintext secret
    /// @param _ownerSignature Owner's signature over the secret
    /// @param _finderSignature Finder's signature over the secret
    function _verifySecret(
        address _itemOwner,
        address _secretHash,
        string calldata _secret,
        bytes calldata _ownerSignature,
        bytes calldata _finderSignature
    ) internal view {
        bytes32 messageHash = keccak256(abi.encodePacked(_secret));

        _verifySignature(_itemOwner, messageHash, _ownerSignature);
        _verifySignature(msg.sender, messageHash, _finderSignature);

        address hashAsAddress = address(uint160(uint256(messageHash)));
        require(_secretHash == hashAsAddress, "Invalid secret");
    }

    /// @notice Mark an item as found by providing the correct secret
    /// @param _secretHash Hash of the secret used to identify the item
    /// @param _secret The actual secret that hashes to _secretHash
    /// @param _ownerSignature Owner's signature over the secret
    /// @param _finderSignature Finder's signature over the secret
    function found(
        address _secretHash,
        string calldata _secret,
        bytes calldata _ownerSignature,
        bytes calldata _finderSignature
    ) external nonReentrant {
        Item item = _getItem(_secretHash);

        address itemOwner = item.owner();
        require(itemOwner != msg.sender, INVALID_SENDER_ERROR);

        _verifySecret(itemOwner, _secretHash, _secret, _ownerSignature, _finderSignature);

        item.found(msg.sender);

        address itemFinder = item.finder();
        _mint(itemFinder, FOUND, 1, "");

        foundCount++;

        emit ItemFound(address(item), _secretHash, itemOwner, msg.sender);
    }

    /// @notice Mark an item as returned to its owner
    /// @param _secretHash Hash of the secret used to identify the item
    /// @param _charityIndex Index of the charity to receive a portion of the reward
    /// @param _charityFee Percentage of reward to donate to charity (in basis points)
    /// @param _fee Percentage of reward for platform fee (in basis points)
    function returned(
        address _secretHash,
        uint256 _charityIndex,
        uint256 _charityFee,
        uint256 _fee
    ) external nonReentrant {
        Item item = _getItem(_secretHash);

        address owner = item.owner();
        address finder = item.finder();
        address delegateAddress = item.delegate();

        require(owner == msg.sender || delegateAddress == msg.sender, INVALID_SENDER_ERROR);

        Charity memory charity = charities[_charityIndex];
        address charityAddress = charity.contractAddress;
        require(charity.active && charityAddress != address(0), "Not a valid charity");

        (uint256 rewardAmount, uint256 charityFeeAmount, uint256 feeAmount) = item.returned(charityAddress, _charityFee, _fee);

        _mint(finder, RETURNED, 1, "");

        _mintWithTrust(owner, UP, 1, "");
        _mintWithTrust(finder, UP, 2, "");

        returnedCount++;

        rewardsDistributed += rewardAmount;
        charityFeesDistributed += charityFeeAmount;
        charities[_charityIndex].donated += charityFeeAmount;
        feesDistributed += feeAmount;

        emit ItemReturned(address(item), _secretHash, owner, finder);
        emit RewardsDistributed(address(item), _secretHash, owner, finder, rewardAmount);
        emit CharityFeesDistributed(address(item), _secretHash, owner, charityAddress, charityFeeAmount);
        emit FeesDistributed(address(item), _secretHash, owner, treasury, feeAmount);
    }

    /// @notice Revoke the lost status of an item and reclaim the reward
    /// @param _secretHash Hash of the secret used to identify the item
    function revokeLost(
        address _secretHash
    ) external nonReentrant {
        Item item = _getItem(_secretHash);

        address itemOwner = item.owner();
        require(itemOwner == msg.sender, INVALID_SENDER_ERROR);
        
        item.revokeLost();

        _burn(itemOwner, LOST, 1);

        lostCount--;

        emit ItemRevokedLost(address(item), _secretHash, msg.sender);
    }

    /// @notice Add a new charity that can receive donations from item returns as a mandatory fee
    /// @param _charityAddress Address of the charity
    /// @param _charityTitle Name or title of the charity
    /// @param _charityUrl URL or website of the charity
    function addCharity(
        address _charityAddress,
        string memory _charityTitle,
        string memory _charityUrl
    ) public onlyOwner {
        require(_charityAddress != address(0), EMPTY_VALUE_ERROR);
        require(bytes(_charityTitle).length > 0, EMPTY_VALUE_ERROR);
        require(bytes(_charityUrl).length > 0, EMPTY_VALUE_ERROR);

        charities[charitiesCount++] = Charity({
            active: true,
            contractAddress: _charityAddress,
            donated: 0,
            title: _charityTitle,
            url: _charityUrl
        });
    }

    /// @notice Toggle the active status of a charity
    /// @param _charityIndex Index of the charity to toggle
    function toggleActiveCharity(
        uint256 _charityIndex
    ) public onlyOwner {
        require(_charityIndex < charitiesCount, EMPTY_VALUE_ERROR);
        charities[_charityIndex].active = !charities[_charityIndex].active;
    }

    /// @notice Mint a special commemorative transferable token by paying ETH
    /// @dev Cost scales with the number of returned items
    function mint() external payable nonReentrant {
        require(balanceOf(msg.sender, 0) == 0, "Already minted");
        require(msg.value >= returnedCount * 0.0001 ether, "Insufficient funds");
        _mint(msg.sender, 0, 1, "");
        emit Minted(msg.sender);
    }

    /// @notice Get royalty information for NFT marketplaces (ERC2981)
    /// @param tokenId ID of the token being sold
    /// @param salePrice Sale price of the token
    /// @return receiver Address to receive royalties
    /// @return royaltyAmount Amount of royalty to pay
    function royaltyInfo(uint256 tokenId, uint256 salePrice) external view override returns (address, uint256) {
        if (tokenId != 0) return (address(0), 0);
        uint256 royaltyAmount = (salePrice * 100) / BASIS_POINTS;
        return (treasury, royaltyAmount);
    }

    /// @notice Set the treasury address that receives protocol's part of item return fees
    /// @param _treasury Address of the treasury
    function setTreasury(
        address _treasury
    ) external onlyOwner {
        require(_treasury != address(0), EMPTY_VALUE_ERROR);
        treasury = _treasury;
    }

}
