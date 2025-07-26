// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "./BaseTest.sol";

/**
 * @title GasOptimizationTests
 * @dev Comprehensive gas usage testing for LAF system to ensure efficient operations
 */
contract GasOptimizationTests is BaseTest {
    
    function test_RegistrationGasUsage() public {
        console.log(unicode"⛽ Testing Registration Gas Usage");
        
        uint256 gasStart = gasleft();
        vm.prank(owner);
        laf.register(testSecretHash, DEFAULT_COMMENT);
        uint256 gasUsedRegistration = gasStart - gasleft();
        
        console.log("Gas used for registration:", gasUsedRegistration);
        assertLt(gasUsedRegistration, 600000, "Registration should use less than 600k gas");
        
        console.log(unicode"✅ Registration gas usage validated");
    }
    
    function test_LostReportingGasUsage() public {
        console.log(unicode"⛽ Testing Lost Reporting Gas Usage");
        
        // Setup
        vm.prank(owner);
        laf.register(testSecretHash, DEFAULT_COMMENT);
        
        // Get LAFItem address and mint tokens
        address itemAddress = laf.items(testSecretHash);
        rewardToken.mint(owner, 10000 * 10**6);
        vm.prank(owner);
        rewardToken.approve(itemAddress, 10000 * 10**6);
        
        // Measure gas for lost reporting
        uint256 gasStart = gasleft();
        vm.prank(owner);
        laf.lost(testSecretHash, 1000 * 10**6, DEFAULT_GEO);
        uint256 gasUsedLost = gasStart - gasleft();
        
        console.log("Gas used for lost reporting:", gasUsedLost);
        assertLt(gasUsedLost, 300000, "Lost reporting should use less than 300k gas");
        
        console.log(unicode"✅ Lost reporting gas usage validated");
    }
    
    function test_FoundReportingGasUsage() public {
        console.log(unicode"⛽ Testing Found Reporting Gas Usage");
        
        // Setup
        vm.prank(owner);
        laf.register(testSecretHash, DEFAULT_COMMENT);
        
        // Get LAFItem address and mint tokens
        address itemAddress = laf.items(testSecretHash);
        rewardToken.mint(owner, 10000 * 10**6);
        vm.prank(owner);
        rewardToken.approve(itemAddress, 10000 * 10**6);
        
        vm.prank(owner);
        laf.lost(testSecretHash, 1000 * 10**6, DEFAULT_GEO);
        
        // Measure gas for found reporting
        bytes memory ownerSig = createSignature(ownerPrivateKey, testSecret);
        
        uint256 gasStart = gasleft();
        vm.prank(finder);
        laf.found(testSecretHash, ownerSig);
        uint256 gasUsedFound = gasStart - gasleft();
        
        console.log("Gas used for found reporting:", gasUsedFound);
        assertLt(gasUsedFound, 400000, "Found reporting should use less than 400k gas");
        
        console.log(unicode"✅ Found reporting gas usage validated");
    }
    
    function test_ReturnedGasUsage() public {
        console.log(unicode"⛽ Testing Returned Gas Usage");
        
        // Setup full cycle to returned state
        vm.prank(owner);
        laf.register(testSecretHash, DEFAULT_COMMENT);
        
        // Get LAFItem address
        address itemAddress = laf.items(testSecretHash);
        // Mint tokens and approve
        rewardToken.mint(owner, 10000 * 10**6);
        vm.prank(owner);
        rewardToken.approve(itemAddress, 10000 * 10**6);
        
        vm.prank(owner);
        laf.lost(testSecretHash, 1000 * 10**6, DEFAULT_GEO);
        
        bytes memory ownerSig = createSignature(ownerPrivateKey, testSecret);
        vm.prank(finder);
        laf.found(testSecretHash, ownerSig);
        
        // Measure gas for returned confirmation
        uint256 gasStart = gasleft();
        vm.prank(owner);
        laf.returned(testSecretHash, 0, 100, 50);
        uint256 gasUsedReturned = gasStart - gasleft();
        
        console.log("Gas used for returned confirmation:", gasUsedReturned);
        assertLt(gasUsedReturned, 500000, "Returned confirmation should use less than 500k gas");
        
        console.log(unicode"✅ Returned confirmation gas usage validated");
    }
    
    function test_SupportGasUsage() public {
        console.log(unicode"⛽ Testing Support Gas Usage");
        
        // Setup
        vm.prank(owner);
        laf.register(testSecretHash, DEFAULT_COMMENT);
        
        // Get LAFItem address and mint tokens for owner
        address itemAddress = laf.items(testSecretHash);
        rewardToken.mint(owner, 10000 * 10**6);
        vm.prank(owner);
        rewardToken.approve(itemAddress, 10000 * 10**6);
        
        vm.prank(owner);
        laf.lost(testSecretHash, 1000 * 10**6, DEFAULT_GEO);
        
        // Mint tokens and approve for supporter
        rewardToken.mint(supporter1, 10000 * 10**6);
        vm.prank(supporter1);
        rewardToken.approve(itemAddress, 10000 * 10**6);
        
        uint256 gasStart = gasleft();
        vm.prank(supporter1);
        laf.support(testSecretHash, 500 * 10**6);
        uint256 gasUsedSupport = gasStart - gasleft();
        
        console.log("Gas used for support:", gasUsedSupport);
        assertLt(gasUsedSupport, 200000, "Support should use less than 200k gas");
        
        console.log(unicode"✅ Support gas usage validated");
    }
    
    function test_WithdrawGasUsage() public {
        console.log(unicode"⛽ Testing Withdraw Gas Usage");
        
        // Setup full cycle to returned state
        vm.prank(owner);
        laf.register(testSecretHash, DEFAULT_COMMENT);
        
        // Get LAFItem address
        address itemAddress = laf.items(testSecretHash);
        // Mint tokens and approve
        rewardToken.mint(owner, 10000 * 10**6);
        vm.prank(owner);
        rewardToken.approve(itemAddress, 10000 * 10**6);
        
        vm.prank(owner);
        laf.lost(testSecretHash, 1000 * 10**6, DEFAULT_GEO);
        
        bytes memory ownerSig = createSignature(ownerPrivateKey, testSecret);
        vm.prank(finder);
        laf.found(testSecretHash, ownerSig);
        
        vm.prank(owner);
        laf.returned(testSecretHash, 0, 100, 50);
        
        // Measure gas for withdrawal
        LAFItem item = LAFItem(itemAddress);
        
        uint256 gasStart = gasleft();
        vm.prank(owner);
        item.withdraw();
        uint256 gasUsedWithdraw = gasStart - gasleft();
        
        console.log("Gas used for withdraw:", gasUsedWithdraw);
        assertLt(gasUsedWithdraw, 100000, "Withdraw should use less than 100k gas");
        
        console.log(unicode"✅ Withdraw gas usage validated");
    }
    
    function test_RevokeLostGasUsage() public {
        console.log(unicode"⛽ Testing Revoke Lost Gas Usage");
        
        // Setup
        vm.prank(owner);
        laf.register(testSecretHash, DEFAULT_COMMENT);
        
        // Get LAFItem address
        address itemAddress = laf.items(testSecretHash);
        // Mint tokens and approve
        rewardToken.mint(owner, 10000 * 10**6);
        vm.prank(owner);
        rewardToken.approve(itemAddress, 10000 * 10**6);
        
        vm.prank(owner);
        laf.lost(testSecretHash, 1000 * 10**6, DEFAULT_GEO);
        
        // Measure gas for revoke lost
        uint256 gasStart = gasleft();
        vm.prank(owner);
        laf.revokeLost(testSecretHash);
        uint256 gasUsedRevoke = gasStart - gasleft();
        
        console.log("Gas used for revoke lost:", gasUsedRevoke);
        assertLt(gasUsedRevoke, 150000, "Revoke lost should use less than 150k gas");
        
        console.log(unicode"✅ Revoke lost gas usage validated");
    }
    
    function test_CompleteUserJourneyGasUsage() public {
        console.log(unicode"⛽ Testing Complete User Journey Gas Usage");
        
        uint256 totalGasUsed = 0;
        uint256 gasStart;
        uint256 gasUsed;
        
        // 1. Registration
        gasStart = gasleft();
        vm.prank(owner);
        laf.register(testSecretHash, DEFAULT_COMMENT);
        gasUsed = gasStart - gasleft();
        totalGasUsed += gasUsed;
        console.log("Registration gas:", gasUsed);
        
        // 2. Lost reporting
        address itemAddress = laf.items(testSecretHash);
        rewardToken.mint(owner, 10000 * 10**6);
        vm.prank(owner);
        rewardToken.approve(itemAddress, 10000 * 10**6);
        
        gasStart = gasleft();
        vm.prank(owner);
        laf.lost(testSecretHash, 1000 * 10**6, DEFAULT_GEO);
        gasUsed = gasStart - gasleft();
        totalGasUsed += gasUsed;
        console.log("Lost reporting gas:", gasUsed);
        
        // 3. Community support
        rewardToken.mint(supporter1, 10000 * 10**6);
        vm.prank(supporter1);
        rewardToken.approve(itemAddress, 10000 * 10**6);
        
        gasStart = gasleft();
        vm.prank(supporter1);
        laf.support(testSecretHash, 500 * 10**6);
        gasUsed = gasStart - gasleft();
        totalGasUsed += gasUsed;
        console.log("Support gas:", gasUsed);
        
        // 4. Found reporting
        bytes memory ownerSig = createSignature(ownerPrivateKey, testSecret);
        
        gasStart = gasleft();
        vm.prank(finder);
        laf.found(testSecretHash, ownerSig);
        gasUsed = gasStart - gasleft();
        totalGasUsed += gasUsed;
        console.log("Found reporting gas:", gasUsed);
        
        // 5. Returned confirmation
        gasStart = gasleft();
        vm.prank(owner);
        laf.returned(testSecretHash, 0, 100, 50);
        gasUsed = gasStart - gasleft();
        totalGasUsed += gasUsed;
        console.log("Returned confirmation gas:", gasUsed);
        
        // 6. Withdrawal
        LAFItem item = LAFItem(itemAddress);
        
        gasStart = gasleft();
        vm.prank(owner);
        item.withdraw();
        gasUsed = gasStart - gasleft();
        totalGasUsed += gasUsed;
        console.log("Withdrawal gas:", gasUsed);
        
        console.log("Total gas for complete user journey:", totalGasUsed);
        assertLt(totalGasUsed, 2000000, "Complete user journey should use less than 2M gas");
        
        console.log(unicode"✅ Complete user journey gas usage validated");
    }
    
    function test_BatchOperationsGasEfficiency() public {
        console.log(unicode"⛽ Testing Batch Operations Gas Efficiency");
        
        // Test multiple registrations to check for gas optimization
        address[] memory secretHashes = new address[](5);
        for (uint i = 0; i < 5; i++) {
            secretHashes[i] = vm.addr(uint256(keccak256(abi.encodePacked("batch_secret", i))));
        }
        
        uint256 totalGasUsed = 0;
        
        for (uint i = 0; i < 5; i++) {
            uint256 gasStart = gasleft();
            vm.prank(owner);
            laf.register(secretHashes[i], string(abi.encodePacked("Batch item ", i)));
            uint256 gasUsed = gasStart - gasleft();
            totalGasUsed += gasUsed;
            
            console.log(string(abi.encodePacked("Registration ", i, " gas:")), gasUsed);
        }
        
        uint256 averageGas = totalGasUsed / 5;
        console.log("Average gas per registration:", averageGas);
        
        // Gas usage should be consistent (not increasing significantly with state size)
        assertLt(averageGas, 500000, "Average registration gas should be less than 500k");
        
        console.log(unicode"✅ Batch operations gas efficiency validated");
    }
}
