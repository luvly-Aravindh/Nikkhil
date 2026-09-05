import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
<<<<<<< HEAD
=======
import tailwindcss from "@tailwindcss/vite";
>>>>>>> f4425e905dc47b20d52c27d8072a45cbab91bba0

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
<<<<<<< HEAD
  plugins: [react()],
  server: { proxy },
  preview: { proxy },
});
=======
  plugins: [react(), tailwindcss()],
  server: { proxy },
  preview: { proxy },
});
>>>>>>> f4425e905dc47b20d52c27d8072a45cbab91bba0
