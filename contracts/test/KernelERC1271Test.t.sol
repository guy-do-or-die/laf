// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "forge-std/Test.sol";
import "../src/LAF.sol";
import "../lib/signature-validator/contracts/EIP6492Full.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract KernelERC1271Test is Test {
    LAF laf;
    UniversalSigValidator validator;
    
    // Real production data from the failing transaction
    address constant SMART_WALLET = 0x6CcB878429415785C79EC81F2AC92b90190046EF;
    address constant CONTROLLING_EOA = 0xCb926Bde654F1C8D64C7B5c7004d85303762fdD4;
    string constant SECRET = "d82fb8c7ded15a22d87e22b8ac280ed0038d22d1563f7707f7dab144c21cfdce";
    bytes constant OWNER_SIGNATURE = hex"6820fb40bb07fb0673c20f15ea3f83e810056d0371228381aaea60824f8e88df3de7aa6cdee91116d358e01ca39f25c33b9a68327759f0616bf25b031651da391c";
    bytes constant FINDER_SIGNATURE = hex"47a12e893d40936d0a18e263dd81497633e0889f56448b15be205d07161523087a5ed56dde533a8ae66c32410388a0a94d6374d7c243a7d5e95e62531d6236de1b";
    
    bytes4 constant ERC1271_SUCCESS = 0x1626ba7e;
    
    function setUp() public {
        // Deploy with mock ERC20 token address for testing
        address mockToken = address(0x1234567890123456789012345678901234567890);
        laf = new LAF(mockToken);
        validator = new UniversalSigValidator();
    }
    
    function testKernelSignatureValidation() public {
        console.log("=== Kernel Smart Wallet ERC-1271 Validation Test ===");
        console.log("Smart Wallet:", SMART_WALLET);
        console.log("Controlling EOA:", CONTROLLING_EOA);
        console.log("Secret:", SECRET);
        
        // Test the hash format we're using
        bytes32 ethHash = MessageHashUtils.toEthSignedMessageHash(bytes(SECRET));
        console.log("EIP-191 Hash:", vm.toString(ethHash));
        
        // Check smart wallet deployment status
        uint256 codeSize;
        assembly {
            codeSize := extcodesize(SMART_WALLET)
        }
        console.log("Smart wallet code size:", codeSize);
        
        if (codeSize == 0) {
            console.log("Smart wallet not deployed on this network - cannot test ERC-1271");
            return;
        }
        
        // Test 1: Direct ERC-1271 call to smart wallet
        console.log("\n--- Direct ERC-1271 Call Test ---");
        testDirectERC1271Call(ethHash);
        
        // Test 2: UniversalSigValidator call
        console.log("\n--- UniversalSigValidator Test ---");
        testUniversalSigValidator(ethHash);
        
        // Test 3: LAF contract validation would be tested in integration tests
        console.log("\n--- Note: LAF validation tested via integration tests ---");
        
        // Test 4: Signature recovery analysis
        console.log("\n--- Signature Recovery Analysis ---");
        testSignatureRecovery(ethHash);
    }
    
    function testDirectERC1271Call(bytes32 hash) internal {
        try IERC1271Wallet(SMART_WALLET).isValidSignature(hash, OWNER_SIGNATURE) returns (bytes4 result) {
            console.log("ERC-1271 result:", vm.toString(result));
            console.log("Expected magic value:", vm.toString(ERC1271_SUCCESS));
            
            if (result == ERC1271_SUCCESS) {
                console.log("[SUCCESS] Direct ERC-1271 validation passed!");
            } else {
                console.log("[FAILED] Direct ERC-1271 returned wrong magic value");
            }
        } catch Error(string memory reason) {
            console.log("[ERROR] Direct ERC-1271 call reverted with reason:", reason);
        } catch (bytes memory lowLevelData) {
            console.log("[ERROR] Direct ERC-1271 call reverted with low-level data:");
            console.logBytes(lowLevelData);
        }
    }
    
    function testUniversalSigValidator(bytes32 hash) internal {
        try validator.isValidSigWithSideEffects(SMART_WALLET, hash, OWNER_SIGNATURE) returns (bool result) {
            console.log("UniversalSigValidator result:", result);
            if (result) {
                console.log("[SUCCESS] UniversalSigValidator validation passed!");
            } else {
                console.log("[FAILED] UniversalSigValidator validation failed");
            }
        } catch Error(string memory reason) {
            console.log("[ERROR] UniversalSigValidator reverted with reason:", reason);
        } catch (bytes memory lowLevelData) {
            console.log("[ERROR] UniversalSigValidator reverted with low-level data:");
            console.logBytes(lowLevelData);
        }
    }
    

    
    function testSignatureRecovery(bytes32 hash) internal {
        console.log("Signature length:", OWNER_SIGNATURE.length);
        console.log("Hash being signed:", vm.toString(hash));
        console.log("Smart wallet address:", SMART_WALLET);
        console.log("Controlling EOA address:", CONTROLLING_EOA);
        
        // Note: Signature component extraction would require more complex handling
        // The key insight is that Privy smart wallet signatures are created by controlling EOAs
        // but should be validated by the smart wallet's ERC-1271 implementation
        console.log("[INFO] Signature analysis shows Privy pattern: EOA signs, smart wallet validates");
    }
    
    function testDifferentHashFormats() public {
        console.log("\n=== Testing Different Hash Formats ===");
        
        uint256 codeSize;
        assembly {
            codeSize := extcodesize(SMART_WALLET)
        }
        
        if (codeSize == 0) {
            console.log("Smart wallet not deployed - skipping hash format tests");
            return;
        }
        
        // Test 1: EIP-191 prefixed hash (current approach)
        bytes32 eip191Hash = MessageHashUtils.toEthSignedMessageHash(bytes(SECRET));
        console.log("Testing EIP-191 hash:", vm.toString(eip191Hash));
        testHashFormat(eip191Hash, "EIP-191 prefixed");
        
        // Test 2: Raw keccak256 hash
        bytes32 rawHash = keccak256(bytes(SECRET));
        console.log("Testing raw hash:", vm.toString(rawHash));
        testHashFormat(rawHash, "Raw keccak256");
        
        // Test 3: Packed encoding hash
        bytes32 packedHash = keccak256(abi.encodePacked(SECRET));
        console.log("Testing packed hash:", vm.toString(packedHash));
        testHashFormat(packedHash, "Packed encoding");
    }
    
    function testHashFormat(bytes32 hash, string memory description) internal {
        console.log("\n--- Testing", description, "---");
        
        try IERC1271Wallet(SMART_WALLET).isValidSignature(hash, OWNER_SIGNATURE) returns (bytes4 result) {
            if (result == ERC1271_SUCCESS) {
                console.log("[SUCCESS]", description, "validation passed!");
            } else {
                console.log("[FAILED]", description, "returned wrong magic value");
            }
        } catch {
            console.log("[ERROR]", description, "call reverted");
        }
    }
}
