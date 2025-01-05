import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"], // Ensures 'lucide-react' is not pre-bundled by Vite
  },
  server: {
    port: 3000, // Optional: Adjust this port if necessary (Render typically uses 3000)
    host: "0.0.0.0", // Make sure the server is accessible externally
    strictPort: true, // Ensures the port is strictly 3000
  },
  build: {
    outDir: "dist", // The output directory for production build (adjust as needed)
    sourcemap: true, // Optional: Useful for debugging the production build
  },
  define: {
    "process.env": {}, // To handle environment variables in production
  },
});