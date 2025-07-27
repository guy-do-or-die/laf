import { CardFooter } from "@/components/ui/card";
import { MessageButton } from "@/components/MessageButton";
import { ItemStatus } from '@/constants/itemStatus';

import LostButton from '@/components/pure/LostButton';
import ReturnedButton from '@/components/pure/ReturnedButton';


/**
 * Pure UI component for item action buttons
 * Uses specialized button components that encapsulate their own logic
 * @param {Object} props - Component props
 * @param {Object} props.itemData - Item business data
 * @param {boolean} props.isLoading - Loading state
 * @param {string} props.hash - Item hash for routing and messaging
 */
export default function ItemActions({ itemData, isLoading, hash }) {
    return (
        <CardFooter className="flex flex-wrap gap-2">
            { 
                itemData.canReportLost && (
                    <LostButton 
                        hash={hash}
                        className="flex-1"
                    />
                )
            }
            { 
                itemData.status === ItemStatus.Found && !isLoading && (
                    <>
                        {itemData.messagingRecipient?.address && (
                            <MessageButton
                                recipientAddress={itemData.messagingRecipient.address}
                                itemTitle={itemData.messagingRecipient.title}
                                secretHash={hash}
                                className="flex-1"
                            />
                        )}
                        
                        {itemData.canReturn && (
                            <ReturnedButton 
                                hash={hash}
                            />
                        )}
                    </>
                )
            }
        </CardFooter>
    );
}
