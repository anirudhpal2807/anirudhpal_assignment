import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Simple, production-ready config
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
