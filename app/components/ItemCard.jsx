import { useState, useEffect } from 'react';
import { Link } from 'wouter';

import { zeroAddress, formatEther } from 'viem';
import { useReadContracts } from 'wagmi';

import { Card } from "./ui/card";
import { Button } from "./ui/button";
import TxButton from "./TxButton";

import { useAccount } from '../wallet';
import { itemAbi, useSimulateLafReturned, useWriteLafReturned } from '../contracts';
import { ENABLE_MOCK_DATA, getMockItemData } from '../data/mockItems';


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
        query: {
            enabled: !ENABLE_MOCK_DATA
        }
    })

    useEffect(() => {
        if (ENABLE_MOCK_DATA) {
            // Use mock data
            const mockData = getMockItemData(address);
            if (mockData) {
                setItemData(mockData);
                setTimeout(() => setIsLoading(false), 100);
            }
        } else if (readData) {
            // Use real blockchain data
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
    }, [readData, isError, blockNumber, address]);

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

    const status = getStatus();
    
    return (
        <Card className={`${getStatusColor(status)} hover:shadow-lg transition-shadow duration-200 h-full`}>
            <div className="p-6 flex flex-col h-full">
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        status === 0 ? 'bg-gray-200 text-gray-800' :
                        status === 1 ? 'bg-red-200 text-red-800' :
                        status === 2 ? 'bg-yellow-200 text-yellow-800' :
                        'bg-green-200 text-green-800'
                    }`}>
                        {!isLoading && getStatusText(status)}
                    </span>
                    {itemData.reward > 0 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                            💰 {parseFloat(formatEther(itemData.reward)).toFixed(3)} ETH
                        </span>
                    )}
                </div>

                {/* Item Info */}
                <div className="flex-1 mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {itemData.comment || 'Loading...'}
                    </h3>
                    
                    {itemData.geo && (
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="truncate">{itemData.geo}</span>
                        </div>
                    )}
                    
                    {itemData.finder !== zeroAddress && itemData.finder && (
                        <div className="flex items-center text-sm text-gray-500">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="truncate">Finder: {itemData.finder.slice(0, 6)}...{itemData.finder.slice(-4)}</span>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                    { 
                        !itemData.isLost && (
                            <Button variant="outline" className="w-full" asChild>
                                <Link to={`/lost/${hash}`}>
                                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    Report Lost
                                </Link>
                            </Button>
                        )
                    }
                    { 
                        itemData.isFound && !itemData.isReturned && !isLoading && (
                            <>
                                <Button variant="outline" className="w-full" asChild>
                                    {currentUserAddress && currentUserAddress.toLowerCase() === itemData.owner?.toLowerCase() ? (
                                        <Link to={`/connect/${itemData.finder}`}>
                                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            Connect with Finder
                                        </Link>
                                    ) : currentUserAddress && currentUserAddress.toLowerCase() === itemData.finder?.toLowerCase() ? (
                                        <Link to={`/connect/${itemData.owner}`}>
                                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            Connect with Owner
                                        </Link>
                                    ) : (
                                        <Link to={`/connect/${itemData.finder}`}>
                                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            Connect
                                        </Link>
                                    )}
                                </Button>
                                
                                {currentUserAddress && currentUserAddress.toLowerCase() === itemData.owner?.toLowerCase() && (
                                    <TxButton
                                        simulateHook={useSimulateLafReturned}
                                        writeHook={useWriteLafReturned}
                                        params={{
                                            args: [hash],
                                            enabled: true
                                        }}
                                        text="Mark as Returned"
                                        className="w-full"
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
