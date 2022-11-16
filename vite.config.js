import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    origin: "http://localhost:5173/",
    host: "0.0.0.0",
    fs: {
      strict: true,
    },
    // host: "0.0.0.0",
    // proxy: {
    //   "/api/v1/": {
    //     target: "http://localhost:3000/",
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
});
