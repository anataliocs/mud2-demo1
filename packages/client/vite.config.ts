import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import postcssNesting from 'postcss-nesting';
import path from 'path'
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    fs: {
      strict: false,
    },
  },
  build: {
    target: "es2022",
    sourcemap: true,
  },

  css: {
    postcss: {
      plugins: [
        tailwindcss
      ]
    }
  },
});
