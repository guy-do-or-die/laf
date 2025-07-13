import { useEffect, useState } from 'react';
import { Link } from 'wouter';

import { useBlockNumber } from "wagmi";

import { useAccount } from '../wallet';
import { getUserItems } from '../utils/graphql';

import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import ItemCard from "../components/ItemCard";


export default function Items() {
    const { address, loggedIn } = useAccount();
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { blockNumber } = useBlockNumber();
   
    useEffect(() => {
        const loadUserItems = async () => {
          if (!loggedIn || !address) {
            setIsLoading(false);
            return;
          }

          try {
            setIsLoading(true);
            const itemsData = await getUserItems(address);
            
            const formattedItems = itemsData?.map((item) => ({
                hash: item.hash,
                address: item.item,
                blockNumber: item.blockNumber,
                blockTimestamp: item.blockTimestamp,
                transactionHash: item.transactionHash
            }))
    
            setItems(formattedItems || [])
            setIsLoading(false);
          } catch (error) {
            console.error('Failed to load items from subgraph:', error)
            setIsLoading(false);
          }
        }
    
        address && loadUserItems()
      }, [address, loggedIn])
    
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold">Your Items</h2>
            
            <div className="w-full max-w-6xl">
                <div className="flex justify-center mb-8">
                    <Button asChild variant="outline">
                        <Link href="/register">Register New Item</Link>
                    </Button>
                </div>

                {!loggedIn ? (
                    <Card className="w-full">
                        <CardContent className="pt-6 text-center">
                            <p>Please connect your wallet to view your items.</p>
                        </CardContent>
                    </Card>
                ) : isLoading ? (
                    <div className="text-center py-8">Loading your items...</div>
                ) : items.length === 0 ? (
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p>You don't have any registered items yet.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                        {items?.map((item) => (
                            <ItemCard 
                                key={item.hash} 
                                hash={item.hash} 
                                address={item.address} 
                                blockNumber={blockNumber} 
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}