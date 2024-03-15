import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.BASE_URL,
  plugins: [vue()],
  build: {
    assetsInlineLimit: 20 * 1024,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
