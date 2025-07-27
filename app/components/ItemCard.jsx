import ItemContainer from './containers/ItemContainer/ItemContainer';

/**
 * ItemCard component - now a simple wrapper around ItemContainer
 * Maintains backward compatibility while using the new architecture
 * @param {Object} props - Component props
 * @param {string} props.hash - Item hash
 * @param {string} props.address - Item contract address
 */
export default function ItemCard({ hash, address }) {
    return (
        <ItemContainer 
            hash={hash} 
            address={address} 
        />
    );
}
