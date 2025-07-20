import { useState, useEffect } from 'react';
import { Link } from 'wouter';

import { formatUnits } from 'viem';
import { useReadContracts } from 'wagmi';

import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import TxButton from "./TxButton";
import { MessageButton } from "./MessageButton";

import { useAccount } from '../wallet';
import { itemAbi, useSimulateLafReturned, useWriteLafReturned } from '../contracts';
import { useSmartWalletSimulateHook, useSmartWalletWriteHook } from '../wallet';


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


    const charityIndex = 0;
    const charityFee = 100;
    const fee = 0;

    const returnParams = {
        args: [hash, charityIndex, charityFee, fee],
        enabled: true
    }

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
        <Card className={`${getStatusColor(getStatus())} w-full min-w-64 min-h-48`}>
            <CardContent className="flex-1">
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
                            Reward: ${formatUnits(itemData.reward, 6)}
                        </p>
                    )}
                    {/* {itemData.finder !== zeroAddress && (
                        <p className="text-sm text-gray-500">
                            Finder: {itemData.finder}
                        </p>
                    )} */}
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
                    { 
                        !itemData.isLost && (
                            <Button variant="outline" className="flex-1" asChild>
                                <Link to={`/lost/${hash}`}>Lost</Link>
                            </Button>
                        )
                    }
                    { 
                        itemData.isFound && !itemData.isReturned && !isLoading && (
                            <>
                                {currentUserAddress && currentUserAddress.toLowerCase() === itemData.owner?.toLowerCase() ? (
                                    <MessageButton
                                        recipientAddress={itemData.finder}
                                        itemTitle={itemData.comment || "Your item"}
                                        className="flex-1"
                                    />
                                ) : currentUserAddress && currentUserAddress.toLowerCase() === itemData.finder?.toLowerCase() ? (
                                    <MessageButton
                                        recipientAddress={itemData.owner}
                                        itemTitle={itemData.comment || "Found item"}
                                        className="flex-1"
                                    />
                                ) : (
                                    <MessageButton
                                        recipientAddress={itemData.finder}
                                        itemTitle={itemData.comment || "Item"}
                                        className="flex-1"
                                    />
                                )}
                                
                                {currentUserAddress && currentUserAddress.toLowerCase() === itemData.owner?.toLowerCase() && (
                                    <TxButton
                                        simulateHook={useSmartWalletSimulateHook(useSimulateLafReturned)}
                                        writeHook={useSmartWalletWriteHook(useWriteLafReturned)}
                                        params={returnParams}
                                        text="Returned"
                                    />
                                )}
                            </>
                        )
                    }
            </CardFooter>
        </Card>
    )
}
