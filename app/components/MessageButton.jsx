import { useState } from "react";

import { useMessagingConnection } from '../messaging/MessagingProvider';

import { MessageCircle } from "lucide-react";

import { Button } from "./ui/button";

import { useAccount } from '../wallet';
import { MessageModal } from './MessageModal';


export const MessageButton = ({ recipientAddress, itemTitle, secretHash, className = "" }) => {
  const { client, isConnecting } = useMessagingConnection();
  const { loggedIn } = useAccount();

  const [showModal, setShowModal] = useState(false);

  const handleClick = async () => {
    setShowModal(true);
  };

  return (
    <>
      <Button onClick={handleClick} disabled={!loggedIn || isConnecting || !client} className={className} size="sm">
        <MessageCircle className="mr-2 h-4 w-4" /> Message
      </Button>
      {showModal && (
        <MessageModal
          isOpen={showModal}
          itemTitle={itemTitle}
          secretHash={secretHash}
          recipientAddress={recipientAddress}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};
