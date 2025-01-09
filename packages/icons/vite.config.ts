import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [Vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'vue-icons',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        dir: 'dist',
        globals: {
          vue: 'Vue',
        },
        inlineDynamicImports: true,
      },
    },
    sourcemap: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
  },
})
