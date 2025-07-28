import { MessageButton } from "@/components/MessageButton";
import { ItemStatus } from '@/constants/itemStatus';

import LostRedirectButton from '@/components/pure/LostRedirectButton';
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
    if (isLoading) {
        return null; // Skeleton is handled in ItemContainer
    }

    // Count total buttons to determine sizing
    const buttonCount = (
        (itemData.canReportLost ? 1 : 0) +
        (itemData.status === ItemStatus.Found && itemData.messagingRecipient?.address ? 1 : 0) +
        (itemData.status === ItemStatus.Found && itemData.canReturn ? 1 : 0)
    );

    const buttonClass = buttonCount === 1 
        ? "w-full text-xs font-medium shadow-sm hover:shadow-md transition-all duration-200" 
        : "flex-1 text-xs font-medium shadow-sm hover:shadow-md transition-all duration-200";
    
    const buttonSize = "sm"; // Use sm size for h-8 height

    return (
        <div className="flex gap-2.5 w-full">
            {/* Report Lost Button */}
            {itemData.canReportLost && (
                <LostRedirectButton 
                    hash={hash}
                    className={buttonClass}
                    size={buttonSize}
                />
            )}
            
            {/* Found Item Actions */}
            {itemData.status === ItemStatus.Found && (
                <>
                    {/* Messaging Button */}
                    {itemData.messagingRecipient?.address && (
                        <MessageButton
                            recipientAddress={itemData.messagingRecipient.address}
                            itemTitle={itemData.messagingRecipient.title}
                            secretHash={hash}
                            className={buttonClass}
                            size={buttonSize}
                        />
                    )}
                    
                    {/* Return Button */}
                    {itemData.canReturn && (
                        <ReturnedButton 
                            hash={hash}
                            className={buttonClass}
                            size={buttonSize}
                        />
                    )}
                </>
            )}
        </div>
    );
}
