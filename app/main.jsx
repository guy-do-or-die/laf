import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "/app/index.css";

import WalletProvider from "./wallet";
import XMTPProvider from "./xmtp/contexts/XMTPContext";
import { ConversationsProvider } from "./xmtp/contexts/ConversationsContext";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WalletProvider>
      <XMTPProvider>
        <ConversationsProvider>
          <App />
        </ConversationsProvider>
      </XMTPProvider>
    </WalletProvider>
  </StrictMode>,
);
