import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 443,
      host: "star-rarely-bunny.ngrok-free.app",
    },
    headers: {
      "Content-Security-Policy": `frame-ancestors 'self' http://localhost http://localhost:5173 http://localhost:5174 https://laf.is https://localhost https://www.laf.is http://localhost:4173 https://auth.privy.io https://*.ngrok-free.app`,
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      app: path.resolve(__dirname, "./app"),
    },
  },
});
