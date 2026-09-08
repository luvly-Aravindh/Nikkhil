import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const proxy = {
  "/desk-api": {
    target: "https://deskbackend.getnos.io",
    changeOrigin: true,
    rewrite: (p) => p.replace(/^\/desk-api/, ""),
    configure: (proxyServer) => {
      proxyServer.on("proxyReq", (proxyReq) => {
        proxyReq.removeHeader("origin");
        proxyReq.removeHeader("referer");
      });
    },
  },
};

export default defineConfig({
  plugins: [react()],
  server: { proxy },
  preview: { proxy },
});
