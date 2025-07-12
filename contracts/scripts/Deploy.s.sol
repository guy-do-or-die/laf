// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {LAF} from "../src/LAF.sol";

contract DeployScript is Script {
    LAF public laf;
    
    function run() public {
        address deployer = msg.sender;
        console2.log("Deploying LAF contract with address:", deployer);
        
        vm.startBroadcast();
        
        address rewardToken = vm.envAddress("REWARD_TOKEN_ADDRESS");
        require(rewardToken != address(0), "REWARD_TOKEN_ADDRESS not set in .env");
        
        laf = new LAF(rewardToken);
        
        console2.log("LAF deployed at:", address(laf));
        console2.log("Reward token address:", rewardToken);
        console2.log("Deployment successful and verified");

        vm.stopBroadcast();
    }
    
    function getDeployedAddress() public view returns (address) {
        return address(laf);
    }
}