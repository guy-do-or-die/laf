import { useState, useEffect, useMemo } from 'react';
import { MessageCircle, CheckCircle, AlertCircle, Loader2, Settings } from 'lucide-react';

import { useAccount } from '@/wallet';

import { useXMTP } from '@/xmtp/contexts/XMTPContext';


export const XMTPStatus = ({ className = "" }) => {
  const { user, smartWallet } = useAccount();
  const [showDetails, setShowDetails] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const isSmartWallet = useMemo(() => !!smartWallet, [smartWallet]);
  
  const { client, isConnecting, error, autoMessagingEnabled, setAutoMessagingEnabled } = useXMTP();
  const isConnected = !!client;

  // Auto-hide details after 3 seconds
  useEffect(() => {
    if (showDetails) {
      const timer = setTimeout(() => setShowDetails(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showDetails]);
  
  // Handle auto-messaging preference change
  const handleAutoMessagingToggle = () => {
    const newValue = !autoMessagingEnabled;
    setAutoMessagingEnabled(newValue);
    if (newValue) {
      // Trigger reconnection if enabled
      window.location.reload();
    }
  };

  if (!user) return null;

  const getStatusInfo = () => {
    if (isConnecting) {
      return {
        icon: <Loader2 className="h-4 w-4 animate-spin text-blue-500" />,
        text: 'Connecting...',
        color: 'text-blue-600',
        bg: 'bg-blue-50'
      };
    }
    
    if (error) {
      return {
        icon: <MessageCircle className="h-4 w-4 text-red-500" />,
        text: '',
        color: 'text-red-600',
        bg: 'bg-red-50'
      };
    }
    
    if (isConnected) {
      return {
        icon: <MessageCircle className="h-4 w-4 text-green-500" />,
        text: '',
        color: 'text-green-600',
        bg: 'bg-green-50'
      };
    }
    
    return {
      icon: <MessageCircle className="h-4 w-4 text-gray-400" />,
      text: '',
      color: 'text-gray-600',
      bg: 'bg-gray-50'
    };
  };

  const status = getStatusInfo();

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center space-x-1">
          {status.icon}
          <span className={`text-sm font-medium ${status.color}`}>
            {status.text}
          </span>
      </div>
      
      {showDetails && error && (
        <div className="absolute top-full left-0 mt-2 w-64 p-3 bg-white border border-red-200 rounded-lg shadow-lg z-50">
          <p className="text-sm text-red-600 font-medium mb-1">
            Connection Issue
          </p>
          <p className="text-xs text-gray-600">
            {error.message}
          </p>
        </div>
      )}
    </div>
  );
};
