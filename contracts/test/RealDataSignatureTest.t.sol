// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/LAF.sol";
import {UniversalSigValidator} from "@signature-validator/contracts/EIP6492Full.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract RealDataSignatureTest is Test {
    LAF laf;
    UniversalSigValidator validator;
    
    // Real data from your logs
    string constant SECRET = "d82fb8c7ded15a22d87e22b8ac280ed0038d22d1563f7707f7dab144c21cfdce";
    address constant SECRET_HASH = 0x00BEeA21485D70c124227EF825f55BCcE530e4eb;
    bytes constant OWNER_SIGNATURE = hex"6820fb40bb07fb0673c20f15ea3f83e810056d0371228381aaea60824f8e88df3de7aa6cdee91116d358e01ca39f25c33b9a68327759f0616bf25b031651da391c";
    bytes constant FINDER_SIGNATURE = hex"47a12e893d40936d0a18e263dd81497633e0889f56448b15be205d07161523087a5ed56dde533a8ae66c32410388a0a94d6374d7c243a7d5e95e62531d6236de1b";
    
    address constant SMART_WALLET_ADDRESS = 0x6CcB878429415785C79EC81F2AC92b90190046EF;
    address constant CONTROLLING_EOA = 0xCb926Bde654F1C8D64C7B5c7004d85303762fdD4;
    address constant FINDER_ADDRESS = 0xB9aB0a323Ac33ea94c39fE1b6B15Fc2594f4D917;
    
    function setUp() public {
        // Deploy with mock ERC20 token address for testing
        address mockToken = address(0x1234567890123456789012345678901234567890);
        laf = new LAF(mockToken);
        validator = new UniversalSigValidator();
    }
    
    function testRealDataSignatureVerification() public {
        console.log("=== REAL DATA SIGNATURE DEBUG TEST ===");
        
        // Step 1: Verify the message hash matches
        bytes32 messageHash = keccak256(abi.encodePacked(SECRET));
        bytes32 expectedHash = 0xb39d0e06c1c68355bb19ecdb00beea21485d70c124227ef825f55bcce530e4eb;
        console.log("Secret:", SECRET);
        console.log("Computed message hash:", vm.toString(messageHash));
        console.log("Expected message hash:", vm.toString(expectedHash));
        console.log("Message hashes match:", messageHash == expectedHash);
        
        // Step 2: Test signature recovery
        bytes32 ethHash = MessageHashUtils.toEthSignedMessageHash(messageHash);
        console.log("Eth signed message hash:", vm.toString(ethHash));
        
        // Test owner signature recovery
        console.log("\n=== OWNER SIGNATURE ANALYSIS ===");
        address recoveredOwner = ECDSA.recover(ethHash, OWNER_SIGNATURE);
        console.log("Owner signature recovers to:", recoveredOwner);
        console.log("Expected smart wallet:", SMART_WALLET_ADDRESS);
        console.log("Expected controlling EOA:", CONTROLLING_EOA);
        console.log("Matches smart wallet?", recoveredOwner == SMART_WALLET_ADDRESS);
        console.log("Matches controlling EOA?", recoveredOwner == CONTROLLING_EOA);
        
        // Test finder signature recovery
        console.log("\n=== FINDER SIGNATURE ANALYSIS ===");
        address recoveredFinder = ECDSA.recover(ethHash, FINDER_SIGNATURE);
        console.log("Finder signature recovers to:", recoveredFinder);
        console.log("Expected finder address:", FINDER_ADDRESS);
        console.log("Matches finder?", recoveredFinder == FINDER_ADDRESS);
        
        // Step 3: Test contract verification logic
        console.log("\n=== CONTRACT VERIFICATION TESTS ===");
        
        // Test owner signature verification (should fail with smart wallet, pass with controlling EOA)
        console.log("Testing owner signature against smart wallet...");
        bool ownerSmartWalletSuccess = testVerificationSafely(SMART_WALLET_ADDRESS, messageHash, OWNER_SIGNATURE);
        console.log("Owner signature vs smart wallet:", ownerSmartWalletSuccess ? "PASS" : "FAIL");
        
        console.log("Testing owner signature against controlling EOA...");
        bool ownerEOASuccess = testVerificationSafely(CONTROLLING_EOA, messageHash, OWNER_SIGNATURE);
        console.log("Owner signature vs controlling EOA:", ownerEOASuccess ? "PASS" : "FAIL");
        
        // Test finder signature verification
        console.log("Testing finder signature against finder address...");
        bool finderSuccess = testVerificationSafely(FINDER_ADDRESS, messageHash, FINDER_SIGNATURE);
        console.log("Finder signature vs finder address:", finderSuccess ? "PASS" : "FAIL");
        
        // Step 4: Check contract detection
        console.log("\n=== CONTRACT DETECTION ===");
        console.log("Smart wallet is contract?", SMART_WALLET_ADDRESS.code.length > 0);
        console.log("Controlling EOA is contract?", CONTROLLING_EOA.code.length > 0);
        console.log("Finder is contract?", FINDER_ADDRESS.code.length > 0);
        
        // Step 5: Test the exact scenario that's failing
        console.log("\n=== EXACT FAILURE SCENARIO ===");
        console.log("This should match the exact contract call that's failing:");
        console.log("Secret hash:", vm.toString(SECRET_HASH));
        console.log("Secret:", SECRET);
        console.log("Owner signature length:", OWNER_SIGNATURE.length);
        console.log("Finder signature length:", FINDER_SIGNATURE.length);
        
        // Verify secret hash calculation
        address calculatedSecretHash = address(uint160(uint256(messageHash)));
        console.log("Calculated secret hash:", calculatedSecretHash);
        console.log("Expected secret hash:", SECRET_HASH);
        console.log("Secret hash matches:", calculatedSecretHash == SECRET_HASH);
    }
    
    function testVerificationSafely(
        address _signer,
        bytes32 _messageHash,
        bytes memory _signature
    ) internal returns (bool) {
        try validator.isValidSigWithSideEffects(_signer, _messageHash, _signature) returns (bool isValid) {
            return isValid;
        } catch Error(string memory reason) {
            console.log("Verification failed with reason:", reason);
            return false;
        } catch {
            console.log("Verification failed with unknown error");
            return false;
        }
    }
    
    function testFullFoundFlow() public {
        console.log("\n=== TESTING FULL FOUND FLOW ===");
        
        // This test simulates the exact _verifySecret call that's failing
        bytes32 messageHash = keccak256(abi.encodePacked(SECRET));
        
        console.log("Testing _verifySecret logic step by step:");
        console.log("1. Message hash calculation:", vm.toString(messageHash));
        
        // Test secret hash validation
        address hashAsAddress = address(uint160(uint256(messageHash)));
        console.log("2. Secret hash validation:");
        console.log("   Calculated:", hashAsAddress);
        console.log("   Expected:", SECRET_HASH);
        console.log("   Valid:", hashAsAddress == SECRET_HASH);
        
        // Test owner signature (this is where it's likely failing)
        console.log("3. Owner signature verification:");
        bool ownerValid = testVerificationSafely(SMART_WALLET_ADDRESS, messageHash, OWNER_SIGNATURE);
        console.log("   Result:", ownerValid ? "PASS" : "FAIL");
        
        // Test finder signature
        console.log("4. Finder signature verification:");
        bool finderValid = testVerificationSafely(FINDER_ADDRESS, messageHash, FINDER_SIGNATURE);
        console.log("   Result:", finderValid ? "PASS" : "FAIL");
        
        console.log("\nOverall flow would:", (ownerValid && finderValid) ? "SUCCEED" : "FAIL");
    }

    // Helper function to test signature validation using AmbireTech validator
    function validateSignature(
        address _signer,
        bytes32 _messageHash,
        bytes memory _signature
    ) internal {
        bool isValid = validator.isValidSigWithSideEffects(_signer, _messageHash, _signature);
        require(isValid, "Signature validation failed");
    }
}
