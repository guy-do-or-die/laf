import { toBytes } from "viem";


export const createEOASigner = (address, signMessage) => {
  return {
    type: "EOA",
    getIdentifier: () => ({
      identifier: address.toLowerCase(),
      identifierKind: "Ethereum",
    }),
    signMessage: async (message) => {
      try {
        const messageToSign = message && message.trim() ? message : 'XMTP Identity Verification';
        console.log('EOA signing message:', messageToSign);
        const signature = await signMessage({message: messageToSign});
        const signatureBytes = toBytes(signature);
        return signatureBytes; 
      } catch (error) {
        console.error('EOA signing error with address ' + address.slice(0, 8), error);
        throw error;
      }
    },
  };
};


export const createSCWSigner = (address, signMessage, chainId) => {
  console.log("Creating SCW signer with chain ID:", chainId);
  return {
    type: "SCW",
    getIdentifier: () => ({
      identifier: address.toLowerCase(),
      identifierKind: "Ethereum",
    }),
    signMessage: async (message) => {
      const messageToSign = message && message.trim() ? message : 'XMTP Identity Verification';
      console.log('SCW signing message:', messageToSign);
      const signature = signMessage({message: messageToSign});
      const signatureBytes = toBytes(signature);
      return signatureBytes;
    },
    getChainId: () => BigInt(chainId),
  };
};
