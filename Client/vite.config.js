import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
/// <reference types="vite/client" />

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000'
          
        },
      },
    },
});


