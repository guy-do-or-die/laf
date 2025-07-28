import { useState, useEffect } from 'react';
import { useReadContracts } from 'wagmi';
import { useBlockContext } from '../contexts/BlockContext';
import { useAccount } from '../wallet';
import { lafItemAbi } from '../contracts';
import { 
    createItemContractConfig,
    processContractData, 
    getItemData 
} from '../services/itemService';

/**
 * Custom hook for fetching and processing item data
 * Encapsulates all data fetching logic for item components
 * @param {string} address - Item contract address
 * @returns {Object} - Item data and loading state
 */
export function useItemData(address) {
    const [itemData, setItemData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { address: currentUserAddress } = useAccount();
    const { blockNumber } = useBlockContext();

    const { data: readData, isError } = useReadContracts({
        contracts: createItemContractConfig(address, lafItemAbi),
        blockNumber
    });

    useEffect(() => {
        if (readData) {
            const rawItemData = processContractData(readData);

            if (rawItemData) {
                const itemData = getItemData(rawItemData, currentUserAddress);

                setItemData(itemData);
                setIsLoading(false);
            }
        }
    }, [readData, isError, blockNumber, currentUserAddress]);

    return {
        itemData,
        isLoading,
        isError
    };
}
