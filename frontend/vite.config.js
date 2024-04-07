import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
//export default defineConfig({
//  plugins: [react()],
//})

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8000',  // Cambia la URL según tu backend
    },
  },
});
