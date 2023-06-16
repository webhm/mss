import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: '0.0.0.0'
  },
  preview: {
    https: true

  },
  base: '/',
  // Uncomment to use JSX:
  // esbuild: {
  //   jsx: "transform",
  //   jsxFactory: "m",
  //   jsxFragment: "'['",
  // },
});
