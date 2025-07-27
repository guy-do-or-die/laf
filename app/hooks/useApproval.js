import { useState, useEffect, useCallback } from 'react';
import { parseUnits } from 'viem';

import { 
    useReadErc20Allowance, 
    useSimulateErc20Approve, 
    useWriteErc20Approve
} from '@/contracts';
import { useSmartWalletSimulateHook, useSmartWalletWriteHook } from '@/wallet';
import { useAccount } from '@/wallet';
import { notify } from '@/components/Notification';

/**
 * Hook for handling ERC20 token approvals with smart wallet/EOA abstraction
 * Automatically handles approval flow in background for smart wallets,
 * prompts for signature when needed for EOAs
 * 
 * @param {Object} config - Configuration object
 * @param {string} config.tokenAddress - ERC20 token contract address
 * @param {string} config.spenderAddress - Address that will spend the tokens
 * @param {string} config.amount - Amount to approve (as string)
 * @param {number} config.decimals - Token decimals (default: 6 for USDC)
 * @param {boolean} config.enabled - Whether the hook should be active
 * 
 * @returns {Object} - Approval state and functions
 */
export function useApproval({ 
    tokenAddress, 
    spenderAddress, 
    amount, 
    decimals = 6, 
    enabled = true 
}) {
    const { address, activeWalletType } = useAccount();
    const [isApproving, setIsApproving] = useState(false);
    const [approvalStatus, setApprovalStatus] = useState('idle'); // 'idle', 'checking', 'needed', 'approving', 'approved', 'error'

    // Handle amount - could be string or already BigInt
    const amountBigInt = typeof amount === 'string' 
        ? parseUnits(amount, decimals) 
        : (amount || 0n);

    // Check current allowance
    const { 
        data: currentAllowance = 0n, 
        isLoading: isCheckingAllowance,
        refetch: refetchAllowance 
    } = useReadErc20Allowance({
        args: [address, spenderAddress],
        enabled: enabled && !!address && !!spenderAddress && !!tokenAddress
    });

    // Check if approval is needed (must be calculated before hooks that use it)
    const needsApproval = currentAllowance < amountBigInt;
    const isApproved = !needsApproval && amountBigInt > 0n;

    // Approval hooks
    const {
        data: simulateData,
        isSuccess: isSimulateSuccess,
        isError: isSimulateError
    } = useSmartWalletSimulateHook(useSimulateErc20Approve)({
        args: [spenderAddress, amountBigInt],
        enabled: enabled && !!address && !!spenderAddress && !!tokenAddress && needsApproval
    });
    
    const {
        writeContract,
        isPending: isWritePending,
        isSuccess: isWriteSuccess,
        isError: isWriteError,
        error: writeError
    } = useSmartWalletWriteHook(useWriteErc20Approve)({
        args: [spenderAddress, amountBigInt],
        enabled: enabled && !!address && !!spenderAddress && !!tokenAddress && isSimulateSuccess
    });

    // Update approval status based on allowance check
    useEffect(() => {
        if (!enabled || !amountBigInt) {
            setApprovalStatus('idle');
            return;
        }

        if (isCheckingAllowance) {
            setApprovalStatus('checking');
        } else if (needsApproval) {
            setApprovalStatus('needed');
        } else {
            setApprovalStatus('approved');
        }
    }, [enabled, amountBigInt, isCheckingAllowance, needsApproval]);

    // Handle write success/error with useEffect
    useEffect(() => {
        if (isWriteSuccess) {
            notify('Token approval successful!', 'success');
            setApprovalStatus('approved');
            setIsApproving(false);
            
            // Refetch allowance to update state
            setTimeout(() => {
                refetchAllowance();
            }, 1000);
        }
    }, [isWriteSuccess, refetchAllowance]);
    
    useEffect(() => {
        if (isWriteError) {
            console.error('Approval failed:', writeError);
            notify('Approval failed. Please try again.', 'error');
            setApprovalStatus('error');
            setIsApproving(false);
        }
    }, [isWriteError, writeError]);

    const approve = () => {
        if (!needsApproval || isApproving || !isSimulateSuccess) return false;
        
        setIsApproving(true);
        setApprovalStatus('approving');

        // Notify user based on wallet type
        if (activeWalletType === 'smart_wallet') {
            notify('Approving token spending in background...', 'info');
        } else {
            notify('Please confirm the approval transaction...', 'info');
        }

        try {
            writeContract({ 
                ...simulateData.request, 
                account: address 
            });
            return true;
        } catch (error) {
            console.error('Approval execution failed:', error);
            notify('Approval failed. Please try again.', 'error');
            setApprovalStatus('error');
            setIsApproving(false);
            return false;
        }
    };

    // Auto-approve for smart wallets (optional behavior)
    const autoApprove = () => {
        if (activeWalletType === 'smart_wallet') {
            return approve();
        }
        return false;
    };

    return {
        // State
        needsApproval,
        isApproved,
        isApproving,
        isCheckingAllowance,
        approvalStatus,
        currentAllowance,
        
        // Actions
        approve,
        autoApprove,
        refetchAllowance,
        
        // Computed values
        canAutoApprove: activeWalletType === 'smart_wallet' && needsApproval,
        approvalText: isApproving ? 'Approving...' : needsApproval ? 'Approve' : 'Approved'
    };
}
