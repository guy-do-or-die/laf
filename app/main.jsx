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
