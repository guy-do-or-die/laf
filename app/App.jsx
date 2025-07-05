import "./direct-styles.css";

import TxButton from "./components/TxButton";
import Header from "./components/Header";


import { useSimulateLafRegisterItem, useWriteLafRegisterItem } from "./contracts"

function App() {
  return (
    <div className="min-h-screen font-sans antialiased p-8">
      <Header />

      <TxButton
        simulateHook={useSimulateLafRegisterItem}
        writeHook={useWriteLafRegisterItem}
        params={{secretHash: "0x123"}}
        text="Register Item"
      />
    </div>
  );
}

export default App;
