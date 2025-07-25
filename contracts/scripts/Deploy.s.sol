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

        LAF.Charity memory charity = LAF.Charity({
            active: true,
            contractAddress: 0xd16713A5D4Eb7E3aAc9D2228eB72f6f7328FADBD,
            title: "Protocol Guild",
            url: "https://protocolguild.org",
            donated: 0
        });

        laf = new LAF(rewardToken, charity);
        
        console2.log("LAF deployed at:", address(laf));
        console2.log("Reward token address:", rewardToken);
        console2.log("Deployment successful and verified");

        vm.stopBroadcast();
    }
    
    function getDeployedAddress() public view returns (address) {
        return address(laf);
    }
}