/**
 * Utility để preload critical routes và components
 */

// Preload critical routes
export const preloadCriticalRoutes = () => {
  // Chỉ preload trong production để tránh ảnh hưởng development
  if (import.meta.env.DEV) return;

  const criticalRoutes = [
    () => import('../pages/ProductPage'),
    () => import('../pages/CartPage').then(module => ({ default: module.CartPage })),
    () => import('../pages/LoginPage'),
    () => import('../pages/ContactPage').then(module => ({ default: module.ContactPage }))
  ];

  // Preload sau khi trang chính load xong
  setTimeout(() => {
    criticalRoutes.forEach(routeLoader => {
      try {
        routeLoader();
      } catch (error) {
        console.warn('Failed to preload route:', error);
      }
    });
  }, 2000);
};

// Preload images khi hover vào links
export const setupImagePreloading = () => {
  const preloadedImages = new Set();

  const preloadImage = (src) => {
    if (preloadedImages.has(src)) return;
    
    const img = new Image();
    img.src = src;
    preloadedImages.add(src);
  };

  // Preload images khi hover vào product cards
  document.addEventListener('mouseover', (e) => {
    const productCard = e.target.closest('[data-product-image]');
    if (productCard) {
      const imageSrc = productCard.getAttribute('data-product-image');
      if (imageSrc) {
        preloadImage(imageSrc);
      }
    }
  });
};

// Progressive Web App utilities
export const initializePWAFeatures = () => {
  // Chỉ trong production
  if (import.meta.env.DEV) return;

  // Cache critical resources
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      // Send message to SW to cache critical resources
      registration.active?.postMessage({
        type: 'CACHE_CRITICAL_RESOURCES',
        urls: [
          '/',
          '/san-pham',
          '/gio-hang',
          '/lien-he',
          '/logo.png',
          '/manifest.json'
        ]
      });
    });
  }

  // Install prompt handling
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Hiển thị custom install button sau 30 giây
    setTimeout(() => {
      const installEvent = new CustomEvent('showInstallPrompt', {
        detail: { deferredPrompt }
      });
      window.dispatchEvent(installEvent);
    }, 30000);
  });
};

// Performance optimization utilities
export const optimizePerformance = () => {
  // Prefetch DNS cho external domains
  const externalDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://api.dicebear.com',
    'https://images.unsplash.com'
  ];

  externalDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });

  // Optimize form submissions
  document.addEventListener('submit', (e) => {
    const form = e.target;
    if (form.tagName === 'FORM') {
      // Add loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Đang xử lý...';
      }
    }
  });

  // Optimize scroll performance
  let ticking = false;
  const optimizedScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        // Scroll optimizations
        ticking = false;
      });
      ticking = true;
    }
  };
  
  document.addEventListener('scroll', optimizedScroll, { passive: true });
};

// Resource hints injection
export const injectResourceHints = () => {
  const hints = [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
    { rel: 'dns-prefetch', href: 'https://api.dicebear.com' },
    { rel: 'dns-prefetch', href: 'https://images.unsplash.com' }
  ];

  hints.forEach(hint => {
    if (!document.querySelector(`link[href="${hint.href}"]`)) {
      const link = document.createElement('link');
      link.rel = hint.rel;
      link.href = hint.href;
      if (hint.crossorigin) link.crossOrigin = hint.crossorigin;
      document.head.appendChild(link);
    }
  });
};

// Initialize all optimizations
export const initializeOptimizations = () => {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      preloadCriticalRoutes();
      setupImagePreloading();
      initializePWAFeatures();
      optimizePerformance();
      injectResourceHints();
    });
  } else {
    preloadCriticalRoutes();
    setupImagePreloading();
    initializePWAFeatures();
    optimizePerformance();
    injectResourceHints();
  }
};
