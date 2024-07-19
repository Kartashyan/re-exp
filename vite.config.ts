import { vitePlugin as remix } from "@remix-run/dev";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
    react(),
  ],
  resolve: {
    alias: [
      { find: "app", replacement: path.resolve(__dirname, "./app/") },
],
  },
  build: {
    rollupOptions: {
      external: ['mock-aws-s3', 'aws-sdk', 'nock']
    }
  }
});
