
import { useParams } from "wouter";
import { useState } from "react";
import { parseEther } from "viem";

import { useBlockNumber } from "wagmi";

import ItemCard from "../components/ItemCard";
import TxButton from "../components/TxButton";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

import { useReadLafItems, useSimulateLafFound, useWriteLafFound, useReadItemIsFound } from "../contracts"


export default function Found() {

    const { secretHash, secret } = useParams();

    const { data: blockNumber } = useBlockNumber()

    const { data: itemAddress } = useReadLafItems({ args: [secretHash] });

    const { data: isFound } = useReadItemIsFound({ address: itemAddress });

    const foundParams = {
        args: [secretHash, secret],
        enabled: !isFound,
        confirmationCallback: ({ data, error }) => {
            if (!error && data) {
                notify('The owner informed!', 'success');
            }
        }
    };
    
    return (
        <div className="flex flex-col items-center gap-8 p-4">
            <h1 className="text-2xl font-bold">Found Item</h1>
            
            <div className="w-full max-w-md space-y-4">
                <div className="mb-4">
                    <ItemCard
                        hash={secretHash}
                        address={itemAddress}
                        blockNumber={blockNumber}
                    />
                </div>
                
                {
                    isFound ?
                        <div className="border p-6 rounded-lg shadow-md">
                            <p className="mb-4 text-sm text-gray-600">
                                Return the item to the owner to receive the remaining part.
                            </p>
                        </div>
                        :
                        <div className="border p-6 rounded-lg shadow-md">
                            <p className="mb-4 text-sm text-gray-600">
                                You've found this item! Click the button below to confirm and receive your immediate 1% reward.
                            </p>
                            <TxButton
                                simulateHook={useSimulateLafFound}
                                writeHook={useWriteLafFound}
                                params={foundParams}
                                text="Confirm Found" />
                        </div>
                }
            </div>
        </div>
    );
}