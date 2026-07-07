import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/LuxuryWatch-Wijaya/', // Dikembalikan ke repository asal Anda
})
