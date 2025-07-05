import { useState } from 'react';
import { useXMTP } from '../lib/xmtp';
import { useAccount } from '../wallet';
import { MessagingInbox } from '../components/Messaging';
import { Button } from '../components/ui/button';
import { notify } from '../components/Notification';

export default function Messages() {
  const { client, initXmtp, isLoading } = useXMTP();
  const { address, logged } = useAccount();
  const [connectError, setConnectError] = useState(null);
  
  // Connect to XMTP - manual connection only
  const connectToXMTP = async () => {
    if (!logged) {
      notify('Please connect your wallet first', 'error');
      return;
    }
    
    try {
      setConnectError(null);
      console.log('Attempting to connect to XMTP...');
      const result = await initXmtp();
      
      if (result) {
        console.log('Successfully connected to XMTP');
        notify('Connected to XMTP messaging', 'success');
      } else {
        console.log('Failed to connect to XMTP');
        setConnectError('Failed to connect to XMTP. Please try again.');
      }
    } catch (error) {
      console.error('Error connecting to XMTP:', error);
      setConnectError('Error connecting to XMTP: ' + (error.message || 'Unknown error'));
      notify('Failed to connect to XMTP', 'error');
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      
      {!logged ? (
        <div className="text-center py-10 border rounded-lg p-8">
          <p className="mb-4">Connect your wallet to view messages</p>
        </div>
      ) : !client ? (
        <div className="text-center py-10 border rounded-lg p-8">
          <p className="mb-4">Connect to XMTP to start messaging</p>
          <p className="text-sm text-gray-500 mb-6">
            XMTP allows you to send encrypted messages to other Ethereum addresses.
            You'll need to sign a message to create your XMTP identity (you'll only need to do this once).  
          </p>
          {connectError && (
            <div className="text-red-500 mb-4 p-2 bg-red-50 rounded">
              {connectError}
            </div>
          )}
          <Button 
            onClick={connectToXMTP} 
            disabled={isLoading} 
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? 'Connecting...' : 'Connect to XMTP'}
          </Button>
        </div>
      ) : (
        <MessagingInbox />
      )}
    </div>
  );
}
