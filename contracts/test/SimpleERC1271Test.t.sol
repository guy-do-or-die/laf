// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "forge-std/Test.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

interface IERC1271 {
    function isValidSignature(bytes32 hash, bytes calldata signature) external view returns (bytes4 magicValue);
}

contract SimpleERC1271Test is Test {
    // Real production data
    address constant SMART_WALLET = 0x6CcB878429415785C79EC81F2AC92b90190046EF;
    string constant SECRET = "d82fb8c7ded15a22d87e22b8ac280ed0038d22d1563f7707f7dab144c21cfdce";
    bytes constant OWNER_SIGNATURE = hex"6820fb40bb07fb0673c20f15ea3f83e810056d0371228381aaea60824f8e88df3de7aa6cdee91116d358e01ca39f25c33b9a68327759f0616bf25b031651da391c";
    
    bytes4 constant ERC1271_SUCCESS = 0x1626ba7e;
    
    function testKernelERC1271() public {
        console.log("=== Kernel Smart Wallet ERC-1271 Test ===");
        console.log("Smart Wallet:", SMART_WALLET);
        console.log("Secret:", SECRET);
        
        // Check if smart wallet exists
        uint256 codeSize;
        assembly {
            codeSize := extcodesize(SMART_WALLET)
        }
        console.log("Smart wallet code size:", codeSize);
        
        if (codeSize == 0) {
            console.log("Smart wallet has no code - test cannot proceed");
            return;
        }
        
        // Test 1: EIP-191 prefixed hash (current approach)
        bytes32 eip191Hash = MessageHashUtils.toEthSignedMessageHash(bytes(SECRET));
        console.log("EIP-191 Hash:", vm.toString(eip191Hash));
        testERC1271Call(eip191Hash, "EIP-191 prefixed hash");
        
        // Test 2: Raw hash (what Kernel might expect)
        bytes32 rawHash = keccak256(bytes(SECRET));
        console.log("Raw Hash:", vm.toString(rawHash));
        testERC1271Call(rawHash, "Raw keccak256 hash");
        
        // Test 3: Packed hash
        bytes32 packedHash = keccak256(abi.encodePacked(SECRET));
        console.log("Packed Hash:", vm.toString(packedHash));
        testERC1271Call(packedHash, "Packed encoding hash");
    }
    
    function testERC1271Call(bytes32 hash, string memory description) internal {
        console.log("\n--- Testing:", description, "---");
        
        try IERC1271(SMART_WALLET).isValidSignature(hash, OWNER_SIGNATURE) returns (bytes4 result) {
            console.log("ERC-1271 result:", vm.toString(result));
            console.log("Expected magic value:", vm.toString(ERC1271_SUCCESS));
            
            if (result == ERC1271_SUCCESS) {
                console.log("[SUCCESS] ERC-1271 validation passed!");
            } else {
                console.log("[FAILED] ERC-1271 returned wrong magic value");
            }
        } catch Error(string memory reason) {
            console.log("[ERROR] ERC-1271 call reverted with reason:", reason);
        } catch (bytes memory lowLevelData) {
            console.log("[ERROR] ERC-1271 call reverted with low-level data length:", lowLevelData.length);
            if (lowLevelData.length > 0) {
                console.logBytes(lowLevelData);
            }
        }
    }
    
    function testSignatureRecovery() public {
        console.log("\n=== Signature Recovery Test ===");
        
        bytes32 eip191Hash = MessageHashUtils.toEthSignedMessageHash(bytes(SECRET));
        
        // Manual signature extraction using abi.decode approach
        (bytes32 r, bytes32 s, uint8 v) = extractSignature(OWNER_SIGNATURE);
        
        console.log("Signature r:", vm.toString(r));
        console.log("Signature s:", vm.toString(s));
        console.log("Signature v:", v);
        
        address recovered = ecrecover(eip191Hash, v, r, s);
        console.log("Recovered address:", recovered);
        console.log("Smart wallet address:", SMART_WALLET);
        
        if (recovered != address(0)) {
            console.log("[OK] Valid signature recovery");
        } else {
            console.log("[FAILED] Invalid signature recovery");
        }
    }
    
    function extractSignature(bytes memory signature) internal pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(signature.length == 65, "Invalid signature length");
        
        // Use a different approach to extract signature components
        bytes memory rBytes = new bytes(32);
        bytes memory sBytes = new bytes(32);
        
        for (uint i = 0; i < 32; i++) {
            rBytes[i] = signature[i];
            sBytes[i] = signature[i + 32];
        }
        
        r = bytes32(rBytes);
        s = bytes32(sBytes);
        v = uint8(signature[64]);
    }
}
