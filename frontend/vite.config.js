import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api/v1': {
        target: 'http://localhost:5000', // Change this to your API server URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
