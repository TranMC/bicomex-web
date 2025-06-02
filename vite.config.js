import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  plugins: [
    react({
      // Tối ưu JSX transform
      jsxRuntime: 'automatic',
      babel: {
        plugins: [
          // Remove development-only code in production
          ['babel-plugin-transform-remove-console', { exclude: ['error', 'warn'] }]
        ]
      }
    }), 
    tailwindcss
  ],
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    cors: true, 
    port: 5174,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'react-icons/fa',
      'swiper/react',
      'swiper/modules', 
      '@headlessui/react'
    ],
    exclude: ['gh-pages'],
  },
  build: {
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          'react-vendor': ['react', 'react-dom'],
          // Router
          'router-vendor': ['react-router-dom'],
          // UI libraries
          'ui-vendor': ['react-icons/fa', '@headlessui/react'],
          // Swiper (heavy component)
          'swiper-vendor': ['swiper/react', 'swiper/modules'],
          // Large pages
          'product-pages': [
            './src/pages/ProductPage.jsx',
            './src/pages/ProductDetailPage.jsx'
          ],
          // User pages  
          'user-pages': [
            './src/pages/ProfilePage.jsx',
            './src/pages/OrdersPage.jsx',
            './src/pages/SettingsPage.jsx'
          ]
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${extType}`;
          }
          if (/\.(css)$/i.test(assetInfo.name)) {
            return `assets/css/[name]-[hash].${extType}`;
          }
          return `assets/[name]-[hash].${extType}`;
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
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
