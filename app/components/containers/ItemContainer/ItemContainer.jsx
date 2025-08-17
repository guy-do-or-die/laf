import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useItemData } from '@/hooks/useItemData';

import ItemDetails from '@/components/pure/ItemDetails';
import ItemActions from '@/components/pure/ItemActions';


/**
 * Container component that connects item data hook to pure UI components
 * Simplified - transaction logic now encapsulated in specialized button components
 * @param {Object} props - Component props
 * @param {string} props.hash - Item hash
 * @param {string} props.address - Item contract address
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.neutral - If true, uses neutral styling without status colors
 */
export default function ItemContainer({ hash, address, className = "", neutral = false }) {
    const { itemData, isLoading } = useItemData(address);

    if (isLoading) {
        return (
            <Card className={`${neutral ? 'w-full h-48' : 'w-full aspect-square'} bg-white shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200/40 overflow-hidden gap-0 py-0 flex flex-col ${className}`}>
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
            ${neutral ? 'bg-white' : (itemData.statusColor || 'bg-white')} 
            ${neutral ? '' : 'hover:scale-[1.02]'}
            ${neutral ? 'w-full h-48' : 'w-full aspect-square'}
            shadow-sm hover:shadow-lg 
            transition-all duration-300 
            border border-gray-200/40
            overflow-hidden
            gap-0 py-0
            group
            flex flex-col
            ${className}
        `}>
            <CardContent className="pt-4 px-4 pb-0 flex-1">
                <ItemDetails itemData={itemData} isLoading={isLoading} />
            </CardContent>
            <CardFooter className="px-4 pt-3 pb-8 h-16 flex items-center">
                <ItemActions
                    itemData={itemData}
                    isLoading={isLoading}
                    hash={hash}
                />
            </CardFooter>
        </Card>
    );
}
