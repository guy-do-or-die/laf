import { createContext, useContext } from 'react';
import { useReadLafConfig } from '@/contracts';
import { useBlockContext } from '@/contexts/BlockContext';

/**
 * Context for LAF contract configuration data
 * Provides centralized access to config without redundant API calls
 */
const LafConfigContext = createContext(null);

/**
 * Provider component for LAF configuration context
 * Fetches and shares LAF config data across the application
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function LafConfigProvider({ children }) {
    const { loggedIn } = useBlockContext();

    const { data: lafConfig, isLoading, error, refetch } = useReadLafConfig({
        query: { enabled: loggedIn }
    });

    // Map array indices to named properties based on contract structure
    // lafConfig is an array: [rewardToken, decimals, minReward, ...]
    const rewardToken = lafConfig?.[0];
    const rewardTokenDecimals = lafConfig?.[1] || 6;
    const minReward = lafConfig?.[2];

    const contextValue = {
        // Config data
        config: lafConfig,
        rewardToken,
        rewardTokenDecimals,
        minReward,
        
        // Loading and error states
        isLoading,
        error,
        
        // Utility functions
        refetch,
        
        // Helper function to check if config is ready
        isConfigReady: !!rewardToken,
    };

    return (
        <LafConfigContext.Provider value={contextValue}>
            {children}
        </LafConfigContext.Provider>
    );
}

/**
 * Hook to access LAF configuration context
 * Must be used within a LafConfigProvider
 * @returns {Object} LAF configuration context value
 */
export function useLafConfig() {
    const context = useContext(LafConfigContext);
    
    if (context === null) {
        throw new Error('useLafConfig must be used within a LafConfigProvider');
    }
    
    return context;
}

/**
 * Hook to get reward token configuration specifically
 * Convenience hook for components that only need reward token info
 * @returns {Object} Reward token configuration
 */
export function useRewardToken() {
    const { rewardToken, rewardTokenDecimals, isConfigReady } = useLafConfig();
    
    return {
        address: rewardToken,
        decimals: rewardTokenDecimals,
        isReady: isConfigReady,
    };
}
