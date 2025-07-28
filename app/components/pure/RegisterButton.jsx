import { useSimulateLafRegister, useWriteLafRegister } from '@/contracts';
import { useSmartWalletSimulateHook, useSmartWalletWriteHook } from '@/wallet';

import TxButton from '@/components/TxButton';


/**
 * Specialized button component for registering new items
 * Encapsulates all transaction logic, hooks, and parameter creation
 * @param {Object} props - Component props
 * @param {string} props.secretHash - Secret hash for registration
 * @param {string} props.comment - Item description/comment
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.disabled - Whether button should be disabled
 */
export default function RegisterButton({ secretHash, comment, className = "", disabled = false }) {
    const simulateHook = useSmartWalletSimulateHook(useSimulateLafRegister);
    const writeHook = useSmartWalletWriteHook(useWriteLafRegister);
    
    const registerParams = {
        args: [secretHash, comment],
        enabled: !disabled && !!secretHash && !!comment
    };

    return (
        <TxButton
            simulateHook={simulateHook}
            writeHook={writeHook}
            params={registerParams}
            className={className}
            text="Register"
        />
    );
}
