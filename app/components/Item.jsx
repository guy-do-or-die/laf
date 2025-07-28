import ItemContainer from './containers/ItemContainer/ItemContainer';

/**
 * ItemCard component - now a simple wrapper around ItemContainer
 * Maintains backward compatibility while using the new architecture
 * @param {Object} props - Component props
 * @param {string} props.hash - Item hash
 * @param {string} props.address - Item contract address
 * @param {boolean} props.neutral - If true, uses neutral styling without status colors
 * @param {string} props.className - Additional CSS classes
 */
export default function ItemCard({ hash, address, neutral, className, ...rest }) {
    return (
        <ItemContainer 
            hash={hash} 
            address={address}
            neutral={neutral}
            className={className}
            {...rest}
        />
    );
}
