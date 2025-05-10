import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss],
  base: "/bicomex-web",
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    cors: true, // Enable CORS for all requests
    hmr: {
      // Prevent excessive HMR reconnections
      protocol: 'ws',
      host: 'localhost',
      clientPort: 5173
    },
  },
  // Prevent memory leaks with optimized dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  // Optimize build settings
  build: {
    sourcemap: false, // Disable sourcemaps in production
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  // Configure asset handling to prevent CORB issues
  resolve: {
    alias: {
      '@': '/src', // Makes imports cleaner
    },
  },
})
