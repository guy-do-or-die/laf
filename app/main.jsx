import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { MiniKit } from "@worldcoin/minikit-js";
import "/app/index.css";

import WalletProvider from "./wallet";
import App from "./App.jsx";

function MiniKitInitializer({ children }) {
  const [isMiniKitReady, setIsMiniKitReady] = useState(false);

  useEffect(() => {
    const initializeMiniKit = async () => {
      try {
        // Install MiniKit
        await MiniKit.install();
        
        // Check if running in World App
        const installed = await MiniKit.isInstalled();
        setIsMiniKitReady(installed);
                  console.log('How many times is this running?');

        if (installed) {
          console.log('Running in World App with MiniKit support');
        }
        else {
          console.log('Running in browser mode');
        }
      } catch (error) {
        console.log('MiniKit not available, running in browser mode', error);
        setIsMiniKitReady(false);
      }
    };

    initializeMiniKit();
  }, []);

  // Always render children, but pass the MiniKit status
  return children;
}

function Root() {
  return (
    <StrictMode>
      <MiniKitInitializer>
        <WalletProvider>
          <App isMiniKitInstalled={true} />
        </WalletProvider>
      </MiniKitInitializer>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<Root />);
