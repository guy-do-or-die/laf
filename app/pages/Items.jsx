import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { usePublicClient } from 'wagmi';
import { decodeEventLog } from 'viem'
import { useBlockNumber } from 'wagmi'

import { useAccount, chain } from '../wallet';
import { lafAbi, lafAddress } from '../contracts';

import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import ItemCard from "../components/ItemCard";


export default function Items() {
    const { address, logged } = useAccount();
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
   
    const { data: blockNumber } = useBlockNumber()
    const publicClient = usePublicClient();

    useEffect(() => {
        const loadMintEvents = async () => {
          if (!logged || !address) {
            setIsLoading(false);
            return;
          }

          try {
            setIsLoading(true);
            const logs = await publicClient.getLogs({
              address: lafAddress[chain.id],
              event: {
                type: 'event',
                name: 'ItemRegistered',
                inputs: [
                  { type: 'address', name: 'owner', indexed: true },
                  { type: 'address', name: 'item', indexed: true },
                  { type: 'address', name: 'hash', indexed: true },
                ],
              },
              args: { owner: address },
              fromBlock: blockNumber ? BigInt(blockNumber) - 100000n : 'earliest',
              toBlock: blockNumber ? BigInt(blockNumber) : 'latest',
            })
    
            const ids = logs?.map((log) => {
                const { args } = decodeEventLog({
                  abi: lafAbi,
                  data: log.data,
                  topics: log.topics,
                })
                return {
                    hash: args.hash,
                    address: args.item,
                } 
              })?.sort((a, b) => b - a)
    
            ids && setItems(ids)
            setIsLoading(false);
          } catch (error) {
            console.error('Failed to load mint events:', error)
            setIsLoading(false);
          }
        }
    
        blockNumber && address && loadMintEvents()
      }, [blockNumber, address, logged, publicClient])
    
    return (
        <div className="flex flex-col items-center gap-8">
            <h2 className="text-2xl font-bold">Your Items</h2>
            
            <div className="w-full max-w-4xl">
                <div className="flex justify-center mb-8">
                    <Button asChild variant="outline">
                        <Link href="/register">Register New Item</Link>
                    </Button>
                </div>

                {!logged ? (
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
                    <div className="flex flex-col space-y-3 w-full">
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