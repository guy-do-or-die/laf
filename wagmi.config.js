import { config } from "dotenv";
import { zeroAddress } from "viem";
import { defineConfig } from "@wagmi/cli";
import { react, foundry } from "@wagmi/cli/plugins";

import * as chains from "viem/chains";

config();

export default defineConfig({
  out: "app/contracts.js",
  plugins: [
    react(),
    foundry({
      deployments: {
        LAF: {
          [chains.base.id]: process.env.CONTRACT_BASE || zeroAddress,
          [chains.baseSepolia.id]: process.env.CONTRACT_BASE_SEPOLIA || zeroAddress,
        },
        USDC: {
          [chains.base.id]: process.env.USDC_BASE || zeroAddress,
          [chains.baseSepolia.id]: process.env.USDC_BASE_SEPOLIA || zeroAddress,
        },
      },
    }),
  ],
});
