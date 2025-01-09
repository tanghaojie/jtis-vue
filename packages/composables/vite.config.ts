import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [Vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'vue-composables',
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
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
  },
})
