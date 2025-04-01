import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',  // Critical for local preview
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  preview: {
    port: 4173,
    strictPort: true
  }
})