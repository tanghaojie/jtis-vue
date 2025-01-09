import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  root: resolve(__dirname),
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, '../src') }],
  },
})
