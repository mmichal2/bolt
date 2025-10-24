import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // folder zbudowanego projektu dla Vercel
    emptyOutDir: true // czyści folder przed nowym buildem
  },
  server: {
    port: 5173,
    open: true
  }
})
