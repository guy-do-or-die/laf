import { createContext, useContext, useState } from 'react';
import { Client } from '@xmtp/xmtp-js';
import { useAccount } from '../wallet';
import { useWalletClient } from 'wagmi';

const XMTPContext = createContext();

export function useXMTP() {
  return useContext(XMTPContext);
}

export function XMTPProvider({ children }) {
  const { address, logged } = useAccount();
  const { data: walletClient } = useWalletClient();
  
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Initialize XMTP client - MANUAL ONLY, no auto-initialization
  const initXmtp = async () => {
    if (!address || !logged || !walletClient) {
      console.log('Cannot initialize XMTP: missing address, login, or wallet');
      return null;
    }
    
    // If client already exists, return it
    if (client) {
      console.log('XMTP client already exists, reusing');
      return client;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Creating new XMTP client for address:', address);
      
      // Create a custom signer that uses the wagmi wallet client
      const signer = {
        getAddress: async () => address,
        signMessage: async (message) => {
          console.log('Signing XMTP message...');
          return await walletClient.signMessage({ message });
        }
      };
      
      // Use the v11.1.1 SDK with explicit V3 options
      console.log('Creating XMTP client with V3 options');
      const xmtp = await Client.create(signer, {
        env: 'production',
        // Use V3 API explicitly
        apiUrl: 'https://production.xmtp.network/v3',
        // Skip legacy key publishing
        skipContactPublishing: true
      });
      
      console.log('XMTP client created successfully');
      setClient(xmtp);
      return xmtp;
    } catch (e) {
      console.error('Error creating XMTP client:', e);
      setError(e);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Disconnect XMTP client
  const disconnect = () => {
    setClient(null);
  };

  const value = {
    client,
    isLoading,
    error,
    initXmtp,
    disconnect,
  };

  return (
    <XMTPContext.Provider value={value}>
      {children}
    </XMTPContext.Provider>
  );
}
