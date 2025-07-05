import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["static.usernames.app-backend.toolsforhumanity.com"],
  },
  allowedDevOrigins: ["https://aardvark-careful-purely.ngrok-free.app"], // Add your dev origin here
  reactStrictMode: false,
};

export default nextConfig;
