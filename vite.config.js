import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // base: '/bicomex-web',
  plugins: [react(), tailwindcss],
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    cors: true, 
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      clientPort: 5173
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
