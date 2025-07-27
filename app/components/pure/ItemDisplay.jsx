import { getStatusName } from '@/constants/itemStatus';

/**
 * Pure UI component for displaying item information
 * Only handles presentation, no business logic or data fetching
 * @param {Object} props - Component props
 * @param {Object} props.itemData - Item business data
 * @param {boolean} props.isLoading - Loading state
 */
export default function ItemDisplay({ itemData, isLoading }) {
    return (
        <>
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
        </>
    );
}
