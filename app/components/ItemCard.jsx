import { useState, useEffect } from 'react';
import { Link } from 'wouter';

import { zeroAddress, formatEther } from 'viem';
import { useReadContracts } from 'wagmi';

import { Card } from "./ui/card";
import { Button } from "./ui/button";
import TxButton from "./TxButton";
import { MessageButton } from "./Messaging";

import { useAccount } from '../wallet';
import { itemAbi, useSimulateLafReturned, useWriteLafReturned } from '../contracts';


export default function ItemCard({ hash, address, blockNumber }) {
    const [itemData, setItemData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { address: currentUserAddress } = useAccount();

    const { data: readData, isError } = useReadContracts({
        contracts: [
            {
                address: address,
                abi: itemAbi,
                functionName: 'comment',
            },
            {
                address: address,
                abi: itemAbi,
                functionName: 'isLost',
            },
            {
                address: address,
                abi: itemAbi,
                functionName: 'isFound',
            },
            {
                address: address,
                abi: itemAbi,
                functionName: 'isReturned',
            },
            {
                address: address,
                abi: itemAbi,
                functionName: 'geo',
            },
            {
                address: address,
                abi: itemAbi,
                functionName: 'reward',
            },
            {
                address: address,
                abi: itemAbi,
                functionName: 'finder',
            },
            {
                address: address,
                abi: itemAbi,
                functionName: 'owner',
            },
        ],
    })

    useEffect(() => {
        if (readData) {
          setItemData({
            comment: readData[0].result,
            isLost: readData[1].result,
            isFound: readData[2].result,
            isReturned: readData[3].result,
            geo: readData[4].result,
            reward: readData[5].result,
            finder: readData[6].result,
            owner: readData[7].result,
          })
          setTimeout(() => setIsLoading(false), 100)
        }
    }, [readData, isError, blockNumber]);

    const getStatus = () => {
        if (itemData.isReturned) return 3;
        if (itemData.isFound) return 2;
        if (itemData.isLost) return 1;
        return 0;
    };
    
    const getStatusText = (status) => {
        switch (status) {
            case 0: return 'Registered';
            case 1: return 'Lost';
            case 2: return 'Found';
            case 3: return 'Returned';
            default: return 'Unknown';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 0: return 'bg-gray-100';
            case 1: return 'bg-red-100';
            case 2: return 'bg-yellow-100';
            case 3: return 'bg-green-100';
            default: return 'bg-gray-100';
        }
    };

    return (
        <Card className={`${getStatusColor(getStatus())} w-full`}>
            <div className="flex items-center p-4 min-w-80">
                <div className="flex-1 min-w-64">
                    <h3 className="font-medium">{itemData.comment || 'Loading...'}</h3>
                    <p className="text-sm text-gray-500">
                        {!isLoading && getStatusText(getStatus())}
                    </p>
                    {itemData.geo && (
                        <p className="text-sm text-gray-500">
                            {itemData.geo}
                        </p>
                    )}
                    {itemData.reward > 0 && (
                        <p className="text-sm text-gray-500">
                            Reward: {parseFloat(formatEther(itemData.reward)).toFixed(3)} ETH
                        </p>
                    )}
                    {/* {itemData.finder !== zeroAddress && (
                        <p className="text-sm text-gray-500">
                            Finder: {itemData.finder}
                        </p>
                    )} */}
                </div>
                <div className="flex flex-col space-y-2 mt-2 w-full">
                    { 
                        !itemData.isLost && (
                            <Button variant="outline" className="w-full" asChild>
                                <Link to={`/lost/${hash}`}>Lost</Link>
                            </Button>
                        )
                    }
                    { 
                        itemData.isFound && !itemData.isReturned && !isLoading && (
                            <>
                                {/* Replace the Connect button with direct messaging */}
                                {currentUserAddress && currentUserAddress.toLowerCase() === itemData.owner?.toLowerCase() ? (
                                    <MessageButton 
                                        recipientAddress={itemData.finder} 
                                        buttonText="Message Finder"
                                    />
                                ) : currentUserAddress && currentUserAddress.toLowerCase() === itemData.finder?.toLowerCase() ? (
                                    <MessageButton 
                                        recipientAddress={itemData.owner} 
                                        buttonText="Message Owner"
                                    />
                                ) : (
                                    <MessageButton 
                                        recipientAddress={itemData.finder} 
                                        buttonText="Message Finder"
                                    />
                                )}
                                
                                {currentUserAddress && currentUserAddress.toLowerCase() === itemData.owner?.toLowerCase() && (
                                    <TxButton
                                        simulateHook={useSimulateLafReturned}
                                        writeHook={useWriteLafReturned}
                                        params={{
                                            args: [hash],
                                            enabled: true
                                        }}
                                        text="Returned"
                                    />
                                )}
                            </>
                        )
                    }
                </div>
            </div>
        </Card>
    )
}
