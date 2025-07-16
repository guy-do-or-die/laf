// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Config.sol";

/// @title ILAF - Interface for the LAF contract
/// @notice Defines all external and public functions available in the LAF contract
/// @dev Used for type-safe interactions with the LAF contract
interface ILAF {
    // View functions
    /// @notice Get the address of the item implementation contract used for cloning
    function itemImplementation() external view returns (address);
    
    /// @notice Get the deployed item contract address for a given secret hash
    function items(address secretHash) external view returns (address);

    /// @notice Get information about a charity at a specific index
    function charities(uint256 index) external view returns (bool active, address contractAddress, uint256 donated, string memory title, string memory url);

    /// @notice Get the total number of items registered
    function itemsCount() external view returns (uint256);
    /// @notice Get the total number of charities registered
    function charitiesCount() external view returns (uint256);
    /// @notice Get the count of registered items
    function registeredCount() external view returns (uint256);
    /// @notice Get the count of items marked as lost
    function lostCount() external view returns (uint256);
    /// @notice Get the count of items marked as found
    function foundCount() external view returns (uint256);
    /// @notice Get the count of items marked as returned
    function returnedCount() external view returns (uint256);

    /// @notice Get the total amount of rewards distributed
    function rewardsDistributed() external view returns (uint256);
    /// @notice Get the total amount of charity fees distributed
    function charityFeesDistributed() external view returns (uint256);
    /// @notice Get the total amount of platform fees distributed
    function feesDistributed() external view returns (uint256);

    /// @notice Get the current configuration data shared betwen factory and clones where it's baked on deploy
    function config() external view returns (Config.ConfigData memory);

    /// @notice Get the trust score for an account
    function trust(address account) external view returns (int);
    /// @notice Increase the trust score for an account
    function thumbUp(address account) external;
    /// @notice Decrease the trust score for an account
    function thumbDown(address account) external;

    /// @notice Get the balance of tokens for an account
    function balanceOf(address account, uint256 id) external view returns (uint256);
    /// @notice Get the metadata URI for a token
    function uri(uint256 tokenId) external pure returns (string memory);

    /// @notice Get the treasury address that receives platform fees
    function treasury() external view returns (address);
    /// @notice Get royalty information for NFT marketplaces (ERC2981)
    function royaltyInfo(uint256 tokenId, uint256 salePrice) external view returns (address, uint256);

    /// @notice Check if the contract supports a specific interface
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
    
    // Core mechanics functions
    /// @notice Register a new item in the LAF system
    function registerItem(address secretHash, string calldata comment) external;
    /// @notice Mark an item as lost and set a reward
    function lost(address secretHash, uint256 rewardAmount, string calldata geoLocation) external;
    /// @notice Mark an item as found by providing the correct secret
    function found(address secretHash, string calldata secret, bytes calldata ownerSignature, bytes calldata finderSignature) external;
    /// @notice Mark an item as returned to its owner
    function returned(address secretHash, uint256 charityIndex, uint256 charityFee, uint256 fee) external;
    /// @notice Revoke the lost status of an item and reclaim the reward
    function revokeLost(address secretHash) external;

    /// @notice Mint a special commemorative transferable token by paying ETH
    function mint() external payable;

    // Owner functions
    /// @notice Add a new charity that can receive donations
    function addCharity(address charityAddress, string memory charityTitle, string memory charityUrl) external;
    /// @notice Toggle the active status of a charity
    function toggleActiveCharity(uint256 charityIndex) external;
    /// @notice Set the treasury address that receives platform fees
    function setTreasury(address treasuryAddress) external;
   
    /// @notice Set the ERC20 token used for rewards
    function setRewardToken(address rewardTokenAddress) external;
    /// @notice Set the minimum reward amount required
    function setMinReward(uint256 minRewardAmount) external;
    /// @notice Set the percentage of immediate reward given to finder
    function setImmediateRewardPercentage(uint256 immediateRewardBps) external;
    /// @notice Set the platform fee percentage
    function setMinFee(uint256 minFeeBps) external;
    /// @notice Set the charity fee percentage
    function setMinCharityFee(uint256 minCharityFeeBps) external;
    /// @notice Set the cooldown period between actions
    function setFoundCooldown(uint256 foundCooldownSeconds) external;
    function setReturnCooldown(uint256 returnCooldownSeconds) external;
    function setRevokeLostCooldown(uint256 revokeLostCooldownSeconds) external;
}