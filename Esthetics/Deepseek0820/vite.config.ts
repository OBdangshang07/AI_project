import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base: './' so the production build also runs from a sub-path or a plain
// static folder — the piece should never depend on sitting at a domain root.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { target: 'es2022', assetsInlineLimit: 2048 },
})
