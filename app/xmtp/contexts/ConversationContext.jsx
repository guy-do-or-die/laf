import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { Group } from "@xmtp/browser-sdk";


const ConversationContext = createContext({
  members: new Map(),
});

export const ConversationProvider = ({children, conversation}) => {
  const [members, setMembers] = useState(new Map());

  useEffect(() => {
    if (!(conversation instanceof Group)) {
      return;
    }

    const loadMembers = async () => {
      const members = await conversation.members();
      setMembers(
        new Map(
          members.map((m) => [m.inboxId, m.accountIdentifiers[0].identifier]),
        ),
      );
    };

    void loadMembers();
  }, [conversation.id]);

  const value = useMemo(
    () => ({ conversation, members }),
    [conversation, members],
  );

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversationContext = () => {
  const context = useContext(ConversationContext);
  if (!context.conversation) {
    throw new Error(
      "useConversationContext must be used within a ConversationProvider",
    );
  }
  return context;
};
