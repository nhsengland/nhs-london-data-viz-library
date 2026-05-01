import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// Library build configuration - produces ESM bundle for npm consumption
export default defineConfig({
  plugins: [react({ jsxRuntime: "automatic" })],
  publicDir: false,
  build: {
    lib: {
      entry: resolve(__dirname, "src/nhs-viz/index.ts"),
      formats: ["es"],
      fileName: "index",
      cssFileName: "style",
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "recharts",
        "nhsuk-frontend",
      ],
    },
    outDir: "dist-lib",
    emptyOutDir: true,
  },
});
