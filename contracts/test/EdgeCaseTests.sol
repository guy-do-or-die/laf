// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "./BaseTest.sol";

/**
 * @title EdgeCaseTests
 * @dev Comprehensive edge case testing for LAF system
 */
contract EdgeCaseTests is BaseTest {
    
    function test_RegistrationEdgeCases() public {
        console.log(unicode"📝 Testing Registration Edge Cases");
        
        // Edge Case 1: Registration with maximum comment length
        console.log(unicode"🔍 Testing maximum comment length");
        string memory maxComment = _generateLongString(1000); // Very long comment
        address longCommentHash = vm.addr(uint256(keccak256("long_comment_secret")));
        
        vm.prank(owner);
        laf.register(longCommentHash, maxComment);
        
        address itemAddress = laf.items(longCommentHash);
        assertNotEq(itemAddress, address(0), "Item with long comment should be registered");
        console.log(unicode"✅ Maximum comment length handled");
        
        // Edge Case 2: Registration with empty comment (should work)
        console.log(unicode"🔍 Testing empty comment registration");
        address emptyCommentHash = vm.addr(uint256(keccak256("empty_comment_secret")));
        
        vm.prank(owner);
        laf.register(emptyCommentHash, "");
        
        address emptyItemAddress = laf.items(emptyCommentHash);
        assertNotEq(emptyItemAddress, address(0), "Item with empty comment should be registered");
        console.log(unicode"✅ Empty comment registration handled");
        
        // Edge Case 3: Duplicate registration attempt
        console.log(unicode"🔍 Testing duplicate registration");
        
        // First register the item
        vm.prank(owner);
        laf.register(testSecretHash, "First registration");
        
        // Then try to register it again (should fail)
        vm.prank(owner);
        vm.expectRevert();
        laf.register(testSecretHash, "Duplicate attempt");
        console.log(unicode"✅ Duplicate registration blocked");
    }
    
    function test_LostReportingEdgeCases() public {
        console.log(unicode"😢 Testing Lost Reporting Edge Cases");
        
        // Setup item
        address edgeSecretHash = vm.addr(uint256(keccak256("edge_secret")));
        vm.prank(owner);
        laf.register(edgeSecretHash, "Edge case item");
        address itemAddress = laf.items(edgeSecretHash);
        
        // Edge Case 1: Lost reporting with zero reward (charity only)
        console.log(unicode"🔍 Testing zero reward lost reporting");
        vm.prank(owner);
        rewardToken.approve(itemAddress, 0);
        
        vm.prank(owner);
        vm.expectRevert(); // Should fail with zero reward
        laf.lost(edgeSecretHash, 0, DEFAULT_GEO);
        console.log(unicode"✅ Zero reward lost reporting blocked");
        
        // Edge Case 2: Lost reporting with maximum reward amount
        console.log(unicode"🔍 Testing maximum reward amount");
        uint256 maxReward = 1000000 * 10**6; // 1M USDC
        
        // Fund owner with enough tokens
        vm.prank(address(this));
        rewardToken.mint(owner, maxReward);
        
        vm.prank(owner);
        rewardToken.approve(itemAddress, maxReward);
        
        vm.prank(owner);
        laf.lost(edgeSecretHash, maxReward, DEFAULT_GEO);
        
        LAFItem item = LAFItem(itemAddress);
        assertEq(uint(item.status()), uint(LAFItem.Status.Lost), "Status should be Lost");
        console.log(unicode"✅ Maximum reward amount handled");
        
        // Edge Case 3: Lost reporting on already lost item
        console.log(unicode"🔍 Testing double lost reporting");
        vm.prank(owner);
        rewardToken.approve(itemAddress, 1000 * 10**6);
        
        vm.prank(owner);
        vm.expectRevert();
        laf.lost(edgeSecretHash, 1000 * 10**6, DEFAULT_GEO);
        console.log(unicode"✅ Double lost reporting blocked");
    }
    
    function test_CommunitySupportEdgeCases() public {
        console.log(unicode"🤝 Testing Community Support Edge Cases");
        
        // Setup lost item
        address supportSecretHash = vm.addr(uint256(keccak256("support_secret")));
        vm.prank(owner);
        laf.register(supportSecretHash, "Support test item");
        
        address itemAddress = laf.items(supportSecretHash);
        vm.prank(owner);
        rewardToken.approve(itemAddress, 1000 * 10**6);
        vm.prank(owner);
        laf.lost(supportSecretHash, 1000 * 10**6, DEFAULT_GEO);
        
        // Edge Case 1: Support with zero amount
        console.log(unicode"🔍 Testing zero amount support");
        vm.prank(supporter1);
        rewardToken.approve(itemAddress, 0);
        
        vm.prank(supporter1);
        vm.expectRevert();
        laf.support(supportSecretHash, 0);
        console.log(unicode"✅ Zero amount support blocked");
        
        // Edge Case 2: Support non-existent item
        console.log(unicode"🔍 Testing support for non-existent item");
        address nonExistentHash = vm.addr(uint256(keccak256("non_existent")));
        
        vm.prank(supporter1);
        vm.expectRevert();
        laf.support(nonExistentHash, 100 * 10**6);
        console.log(unicode"✅ Support for non-existent item blocked");
        
        // Edge Case 3: Multiple supporters with different amounts
        console.log(unicode"🔍 Testing multiple supporters");
        uint256 support1 = 200 * 10**6;
        uint256 support2 = 300 * 10**6;
        
        vm.prank(supporter1);
        rewardToken.approve(itemAddress, support1);
        vm.prank(supporter1);
        laf.support(supportSecretHash, support1);
        
        vm.prank(supporter2);
        rewardToken.approve(itemAddress, support2);
        vm.prank(supporter2);
        laf.support(supportSecretHash, support2);
        
        LAFItem item = LAFItem(itemAddress);
        assertEq(item.supportReward(), support1 + support2, "Support rewards should accumulate");
        console.log(unicode"✅ Multiple supporters handled");
    }
    
    function test_WithdrawalAndRevocationEdgeCases() public {
        console.log(unicode"💰 Testing Withdrawal and Revocation Edge Cases");
        
        // Setup completed cycle item
        address withdrawalSecretHash = vm.addr(uint256(keccak256("withdrawal_secret")));
        vm.prank(owner);
        laf.register(withdrawalSecretHash, "Withdrawal test item");
        
        address itemAddress = laf.items(withdrawalSecretHash);
        vm.prank(owner);
        rewardToken.approve(itemAddress, 1000 * 10**6);
        vm.prank(owner);
        laf.lost(withdrawalSecretHash, 1000 * 10**6, DEFAULT_GEO);
        
        // Complete the cycle to returned state
        uint256 secretPrivateKey = uint256(keccak256(abi.encodePacked("withdrawal_secret")));
        bytes32 message = keccak256(
            abi.encodePacked(withdrawalSecretHash, finder, itemAddress, uint256(1), block.chainid)
        );
        bytes32 ethHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", message));
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(secretPrivateKey, ethHash);
        bytes memory signature = abi.encodePacked(r, s, v);
        
        vm.prank(finder);
        laf.found(withdrawalSecretHash, signature);
        
        vm.prank(owner);
        laf.returned(withdrawalSecretHash, 0, 100, 50);
        
        // Edge Case 1: Unauthorized withdrawal attempt
        console.log(unicode"🔍 Testing unauthorized withdrawal");
        LAFItem item = LAFItem(itemAddress);
        
        vm.prank(malicious);
        vm.expectRevert();
        item.withdraw();
        console.log(unicode"✅ Unauthorized withdrawal blocked");
        
        // Edge Case 2: Double withdrawal attempt
        console.log(unicode"🔍 Testing double withdrawal");
        vm.prank(owner);
        item.withdraw(); // First withdrawal (should work)
        
        vm.prank(owner);
        // Second withdrawal should not revert but should have no effect
        item.withdraw();
        console.log(unicode"✅ Double withdrawal handled gracefully");
    }
    
    function test_SignatureEdgeCases() public {
        console.log(unicode"🔐 Testing Signature Edge Cases");
        
        // Setup lost item
        address sigSecretHash = vm.addr(uint256(keccak256("sig_secret")));
        vm.prank(owner);
        laf.register(sigSecretHash, "Signature test item");
        
        address itemAddress = laf.items(sigSecretHash);
        vm.prank(owner);
        rewardToken.approve(itemAddress, 1000 * 10**6);
        vm.prank(owner);
        laf.lost(sigSecretHash, 1000 * 10**6, DEFAULT_GEO);
        
        // Edge Case 1: Malformed signature
        console.log(unicode"🔍 Testing malformed signature");
        bytes memory malformedSig = hex"1234"; // Too short
        
        vm.prank(finder);
        vm.expectRevert();
        laf.found(sigSecretHash, malformedSig);
        console.log(unicode"✅ Malformed signature rejected");
        
        // Edge Case 2: Valid signature but wrong finder
        console.log(unicode"🔍 Testing signature with wrong finder");
        uint256 secretPrivateKey = uint256(keccak256(abi.encodePacked("sig_secret")));
        bytes32 message = keccak256(
            abi.encodePacked(sigSecretHash, malicious, itemAddress, uint256(1), block.chainid)
        );
        bytes32 ethHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", message));
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(secretPrivateKey, ethHash);
        bytes memory wrongFinderSig = abi.encodePacked(r, s, v);
        
        vm.prank(finder); // Different finder than in signature
        vm.expectRevert();
        laf.found(sigSecretHash, wrongFinderSig);
        console.log(unicode"✅ Wrong finder signature rejected");
        
        // Edge Case 3: Signature with wrong chain ID
        console.log(unicode"🔍 Testing signature with wrong chain ID");
        bytes32 wrongChainMessage = keccak256(
            abi.encodePacked(sigSecretHash, finder, itemAddress, uint256(1), uint256(999)) // Wrong chain ID
        );
        bytes32 wrongChainEthHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", wrongChainMessage));
        (uint8 vv, bytes32 rr, bytes32 ss) = vm.sign(secretPrivateKey, wrongChainEthHash);
        bytes memory wrongChainSig = abi.encodePacked(rr, ss, vv);
        
        vm.prank(finder);
        vm.expectRevert();
        laf.found(sigSecretHash, wrongChainSig);
        console.log(unicode"✅ Wrong chain ID signature rejected");
    }
    
    function test_StateTransitionEdgeCases() public {
        console.log(unicode"🔄 Testing State Transition Edge Cases");
        
        // Edge Case 1: Found reporting on registered (not lost) item
        console.log(unicode"🔍 Testing found on registered item");
        address stateSecretHash = vm.addr(uint256(keccak256("state_secret")));
        vm.prank(owner);
        laf.register(stateSecretHash, "State test item");
        
        bytes memory sig = createSignature(ownerPrivateKey, "state_secret");
        
        vm.prank(finder);
        vm.expectRevert();
        laf.found(stateSecretHash, sig);
        console.log(unicode"✅ Found on registered item blocked");
        
        // Edge Case 2: Return confirmation on non-found item
        console.log(unicode"🔍 Testing return on non-found item");
        vm.prank(owner);
        vm.expectRevert();
        laf.returned(stateSecretHash, 0, 100, 50);
        console.log(unicode"✅ Return on non-found item blocked");
        
        // Edge Case 3: Support on registered (not lost) item
        console.log(unicode"🔍 Testing support on registered item");
        vm.prank(supporter1);
        rewardToken.approve(laf.items(stateSecretHash), 100 * 10**6);
        
        vm.prank(supporter1);
        vm.expectRevert();
        laf.support(stateSecretHash, 100 * 10**6);
        console.log(unicode"✅ Support on registered item blocked");
    }
    
    // Helper function to generate long strings for testing
    function _generateLongString(uint256 length) internal pure returns (string memory) {
        bytes memory longBytes = new bytes(length);
        for (uint256 i = 0; i < length; i++) {
            longBytes[i] = bytes1(uint8(65 + (i % 26))); // A-Z repeating
        }
        return string(longBytes);
    }
}
