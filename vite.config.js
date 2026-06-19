import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api": {
        target: "https://8a31-154-183-184-238.ngrok-free.app/",
        changeOrigin: true,
        secure: true,

        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      },
    },
  },
});