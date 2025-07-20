import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "/app/index.css";

import WalletProvider from "./wallet";
import MessagingProvider from "./messaging/MessagingProvider.jsx";
import { BlockProvider } from "./contexts/BlockContext";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WalletProvider>
      <BlockProvider>
        <MessagingProvider>
          <App />
        </MessagingProvider>
      </BlockProvider>
    </WalletProvider>
  </StrictMode>,
);
