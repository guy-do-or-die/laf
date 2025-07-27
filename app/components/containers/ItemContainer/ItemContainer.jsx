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
    const { itemBusinessData, isLoading } = useItemData(address);

    return (
        <div className={className}>
            <ItemDisplay 
                itemData={itemBusinessData}
                isLoading={isLoading}
            />
            <ItemActions
                itemData={itemBusinessData}
                isLoading={isLoading}
                hash={hash}
            />
        </div>
    );
}
