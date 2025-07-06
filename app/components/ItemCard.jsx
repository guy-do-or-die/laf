// Legacy ItemCard - now using the new modular version
import { ItemCard as ModularItemCard } from './ui/item-card';
import { useSimulateLafReturned, useWriteLafReturned } from '../contracts';


export default function ItemCard({ hash, address, blockNumber }) {
    const simulateHook = useSimulateLafReturned;
    const writeHook = useWriteLafReturned;
    
    return (
        <ModularItemCard
            hash={hash}
            address={address}
            blockNumber={blockNumber}
            simulateHook={simulateHook}
            writeHook={writeHook}
        />
    );
}
