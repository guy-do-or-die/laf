import { useSimulateLafReturned, useWriteLafReturned } from '@/contracts';
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
export default function ReturnedButton({ hash, className = "", disabled = false, size = "default" }) {
    const returnParams = createReturnParams(hash);

    return (
        <TxButton
            params={{ ...returnParams, enabled: !disabled }}
            simulateHook={useSimulateLafReturned}
            writeHook={useWriteLafReturned}
            className={className}
            size={size}
            text="Returned"
        />
    );
}
