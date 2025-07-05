import * as chains from 'viem/chains'

import { PrivyProvider, usePrivy } from '@privy-io/react-auth'
import { WagmiProvider, createConfig } from '@privy-io/wagmi'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { http, useWalletClient } from 'wagmi'

export const supportedChains = {
    main: chains.worldchain,
    test: chains.worldchainSepolia,
}
  
export const chain = supportedChains['test']

export const queryClient = new QueryClient()

export const privyConfig = {
    loginMethods: ['email', 'wallet'],
    walletChainType: 'ethereum-only',
    supportedChains: [chain],
    defaultChain: chain,
}

export const wagmiConfig = createConfig({
  chains: [chain],
  transports: { [chain.id]: http() },
})


export function useAccount() {
  const { user, ready, authenticated, login, logout } = usePrivy()

  const address = user?.wallet?.address
  const logged = ready && authenticated

  return {
    address,
    login,
    logout,
    logged,
  }
}


export default function WalletProvider({ children }) {
  return (
    <PrivyProvider appId={import.meta.env.VITE_PRIVY_APP_ID} config={privyConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
            {children}
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  )
}