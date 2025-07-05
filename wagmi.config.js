import { config } from "dotenv";
import { zeroAddress } from "viem";
import { defineConfig } from "@wagmi/cli";
import { react, foundry } from "@wagmi/cli/plugins";

import * as chains from "viem/chains";

config();

export default defineConfig({
  out: "app/contracts.ts",
  plugins: [
    react(),
    foundry({
      deployments: {
        LAF: {
          [chains.worldchain.id]:
            process.env.CONTRACT_WORLDCHAIN || zeroAddress,
          [chains.worldchainSepolia.id]:
            process.env.CONTRACT_WORLDCHAIN_SEPOLIA || zeroAddress,
        },
      },
    }),
  ],
});
