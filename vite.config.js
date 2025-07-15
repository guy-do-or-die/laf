import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
});
