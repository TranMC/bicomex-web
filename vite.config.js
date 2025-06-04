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
  },  build: {
    target: 'es2020',
    sourcemap: false,
    minify: 'terser',
    cssCodeSplit: true,
    reportCompressedSize: false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 2,
      },
      mangle: true,
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-router')) {
              return 'router-vendor';
            }
            if (id.includes('swiper')) {
              return 'swiper-vendor';
            }
            if (id.includes('react-icons') || id.includes('@headlessui')) {
              return 'ui-vendor';
            }
            // Other vendor libraries
            return 'vendor';
          }
          
          // Page-based chunks
          if (id.includes('/pages/Product')) {
            return 'product-pages';
          }
          if (id.includes('/pages/Profile') || id.includes('/pages/Orders') || id.includes('/pages/Settings')) {
            return 'user-pages';
          }
          if (id.includes('/components/cart/') || id.includes('/pages/Cart')) {
            return 'cart-chunk';
          }
        },        // Optimize chunk file names với content hash
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',        assetFileNames: (assetInfo) => {
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/\.(css)$/i.test(assetInfo.name)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
      external: [],
    },
    // Optimize chunk size và performance
    chunkSizeWarningLimit: 500,
    assetsInlineLimit: 4096, // Inline assets < 4KB
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
