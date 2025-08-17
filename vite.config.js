import path from "path";

import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = command === "build" || mode === "production";

  return {
    plugins: [
      react(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./app"),
        "~": path.resolve(__dirname, "./"),
      },
    },
    optimizeDeps: {},
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
