import { parseUnits } from 'viem';
import { useLocation } from 'wouter';

import { notify } from '@/components/Notification';
import { useApproval } from '@/hooks/useApproval';

import TxButton from '@/components/TxButton';

import {
    useReadLafItems,
    useSimulateLafLost,
    useWriteLafLost
} from '@/contracts';

import { useSmartWalletSimulateHook, useSmartWalletWriteHook } from '@/wallet';
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
    disabled: externalDisabled = false, 
    className = "" 
}) {
    const [, setLocation] = useLocation();
    const { data: itemContractAddress } = useReadLafItems({ args: [secretHash] });

    // Get reward token info from LAF config context
    const { address: rewardTokenAddress, decimals: rewardTokenDecimals, isReady: isConfigReady } = useRewardToken();
    
    // Smart wallet hooks for lost transaction
    const simulateLost = useSmartWalletSimulateHook(useSimulateLafLost);
    const writeLost = useSmartWalletWriteHook(useWriteLafLost);
    
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

    // Button disabled logic - includes external disabled prop and internal validation
    const disabled = externalDisabled || !itemContractAddress || !secretHash || rewardValue <= 0n || !geo?.trim() || !isConfigReady;
    
    // Trigger for TxButton - handles approval before lost transaction
    const trigger = async () => {
        if (needsApproval && !isApproved) {
            notify('Processing approval...', 'info');
            const approvalSuccess = await approve();
            if (!approvalSuccess) {
                return false;
            }

            await new Promise(resolve => setTimeout(resolve, 500));
        }
        return true;
    };

    // Lost transaction parameters for TxButton
    const lostParams = {
        args: [secretHash, rewardValue, geo],
        enabled: !disabled,
        trigger: needsApproval && !isApproved ? trigger : undefined,
        onWriteSuccess: () => {
            notify('Item successfully reported as lost!', 'success');
            setTimeout(() => {
                setLocation('/items');
            }, 2000);
        },
        writeCallback: ({ data, error }) => {
            if (error) {
                console.error('Lost transaction failed:', error);
            }
        }
    };

    // Determine button text based on current state
    const getButtonText = () => {
        if (isApproving) return 'Processing...';
        if (needsApproval && !isApproved) return 'Find'; // Will handle approval + lost seamlessly
        return 'Find'; // Will execute lost transaction
    };

    // Use TxButton with trigger for seamless approval + lost transaction
    return (
        <TxButton
            simulateHook={simulateLost}
            writeHook={writeLost}
            params={lostParams}
            className={className}
            text={getButtonText()}
        />
    );
}
