import { defineConfig } from "vite";

export default defineConfig({
  // Relative base so the built site works under a project subpath
  // (e.g. https://<user>.github.io/afritravel/) and locally alike.
  base: "./",
  server: {
    port: 5173,
    open: false,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
