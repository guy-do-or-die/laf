import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useReadContracts } from 'wagmi';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

import { itemAbi } from '../contracts';

export default function ItemCard({ hash, address, blockNumber }) {
    const [itemData, setItemData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

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
        ],
    })

    useEffect(() => {
        if (readData) {
          setItemData({
            comment: readData[0].result,
            isLost: readData[1].result,
            isFound: readData[2].result,
            isReturned: readData[3].result,
          })
          setTimeout(() => setIsLoading(false), 100)
        }
    }, [readData, isError, blockNumber]);

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
        <Card className={`${getStatusColor(itemData.isLost ? 1 : itemData.isFound ? 2 : itemData.isReturned ? 3 : 0)} w-full`}>
            <div className="flex items-center p-4">
                <div className="flex-1">
                    <h3 className="font-medium">{itemData.comment || 'Loading...'}</h3>
                    <p className="text-sm text-gray-500">
                        {!isLoading && getStatusText(itemData.isLost ? 1 : itemData.isFound ? 2 : itemData.isReturned ? 3 : 0)}
                    </p>
                </div>
                { 
                    !itemData.isLost
                        ? 
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link to={`/lost/${hash}`}>Lost</Link>
                        </Button>
                    </div>
                        : ""
                }
            </div>
        </Card>
    )
}
