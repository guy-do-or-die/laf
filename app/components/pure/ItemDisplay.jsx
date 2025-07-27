import { Card, CardContent } from "@/components/ui/card";
import { getStatusName } from '@/constants/itemStatus';

/**
 * Pure UI component for displaying item information
 * Only handles presentation, no business logic or data fetching
 * @param {Object} props - Component props
 * @param {Object} props.itemData - Item business data
 * @param {boolean} props.isLoading - Loading state
 * @param {string} props.className - Additional CSS classes
 */
export default function ItemDisplay({ itemData, isLoading, className = "" }) {
    return (
        <Card className={`${itemData.statusColor || 'bg-gray-100'} w-full min-w-64 min-h-48 ${className}`}>
            <CardContent className="flex-1">
                <h3 className="font-medium">{itemData.comment || 'Loading...'}</h3>
                <p className="text-sm text-gray-500">
                    {!isLoading && getStatusName(itemData.status)}
                </p>
                {itemData.geo && !isLoading && (
                    <p className="text-sm text-gray-500">
                        {itemData.geo}
                    </p>
                )}
                {itemData.hasReward && !isLoading && (
                    <p className="text-sm text-gray-500">
                        Reward: ${itemData.formattedReward}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
