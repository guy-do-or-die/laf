// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/// @title Errors
/// @notice Using custom errors
/// @dev Using custom errors for better readability, maintainability and gas efficiency
library LAFErrors {
    
    // === Configuration Errors ===
    error IncorrectValue();
    error InvalidRange(uint256 value, uint256 min, uint256 max);
    error ZeroAddress();
    
    // === Access Control Errors ===
    error OnlyFactory();
    error OnlyOwner();
    error InvalidSender();
    
    // === State Errors ===
    error InvalidStatus();
    error CooldownNotMet(uint256 timeRemaining);
    error ItemAlreadyExists();
    error ItemDoesNotExist();
    
    // === Value Errors ===
    error EmptyValue();
    error InvalidValue();
    error RewardTooLow(uint256 provided, uint256 minimum);
    error InsufficientBalance(uint256 required, uint256 available);
    
    // === Fee Errors ===
    error InvalidCharityFee(uint256 fee, uint256 min, uint256 max);
    error InvalidFee(uint256 fee, uint256 min, uint256 max);
    error InvalidDelegateFee(uint256 fee, uint256 min, uint256 max);
    
    // === Signature Errors ===
    error InvalidOwnerSignature();
    error InvalidFinderSignature();
    error InvalidSecret();
    
    // === Charity Errors ===
    error InvalidCharity();
    error CharityNotActive();
    
    // === Token Errors ===
    error InsufficientTokenBalance();
    error NonTransferableToken();
    error TransferFailed();
    
    // === General Errors ===
    error OperationFailed();
    error UnauthorizedAccess();
}
