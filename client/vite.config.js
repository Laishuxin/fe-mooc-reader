import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Components from "unplugin-vue-components/vite"
import { VantResolver } from "unplugin-vue-components/resolvers"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@api": fileURLToPath(new URL("./src/api", import.meta.url)),
      "@views": fileURLToPath(new URL("./src/views", import.meta.url)),
      "@stores": fileURLToPath(new URL("./src/stores", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url),
      ),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // 不可以省略rewrite
      },
    },
  },
})
