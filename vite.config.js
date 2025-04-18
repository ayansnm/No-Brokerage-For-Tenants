import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: true, // 👈 This makes the dev server accessible on your local network
    port: 5173, // 👈 You can change this port if needed
  },
})
