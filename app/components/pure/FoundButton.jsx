import { useSimulateLafFound, useWriteLafFound } from '@/contracts';

import TxButton from '@/components/TxButton';
import { notify } from '@/components/Notification';

/**
 * Specialized button component for marking items as found
 * Encapsulates all transaction logic, hooks, and parameter creation
 * @param {Object} props - Component props
 * @param {string} props.hash - Item hash for transaction parameters
 * @param {string} props.signature - Finder signature for verification
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.disabled - Whether button should be disabled
 * Includes success notification callback when transaction completes
 */
export default function FoundButton({ hash, signature, className = "", disabled = false }) {
    const foundParams = {
        args: [hash, signature],
        enabled: !disabled && !!signature,
        confirmationCallback: ({ data, error }) => {
            if (!error && data) {
                notify('The owner has been informed!', 'success', {id: "secret-found"});
            }
        }
    };

    return (
        <TxButton
            simulateHook={useSimulateLafFound}
            writeHook={useWriteLafFound}
            params={foundParams}
            className={className}
            text="Confirm Found"
        />
    );
}
