// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "forge-std/Test.sol";
import "../lib/signature-validator/contracts/EIP6492Full.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract ProductionSmartWalletTest is Test {
    UniversalSigValidator validator;
    
    // Your actual smart wallet from production
    address constant SMART_WALLET = 0x6CcB878429415785C79EC81F2AC92b90190046EF;
    string constant SECRET = "d82fb8c7ded15a22d87e22b8ac280ed0038d22d1563f7707f7dab144c21cfdce";
    bytes constant OWNER_SIGNATURE = hex"6820fb40bb07fb0673c20f15ea3f83e810056d0371228381aaea60824f8e88df3de7aa6cdee91116d358e01ca39f25c33b9a68327759f0616bf25b031651da391c";
    
    bytes4 constant ERC1271_SUCCESS = 0x1626ba7e;
    
    function setUp() public {
        validator = new UniversalSigValidator();
        
        // Fork Base Sepolia to test with real smart wallet
        vm.createFork("https://sepolia.base.org");
    }
    
    function testProductionSmartWalletValidation() public {
        console.log("=== Production Smart Wallet Test ===");
        console.log("Smart Wallet:", SMART_WALLET);
        console.log("Secret:", SECRET);
        
        // Check if smart wallet is deployed on Base Sepolia
        uint256 codeSize;
        assembly {
            codeSize := extcodesize(SMART_WALLET)
        }
        console.log("Smart wallet code size on Base Sepolia:", codeSize);
        
        if (codeSize == 0) {
            console.log("Smart wallet not deployed on Base Sepolia");
            return;
        }
        
        // Test the exact same validation our contract would use
        bytes32 ethHash = MessageHashUtils.toEthSignedMessageHash(bytes(SECRET));
        console.log("EIP-191 Hash:", vm.toString(ethHash));
        
        // Test UniversalSigValidator (what our contract uses)
        console.log("\n--- UniversalSigValidator Test ---");
        try validator.isValidSigWithSideEffects(SMART_WALLET, ethHash, OWNER_SIGNATURE) returns (bool result) {
            console.log("UniversalSigValidator result:", result);
            if (result) {
                console.log("[SUCCESS] Smart wallet signature validation passed!");
            } else {
                console.log("[FAILED] Smart wallet signature validation failed");
            }
        } catch Error(string memory reason) {
            console.log("[ERROR] UniversalSigValidator reverted:", reason);
        } catch (bytes memory lowLevelData) {
            console.log("[ERROR] UniversalSigValidator reverted with data:");
            console.logBytes(lowLevelData);
        }
        
        // Test direct ERC-1271 call
        console.log("\n--- Direct ERC-1271 Test ---");
        try IERC1271Wallet(SMART_WALLET).isValidSignature(ethHash, OWNER_SIGNATURE) returns (bytes4 result) {
            console.log("Direct ERC-1271 result:", vm.toString(result));
            if (result == ERC1271_SUCCESS) {
                console.log("[SUCCESS] Direct ERC-1271 validation passed!");
            } else {
                console.log("[FAILED] Direct ERC-1271 returned wrong magic value");
            }
        } catch Error(string memory reason) {
            console.log("[ERROR] Direct ERC-1271 reverted:", reason);
        } catch (bytes memory lowLevelData) {
            console.log("[ERROR] Direct ERC-1271 reverted with data:");
            console.logBytes(lowLevelData);
        }
    }
    
    function testWithControllingEOAKey() public {
        // If you can provide the controlling EOA private key, we can test signature creation
        console.log("=== Controlling EOA Signature Test ===");
        console.log("Note: This test would require the controlling EOA private key");
        console.log("If available, we could:");
        console.log("1. Sign the message with the controlling EOA");
        console.log("2. Test if the smart wallet validates it via ERC-1271");
        console.log("3. Verify the full end-to-end flow");
    }
}
