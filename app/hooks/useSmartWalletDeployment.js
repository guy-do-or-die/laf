import { useState, useEffect } from 'react';
import { useWaitForTransactionReceipt } from 'wagmi';

import { useAccount } from '../wallet';
import { notify } from '../components/Notification';

import { useSimulateLafPing, useWriteLafPing } from '../contracts';
import { useSmartWalletSimulateHook, useSmartWalletWriteHook } from '../wallet';

/**
 * Simple hook for smart wallet deployment
 * Detects when deployment is needed, sends ping transaction, waits for result
 */
export function useSmartWalletDeployment() {
    const { activeWalletType, address, isSmartWalletDeployed, isLoggedIn } = useAccount();
    
    const [isDeploying, setIsDeploying] = useState(false);
    const [deploymentStatus, setDeploymentStatus] = useState('idle'); // 'idle', 'deploying', 'success', 'error'
    const [deploymentTxHash, setDeploymentTxHash] = useState(null);
    
    // Check if deployment is needed
    const deploymentNeeded = activeWalletType === 'smart_wallet' && !isSmartWalletDeployed;
    
    // Get hooks for ping transaction
    const simulatePing = useSmartWalletSimulateHook(useSimulateLafPing)({
        args: [],
        query: { enabled: deploymentNeeded && isLoggedIn }
    });
    
    const writePing = useSmartWalletWriteHook(useWriteLafPing)({
        args: [],
        query: { enabled: deploymentNeeded && isLoggedIn && simulatePing?.isSuccess }
    });
    
    // Wait for transaction confirmation like TxButton does
    const {
        data: confirmationData,
        isError: isConfirmationError,
        isSuccess: isConfirmationSuccess,
        error: confirmationError,
    } = useWaitForTransactionReceipt({
        confirmations: 1,
        hash: deploymentTxHash,
        query: { enabled: !!deploymentTxHash }
    });

    const isReady = !deploymentNeeded || isConfirmationSuccess;
    
    // Deploy smart wallet function
    const deploySmartWallet = async () => {
        if (!deploymentNeeded || isDeploying || !writePing.writeContract || !simulatePing.data?.request) {
            return;
        }
        
        console.log('🚀 Starting smart wallet deployment...');
        setIsDeploying(true);
        setDeploymentStatus('deploying');
        
        try {
            // Use the same pattern as TxButton - spread simulateData.request with account
            const result = await writePing.writeContract({
                ...simulatePing.data.request,
                account: address
            });
            console.log('✅ Smart wallet deployment transaction sent:', result);
            
            // Store transaction hash for confirmation waiting
            setDeploymentTxHash(result);
            
        } catch (error) {
            console.error('❌ Smart wallet deployment failed:', error);
            setDeploymentStatus('error');
            
            if (error.message?.includes('User rejected') || 
                error.message?.includes('User denied') || 
                error.message?.includes('User cancelled')) {
                notify('Smart wallet deployment cancelled by user', 'error');
            } else {
                notify('Smart wallet deployment failed. Please try again.', 'error');
            }
        } finally {
            setIsDeploying(false);
        }
    };
    
    // Handle transaction confirmation results
    useEffect(() => {
        if (isConfirmationSuccess) {
            console.log('✅ Smart wallet deployment confirmed:', confirmationData);
            setDeploymentStatus('success');
            setIsDeploying(false);
            notify('Smart wallet deployed successfully!', 'success');
        }
        if (isConfirmationError) {
            console.error('❌ Smart wallet deployment confirmation failed:', confirmationError);
            setDeploymentStatus('error');
            setIsDeploying(false);
            notify('Smart wallet deployment failed to confirm', 'error');
        }
    }, [isConfirmationSuccess, isConfirmationError, confirmationData, confirmationError]);
    
    // Auto-deploy when conditions are met
    useEffect(() => {
        if (deploymentNeeded && 
            simulatePing.isSuccess && 
            simulatePing.data?.request && 
            writePing?.writeContract && 
            !isDeploying && 
            deploymentStatus === 'idle') {
            deploySmartWallet();
        }
    }, [deploymentNeeded, simulatePing.isSuccess, simulatePing.data?.request, isDeploying, deploymentStatus]);
    
    // Reset status when wallet changes
    useEffect(() => {
        setDeploymentStatus('idle');
        setIsDeploying(false);
    }, [isLoggedIn, address, activeWalletType]);
    
    return {
        // Status
        deploymentNeeded,
        isReady,
        isDeploying,
        deploymentStatus,
        
        // Manual trigger (if needed)
        deploySmartWallet,
        
        // Status message for UI
        statusMessage: isDeploying 
            ? 'Deploying smart wallet...' 
            : deploymentNeeded 
                ? 'Smart wallet needs deployment' 
                : 'Ready'
    };
}