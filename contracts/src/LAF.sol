// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

import {IERC1271} from "@openzeppelin/contracts/interfaces/IERC1271.sol";

import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {MessageHashUtils} from "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

import {LAFErrors} from "./LAFErrors.sol";
import {LAFEvents} from "./LAFEvents.sol";

import "./ILAF.sol";
import "./ILAFItem.sol";
import "./LAFItem.sol";
import "./Meta.sol";
import "./ConfigOwnable.sol";


/// @title Laf is… lost and found items factory contract
/// @notice Main contract for the Laf decentralized lost and found system
/// @dev Implements item registration, lost/found/return lifecycle, and charity management
contract LAF is ConfigOwnable, Meta, ReentrancyGuard {

    using Clones for address;

    struct Charity {
        bool active;
        address contractAddress;
        uint256 donated;
        string title;
        string url;
    }

    LAFItem public immutable itemImplementation;

    mapping(address secretHash => address contractAddress) public items;
    mapping(uint256 charityIndex => Charity charity) public charities;

    address public treasury;

    uint256 public registeredCount;
    uint256 public lostCount;
    uint256 public foundCount;
    uint256 public returnedCount;
    uint256 public nonReturnCount;
    uint256 public charitiesCount;
    uint256 public supportRewardsCount;

    uint256 public rewardsDistributed;
    uint256 public charityFeesDistributed;
    uint256 public feesDistributed;
    uint256 public delegateFeesDistributed;
    uint256 public supportRewardsDistributed;
    uint256 public supportRewards;

    modifier onlyValidSecretHash(address _secretHash) {
        if (_secretHash == address(0)) revert LAFErrors.InvalidValue();
        _;
    }

    /// @notice Contract constructor
    /// @param _rewardToken Address of the ERC20 token used for rewards
    /// @param _charity Initial charity configuration
    constructor(address _rewardToken, Charity memory _charity)
        ConfigOwnable()
        Meta()
    {
        if (_rewardToken == address(0)) revert LAFErrors.ZeroAddress();
        if (_charity.contractAddress == address(0)) revert LAFErrors.ZeroAddress();

        itemImplementation = new LAFItem();

        uint8 tokenDecimals;
        try IERC20Metadata(_rewardToken).decimals() returns (uint8 _decimals) {
            tokenDecimals = _decimals;
        } catch {
            tokenDecimals = 18;
        }

        config = ConfigData({
            rewardToken: _rewardToken,
            rewardTokenDecimals: tokenDecimals,
            minReward: 1e6,
            minCharityFeeBps: 1_00,
            minFeeBps: 0,
            immediateRewardBps: 1_00,
            nonReturnRewardBps: 50_00,
            foundCooldown: 0,
            returnCooldown: 0,
            revokeLostCooldown: 0,
            nonReturnCooldown: MONTH,
            nonReturnGracePeriod: WEEK
        });

        addCharity(
            _charity.contractAddress,
            _charity.title,
            _charity.url
        );

        treasury = msg.sender;
    } 

    /// @notice Register a new item in the LAF system
    /// @param _secretHash Hash of the secret used to identify the item
    /// @param _comment Description or comment about the item
    function register(
        address _secretHash,
        string calldata _comment
    ) external
        onlyValidSecretHash(_secretHash)
        nonReentrant
    {
        if (items[_secretHash] != address(0)) revert LAFErrors.ItemAlreadyExists();

        address owner = msg.sender;
        address itemAddress = address(itemImplementation).clone();
        LAFItem item = LAFItem(itemAddress);

        ConfigData memory configCache = config;
        item.initialize(owner, _secretHash, _comment, configCache);
        items[_secretHash] = itemAddress;

        _mint(owner, REGISTERED, 1, "");

        registeredCount++;

        emit LAFEvents.ItemRegistered(itemAddress, _secretHash, owner);
    }

    /// @notice Mark an item as lost and set a reward
    /// @param _secretHash Hash of the secret used to identify the item
    /// @param _rewardAmount Amount of reward tokens offered for finding the item
    /// @param _geo Geohash location where the item was lost
    function lost(
        address _secretHash,
        uint256 _rewardAmount,
        string calldata _geo
    ) external
        onlyValidSecretHash(_secretHash)
        nonReentrant
    {
        LAFItem item = _getItem(_secretHash);

        address itemOwner = item.owner();
        if (itemOwner != msg.sender) revert LAFErrors.InvalidSender();
        if (_rewardAmount < config.minReward) revert LAFErrors.RewardTooLow(_rewardAmount, config.minReward);

        item.lost(_rewardAmount, _geo);

        _mint(itemOwner, LOST, 1, "");

        lostCount++;

        emit LAFEvents.ItemLost(address(item), _secretHash, itemOwner, _rewardAmount, _geo);
    }

    /// @notice Mark an item as found using commit-reveal proof of secret knowledge
    /// @param _secretHash Address derived from secret being used as a private key seed 
    /// @param _signature Signature proving knowledge of the secret
    function found(
        address _secretHash,
        bytes calldata _signature
    ) external
        onlyValidSecretHash(_secretHash)
        nonReentrant
    {
        LAFItem item = _getItem(_secretHash);

        address itemOwner = item.owner();
        address itemFinder = msg.sender;

        if (itemOwner == itemFinder) revert LAFErrors.InvalidSender();

        bytes32 message = keccak256(
            abi.encodePacked(
                _secretHash,
                itemFinder,
                address(item),
                item.cycle(),
                block.chainid
            )
        );

        bytes32 ethHash = MessageHashUtils.toEthSignedMessageHash(message);
        address secretSigner = ECDSA.recover(ethHash, _signature);

        if (secretSigner != _secretHash) revert LAFErrors.InvalidSecret();

        item.found(msg.sender);

        _mint(itemFinder, FOUND, 1, "");

        foundCount++;

        emit LAFEvents.ItemFound(address(item), _secretHash, itemOwner, itemFinder);
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
    ) external
        onlyValidSecretHash(_secretHash)
        nonReentrant
    {
        LAFItem item = _getItem(_secretHash);

        address owner = item.owner();
        address finder = item.finder();
        address delegate = item.delegate();
        if (owner != msg.sender && delegate != msg.sender) revert LAFErrors.InvalidSender();

        Charity memory charity = charities[_charityIndex];
        address charityAddress = charity.contractAddress;
        if (!charity.active || charityAddress == address(0)) revert LAFErrors.InvalidCharity();

        (
            uint256 rewardAmount,
            uint256 charityFeeAmount,
            uint256 feeAmount,
            uint256 delegateFeeAmount
        ) = item.returned(
            charityAddress,
            _charityFee,
            _fee
        );

        if (delegate == msg.sender) {
            _mint(delegate, DELEGATED, 1, "");
        }

        _mint(finder, RETURNED, 1, "");
        _mintWithTrust(owner, UP, 1, "");
        _mintWithTrust(finder, UP, 2, "");

        returnedCount++;

        emit LAFEvents.ItemReturned(address(item), _secretHash, owner, finder);

        if (rewardAmount > 0) {
            rewardsDistributed += rewardAmount;
            emit LAFEvents.RewardsDistributed(address(item), _secretHash, owner, finder, rewardAmount);
        }
        if (charityFeeAmount > 0) {
            charityFeesDistributed += charityFeeAmount;
            charities[_charityIndex].donated += charityFeeAmount;
            emit LAFEvents.CharityFeesDistributed(address(item), _secretHash, owner, charityAddress, charityFeeAmount);
        }
        if (feeAmount > 0) {
            feesDistributed += feeAmount;
            emit LAFEvents.FeesDistributed(address(item), _secretHash, owner, treasury, feeAmount);
        }
        if (delegateFeeAmount > 0) {
            delegateFeesDistributed += delegateFeeAmount;
            emit LAFEvents.DelegateFeesDistributed(address(item), _secretHash, owner, delegate, delegateFeeAmount);
        }
    }

    /// @notice Revoke the lost status of an item and reclaim the reward
    /// @param _secretHash Hash of the secret used to identify the item
    function revokeLost(
        address _secretHash
    ) external
        onlyValidSecretHash(_secretHash)
        nonReentrant
    {
        LAFItem item = _getItem(_secretHash);

        address itemOwner = item.owner();
        if (itemOwner != msg.sender) revert LAFErrors.InvalidSender();
        
        item.revokeLost();

        _burn(itemOwner, LOST, 1);
        _distributeSupportReward(item);

        lostCount--;

        emit LAFEvents.ItemRevokedLost(address(item), _secretHash, msg.sender);
    }

    /// @notice Mark an item as non returned to its owner
    /// @param _secretHash Hash of the secret used to identify the item
    function nonReturn(
        address _secretHash
    ) external
        onlyValidSecretHash(_secretHash)
        nonReentrant
    {
        LAFItem item = _getItem(_secretHash);

        if (item.status() != LAFItem.Status.Found) revert LAFErrors.InvalidStatus();

        address itemOwner = item.owner();
        address itemFinder = item.finder();

        if (itemOwner != msg.sender && itemFinder != msg.sender) revert LAFErrors.InvalidSender();
        
        LAFItem.Status resultStatus;
        address penaltyTarget;

        _distributeSupportReward(item);
        (resultStatus, penaltyTarget) = item.nonReturn(msg.sender);
        _nonReturnPenalty(penaltyTarget);

        nonReturnCount++;

        emit LAFEvents.ItemNonReturn(address(item), _secretHash, msg.sender, resultStatus);
    }

    /// @notice Sponsor the reward for an item
    /// @param _secretHash Hash of the secret used to identify the item
    /// @param amount Amount of tokens to sponsor the reward
    function support(
        address _secretHash,
        uint256 amount
    ) external
        onlyValidSecretHash(_secretHash)
        nonReentrant
    {
        if (amount == 0) revert LAFErrors.EmptyValue();

        LAFItem item = _getItem(_secretHash);
        item.support(msg.sender, amount);

        supportRewardsCount++;
        supportRewards += amount;

        _mint(msg.sender, SUPPORTED, amount * BASIS_POINTS / 10_00 / item.reward(), "");

        emit LAFEvents.ItemSupported(address(item), _secretHash, msg.sender, amount);
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
        if (_charityAddress == address(0)) revert LAFErrors.ZeroAddress();
        if (bytes(_charityTitle).length == 0) revert LAFErrors.EmptyValue();
        if (bytes(_charityUrl).length == 0) revert LAFErrors.EmptyValue();
        if (bytes(_charityTitle).length > 128) revert LAFErrors.InvalidValue();
        if (bytes(_charityUrl).length > 256) revert LAFErrors.InvalidValue();

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
    ) external onlyOwner {
        if (_charityIndex >= charitiesCount) revert LAFErrors.InvalidValue();
        charities[_charityIndex].active = !charities[_charityIndex].active;
    }

    /// @notice Mint a special commemorative transferable token by paying ETH
    /// @dev Cost scales with the number of returned items
    function mint() external payable nonReentrant {
        if (balanceOf(msg.sender, 0) != 0) revert LAFErrors.InvalidValue();
        if (trust[msg.sender] <= 0) revert LAFErrors.UnauthorizedAccess();
        
        uint256 price = returnedCount * 0.0001 ether;
        if (msg.value < price) revert LAFErrors.InsufficientBalance(price, msg.value);

        (bool success,) = payable(treasury).call{value: msg.value}("");
        if (!success) revert LAFErrors.TransferFailed();

        _mint(msg.sender, 0, 1, "");

        emit LAFEvents.Minted(msg.sender);
    }

    /// @notice Get royalty information for NFT marketplaces (ERC2981)
    /// @param tokenId ID of the token being sold
    /// @param salePrice Sale price of the token
    /// @return receiver Address to receive royalties
    /// @return royaltyAmount Amount of royalty to pay
    function royaltyInfo(
        uint256 tokenId,
        uint256 salePrice
    ) 
        external
        view
        override
        returns (
            address receiver,
            uint256 royaltyAmount
        )
    {
        if (tokenId != 0) return (address(0), 0);

        receiver = treasury;
        royaltyAmount = (salePrice * 100) / BASIS_POINTS;
    }

    /// @notice Set the treasury address that receives protocol's part of item return fees
    /// @param _treasury Address of the treasury
    function setTreasury(
        address _treasury
    ) external onlyOwner {
        if (_treasury == address(0)) revert LAFErrors.ZeroAddress();
        treasury = _treasury;
    }

    /// @notice Update the reward token and automatically fetch its decimals
    /// @dev Only callable by contract owner. Validates token contract and fetches decimals
    /// @param _rewardToken The address of the new ERC20 token to use for rewards
    function updateRewardToken(
        address _rewardToken
    ) external onlyOwner returns (uint8 decimals) {
        if (_rewardToken == address(0)) revert LAFErrors.ZeroAddress();
        
        // Validate that the address is a contract
        uint256 codeSize;
        assembly {
            codeSize := extcodesize(_rewardToken)
        }
        if (codeSize == 0) revert LAFErrors.InvalidValue();
        
        // Try to get decimals from the token contract
        try IERC20Metadata(_rewardToken).decimals() returns (uint8 _decimals) {
            decimals = _decimals;
        } catch {
            decimals = 18;
        }
        
        config.rewardToken = _rewardToken;
        config.rewardTokenDecimals = decimals;

        registeredCount = 0;
        lostCount = 0;
        foundCount = 0;
        returnedCount = 0;
        nonReturnCount = 0;
        charitiesCount = 0;
        supportRewardsCount = 0;

        rewardsDistributed = 0;
        charityFeesDistributed = 0;
        feesDistributed = 0;
        delegateFeesDistributed = 0;
        supportRewardsDistributed = 0;
        supportRewards = 0;
    }

    /// @notice Ping function
    /// @dev This function does nothing but emit an event
    function ping() external nonReentrant {
        emit LAFEvents.Pong(msg.sender);
    }

    /// @notice Get an item contract by its secret hash
    /// @param _secretHash Hash of the secret used to identify the item
    /// @return LAFItem contract instance
    function _getItem(
        address _secretHash
    ) internal view returns (LAFItem) {
        if (items[_secretHash] == address(0)) revert LAFErrors.ItemDoesNotExist();
        return LAFItem(items[_secretHash]);
    }

    /// @notice Apply non-return penalty to the target
    /// @param _target Address of the target to apply the penalty to
    function _nonReturnPenalty(address _target) internal {
        _mintWithTrust(_target, DOWN, 2, "");

        uint256 upBalance = balanceOf(_target, UP);
        if (upBalance > 0) _burn(_target, UP, upBalance >= 2 ? 2 : upBalance);
        _burn(_target, FOUND, 1);
    }

    /// @notice Distribute the support reward to charities
    function _distributeSupportReward(LAFItem _item) internal {
        uint256 amount = _item.supportReward();
        if (amount == 0) return;

        uint256 activeCharitiesCount = 0; 

        uint256[] memory activeCharities = new uint256[](charitiesCount);
        
        for (uint256 i = 0; i < charitiesCount; i++) {
            Charity memory charity = charities[i];
            if (charity.active) activeCharities[activeCharitiesCount++] = i;
        }

        if (activeCharitiesCount > 0) {
            uint256 charityShare = amount / activeCharitiesCount;
            uint256 remainder = amount % activeCharitiesCount;
            
            uint256 shareToTransfer;
            for (uint256 i = 0; i < activeCharitiesCount; i++) {
                Charity memory charity = charities[activeCharities[i]];
                
                shareToTransfer = charityShare;

                if (i == 0) {
                    shareToTransfer += remainder;
                }

                _item.transferSupportRewardShare(charity.contractAddress, shareToTransfer);
                charities[activeCharities[i]].donated += shareToTransfer;
            }
        }

        supportRewardsDistributed += amount;

        emit LAFEvents.SupportRewardsDistributed(address(_item), _item.secretHash(), _item.owner(), amount);
    }

}
