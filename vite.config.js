import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // vite default react plugin
import tailwindcss from "@tailwindcss/vite"; // Tailwind plugin

// https://vitejs.dev
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
