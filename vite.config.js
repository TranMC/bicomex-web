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
    include: ['react', 'react-dom', 'react-router-dom', 'react-icons', 'swiper', '@headlessui/react'],
    exclude: ['gh-pages'], // Exclude packages not needed in client-side rendering
  },
  build: {
    sourcemap: false,
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
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // Tắt các tính năng gây lỗi
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
})
