import { useEffect, useState, useCallback } from 'react';

import { encodeFunctionData } from 'viem'

import * as chains from 'viem/chains'

import { http, useAccount as useWagmi } from 'wagmi'
import { PrivyProvider, usePrivy, useWallets } from '@privy-io/react-auth'
import { WagmiProvider, createConfig, useSetActiveWallet } from '@privy-io/wagmi'
import { SmartWalletsProvider, useSmartWallets } from '@privy-io/react-auth/smart-wallets';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const supportedChains = {
    main: chains.base,
    test: chains.baseSepolia,
}
  
export const chain = supportedChains['test']

export const queryClient = new QueryClient()

export const privyConfig = {
    loginMethods: ['email', 'wallet'],
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
  const { user, ready, authenticated, login, logout } = usePrivy()

  const { client: privySmartWalletClient } = useSmartWallets();
  const { setActiveWallet } = useSetActiveWallet();
    
  const activeWallet = wallets.find((wallet) => wallet.address === user?.wallet?.address);
  
  // Get smart wallet from user's linked accounts
  const smartWallet = user?.linkedAccounts?.find((account) => account.type === 'smart_wallet');
  const address = smartWallet?.address || activeWallet?.address;
  const loggedIn = ready && authenticated && isConnected;

  useEffect(() => {
    activeWallet && setActiveWallet(activeWallet);
  }, [activeWallet])

  // Debug what we're getting from Privy (throttled to prevent spam)
  useEffect(() => {
    if (loggedIn && (smartWallet || privySmartWalletClient)) {
      console.log('Privy Smart Wallet Debug:', {
        hasSmartWallet: !!smartWallet,
        smartWalletAddress: smartWallet?.address,
        hasPrivyClient: !!privySmartWalletClient,
        privyClientType: typeof privySmartWalletClient,
        privyClientMethods: privySmartWalletClient ? Object.getOwnPropertyNames(privySmartWalletClient).filter(name => typeof privySmartWalletClient[name] === 'function') : []
      });
    }
  }, [loggedIn, !!smartWallet, !!privySmartWalletClient]); // Only log when these change
  
  return {
    address,
    login,
    logout,
    loggedIn,
    smartWallet,
    smartWalletClient: privySmartWalletClient, // Use the actual Privy smart wallet client
    user // For components that need access to full user info
  }
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