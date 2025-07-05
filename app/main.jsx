// Import polyfills first
import { Buffer } from 'buffer';

// Make Buffer available globally
window.Buffer = Buffer;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "/app/index.css";

import WalletProvider from "./wallet";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WalletProvider>
      <App />
    </WalletProvider>
  </StrictMode>,
);
