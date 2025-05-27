import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

export default defineConfig({
  plugins: [react(), svgr({
    svgrOptions: {
      exportType: 'named',
      ref: true,
      svgo: false,
      titleProp: true,
    },
    include: '**/*.svg',
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
    sourcemap: true,
    minify: 'terser',
    target: 'esnext',
  },
}) 