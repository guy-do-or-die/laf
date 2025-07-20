import { useCallback } from 'react';
import { useSignMessage as useWagmiSignMessage } from 'wagmi';
import { usePrivy } from '@privy-io/react-auth';

import { useAccount } from '../wallet';

/**
 * Unified signing hook that routes signature requests to the correct wallet
 * based on the active wallet type detected by useAccount
 */
export function useUnifiedSigning() {
  const { 
    signingMethod, 
    isSmartWalletDeployed,
    smartWalletClient, 
    embeddedWallet, 
    externalWallet,
    activeWalletType 
  } = useAccount();
  
  const { signMessage: privySignMessage } = usePrivy();
  const { signMessageAsync: wagmiSignMessage } = useWagmiSignMessage();

  const signMessage = useCallback(async ({ message, signingMethod: overrideSigningMethod }) => {
    const finalSigningMethod = overrideSigningMethod || signingMethod;
    console.log(`🖊️ Signing with method: ${finalSigningMethod} (wallet type: ${activeWalletType})`);
    console.log('📝 Message to sign:', message);
    
    // Extract the actual message content based on format
    let messageToSign;
    if (typeof message === 'string') {
      messageToSign = message;
    } else if (message && typeof message === 'object') {
      // Handle { raw: hash } format - this means we already have the hash
      if (message.raw) {
        messageToSign = message.raw;
      } else {
        messageToSign = JSON.stringify(message);
      }
    } else {
      throw new Error('Invalid message format');
    }
    
    console.log('📤 Processed message for signing:', messageToSign);
    
    // Import hashMessage for EIP-191 compatibility
    const { hashMessage } = await import('viem');
    
    // If we received a raw hash, we need to sign it as-is (it's already hashed)
    // If we received a plain string, we need to apply hashMessage to match contract
    let finalMessage;
    if (message && message.raw) {
      // Already hashed - sign the hash directly
      finalMessage = messageToSign;
      console.log('📤 Signing pre-hashed message:', finalMessage);
    } else {
      // Plain string - sign directly, let wallet handle EIP-191 hashing
      finalMessage = messageToSign;
      console.log('📤 Signing original message directly:', finalMessage);
    }
    
    try {
      switch (finalSigningMethod) {
        case 'privy_smart_wallet':
          // Use smart wallet client exclusively - no EOA fallbacks
          console.log('📱 Using Privy Smart Wallet - direct ERC-1271 signing');
          
          if (!smartWalletClient) {
            throw new Error('Smart wallet client not available');
          }

          if (!isSmartWalletDeployed) {
            throw new Error('Smart wallet is not deployed yet');
          }
          
          console.log('📱 Using smartWalletClient for ERC-1271 signature');
          return await smartWalletClient.signMessage({
            message: typeof finalMessage === 'string' ? finalMessage : new TextEncoder().encode(finalMessage)
          });
          
        case 'privy_embedded':
          console.log('🔐 Using Privy Embedded Wallet for signing');
          // Privy expects an object with message property
          if (typeof finalMessage !== 'string' || finalMessage.length === 0) {
            console.error('Invalid message for Privy:', { finalMessage, type: typeof finalMessage, length: finalMessage?.length });
            throw new Error('Privy embedded wallet requires non-empty string message');
          }
          console.log('🔐 Calling Privy signMessage with object:', { message: finalMessage });
          // According to Privy docs, signMessage expects { message: string }
          const result = await privySignMessage({ message: finalMessage });
          console.log('🔐 Privy signMessage result:', result);
          // Return the signature from the result
          return result.signature;
          
        case 'wagmi_external':
          console.log('🦊 Using External Wallet (wagmi) for signing');
          // Wagmi can handle both string and { raw: hash } format
          return await wagmiSignMessage({ message: finalMessage });
          
        default:
          throw new Error(`Unknown signing method: ${finalSigningMethod}`);
      }
    } catch (error) {
      console.error(`❌ Signing failed with method ${finalSigningMethod}:`, error);
      throw error;
    }
  }, [signingMethod, activeWalletType, smartWalletClient, privySignMessage, wagmiSignMessage]);

  const isReady = !!signingMethod;

  return {
    signMessage,
    isReady,
    signingMethod,
    activeWalletType
  };
}
