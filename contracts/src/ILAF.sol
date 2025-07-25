// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./Config.sol";


/// @title ILAF - Interface for the LAF contract
/// @notice Defines all external and public functions available in the LAF contract
/// @dev Used for type-safe interactions with the LAF contract
interface ILAF {

    // View functions

    /// @notice Get the address of the item implementation contract used for cloning
    /// @dev This is the master contract that all item instances are cloned from
    /// @return The address of the LAFItem implementation contract
    function itemImplementation() external view returns (address);
    
    /// @notice Get the deployed item contract address for a given secret hash
    /// @dev Returns zero address if no item exists for the given secret hash
    /// @param secretHash The hash of the secret used to identify the item
    /// @return The address of the deployed item contract
    function items(address secretHash) external view returns (address);

    /// @notice Get information about a charity at a specific index
    /// @dev Reverts if the charity index doesn't exist
    /// @param index The index of the charity in the charities mapping
    /// @return active Whether the charity is currently accepting donations
    /// @return contractAddress The address of the charity contract
    /// @return donated The total amount donated to this charity
    /// @return title The display name of the charity
    /// @return url The website URL of the charity
    function charities(uint256 index) external view returns (
        bool active,
        address contractAddress,
        uint256 donated,
        string memory title,
        string memory url
    );
    
    /// @notice Get the count of items that have been registered
    /// @return The number of items in 'Registered' status
    function registeredCount() external view returns (uint256);
    
    /// @notice Get the count of items that have been marked as lost
    /// @return The number of items in 'Lost' status
    function lostCount() external view returns (uint256);
    
    /// @notice Get the count of items that have been found
    /// @return The number of items in 'Found' status
    function foundCount() external view returns (uint256);
    
    /// @notice Get the count of items marked as returned
    function returnedCount() external view returns (uint256);
    
    /// @notice Get the count of items marked as non-return
    function nonReturnCount() external view returns (uint256);
    
    /// @notice Get the total number of charities registered in the system
    /// @return The total count of registered charities
    function charitiesCount() external view returns (uint256);
    
    /// @notice Get the count of support rewards given
    function supportRewardsCount() external view returns (uint256);

    /// @notice Get the total amount of rewards distributed
    function rewardsDistributed() external view returns (uint256);
    
    /// @notice Get the total amount of charity fees distributed
    function charityFeesDistributed() external view returns (uint256);
    
    /// @notice Get the total amount of platform fees distributed
    function feesDistributed() external view returns (uint256);
    
    /// @notice Get the total amount of delegate fees distributed
    function delegateFeesDistributed() external view returns (uint256);
    
    /// @notice Get the total amount of support rewards distributed
    function supportRewardsDistributed() external view returns (uint256);
    
    /// @notice Get the total amount of support rewards
    function supportRewards() external view returns (uint256);

    /// @notice Get the current configuration data shared between factory and clones
    function config() external view returns (Config.ConfigData memory);

    /// @notice Get the treasury address that receives platform fees
    function treasury() external view returns (address);
    
    /// @notice Get royalty information for NFT marketplaces (ERC2981)
    function royaltyInfo(uint256 tokenId, uint256 salePrice) external view returns (address, uint256);
    
    /// @notice Check if the contract supports a specific interface
    function supportsInterface(bytes4 interfaceId) external view returns (bool);


    // Core Lost and Found Mechanics
    
    /// @notice Register a new item in the LAF system
    /// @dev Creates a new item contract and initializes it with the provided data
    /// @param _secretHash The hash of the secret used to identify the item
    /// @param _comment Description or comment about the item
    function registerItem(
        address _secretHash,
        string calldata _comment
    ) external;
    
    /// @notice Mark an item as lost and set a reward for finding it
    /// @dev Transfers reward tokens from caller to the item contract
    /// @param _secretHash The hash identifying the item to mark as lost
    /// @param _rewardAmount Amount of reward tokens offered for finding the item
    /// @param _geo Geohash of the last known location where the item was lost
    function lost(
        address _secretHash,
        uint256 _rewardAmount,
        string calldata _geo
    ) external;
    
    /// @notice Mark an item as found by providing a valid signature
    /// @dev Verifies the signature against the secret hash to prove knowledge of the secret
    /// @param _secretHash Hash of the secret used to identify the item
    /// @param _signature Signature proving knowledge of the secret
    function found(
        address _secretHash,
        bytes calldata _signature
    ) external;
    
    /// @notice Mark an item as successfully returned to its owner
    /// @dev Distributes rewards and fees according to the specified parameters
    /// @param _secretHash The hash identifying the item being returned
    /// @param _charityIndex Index of the charity to receive a portion of the reward
    /// @param _charityFee Percentage of reward to donate to charity (in basis points)
    /// @param _fee Percentage of reward for platform fee (in basis points)
    function returned(
        address _secretHash,
        uint256 _charityIndex,
        uint256 _charityFee,
        uint256 _fee
    ) external;
    
    /// @notice Revoke the lost status of an item and reclaim the reward
    /// @dev Only callable by item owner after cooldown period. Returns escrowed tokens
    /// @param _secretHash The hash identifying the item to revoke lost status for
    function revokeLost(address _secretHash) external;
    
    /// @notice Mark an item as a non-return (failed to return after being found)
    /// @dev Can be called by owner or finder after cooldown periods. Applies penalties
    /// @param _secretHash The hash identifying the item to mark as non-return
    function nonReturn(address _secretHash) external;
    
    /// @notice Support an item by adding to its reward pool
    /// @dev Allows anyone to contribute additional reward tokens to a lost item
    /// @param _secretHash The hash identifying the item to support
    /// @param _amount Amount of tokens to add to the reward pool
    function support(address _secretHash, uint256 _amount) external;

    // Admin Functions (Owner Only)
    
    /// @notice Add a new charity that can receive donations from the LAF system
    /// @dev Only callable by contract owner. Charity must have a valid contract address
    /// @param charityAddress The contract address of the charity to add
    /// @param charityTitle The display name of the charity
    /// @param charityUrl The website URL of the charity for more information
    function addCharity(
        address charityAddress,
        string memory charityTitle,
        string memory charityUrl
    ) external;
    
    /// @notice Toggle the active status of a charity
    /// @dev Only callable by contract owner. Inactive charities cannot receive new donations
    /// @param charityIndex The index of the charity to toggle active status for
    function toggleActiveCharity(uint256 charityIndex) external;
    
    /// @notice Set the treasury address that receives platform fees
    /// @dev Only callable by contract owner. Treasury receives percentage of all rewards
    /// @param _treasury The new treasury address to receive platform fees
    function setTreasury(address _treasury) external;
    
    /// @notice Set the minimum reward amount required when marking items as lost
    /// @dev Only callable by contract owner. Prevents spam with tiny rewards
    /// @param minRewardAmount The minimum reward amount in reward token units
    function setMinReward(uint256 minRewardAmount) external;
    
    /// @notice Set the percentage of reward given immediately to finder upon found
    /// @dev Only callable by contract owner. Remainder is held until return
    /// @param immediateRewardBps The percentage in basis points (e.g., 5000 = 50%)
    function setImmediateRewardPercentage(uint256 immediateRewardBps) external;
    
    /// @notice Set the minimum platform fee percentage
    /// @dev Only callable by contract owner. Fee is taken from rewards
    /// @param minFeeBps The minimum fee percentage in basis points (e.g., 250 = 2.5%)
    function setMinFee(uint256 minFeeBps) external;
    
    /// @notice Set the minimum charity fee percentage
    /// @dev Only callable by contract owner. Charity fee is taken from rewards
    /// @param minCharityFeeBps The minimum charity fee in basis points (e.g., 100 = 1%)
    function setMinCharityFee(uint256 minCharityFeeBps) external;
    
    /// @notice Set the cooldown period before items can be returned after being found
    /// @dev Only callable by contract owner. Prevents immediate returns
    /// @param returnCooldownSeconds The cooldown period in seconds
    function setReturnCooldown(uint256 returnCooldownSeconds) external;
    
    /// @notice Set the cooldown period before lost status can be revoked
    /// @dev Only callable by contract owner. Prevents immediate revocation after lost
    /// @param revokeLostCooldownSeconds The cooldown period in seconds
    function setRevokeLostCooldown(uint256 revokeLostCooldownSeconds) external;

    /// @notice Update the reward token and automatically fetch its decimals and reset all counters
    /// @dev Only callable by contract owner. Validates token contract and fetches decimals
    /// @param _rewardToken The address of the new ERC20 token to use for rewards
    function updateRewardToken(address _rewardToken) external;


    // Utility Functions
    
    /// @notice Mint a special commemorative transferable achievement token
    /// @dev Payable function that requires ETH payment. Creates transferable NFT
    function mint() external payable;

    /// @notice Simple ping function for testing contract responsiveness
    /// @dev Emits a Pong event with the caller's address
    function ping() external;

}