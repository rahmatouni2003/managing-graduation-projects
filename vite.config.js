import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api": {
        target: "https://1fcb-154-182-18-194.ngrok-free.app/",
        changeOrigin: true,
        secure: true,

        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      },
    },
  },
});