import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // The 3D stack (three, @react-three/*) is reached only through the dynamic
    // import of HeroMark, so Vite splits it into its own chunk automatically and
    // it never blocks first paint. No manual chunking needed.
    chunkSizeWarningLimit: 900,
  },
});
