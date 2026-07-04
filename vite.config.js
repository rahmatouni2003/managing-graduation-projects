import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api": {
        target: "https://d97c-154-183-132-96.ngrok-free.app",
        changeOrigin: true,
        secure: true,

        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      },
    },
  },
});