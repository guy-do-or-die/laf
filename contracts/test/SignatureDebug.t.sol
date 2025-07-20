// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Test.sol";
import "forge-std/console.sol";

import "../src/LAF.sol";

import "@signature-validator/contracts/EIP6492Full.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";


contract SignatureDebugTest is Test {
    UniversalSigValidator validator;
    
    // Test data from your logs
    string constant SECRET = "c37b772934f3dd537ec1bb6716a44fb831f8b0ff30d325bf835cc665415935a4";
    bytes constant OWNER_SIGNATURE = hex"db8146b956ba1b8a4c4153b9e109476aeb9d2a9bb23276b315cbebae70f66ca24c9a89aa96d590e5ecd606611fb585768e56d6b067c44486045a6cf755d8aa6d1b";
    bytes constant FINDER_SIGNATURE = hex"f4f2bc8f9fcfa4e88e06058de4fd615ac5086ce64fa4b87614240383632b79bd658ac5c0b393c0618d5f7505f0afb8f6e12f3c8a9aac9e908807486bf483e55d1c";
    
    address constant SMART_WALLET_ADDRESS = 0x6CcB878429415785C79EC81F2AC92b90190046EF;
    address constant CONTROLLING_EOA = 0x3e648b54E56659DC7ee184a8C084e08B05B20FcA;
    address constant FINDER_ADDRESS = 0xB9aB0a323Ac33ea94c39fE1b6B15Fc2594f4D917;
    
    function setUp() public {
        validator = new UniversalSigValidator();
    }
    
    function testDebugSignatureVerification() public {
        console.log("=== SIGNATURE DEBUG TEST ===");
        
        // Step 1: Recreate the message hash exactly as the contract does
        bytes32 messageHash = keccak256(abi.encodePacked(SECRET));
        console.log("Secret:", SECRET);
        console.logBytes32(messageHash);
        console.log("Message hash:", vm.toString(messageHash));
        
        // Step 2: Create the eth signed message hash (what contract uses)
        bytes32 ethHash = MessageHashUtils.toEthSignedMessageHash(messageHash);
        console.log("Eth signed message hash:", vm.toString(ethHash));
        
        // Step 3: Test owner signature recovery
        console.log("\n=== OWNER SIGNATURE RECOVERY ===");
        address recoveredOwner = ECDSA.recover(ethHash, OWNER_SIGNATURE);
        console.log("Owner signature length:", OWNER_SIGNATURE.length);
        console.log("Recovered address:", recoveredOwner);
        console.log("Expected smart wallet:", SMART_WALLET_ADDRESS);
        console.log("Expected controlling EOA:", CONTROLLING_EOA);
        console.log("Matches smart wallet?", recoveredOwner == SMART_WALLET_ADDRESS);
        console.log("Matches controlling EOA?", recoveredOwner == CONTROLLING_EOA);
        
        // Step 4: Test finder signature recovery
        console.log("\n=== FINDER SIGNATURE RECOVERY ===");
        address recoveredFinder = ECDSA.recover(ethHash, FINDER_SIGNATURE);
        console.log("Finder signature length:", FINDER_SIGNATURE.length);
        console.log("Recovered address:", recoveredFinder);
        console.log("Expected finder address:", FINDER_ADDRESS);
        console.log("Matches finder?", recoveredFinder == FINDER_ADDRESS);
        
        // Step 5: Test the actual verification logic
        console.log("\n=== TESTING VERIFICATION LOGIC ===");
        
        // Test owner signature (should fail because smart wallet != controlling EOA)
        console.log("Testing owner signature verification...");
        bool ownerSuccess = testVerificationSafely(SMART_WALLET_ADDRESS, messageHash, OWNER_SIGNATURE);
        if (ownerSuccess) {
            console.log("[PASS] Owner signature verification PASSED");
        } else {
            console.log("[FAIL] Owner signature verification FAILED");
        }
        
        // Test finder signature
        console.log("Testing finder signature verification...");
        bool finderSuccess = testVerificationSafely(FINDER_ADDRESS, messageHash, FINDER_SIGNATURE);
        if (finderSuccess) {
            console.log("[PASS] Finder signature verification PASSED");
        } else {
            console.log("[FAIL] Finder signature verification FAILED");
        }
        
        // Step 6: Test if controlling EOA signature would work
        console.log("\n=== TESTING CONTROLLING EOA DIRECTLY ===");
        bool eoaSuccess = testVerificationSafely(CONTROLLING_EOA, messageHash, OWNER_SIGNATURE);
        if (eoaSuccess) {
            console.log("[PASS] Controlling EOA signature verification PASSED");
        } else {
            console.log("[FAIL] Controlling EOA signature verification FAILED");
        }
        
        // Step 7: Check if addresses are contracts
        console.log("\n=== CONTRACT DETECTION ===");
        console.log("Smart wallet is contract?", SMART_WALLET_ADDRESS.code.length > 0);
        console.log("Controlling EOA is contract?", CONTROLLING_EOA.code.length > 0);
        console.log("Finder is contract?", FINDER_ADDRESS.code.length > 0);
    }
    
    function testVerificationSafely(
        address _signer,
        bytes32 _messageHash,
        bytes memory _signature
    ) internal returns (bool) {
        try validator.isValidSigWithSideEffects(_signer, _messageHash, _signature) returns (bool isValid) {
            return isValid;
        } catch {
            return false;
        }
    }
    
    function testRawHashRecovery() public {
        console.log("\n=== RAW HASH RECOVERY TEST ===");
        
        // Test recovery with raw message hash (no eth prefix)
        bytes32 messageHash = keccak256(abi.encodePacked(SECRET));
        
        // Use a low-level call to avoid reverting the test
        (bool success, bytes memory result) = address(this).call(
            abi.encodeWithSignature("recoverAddressSafely(bytes32,bytes)", messageHash, OWNER_SIGNATURE)
        );
        
        if (success) {
            address recoveredOwner = abi.decode(result, (address));
            console.log("Raw hash recovery (owner):", recoveredOwner);
            console.log("Raw hash matches controlling EOA?", recoveredOwner == CONTROLLING_EOA);
        } else {
            console.log("[FAIL] Raw hash recovery failed");
        }
    }
    
    function recoverAddressSafely(bytes32 hash, bytes memory signature) external pure returns (address) {
        return ECDSA.recover(hash, signature);
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
