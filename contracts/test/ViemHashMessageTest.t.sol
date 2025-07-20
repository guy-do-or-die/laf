// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Test.sol";
import "../src/LAF.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract ViemHashMessageTest is Test {
    LAF public laf;
    
    // Real data from logs - but now we'll test with viem's hashMessage approach
    string constant SECRET = "d82fb8c7ded15a22d87e22b8ac280ed0038d22d1563f7707f7dab144c21cfdce";
    address constant SECRET_HASH_ADDR = 0x00BEeA21485D70c124227EF825f55BCcE530e4eb;
    
    // These are the NEW signatures that should be created using viem's hashMessage approach
    // We'll need to generate these with the frontend after our fix
    bytes constant OWNER_SIGNATURE_NEW = hex""; // To be filled after frontend generates new signature
    bytes constant FINDER_SIGNATURE_NEW = hex""; // To be filled after frontend generates new signature
    
    address constant SMART_WALLET_ADDRESS = 0x6CcB878429415785C79EC81F2AC92b90190046EF;
    address constant CONTROLLING_EOA = 0xCb926Bde654F1C8D64C7B5c7004d85303762fdD4;
    address constant FINDER_ADDRESS = 0xB9aB0a323Ac33ea94c39fE1b6B15Fc2594f4D917;
    
    function setUp() public {
        // Deploy with mock ERC20 token address for testing
        address mockToken = address(0x1234567890123456789012345678901234567890);
        laf = new LAF(mockToken);
    }
    
    function testViemHashMessageCompatibility() public {
        console.log("=== VIEM HASHMESSAGE COMPATIBILITY TEST ===");
        
        // Test what viem's hashMessage produces vs our contract
        // viem's hashMessage(secret) should equal MessageHashUtils.toEthSignedMessageHash(keccak256(abi.encodePacked(secret)))
        
        bytes32 secretHash = keccak256(abi.encodePacked(SECRET));
        console.log("Secret hash (abi.encodePacked):", vm.toString(secretHash));
        
        bytes32 ethSignedHash = MessageHashUtils.toEthSignedMessageHash(secretHash);
        console.log("Eth signed message hash:", vm.toString(ethSignedHash));
        
        // This is what viem's hashMessage should produce for the same secret
        // hashMessage(secret) = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n", length, secret))
        string memory prefix = "\x19Ethereum Signed Message:\n64"; // 64 is length of our secret
        bytes32 viemEquivalent = keccak256(abi.encodePacked(prefix, SECRET));
        console.log("Viem hashMessage equivalent:", vm.toString(viemEquivalent));
        
        // These should match for our approach to work
        console.log("Hashes match:", ethSignedHash == viemEquivalent);
        
        // If they don't match, we need to understand the difference
        if (ethSignedHash != viemEquivalent) {
            console.log("MISMATCH DETECTED - investigating...");
            
            // Try different approaches
            bytes32 directEthHash = MessageHashUtils.toEthSignedMessageHash(bytes(SECRET));
            console.log("Direct eth signed message hash:", vm.toString(directEthHash));
            console.log("Direct matches viem:", directEthHash == viemEquivalent);
        }
    }
    
    function testNewSignatureFormat() public {
        console.log("=== NEW SIGNATURE FORMAT TEST ===");
        console.log("This test will validate signatures once frontend generates them with viem's hashMessage");
        
        // For now, just show what we expect
        console.log("Expected message for signing:", SECRET);
        console.log("Expected hash (viem hashMessage):", vm.toString(MessageHashUtils.toEthSignedMessageHash(bytes(SECRET))));
        
        // TODO: Once frontend generates new signatures, test them here
        if (OWNER_SIGNATURE_NEW.length > 0) {
            console.log("Testing owner signature...");
            // Test owner signature recovery
        }
        
        if (FINDER_SIGNATURE_NEW.length > 0) {
            console.log("Testing finder signature...");
            // Test finder signature recovery
        }
    }
}
