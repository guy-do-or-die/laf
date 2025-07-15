import { useState } from "react";

import { useConnectXmtp } from '../xmtp/hooks/useConnectXmtp';

import { MessageCircle } from "lucide-react";

import { Button } from "./ui/button";

import { useAccount } from '../wallet';
import { MessageModal } from './MessageModal';


export const MessageButton = ({ recipientAddress, itemTitle, className = "" }) => {
  const { client, isConnecting } = useConnectXmtp();
  const { loggedIn } = useAccount();

  const [showModal, setShowModal] = useState(false);

  const handleClick = async () => {
    setShowModal(true);
  };

  return (
    <>
      <Button onClick={handleClick} disabled={!loggedIn || isConnecting || !client} className={className} size="sm">
        <MessageCircle className="mr-2 h-4 w-4" />
        Message
      </Button>
      {showModal && (
        <MessageModal
          isOpen={showModal}
          recipientAddress={recipientAddress}
          itemTitle={itemTitle}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};
