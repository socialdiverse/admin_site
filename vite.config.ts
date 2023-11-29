import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import path from "path";
import sassGlobImports from "vite-plugin-sass-glob-import";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    svgr(),
    viteTsconfigPaths(),
    react({
      jsxImportSource: "@emotion/react",
      tsDecorators: true,
      devTarget: "es2018",
    }),
    sassGlobImports(),
  ],
  resolve: {
    alias: {
      bootstrap: path.resolve(__dirname, "node_modules/bootstrap"),
    },
  },
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3000,
  },
  define: {
    global: "globalThis",
  },
});
