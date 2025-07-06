import { useEffect, useState } from 'react';
import { usePublicClient } from 'wagmi';
import { decodeEventLog } from 'viem'
import { useBlockNumber } from 'wagmi'

import { useAccount, chain } from '../wallet';
import { lafAbi, lafAddress } from '../contracts';
import { ENABLE_MOCK_DATA, mockItems } from '../data/mockItems';

import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import ItemCard from "../components/ItemCard";
import RegisterModal from "../components/RegisterModal";


export default function Items() {
    const { address, logged } = useAccount();
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
   
    const { data: blockNumber } = useBlockNumber({})
    const publicClient = usePublicClient();

    useEffect(() => {
        const loadItems = async () => {
          if (!logged || !address) {
            setIsLoading(false);
            return;
          }

          if (ENABLE_MOCK_DATA) {
            // Use mock data
            setIsLoading(true);
            setTimeout(() => {
              setItems(mockItems.map(item => ({
                hash: item.hash,
                address: item.address
              })));
              setIsLoading(false);
            }, 500); // Simulate loading delay
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
    
        if (ENABLE_MOCK_DATA) {
          loadItems();
        } else {
          blockNumber && address && loadItems();
        }
      }, [blockNumber, address, logged, publicClient])
    
    return (
        <div className="w-full max-w-7xl mx-auto px-4">

            
            {!logged ? (
                <Card className="max-w-md mx-auto">
                    <CardContent className="pt-6 text-center">
                        <div className="mb-4">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Connect Your Wallet</h3>
                        <p className="text-gray-500">Please connect your wallet to view and manage your items.</p>
                    </CardContent>
                </Card>
            ) : isLoading ? (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Loading your items...</p>
                </div>
            ) : (
                items.length === 0 ? (
                    <div className="flex justify-center py-12">
                        <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer group w-80">
                            <CardContent className="pt-6">
                                <Button 
                                    variant="ghost" 
                                    className="w-full h-full min-h-[200px] flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 group-hover:text-blue-600"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    <div className="flex flex-col items-center space-y-3">
                                        <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        <div className="text-center">
                                            <p className="text-xl font-medium">Add New Item</p>
                                            <p className="text-gray-400">Register a new item</p>
                                        </div>
                                    </div>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {/* Add New Item Card */}
                        <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer group">
                            <CardContent className="pt-6">
                                <Button 
                                    variant="ghost" 
                                    className="w-full h-full min-h-[200px] flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 group-hover:text-blue-600"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    <div className="flex flex-col items-center space-y-3">
                                        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        <div className="text-center">
                                            <p className="font-medium">Add New Item</p>
                                            <p className="text-sm text-gray-400">Register a new item</p>
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
                    </div>
                )
            )}
            
            <RegisterModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
    );
}