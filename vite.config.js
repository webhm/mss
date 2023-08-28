import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://api.metroplus.test:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
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