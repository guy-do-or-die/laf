import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { useItemData } from '@/hooks/useItemData';

import ItemDisplay from '@/components/pure/ItemDisplay';
import ItemActions from '@/components/pure/ItemActions';


/**
 * Container component that connects item data hook to pure UI components
 * Simplified - transaction logic now encapsulated in specialized button components
 * @param {Object} props - Component props
 * @param {string} props.hash - Item hash
 * @param {string} props.address - Item contract address
 * @param {string} props.className - Additional CSS classes
 */
export default function ItemContainer({ hash, address, className = "" }) {
    const { itemData, isLoading } = useItemData(address);

    return (
        <Card className={`${itemData.statusColor || 'bg-gray-100'} w-full min-w-64 min-h-48 ${className}`}>
            <CardContent className="flex-1">
                <ItemDisplay itemData={itemData} isLoading={isLoading} />
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
                <ItemActions
                    itemData={itemData}
                    isLoading={isLoading}
                    hash={hash}
                />
            </CardFooter>
        </Card>
    );
}
