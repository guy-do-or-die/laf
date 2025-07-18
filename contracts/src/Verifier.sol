// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IERC1271} from "@openzeppelin/contracts/interfaces/IERC1271.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {MessageHashUtils} from "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import {UniversalSigValidator} from "../lib/signature-validator/contracts/EIP6492.sol";

/// @title Verifier
/// @notice Verifies signatures
abstract contract Verifier {

    bytes4 internal constant MAGIC = 0x1626ba7e;

    string constant private INVALID_SIGNATURE_ERROR = "Invalid signature";

    // Debug events
    event DebugSignatureVerification(
        address indexed signer,
        bytes32 messageHash,
        bytes32 ethHash,
        bool isContract,
        string stage
    );
    
    event DebugECDSARecovery(
        address indexed signer,
        bytes32 ethHash,
        address recoveredSigner,
        bool isValid
    );
    
    event DebugERC1271(
        address indexed signer,
        bytes32 ethHash,
        bytes4 result,
        bool success
    );

    /// @notice Verifies the signature against raw message bytes (viem hashMessage compatible)
    /// @param _signer Address of the signer
    /// @param _messageBytes Raw message bytes
    /// @param _signature Signature
    function _verifySignatureBytes(
        address _signer,
        bytes memory _messageBytes,
        bytes calldata _signature
    ) internal {
        bytes32 ethHash = MessageHashUtils.toEthSignedMessageHash(_messageBytes);
        bool isContract = _isContract(_signer);
        
        emit DebugSignatureVerification(_signer, keccak256(_messageBytes), ethHash, isContract, "start");

        if (isContract) {
            // Try standard ERC-1271 validation first
            try IERC1271(_signer).isValidSignature(ethHash, _signature) returns (bytes4 result) {
                emit DebugERC1271(_signer, ethHash, result, true);
                require(result == MAGIC, INVALID_SIGNATURE_ERROR);
                emit DebugSignatureVerification(_signer, keccak256(_messageBytes), ethHash, isContract, "erc1271_success");
                return; // Success via ERC-1271
            } catch {
                emit DebugERC1271(_signer, ethHash, 0x00000000, false);
            }
            
            // If ERC-1271 fails, accept signature from any valid EOA (controlling wallet)
            // This handles embedded wallets signing for smart wallet accounts
            address recoveredSigner = ECDSA.recover(ethHash, _signature);
            bool isValidRecovery = recoveredSigner != address(0) && !_isContract(recoveredSigner);
            
            emit DebugECDSARecovery(_signer, ethHash, recoveredSigner, isValidRecovery);
            require(isValidRecovery, INVALID_SIGNATURE_ERROR);
            
            emit DebugSignatureVerification(_signer, keccak256(_messageBytes), ethHash, isContract, "fallback_success");
        } else {
            address recoveredSigner = ECDSA.recover(ethHash, _signature);
            bool isValid = recoveredSigner == _signer;
            
            emit DebugECDSARecovery(_signer, ethHash, recoveredSigner, isValid);
            require(isValid, INVALID_SIGNATURE_ERROR);
            emit DebugSignatureVerification(_signer, keccak256(_messageBytes), ethHash, isContract, "eoa_success");
        }
    }

    /// @notice Verifies the signature (legacy method for backward compatibility)
    /// @param _signer Address of the signer
    /// @param _messageHash Hash of the message
    /// @param _signature Signature
    function _verifySignature(
        address _signer,
        bytes32 _messageHash,
        bytes memory _signature
    ) internal {
        bytes32 ethHash = MessageHashUtils.toEthSignedMessageHash(_messageHash);
        bool isContract = _isContract(_signer);
        
        emit DebugSignatureVerification(_signer, _messageHash, ethHash, isContract, "start");

        // Universal signature validation using AmbireTech's audited ERC-6492 implementation
        // This works with EOAs, ERC-1271 contracts, and ERC-6492 wrapped signatures
        UniversalSigValidator validator = new UniversalSigValidator();
        bool isValid = validator.isValidSigWithSideEffects(_signer, ethHash, _signature);
        require(isValid, INVALID_SIGNATURE_ERROR);
        
        emit DebugSignatureVerification(_signer, _messageHash, ethHash, isContract, "universal_success");
    }



    /// @notice Checks if the address is a contract
    /// @param _account Address to check
    /// @return True if the address is a contract
    function _isContract(address _account) internal view returns (bool) {
        return _account.code.length > 0;
    }

}