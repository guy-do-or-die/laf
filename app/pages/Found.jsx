
import { useParams } from "wouter";

import { useBlockNumber } from "wagmi";

import ItemCard from "../components/ItemCard";
import TxButton from "../components/TxButton";

import { notify } from "../components/Notification";

import { useReadLafItems, useSimulateLafFound, useWriteLafFound, useReadItemIsFound } from "../contracts"
import { useSmartWalletSimulateHook, useSmartWalletWriteHook } from "../wallet"


export default function Found() {
    const { secretHash, secret } = useParams();

    const { data: blockNumber, refetch: refetchBlockNumber } = useBlockNumber()
    const { data: itemAddress } = useReadLafItems({ args: [secretHash] });
    const { data: isFound } = useReadItemIsFound({ address: itemAddress });

    const foundParams = {
        args: [secretHash, secret],
        enabled: !isFound,
        confirmationCallback: ({ data, error }) => {
            if (!error && data) {
                notify('The owner has been informed!', 'success');
                refetchBlockNumber();
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
                        <div className="border-0 p-6 rounded-xl shadow-lg backdrop-blur-sm bg-white/95">
                            <p className="mb-4 text-sm text-gray-600">
                                Return the item to the owner to receive the remaining part.
                            </p>
                        </div>
                        :
                        <div className="border-0 p-6 rounded-xl shadow-lg backdrop-blur-sm bg-white/95">
                            <p className="mb-4 text-sm text-gray-600">
                                You've found this item! Click the button below to confirm and receive your immediate 1% reward.
                            </p>
                            <TxButton
                                simulateHook={useSmartWalletSimulateHook(useSimulateLafFound)}
                                writeHook={useSmartWalletWriteHook(useWriteLafFound)}
                                params={foundParams}
                                text="Confirm Found" />
                        </div>
                }
            </div>
        </div>
    );
}