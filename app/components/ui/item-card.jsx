import { useState, useEffect } from 'react';
import { formatEther } from 'viem';
import { useReadContracts } from 'wagmi';

import { Card, CardContent, CardHeader } from "./card";
import { StatusBadge, RewardBadge } from "./status-badge";
import { ItemInfo, ItemTitle } from "./item-info";
import { ItemActionButtons } from "./action-buttons";
import { Skeleton } from "./skeleton";

import { useAccount } from '../../wallet';
import { itemAbi } from '../../contracts';
import { ENABLE_MOCK_DATA, getMockItemData } from '../../data/mockItems';
import { cn } from "@/app/lib/utils";

const statusColorMap = {
  0: 'retro-card',
  1: 'retro-card',
  2: 'retro-card', 
  3: 'retro-card'
};

export function ItemCard({ 
  hash, 
  address, 
  blockNumber, 
  simulateHook, 
  writeHook,
  className,
  ...props 
}) {
  const [itemData, setItemData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { address: currentUserAddress } = useAccount();

  const { data: readData, isError } = useReadContracts({
    contracts: [
      { address, abi: itemAbi, functionName: 'comment' },
      { address, abi: itemAbi, functionName: 'isLost' },
      { address, abi: itemAbi, functionName: 'isFound' },
      { address, abi: itemAbi, functionName: 'isReturned' },
      { address, abi: itemAbi, functionName: 'geo' },
      { address, abi: itemAbi, functionName: 'reward' },
      { address, abi: itemAbi, functionName: 'finder' },
      { address, abi: itemAbi, functionName: 'owner' },
    ],
    query: { enabled: !ENABLE_MOCK_DATA }
  });

  useEffect(() => {
    if (ENABLE_MOCK_DATA) {
      const mockData = getMockItemData(address);
      if (mockData) {
        setItemData(mockData);
        setTimeout(() => setIsLoading(false), 100);
      }
    } else if (readData) {
      setItemData({
        comment: readData[0].result,
        isLost: readData[1].result,
        isFound: readData[2].result,
        isReturned: readData[3].result,
        geo: readData[4].result,
        reward: readData[5].result,
        finder: readData[6].result,
        owner: readData[7].result,
      });
      setTimeout(() => setIsLoading(false), 100);
    }
  }, [readData, isError, blockNumber, address]);

  const getStatus = () => {
    if (itemData.isReturned) return 3;
    if (itemData.isFound) return 2;
    if (itemData.isLost) return 1;
    return 0;
  };

  const status = getStatus();
  const statusColorClass = statusColorMap[status] || statusColorMap[0];
  const formattedReward = itemData.reward ? parseFloat(formatEther(itemData.reward)).toFixed(3) : null;

  if (isLoading) {
    return (
      <Card className={cn("h-full", className)} {...props}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16" />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col h-full">
          <Skeleton className="h-6 w-full mb-3" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <div className="mt-auto">
            <Skeleton className="h-9 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className={cn(
        "h-full transition-transform duration-200 hover:shadow-lg hover:scale-[1.02]",
        statusColorClass,
        className
      )} 
      {...props}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <StatusBadge status={status} />
          <RewardBadge reward={formattedReward} />
        </div>
      </CardHeader>
      
      <CardContent className="flex flex-col h-full pt-0">
        <div className="flex-1 mb-4">
          <ItemTitle isLoading={isLoading}>
            {itemData.comment}
          </ItemTitle>
          
          <ItemInfo itemData={itemData} />
        </div>

        <ItemActionButtons
          itemData={itemData}
          hash={hash}
          currentUserAddress={currentUserAddress}
          isLoading={isLoading}
          simulateHook={simulateHook}
          writeHook={writeHook}
          className="mt-auto"
        />
      </CardContent>
    </Card>
  );
}

export default ItemCard;