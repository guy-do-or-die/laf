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
          [chains.base.id]:
            process.env.CONTRACT_BASE || zeroAddress,
          [chains.baseSepolia.id]:
            process.env.CONTRACT_BASE_SEPOLIA || zeroAddress,
        },
      },
    }),
  ],
});
