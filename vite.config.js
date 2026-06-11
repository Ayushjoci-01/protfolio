import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Three.js is inherently ~876 kB; raise limit to silence unavoidable warning
    chunkSizeWarningLimit: 1000,

    // Vite 8 uses Rolldown — use rolldownOptions (not rollupOptions)
    rolldownOptions: {
      output: {
        // Enable Rolldown's automatic code-splitting
        codeSplitting: true,

        // Manually group heavy vendors into cacheable chunks
        manualChunks(id) {
          if (id.includes('three') || id.includes('@react-three')) {
            return 'vendor-three';
          }
          if (id.includes('framer-motion')) {
            return 'vendor-motion';
          }
          if (id.includes('lucide-react') || id.includes('canvas-confetti')) {
            return 'vendor-ui';
          }
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/')
          ) {
            return 'vendor-react';
          }
        },
      },
    },
  },
})
