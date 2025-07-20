import { useEffect, useState, useCallback } from 'react';

import { encodeFunctionData } from 'viem'

import * as chains from 'viem/chains'

import { http, useAccount as useWagmi, useBytecode } from 'wagmi'
import { PrivyProvider, usePrivy, useWallets } from '@privy-io/react-auth'
import { WagmiProvider, createConfig, useSetActiveWallet } from '@privy-io/wagmi'
import { SmartWalletsProvider, useSmartWallets } from '@privy-io/react-auth/smart-wallets';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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

  // UNIFIED WALLET DETECTION LOGIC
  // Priority: Smart Wallet > Embedded Wallet > External Wallet
  
  // 1. Check for Privy Smart Wallet (highest priority)
  const smartWallet = user?.linkedAccounts?.find((account) => account.type === 'smart_wallet');
  const hasSmartWallet = !!(smartWallet && privySmartWalletClient);
  const {data: bytecode} = useBytecode({ address: smartWallet?.address })
  const isSmartWalletDeployed = bytecode !== '0x' && bytecode !== null
  
  // 2. Check for Privy Embedded Wallet
  const embeddedWallet = user?.linkedAccounts?.find((account) => account.type === 'wallet' && account.walletClientType === 'privy');
  const hasEmbeddedWallet = !!embeddedWallet;
  
  // 3. Check for External/Injected Wallet (connected via wagmi)
  const externalWallet = wallets.find((wallet) => wallet.walletClientType !== 'privy');
  const hasExternalWallet = !!(externalWallet && isConnected);
  
  // DETERMINE ACTIVE WALLET AND ADDRESS
  let activeWalletType, address, signingMethod;
  
  if (hasSmartWallet) {
    activeWalletType = 'smart_wallet';
    address = smartWallet.address;
    signingMethod = 'privy_smart_wallet';
  } else if (hasEmbeddedWallet) {
    activeWalletType = 'embedded_wallet';
    address = embeddedWallet.address;
    signingMethod = 'privy_embedded';
  } else if (hasExternalWallet) {
    activeWalletType = 'external_wallet';
    address = externalWallet.address;
    signingMethod = 'wagmi_external';
  } else {
    activeWalletType = null;
    address = null;
    signingMethod = null;
  }
  
  const loggedIn = ready && authenticated && isConnected && !!address;

  // Set active wallet for wagmi if we have an external wallet
  useEffect(() => {
    if (externalWallet && activeWalletType === 'external_wallet') {
      setActiveWallet(externalWallet);
    }
  }, [externalWallet, activeWalletType, setActiveWallet]);

  // Debug wallet state (throttled to prevent spam)
  useEffect(() => {
    if (loggedIn) {
      /*
      console.log('🔗 Unified Wallet State:', {
        activeWalletType,
        address: address?.slice(0, 8) + '...',
        signingMethod,
        hasSmartWallet,
        hasEmbeddedWallet,
        hasExternalWallet,
        privyClientAvailable: !!privySmartWalletClient,
        wagmiConnected: isConnected,
        isSmartWalletDeployed
      });
      */
    }
  }, [loggedIn,
    activeWalletType,
    address,
    signingMethod,
    hasSmartWallet,
    hasEmbeddedWallet,
    hasExternalWallet,
    isSmartWalletDeployed
  ]);

  return {
    // Core account info
    address,
    loggedIn,
    
    // Wallet type and signing info
    activeWalletType,
    signingMethod,
    
    // Specific wallet objects
    smartWallet: hasSmartWallet ? smartWallet : null,
    smartWalletClient: hasSmartWallet ? privySmartWalletClient : null,
    embeddedWallet: hasEmbeddedWallet ? embeddedWallet : null,
    externalWallet: hasExternalWallet ? externalWallet : null,

    isSmartWalletDeployed,
    
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