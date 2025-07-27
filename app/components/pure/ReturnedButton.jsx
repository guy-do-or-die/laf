import { useSimulateLafReturned, useWriteLafReturned } from '@/contracts';
import { useSmartWalletSimulateHook, useSmartWalletWriteHook } from '@/wallet';
import { createReturnParams } from '@/services/itemService';

import TxButton from '@/components/TxButton';

/**
 * Specialized button component for returning found items
 * Encapsulates all transaction logic, hooks, and parameter creation
 * @param {Object} props - Component props
 * @param {string} props.hash - Item hash for transaction parameters
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.disabled - Whether button should be disabled
 */
export default function ReturnedButton({ hash, className = "", disabled = false }) {
    const simulateHook = useSmartWalletSimulateHook(useSimulateLafReturned);
    const writeHook = useSmartWalletWriteHook(useWriteLafReturned);
    const returnParams = createReturnParams(hash);

    return (
        <TxButton
            params={{ ...returnParams, enabled: !disabled }}
            simulateHook={simulateHook}
            writeHook={writeHook}
            className={className}
            text="Returned"
        />
    );
}
