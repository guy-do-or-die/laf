import { useState, useEffect } from 'react';
import { parseUnits } from 'viem';

import { Button } from '@/components/ui/button';
import TxButton from '@/components/TxButton';
import { notify } from '@/components/Notification';
import { useApproval } from '@/hooks/useApproval';

import {
    useReadLafItems,
    useSimulateLafLost,
    useWriteLafLost
} from '@/contracts';
import { useSmartWalletSimulateHook, useSmartWalletWriteHook } from '@/wallet';
import { useAccount } from '@/wallet';
import { useRewardToken } from '@/contexts/LafConfigContext';

/**
 * Pure component for LostButton component that uses useApproval hook and handling
 * Uses useApproval hook to seamlessly handle token approvals
 * @param {Object} props - Component props
 * @param {string} props.secretHash - Secret hash for the item
 * @param {string} props.reward - Reward amount as string
 * @param {string} props.geo - Geographic location
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.disabled - Whether button should be disabled
 */
export default function LostButton({ 
    secretHash, 
    reward, 
    geo, 
    className = "", 
    disabled = false 
}) {
    const { address, activeWalletType } = useAccount();
    const [isReporting, setIsReporting] = useState(false);

    const { data: itemContractAddress } = useReadLafItems({ args: [secretHash] });
    
    // Get reward token info from LAF config context
    const { address: rewardTokenAddress, decimals: rewardTokenDecimals, isReady: isConfigReady } = useRewardToken();
    
    // Parse reward value using contract decimals
    const rewardValue = reward ? parseUnits(reward, rewardTokenDecimals) : 0n;
    
    const {
        needsApproval,
        isApproving,
        approve,
        isApproved
    } = useApproval({
        amount: rewardValue,
        decimals: rewardTokenDecimals,
        tokenAddress: rewardTokenAddress,
        spenderAddress: itemContractAddress,
        enabled: !!itemContractAddress
    });

    const simulateLost = useSmartWalletSimulateHook(useSimulateLafLost);
    const writeLost = useSmartWalletWriteHook(useWriteLafLost);

    // Handle approval before allowing TxButton to execute
    const handleApprovalFirst = async () => {
        if (needsApproval && !isApproving) {
            setIsReporting(true);
            notify('Processing approval...', 'info');
            const success = approve();
            if (!success) {
                setIsReporting(false);
                return false;
            }
        }
        return true;
    };
    
    // Auto-reset reporting state when approval completes
    useEffect(() => {
        if (isApproved && isReporting) {
            setIsReporting(false); // Allow TxButton to take over
        }
    }, [isApproved, isReporting]);

    // Lost transaction parameters for TxButton
    const lostParams = {
        args: [secretHash, rewardValue, geo],
        enabled: !!itemContractAddress && !!secretHash && rewardValue > 0n && !!geo?.trim() && isConfigReady && (!needsApproval || isApproved),
        onWriteSuccess: () => {
            notify('Item successfully reported as lost!', 'success');
        },
        writeCallback: ({ data, error }) => {
            if (error) {
                console.error('Lost transaction failed:', error);
            }
        }
    };

    // If approval is needed and not yet approved, show approval button
    if (needsApproval && !isApproved) {
        return (
            <Button
                onClick={handleApprovalFirst}
                disabled={disabled || isApproving || !isConfigReady}
                className={className}
            >
                {isApproving ? 'Approving...' : 'Find'}
            </Button>
        );
    }

    // Once approved (or no approval needed), show TxButton for lost transaction
    return (
        <TxButton
            simulateHook={simulateLost}
            writeHook={writeLost}
            params={lostParams}
            text="Find"
            className={className}
        />
    );
}
