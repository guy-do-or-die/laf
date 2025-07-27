import { useState, useEffect } from 'react';
import { formatUnits } from 'viem';

import { useBlockContext } from '@/contexts/BlockContext';
import { useReadErc20BalanceOf } from '@/contracts';

import { useAccount } from '@/wallet';

/**
 * Custom hook for getting user's USDC balance
 * Handles smart wallet vs external wallet address resolution
 * @returns {Object} { balance: BigInt, balanceInUSDC: number, isLoading: boolean }
 */
export function useBalance() {
    const [balance, setBalance] = useState(0n);
    const [isLoading, setIsLoading] = useState(true);
    
    const { address, isConnected } = useAccount();
    const { blockNumber } = useBlockContext();
    
    // Get balance data - this should automatically handle the correct address
    const { data: balanceData, isLoading: isBalanceLoading } = useReadErc20BalanceOf({ 
        args: [address], 
        blockNumber,
        enabled: !!address && isConnected
    });

    // Update balance when data changes
    useEffect(() => {
        if (balanceData !== undefined) {
            setBalance(balanceData);
            setIsLoading(false);
        }
    }, [balanceData]);

    // Update loading state
    useEffect(() => {
        setIsLoading(isBalanceLoading);
    }, [isBalanceLoading]);

    // Convert balance to USDC format
    const balanceInUSDC = parseFloat(formatUnits(balance, 6));

    return {
        balance,           // Raw BigInt balance
        balanceInUSDC,    // Formatted number in USDC
        isLoading,        // Loading state
        address          // Current address being used
    };
}

/**
 * Helper function to format balance for display
 * @param {BigInt} balance - Raw balance in wei
 * @returns {string} Formatted balance like "$123.45"
 */
export function formatBalance(balance) {
    const usdcAmount = parseFloat(formatUnits(balance, 6));
    return `$${usdcAmount.toFixed(2)}`;
}

/**
 * Helper function to check if user has sufficient balance for an amount
 * @param {BigInt} balance - User's current balance
 * @param {number|string} requiredAmount - Required amount in USDC
 * @returns {boolean} True if balance is sufficient
 */
export function hasSufficientBalance(balance, requiredAmount) {
    const balanceInUSDC = parseFloat(formatUnits(balance, 6));
    const required = parseFloat(requiredAmount) || 0;
    return balanceInUSDC >= required;
}
