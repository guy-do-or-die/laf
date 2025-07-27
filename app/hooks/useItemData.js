import { useState, useEffect } from 'react';
import { useReadContracts } from 'wagmi';
import { useBlockContext } from '../contexts/BlockContext';
import { useAccount } from '../wallet';
import { lafItemAbi } from '../contracts';
import { 
    createItemContractConfig,
    processContractData, 
    createItemBusinessData 
} from '../services/itemService';

/**
 * Custom hook for fetching and processing item data
 * Encapsulates all data fetching logic for item components
 * @param {string} address - Item contract address
 * @returns {Object} - Item data and loading state
 */
export function useItemData(address) {
    const [itemBusinessData, setItemBusinessData] = useState({});
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
                const businessData = createItemBusinessData(rawItemData, currentUserAddress);
                setItemBusinessData(businessData);
                setTimeout(() => setIsLoading(false), 100);
            }
        }
    }, [readData, isError, blockNumber, currentUserAddress]);

    return {
        itemBusinessData,
        isLoading,
        isError
    };
}
