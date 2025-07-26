// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/LAF.sol";
import "../src/LAFItem.sol";
import "../src/LAFErrors.sol";
import "../src/Config.sol";

/**
 * @title BaseTest
 * @dev Base test contract with common setup and utilities for LAF testing
 */
contract BaseTest is Test {
    // Core contracts
    LAF public laf;
    
    // Mock ERC20 token for testing
    MockERC20 public rewardToken;
    
    // Test accounts
    address public owner = makeAddr("owner");
    address public finder = makeAddr("finder");
    address public supporter1 = makeAddr("supporter1");
    address public supporter2 = makeAddr("supporter2");
    address public charity1 = makeAddr("charity1");
    address public charity2 = makeAddr("charity2");
    address public malicious = makeAddr("malicious");
    
    // Private keys for signature testing
    uint256 public ownerPrivateKey = 0x1234;
    uint256 public finderPrivateKey = 0x5678;
    uint256 public maliciousPrivateKey = 0x9abc;
    
    // Test constants
    uint256 public constant INITIAL_BALANCE = 1000000e6; // 1M USDC
    uint256 public constant DEFAULT_REWARD = 100e6; // 100 USDC
    string public constant DEFAULT_COMMENT = "Test item for LAF";
    string public constant DEFAULT_GEO = "dr5regw3p"; // geohash
    
    // Test secrets and hashes
    string public testSecret = "test-secret-123";
    address public testSecretHash;
    
    function setUp() public virtual {
        // Deploy mock USDC token
        rewardToken = new MockERC20("USD Coin", "USDC", 6);
        
        // Setup charity configuration
        LAF.Charity memory charity = LAF.Charity({
            active: true,
            contractAddress: charity1,
            donated: 0,
            title: "Test Charity 1",
            url: "https://testcharity1.org"
        });
        
        // Deploy LAF contract from owner address
        vm.prank(owner);
        laf = new LAF(address(rewardToken), charity);
        
        // Add second charity
        vm.prank(owner);
        laf.addCharity(charity2, "Test Charity 2", "https://testcharity2.org");
        
        // Generate test secret hash from private key (not string hash)
        uint256 secretPrivateKey = uint256(keccak256(abi.encodePacked(testSecret)));
        testSecretHash = vm.addr(secretPrivateKey);
        
        // Fund test accounts
        _fundAccounts();
        
        // Setup approvals
        _setupApprovals();
        
        console.log("BaseTest setup complete");
        console.log("LAF contract:", address(laf));
        console.log("Reward token:", address(rewardToken));
        console.log("Test secret hash:", testSecretHash);
    }
    
    function _fundAccounts() internal {
        // Fund all test accounts with tokens
        address[] memory accounts = new address[](5);
        accounts[0] = owner;
        accounts[1] = finder;
        accounts[2] = supporter1;
        accounts[3] = supporter2;
        accounts[4] = malicious;
        
        for (uint i = 0; i < accounts.length; i++) {
            rewardToken.mint(accounts[i], INITIAL_BALANCE);
        }
    }
    
    function _setupApprovals() internal {
        // Setup maximum approvals for all accounts
        address[] memory accounts = new address[](5);
        accounts[0] = owner;
        accounts[1] = finder;
        accounts[2] = supporter1;
        accounts[3] = supporter2;
        accounts[4] = malicious;
        
        for (uint i = 0; i < accounts.length; i++) {
            vm.prank(accounts[i]);
            rewardToken.approve(address(laf), type(uint256).max);
        }
    }
    

    
    /**
     * @dev Create signature for secret (simulates frontend signing)
     */
    function createSecretSignature(string memory secret, uint256 privateKey) 
        public 
        pure 
        returns (bytes memory) 
    {
        bytes32 messageHash = keccak256(abi.encodePacked(secret));
        bytes32 ethSignedMessageHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash)
        );
        
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(privateKey, ethSignedMessageHash);
        return abi.encodePacked(r, s, v);
    }
    
    /**
     * @dev Helper to register a test item
     */
    function registerTestItem(address itemOwner, string memory comment) 
        public 
        returns (address itemAddress) 
    {
        vm.prank(itemOwner);
        laf.register(testSecretHash, comment);
        return laf.items(testSecretHash);
    }
    
    /**
     * @dev Helper to report item as lost
     */
    function reportItemLost(
        address itemOwner,
        uint256 rewardAmount,
        string memory geoLocation
    ) public {
        vm.prank(itemOwner);
        laf.lost(testSecretHash, rewardAmount, geoLocation);
    }
    
    /**
     * @dev Helper to add community support
     */
    function addSupport(address supporter, uint256 amount) public {
        vm.prank(supporter);
        laf.support(testSecretHash, amount);
    }
    
    /**
     * @dev Helper to simulate found item with signatures
     */
    function simulateFound() internal {
        // Create signature for the secret
        bytes memory signature = createSignature(ownerPrivateKey, testSecret);
        
        vm.prank(finder);
        laf.found(testSecretHash, signature);
    }
    
    /**
     * @dev Helper to get item contract address
     */
    function getItemAddress() public view returns (address) {
        return laf.items(testSecretHash);
    }
    
    /**
     * @dev Helper to get item status
     */
    function getItemStatus() public view returns (LAFItem.Status) {
        address itemAddress = getItemAddress();
        if (itemAddress == address(0)) return LAFItem.Status.Registered; // Default
        return LAFItem(itemAddress).status();
    }
    
    /**
     * @dev Helper to check balances
     */
    function checkBalance(address account) public view returns (uint256) {
        return rewardToken.balanceOf(account);
    }
    
    /**
     * @dev Helper to advance time for cooldown testing
     */
    function advanceTime(uint256 seconds_) public {
        vm.warp(block.timestamp + seconds_);
    }
    
    /**
     * @dev Helper to expect specific revert
     */
    function expectRevertWithError(bytes4 selector) public {
        vm.expectRevert(selector);
    }
    
    /**
     * @dev Helper to create signature for secret
     */
    function createSignature(uint256 privateKey, string memory secret) internal view returns (bytes memory) {
        return createSignatureWithFinder(privateKey, secret, finder);
    }
    
    function createSignatureWithFinder(uint256 privateKey, string memory secret, address itemFinder) internal view returns (bytes memory) {
        // Convert secret to private key (LAF protocol uses secret as private key)
        uint256 secretPrivateKey = uint256(keccak256(abi.encodePacked(secret)));
        
        // Generate secret hash (item identifier) - must match the address derived from secret private key
        address secretHash = vm.addr(secretPrivateKey);
        
        // Get the LAFItem contract address
        address itemAddress = laf.items(secretHash);
        LAFItem item = LAFItem(itemAddress);
        
        // Create the message that matches LAF contract's expected format
        bytes32 message = keccak256(
            abi.encodePacked(
                secretHash,      // _secretHash
                itemFinder,      // itemFinder (msg.sender in the actual call)
                itemAddress,     // address(item)
                item.cycle(),    // item.cycle()
                block.chainid    // block.chainid
            )
        );
        
        // Create Ethereum Signed Message hash
        bytes32 ethHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", message));
        
        // Sign with the secret private key (LAF protocol requirement)
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(secretPrivateKey, ethHash);
        
        return abi.encodePacked(r, s, v);
    }
    
    /**
     * @dev Generate secret hash from secret (LAF protocol uses secret as private key)
     */
    function generateSecretHash(string memory secret) internal pure returns (address) {
        uint256 secretPrivateKey = uint256(keccak256(abi.encodePacked(secret)));
        return vm.addr(secretPrivateKey);
    }
}

/**
 * @title MockERC20
 * @dev Simple ERC20 mock for testing
 */
contract MockERC20 {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor(string memory _name, string memory _symbol, uint8 _decimals) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
    }
    
    function mint(address to, uint256 amount) external {
        balanceOf[to] += amount;
        totalSupply += amount;
        emit Transfer(address(0), to, amount);
    }
    
    function transfer(address to, uint256 amount) external returns (bool) {
        require(balanceOf[msg.sender] >= amount, "ERC20: transfer amount exceeds balance");
        
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }
    
    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        require(balanceOf[from] >= amount, "ERC20: transfer amount exceeds balance");
        require(allowance[from][msg.sender] >= amount, "ERC20: transfer amount exceeds allowance");
        
        allowance[from][msg.sender] -= amount;
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
        return true;
    }
    
    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }
}
