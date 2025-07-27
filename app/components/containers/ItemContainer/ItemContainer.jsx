import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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

    if (isLoading) {
        return (
            <Card className={`w-full max-w-sm h-48 bg-white shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200/40 overflow-hidden gap-0 py-0 flex flex-col ${className}`}>
                <CardContent className="pt-4 px-4 pb-0 flex-1">
                    <div className="space-y-2.5">
                        <Skeleton className="h-6 w-3/4 rounded-md" />
                        <Skeleton className="h-5 w-1/3 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-2/3 rounded-md" />
                            <Skeleton className="h-6 w-1/2 rounded-md" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="px-4 pt-3 pb-4 h-16 flex items-center">
                    <Skeleton className="h-8 w-full rounded-md" />
                </CardFooter>
            </Card>
        );
    }

    return (
        <Card className={`
            w-full max-w-sm h-48
            ${itemData.statusColor || 'bg-white'} 
            shadow-sm hover:shadow-lg 
            transition-all duration-300 
            border border-gray-200/40
            overflow-hidden
            gap-0 py-0
            hover:scale-[1.02]
            group
            flex flex-col
            ${className}
        `}>
            <CardContent className="pt-4 px-4 pb-0 flex-1">
                <ItemDisplay itemData={itemData} isLoading={isLoading} />
            </CardContent>
            <CardFooter className="px-4 pt-3 pb-4 h-16 flex items-center">
                <ItemActions
                    itemData={itemData}
                    isLoading={isLoading}
                    hash={hash}
                />
            </CardFooter>
        </Card>
    );
}
