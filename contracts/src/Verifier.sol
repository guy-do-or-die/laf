// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";


interface IERC1271 {
    function isValidSignature(bytes32 hash, bytes calldata signature) external view returns (bytes4 magicValue);
}

/// @title Verifier
/// @notice Verifies signatures
abstract contract Verifier {

    bytes4 internal constant MAGIC = 0x1626ba7e;

    string constant private INVALID_SIGNATURE_ERROR = "Invalid signature";

    /// @notice Verifies the signature
    /// @param _signer Address of the signer
    /// @param _messageHash Hash of the message
    /// @param _signature Signature
    function _verifySignature(
        address _signer,
        bytes32 _messageHash,
        bytes calldata _signature
    ) internal view {
        if (_isContract(_signer)) {
            require(IERC1271(_signer).isValidSignature(_messageHash, _signature) == MAGIC, INVALID_SIGNATURE_ERROR);
        } else {
            require(ECDSA.recover(_messageHash, _signature) == _signer, INVALID_SIGNATURE_ERROR);
        }
    }

    /// @notice Checks if the address is a contract
    /// @param _account Address to check
    /// @return True if the address is a contract
    function _isContract(address _account) internal view returns (bool) {
        return _account.code.length > 0;
    }

}