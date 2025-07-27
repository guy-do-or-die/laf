import { useSimulateLafFound, useWriteLafFound } from '@/contracts';
import { useSmartWalletSimulateHook, useSmartWalletWriteHook } from '@/wallet';

import TxButton from '@/components/TxButton';

/**
 * Specialized button component for marking items as found
 * Encapsulates all transaction logic, hooks, and parameter creation
 * @param {Object} props - Component props
 * @param {string} props.hash - Item hash for transaction parameters
 * @param {string} props.signature - Finder signature for verification
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.disabled - Whether button should be disabled
 */
export default function FoundButton({ hash, signature, className = "", disabled = false }) {
    const simulateHook = useSmartWalletSimulateHook(useSimulateLafFound);
    const writeHook = useSmartWalletWriteHook(useWriteLafFound);
    
    const foundParams = {
        args: [hash, signature],
        enabled: !disabled && !!signature
    };

    return (
        <TxButton
            simulateHook={simulateHook}
            writeHook={writeHook}
            params={foundParams}
            className={className}
            text="Found"
        />
    );
}
