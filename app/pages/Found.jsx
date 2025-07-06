
import { useParams, useLocation } from "wouter";

import { useBlockNumber } from "wagmi";

import { PageContainer, PageHeader, PageSection } from "../components/ui/page-layout";
import { Card, CardContent } from "../components/ui/card";
import { CheckCircle, Gift } from "lucide-react";
import ItemCard from "../components/ItemCard";
import TxButton from "../components/TxButton";
import { notify } from "../components/Notification";

import { useReadLafItems, useSimulateLafFound, useWriteLafFound, useReadItemIsFound } from "../contracts"


export default function Found() {
    const { secretHash, secret } = useParams();
    const [location, setLocation] = useLocation();

    const { data: blockNumber } = useBlockNumber()

    const { data: itemAddress } = useReadLafItems({ args: [secretHash] });

    const { data: isFound } = useReadItemIsFound({ address: itemAddress });

    const foundParams = {
        args: [secretHash, secret],
        enabled: !isFound,
        confirmationCallback: ({ data, error }) => {
            if (!error && data) {
                notify('The owner has been informed!', 'success');
                setLocation(location, { replace: true });
            }
        }
    };
    
    return (
        <PageContainer>
            <PageHeader 
                title="Found Item" 
                description="Confirm that you've found this item to receive your reward"
            />
            
            <PageSection className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <ItemCard
                        hash={secretHash}
                        address={itemAddress}
                        blockNumber={blockNumber}
                    />
                </div>
                
                {
                    isFound ?
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-2">Item Already Found</h3>
                                        <p className="text-sm text-gray-600">
                                            Return the item to the owner to receive the remaining part of the reward.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        :
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-start space-x-3">
                                    <Gift className="h-6 w-6 text-blue-500 mt-0.5" />
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900 mb-2">Confirm Found Item</h3>
                                        <p className="text-sm text-gray-600 mb-4">
                                            You've found this item! Click the button below to confirm and receive your immediate 1% reward.
                                        </p>
                                        <TxButton
                                            simulateHook={useSimulateLafFound}
                                            writeHook={useWriteLafFound}
                                            params={foundParams}
                                            text="Confirm Found" 
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                }
            </PageSection>
        </PageContainer>
    );
}