import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

import progress from "vite-plugin-progress"
import { visualizer } from "rollup-plugin-visualizer"
import viteCompression from "vite-plugin-compression"
import vueSetupExtend from "vite-plugin-vue-setup-extend"
import viteImagemin from "vite-plugin-imagemin"
import { createHtmlPlugin } from "vite-plugin-html"
import Components from "unplugin-vue-components/vite"

export default defineConfig({
  plugins: [
    vue(),
    progress(),
    Components(),
    vueSetupExtend(),
    visualizer(),
    viteImagemin({
      verbose: false,
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 20
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox"
          },
          {
            name: "removeEmptyAttrs",
            active: false
          }
        ]
      }
    }),
    createHtmlPlugin({ minify: true }),
    viteCompression({
      verbose: false,
      threshold: 10240,
      deleteOriginFile: false
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  server: {
    open: true,
    host: "0.0.0.0",
    port: 8080
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/styles/scss/_variables.scss";
          @import "@/assets/styles/scss/_mixins.scss";
        `
      }
    }
  },
  esbuild: {
    drop: ["console", "debugger"]
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: "js/[hash].js",
        entryFileNames: "js/[hash].js",
        assetFileNames: "assets/[ext]/[hash].[ext]",
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"
          }
        }
      }
    }
  }
})
