import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss],
  // base: "/bicomex-web",
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
    include: ['react', 'react-dom', 'react-router-dom', 'react-icons', 'swiper', '@headlessui/react'],
    exclude: ['gh-pages'], // Exclude packages not needed in client-side rendering
  },
  // Optimize build settings
  build: {
    sourcemap: false, // Disable sourcemaps in production
    target: 'es2015', // Ensure better browser compatibility
    minify: 'terser', // Use terser for better minification
    cssMinify: true, // Minify CSS
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true, // Remove debugger statements
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['react-icons', '@headlessui/react'],
          'ui-components': ['swiper'],
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
