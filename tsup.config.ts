import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  minify: false,
  keepNames: true,
  sourcemap: true,
  splitting: true,
  target: "node18",
  format: "cjs",
  platform: "node",
});
