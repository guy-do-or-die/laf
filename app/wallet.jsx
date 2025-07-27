import { useEffect, useState, useCallback } from 'react';

import { encodeFunctionData } from 'viem'

import * as chains from 'viem/chains'

import { http, useAccount as useWagmi, useBytecode } from 'wagmi'
import { PrivyProvider, usePrivy, useWallets } from '@privy-io/react-auth'
import { WagmiProvider, createConfig, useSetActiveWallet } from '@privy-io/wagmi'
import { SmartWalletsProvider, useSmartWallets } from '@privy-io/react-auth/smart-wallets';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { 
  detectSmartWallet, 
  detectEmbeddedWallet, 
  detectExternalWallet, 
  determineActiveWallet, 
  isUserLoggedIn, 
  isSmartWalletDeployed, 
  createWalletDebugState 
} from '@/services/walletService';

export const queryClient = new QueryClient()

export const supportedChains = {
    main: chains.base,
    test: chains.baseSepolia,
}
  
export const chain = supportedChains['test']

export const privyConfig = {
    loginMethods: ['email', 'google', 'wallet'],
    walletChainType: 'ethereum-only',
    supportedChains: [chain],
    defaultChain: chain,
    embeddedWallets: {
      createOnLogin: 'users-without-wallets',
      noPromptOnSignature: true,
      showWalletUIs: false,
    }
}


export const wagmiConfig = createConfig({
  chains: [chain],
  transports: { [chain.id]: http() },
})


export function useSmartWalletSimulateHook(originalSimulateHook) {
  return function useSmartWalletEnhancedSimulateHook(args) {
    const { address: account, smartWalletClient } = useAccount();
    const enhancedArgs = smartWalletClient ? {...args, account} : args;
    
    return originalSimulateHook(enhancedArgs);
  };
}

export function useSmartWalletWriteHook(originalWriteHook) {
  return function useSmartWalletEnhancedHook(args) {
    const { smartWalletClient } = useAccount();

    const originalResult = originalWriteHook(args);
    
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);

    const enhancedWriteContract = useCallback(async (writeArgs) => {
      if (!smartWalletClient) {
        return originalResult.writeContract(writeArgs);
      }
      
      try {
        setIsPending(true);
        setIsError(false);
        setError(null);
        setIsSuccess(false);
        
        const data = encodeFunctionData({
          abi: writeArgs.abi,
          functionName: writeArgs.functionName,
          args: writeArgs.args || []
        });

        const txHash = await smartWalletClient.sendTransaction({
          to: writeArgs.address,
          data,
          value: writeArgs.value || 0n,
        });
        
        setData(txHash);
        setIsSuccess(true);
        setIsPending(false);
        
        return txHash;
      } catch (err) {
        setError(err);
        setIsError(true);
        setIsPending(false);
        setIsSuccess(false);
        throw err;
      }
    }, [smartWalletClient, originalResult.writeContract]);

    const enhancedWriteContractAsync = enhancedWriteContract;

    return {
      ...originalResult,
      ...(smartWalletClient ? {
        data,
        isPending,
        isSuccess,
        isError,
        error,
      } : {}),
      writeContract: enhancedWriteContract,
      writeContractAsync: enhancedWriteContractAsync,
    };
  };
}


export function useAccount() {
  const { wallets } = useWallets();
  const { isConnected } = useWagmi();
  const { user, ready, authenticated, login, logout, exportWallet } = usePrivy();
  const { client: privySmartWalletClient } = useSmartWallets();
  const { setActiveWallet } = useSetActiveWallet();

  // Use wallet service for unified wallet detection
  const smartWalletDetection = detectSmartWallet(user, privySmartWalletClient);
  const embeddedWalletDetection = detectEmbeddedWallet(user);
  const externalWalletDetection = detectExternalWallet(wallets, isConnected);
  
  // Determine active wallet using service
  const activeWalletInfo = determineActiveWallet({
    smartWallet: smartWalletDetection,
    embeddedWallet: embeddedWalletDetection,
    externalWallet: externalWalletDetection
  });
  
  const { activeWalletType, address, signingMethod, activeWallet } = activeWalletInfo;
  
  // Check smart wallet deployment status
  const {data: bytecode} = useBytecode({ address: smartWalletDetection.address });
  const smartWalletDeployed = isSmartWalletDeployed(bytecode);
  
  // Determine login status using service
  const loggedIn = isUserLoggedIn({ ready, authenticated, isConnected, address });

  // Set active wallet for wagmi if we have an external wallet
  useEffect(() => {
    if (externalWalletDetection.externalWallet && activeWalletType === 'external_wallet') {
      setActiveWallet(externalWalletDetection.externalWallet);
    }
  }, [externalWalletDetection.externalWallet, activeWalletType, setActiveWallet]);

  // Debug wallet state using wallet service
  useEffect(() => {
    if (loggedIn) {
      const debugState = createWalletDebugState({
        activeWalletType,
        address,
        signingMethod,
        smartWallet: smartWalletDetection.smartWallet,
        embeddedWallet: embeddedWalletDetection.embeddedWallet,
        externalWallet: externalWalletDetection.externalWallet,
        user,
        privySmartWalletClient,
        isConnected,
        isSmartWalletDeployed: smartWalletDeployed
      });
      //console.log('🔗 Unified Wallet State:', debugState);
    }
  }, [loggedIn, activeWalletType, address, signingMethod, smartWalletDeployed]);

  return {
    // Core account info
    address,
    loggedIn,
    
    // Wallet type and signing info
    activeWalletType,
    signingMethod,
    
    // Specific wallet objects
    smartWallet: smartWalletDetection.smartWallet,
    smartWalletClient: smartWalletDetection.hasSmartWallet ? privySmartWalletClient : null,
    embeddedWallet: embeddedWalletDetection.embeddedWallet,
    externalWallet: externalWalletDetection.externalWallet,

    isSmartWalletDeployed: smartWalletDeployed,
    
    // Auth methods
    login,
    logout,
    
    // Full user object for advanced use cases
    user,
    exportWallet
  };
}


export default function WalletProvider({ children }) {
  return (
    <PrivyProvider appId={import.meta.env.VITE_PRIVY_APP_ID} config={privyConfig}>
      <SmartWalletsProvider>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={wagmiConfig}>
              {children}
          </WagmiProvider>
        </QueryClientProvider>
      </SmartWalletsProvider>
    </PrivyProvider>
  )
}