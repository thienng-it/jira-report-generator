import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/jira-report-generator/',
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react'],
          bootstrap: ['react-bootstrap', 'bootstrap'],
        },
      },
    },
    minify: 'esbuild',
    cssMinify: true,
  },
  optimizeDeps: {
    include: ['react'],
  },
})
