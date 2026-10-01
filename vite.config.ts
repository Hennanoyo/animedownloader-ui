import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

const external = (id: string) =>
  id === "react" ||
  id === "react-dom" ||
  id === "react/jsx-runtime" ||
  id === "react-aria" ||
  id.startsWith("react-aria/") ||
  id === "react-stately" ||
  id.startsWith("react-stately/");

export default defineConfig({
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      formats: ["es"],
      fileName: "index",
      cssFileName: "styles",
    },
    rollupOptions: {
      external,
    },
  },
});
