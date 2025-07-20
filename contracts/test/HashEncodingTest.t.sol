// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "forge-std/console.sol";

contract HashEncodingTest is Test {
    string constant SECRET = "c37b772934f3dd537ec1bb6716a44fb831f8b0ff30d325bf835cc665415935a4";
    
    function testHashEncoding() public {
        console.log("=== HASH ENCODING TEST ===");
        console.log("Secret:", SECRET);
        
        // Test different encoding methods
        bytes32 abiEncodePacked = keccak256(abi.encodePacked(SECRET));
        bytes32 abiEncode = keccak256(abi.encode(SECRET));
        bytes32 bytesSecret = keccak256(bytes(SECRET));
        
        console.log("abi.encodePacked(SECRET):", vm.toString(abiEncodePacked));
        console.log("abi.encode(SECRET):", vm.toString(abiEncode));
        console.log("bytes(SECRET):", vm.toString(bytesSecret));
        
        // Check if any match the frontend hash
        bytes32 frontendHash = 0x4dfefa65462d4306396c73db346dec0fe6b78950e04875cdeae2c96bc4348917;
        console.log("Frontend hash:", vm.toString(frontendHash));
        
        console.log("abi.encodePacked matches frontend?", abiEncodePacked == frontendHash);
        console.log("abi.encode matches frontend?", abiEncode == frontendHash);
        console.log("bytes matches frontend?", bytesSecret == frontendHash);
        
        // Show the raw encoded data
        console.logBytes(abi.encodePacked(SECRET));
        console.logBytes(abi.encode(SECRET));
        console.logBytes(bytes(SECRET));
    }
}
