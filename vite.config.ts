import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/LuxuryWatch-J.D-Orvelle/', // Konfigurasi base path baru Anda (tanpa tanda petik satu karena dilarang GitHub)
})
