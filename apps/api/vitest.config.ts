import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    alias: {
      "@config": path.resolve(__dirname, "./src/config"),
      "@common": path.resolve(__dirname, "./src/common"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
