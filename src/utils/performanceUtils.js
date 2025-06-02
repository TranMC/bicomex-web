/**
 * Performance optimization utilities
 */

/**
 * Intersection Observer for lazy loading images
 */
export const createLazyImageObserver = (callback) => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry.target);
        }
      });
    },
    {
      rootMargin: '50px',
      threshold: 0.1,
    }
  );
};

/**
 * Optimize image loading with WebP support
 */
export const getOptimizedImageUrl = (originalUrl, width = 800, quality = 85) => {
  if (!originalUrl) return '/src/assets/images/placeholder.jpg';
  
  // Check if browser supports WebP
  const supportsWebP = (() => {
    try {
      return document.createElement('canvas').toDataURL('image/webp').indexOf('webp') > -1;
    } catch {
      return false;
    }
  })();

  // If it's a Bizweb URL, optimize it
  if (originalUrl.includes('bizweb.dktcdn.net')) {
    const baseUrl = originalUrl.split('?')[0];
    const format = supportsWebP ? 'webp' : 'jpg';
    return `${baseUrl}?v=1&format=${format}&width=${width}&quality=${quality}`;
  }

  return originalUrl;
};

/**
 * Preload critical resources
 */
export const preloadCriticalResources = () => {
  // Preload critical fonts
  const preloadFont = (href, type = 'font/woff2') => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = type;
    link.href = href;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  };

  // Preload critical images
  const preloadImage = (href) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = href;
    document.head.appendChild(link);
  };

  // Preload Google Fonts (Inter)
  if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'style';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    fontLink.onload = function() { this.rel = 'stylesheet'; };
    document.head.appendChild(fontLink);
  }
};

/**
 * Debounce function for performance
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function for scroll events
 */
export const throttle = (func, limit = 16) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Measure Core Web Vitals
 */
export const measureCoreWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Measure FCP (First Contentful Paint)
  const paintObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      if (entry.name === 'first-contentful-paint') {
        console.log('FCP:', entry.startTime);
      }
    });
  });
  
  try {
    paintObserver.observe({ entryTypes: ['paint'] });
  } catch (e) {
    // Fallback for browsers that don't support paint timing
  }

  // Measure LCP (Largest Contentful Paint)
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime);
  });

  try {
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    // Fallback for browsers that don't support LCP
  }

  // Measure CLS (Cumulative Layout Shift)
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    });
    console.log('CLS:', clsValue);
  });

  try {
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  } catch (e) {
    // Fallback for browsers that don't support layout shift
  }
};

/**
 * Virtual scrolling for large lists
 */
export class VirtualScrollList {
  constructor(container, itemHeight, renderItem) {
    this.container = container;
    this.itemHeight = itemHeight;
    this.renderItem = renderItem;
    this.scrollTop = 0;
    this.containerHeight = container.clientHeight;
    this.items = [];
    this.renderedItems = new Map();
    
    this.bindEvents();
  }

  bindEvents() {
    this.container.addEventListener('scroll', throttle(() => {
      this.scrollTop = this.container.scrollTop;
      this.render();
    }, 16));
  }

  setItems(items) {
    this.items = items;
    this.render();
  }

  render() {
    const startIndex = Math.floor(this.scrollTop / this.itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(this.containerHeight / this.itemHeight) + 1,
      this.items.length
    );

    // Clear container
    this.container.innerHTML = '';

    // Create spacer for items above viewport
    if (startIndex > 0) {
      const spacerTop = document.createElement('div');
      spacerTop.style.height = `${startIndex * this.itemHeight}px`;
      this.container.appendChild(spacerTop);
    }

    // Render visible items
    for (let i = startIndex; i < endIndex; i++) {
      const item = this.items[i];
      if (item) {
        const element = this.renderItem(item, i);
        this.container.appendChild(element);
      }
    }

    // Create spacer for items below viewport
    const remainingItems = this.items.length - endIndex;
    if (remainingItems > 0) {
      const spacerBottom = document.createElement('div');
      spacerBottom.style.height = `${remainingItems * this.itemHeight}px`;
      this.container.appendChild(spacerBottom);
    }
  }
}

export default {
  createLazyImageObserver,
  getOptimizedImageUrl,
  preloadCriticalResources,
  debounce,
  throttle,
  prefersReducedMotion,
  measureCoreWebVitals,
  VirtualScrollList
};
