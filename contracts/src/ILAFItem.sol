// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;


/// @title ILAFItem - External interface for LAFItem contracts
/// @notice Defines the public API for external integrations
/// @dev Focused interface for type-safe external interactions
interface ILAFItem {
    
    // View functions for external integrations

    /// @notice Get the address of the item owner
    function owner() external view returns (address);
   
    /// @notice Get the address of the finder (if item has been found)
    /// @return The address of the account that found this item, or zero address if not found
    function finder() external view returns (address);
    
    /// @notice Get the address of the delegate (if one is set)
    /// @return The address authorized to act on behalf of the owner, or zero address if none
    function delegate() external view returns (address);
    
    /// @notice Get the secret hash that identifies this item
    /// @return The address derived from the secret used to register this item
    function secretHash() external view returns (address);
    
    /// @notice Get the descriptive comment about this item
    /// @return The comment string provided by the owner describing the item
    function comment() external view returns (string memory);
    
    /// @notice Get the geohash of the last known location for this item
    /// @return The geohash string containing location data where the item was lost/found
    function geo() external view returns (string memory);
    
    /// @notice Get the current status of the item
    /// @return The status enum value (None, Registered, Lost, Found, Returned)
    function status() external view returns (uint8);
 
    /// @notice Get the current reward amount offered for finding this item
    /// @return The reward amount in the configured ERC20 token
    function reward() external view returns (uint256);
    
    /// @notice Get the amount of support reward accumulated for this item
    /// @return The support reward amount in the configured ERC20 token
    function supportReward() external view returns (uint256);
    
    /// @notice Get the amount of immediate reward already paid to finder
    /// @return The immediate reward amount already transferred
    function immediateRewardPaid() external view returns (uint256);
    
    /// @notice Get the current cycle number (increments on return to prevent replay attacks)
    /// @return The cycle number used for signature verification
    function cycle() external view returns (uint256);
       
    /// @notice Get the timestamp when the item status was last updated
    /// @return The Unix timestamp of the last status change
    function statusUpdatedTs() external view returns (uint256);
    
    /// @notice Get the timestamp when the item details were last updated
    /// @return The Unix timestamp of the last comment/geo modification
    function detailsUpdatedTs() external view returns (uint256);
    
    /// @notice Get the timestamp when the delegate was last updated
    /// @return The Unix timestamp of the last delegate modification
    function delegateUpdatedTs() external view returns (uint256);
    
    /// @notice Get the fee percentage that goes to the delegate
    /// @return The delegate fee in basis points (e.g., 500 = 5%)
    function delegateFee() external view returns (uint256);
    
    /// @notice Get the ERC20 token used for rewards
    /// @return The token contract interface
    function token() external view returns (address);
    
    /// @notice Get the factory contract address
    /// @return The address of the LAF factory contract
    function factory() external view returns (address);
    

    // Owner-callable functions for external integrations

    /// @notice Update the reward amount offered for finding this item
    /// @dev Only callable by the item owner or delegate
    /// @param _rewardAmount The new reward amount in the configured ERC20 token
    function updateReward(uint256 _rewardAmount) external;
    
    /// @notice Update the descriptive details of this item
    /// @dev Only callable by the item owner or delegate
    /// @param _comment The new descriptive comment about the item
    /// @param _geo The new geohash of last known location
    function updateDetails(string calldata _comment, string calldata _geo) external;
    
    /// @notice Set or update the delegate for this item
    /// @dev Only callable by the item owner. Delegate can act on behalf of owner
    /// @param _delegate The address to authorize as delegate, or zero address to remove
    /// @param _delegateFee The fee percentage for delegate in basis points (e.g., 500 = 5%)
    function updateDelegate(address _delegate, uint256 _delegateFee) external;
    
    /// @notice Withdraw any remaining reward tokens from this item
    /// @dev Only callable by the item owner. Useful for reclaiming unused rewards
    function withdraw() external;
}
