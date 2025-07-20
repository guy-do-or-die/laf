// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/LAF.sol";

contract CheckStoredOwner is Test {
    LAF public laf;
    
    // Real data from the failing test
    address constant SECRET_HASH = 0x8376FAe8a214da421f247a2690f35FBB609758BB;
    
    function setUp() public {
        // Use the deployed LAF contract
        laf = LAF(0x9B88A10431709E3AA0523422aAcA840226d53f96);
    }
    
    function testCheckStoredOwner() public {
        console.log("=== Checking What Address Was Stored During Registration ===");
        console.log("Secret hash:", SECRET_HASH);
        
        // Get the stored owner from the items mapping
        address storedOwner = laf.items(SECRET_HASH);
        
        if (storedOwner == address(0)) {
            console.log("Item not found - owner is zero address");
        } else {
            console.log("Item found in contract!");
            console.log("Stored owner:", storedOwner);
            
            // Check what controlling EOA this owner has
            // address controllingEOA = laf._getKernelControllingEOA(storedOwner);
            // console.log("Controlling EOA for stored owner:", controllingEOA);
            
            // Compare with the expected addresses from our debug
            console.log("\n=== Comparison with Debug Data ===");
            console.log("Expected owner (from frontend):", address(0x6CcB878429415785C79EC81F2AC92b90190046EF));
            console.log("Expected signer (from frontend):", address(0xb94C68F88832c65FE38c35123DC5030D6D015918));
            console.log("Stored owner matches expected:", storedOwner == address(0x6CcB878429415785C79EC81F2AC92b90190046EF));
            // console.log("Controlling EOA matches expected signer:", controllingEOA == address(0xb94C68F88832c65FE38c35123DC5030D6D015918));
        }
        
        console.log("\n=== Analysis Complete ===");
    }
}
