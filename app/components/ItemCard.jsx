import { useState, useEffect } from 'react';
import { Link } from 'wouter';

import { formatUnits } from 'viem';
import { useReadContracts } from 'wagmi';

import { useBlockContext, useBlockUpdates } from '../contexts/BlockContext';

import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import TxButton from "./TxButton";
import { MessageButton } from "./MessageButton";

import { useAccount } from '../wallet';
import { lafItemAbi, useSimulateLafReturned, useWriteLafReturned } from '../contracts';
import { ItemStatus, getStatusName } from '../constants/itemStatus';
import { useSmartWalletSimulateHook, useSmartWalletWriteHook } from '../wallet';


export default function ItemCard({ hash, address }) {
    const [itemData, setItemData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { address: currentUserAddress } = useAccount();
    const { blockNumber } = useBlockContext();

    const { data: readData, isError } = useReadContracts({
        contracts: [
            {
                address: address,
                abi: lafItemAbi,
                functionName: 'comment',
            },
            {
                address: address,
                abi: lafItemAbi,
                functionName: 'status',
            },
            {
                address: address,
                abi: lafItemAbi,
                functionName: 'geo',
            },
            {
                address: address,
                abi: lafItemAbi,
                functionName: 'reward',
            },
            {
                address: address,
                abi: lafItemAbi,
                functionName: 'finder',
            },
            {
                address: address,
                abi: lafItemAbi,
                functionName: 'owner',
            },
        ],
        blockNumber
    })

    useEffect(() => {
        if (readData) {
          const status = readData[1].result;

          setItemData({
            comment: readData[0].result,
            status: status || ItemStatus.None,
            isLost: status === ItemStatus.Lost,
            isFound: status === ItemStatus.Found,
            isReturned: status === ItemStatus.Returned,
            geo: readData[2].result,
            reward: readData[3].result,
            finder: readData[4].result,
            owner: readData[5].result,
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

    const getStatusColor = (status) => {
        switch (status) {
            case ItemStatus.None:
            case ItemStatus.Registered: return 'bg-gray-100';
            case ItemStatus.Lost: return 'bg-red-100';
            case ItemStatus.Found: return 'bg-yellow-100';
            case ItemStatus.Returned: return 'bg-green-100';
            default: return 'bg-gray-100';
        }
    };

    return (
        <Card className={`${getStatusColor(itemData.status)} w-full min-w-64 min-h-48`}>
            <CardContent className="flex-1">
                <h3 className="font-medium">{itemData.comment || 'Loading...'}</h3>
                <p className="text-sm text-gray-500">
                    {!isLoading && getStatusName(itemData.status)}
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
                                    secretHash={hash}
                                    className="flex-1"
                                />
                            ) : currentUserAddress && currentUserAddress.toLowerCase() === itemData.finder?.toLowerCase() ? (
                                <MessageButton
                                    recipientAddress={itemData.owner}
                                    itemTitle={itemData.comment || "Found item"}
                                    secretHash={hash}
                                    className="flex-1"
                                />
                            ) : (
                                <MessageButton
                                    recipientAddress={itemData.finder}
                                    itemTitle={itemData.comment || "Item"}
                                    secretHash={hash}
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
