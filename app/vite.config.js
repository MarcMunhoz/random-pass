import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

const path = require("path");

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
    server: {
      port: env.VITE_DEV_PORT,
    },
  };
});
