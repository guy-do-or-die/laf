import { useEffect, useState } from 'react';
import { usePublicClient } from 'wagmi';
import { decodeEventLog } from 'viem'
import { useBlockNumber } from 'wagmi'

import { useAccount, chain } from '../wallet';
import { lafAbi, lafAddress } from '../contracts';

import { PageContainer, PageHeader, GridLayout, EmptyState, LoadingGrid } from "../components/ui/page-layout";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Plus, Lock } from "lucide-react";
import ItemCard from "../components/ItemCard";
import RegisterModal from "../components/RegisterModal";


export default function Items() {
    const { address, loggedIn } = useAccount();
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
   
    const { data: blockNumber } = useBlockNumber({})
    const publicClient = usePublicClient();

    useEffect(() => {
        const loadMintEvents = async () => {
          if (!loggedIn || !address) {
            setIsLoading(false);
            return;
          }

          // Load real blockchain data
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
        blockNumber && address && loadMintEvents(); 
      }, [blockNumber, address, loggedIn, publicClient])
    
    return (
        <PageContainer>
            {loggedIn && (
                <PageHeader 
                    title="My Items" 
                    description="Manage your registered items and add new ones"
                />
            )}
            
            {!loggedIn ? (
                <EmptyState 
                    icon={Lock}
                    title="Connect Your Wallet"
                    description="Please connect your wallet to view and manage your items."
                />
            ) : isLoading ? (
                <LoadingGrid message="Loading your items..." />
            ) : (
                <GridLayout>
                    {/* Add New Item Card */}
                    <Card className="retro-card cursor-pointer group hover:scale-[1.02] transition-transform duration-200">
                        <CardContent className="pt-6">
                            <Button 
                                variant="ghost" 
                                className="w-full h-full min-h-[200px] flex flex-col items-center justify-center text-black hover:text-gray-700"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <div className="flex flex-col items-center space-y-3">
                                    <Plus className="h-12 w-12" />
                                    <div className="text-center">
                                        <p className="font-bold text-lg uppercase tracking-wide">Add New Item</p>
                                        <p className="text-sm text-gray-600 font-medium">Register a new item</p>
                                    </div>
                                </div>
                            </Button>
                        </CardContent>
                    </Card>
                    
                    {/* Existing Items */}
                    {items?.map((item) => (
                        <ItemCard 
                            key={item.hash} 
                            hash={item.hash} 
                            address={item.address} 
                            blockNumber={blockNumber} 
                        />
                    ))}
                </GridLayout>
            )}
            
            <RegisterModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </PageContainer>
    );
}
