import * as chains from 'viem/chains'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { WagmiProvider, http, createConfig } from 'wagmi'
import { metaMask } from 'wagmi/connectors'

export const supportedChains = {
    main: chains.worldchain,
    test: chains.worldchainSepolia,
}
  
export const chain = supportedChains['test']

export const queryClient = new QueryClient()

export const wagmiConfig = createConfig({
  chains: [chain],
  connectors: [metaMask()],
  transports: { [chain.id]: http() },
})


export default function WalletProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
    </QueryClientProvider>
  )
}