import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api": {
        target: "https://0889-154-182-19-105.ngrok-free.app",
        changeOrigin: true,
        secure: true,

        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      },
    },
  },
});