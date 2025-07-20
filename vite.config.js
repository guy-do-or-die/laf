import path from "path";

import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = command === "build" || mode === "production";

  return {
    plugins: [
      react(),
      // Only use node polyfills in production builds, not in dev
      ...(isProduction
        ? [
            nodePolyfills({
              // Whether to polyfill `node:` protocol imports.
              protocolImports: true,
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./app"),
        "~": path.resolve(__dirname, "./"),
      },
    },
    optimizeDeps: {
      exclude: ["@xmtp/browser-sdk"],
      include: ["protobufjs/minimal"],
    },
    define: {
      global: "globalThis",
    },
    server: {
      fs: {
        allow: ["."],
      },
    },
  };
});
