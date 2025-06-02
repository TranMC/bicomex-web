import { useEffect } from 'react';

/**
 * Component quản lý resource hints để tối ưu hóa loading
 * Preload critical fonts, images và stylesheets
 */
const ResourceHints = () => {
  useEffect(() => {
    // Preload critical fonts
    const criticalFonts = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    ];    // Preload critical images với local paths
    const criticalImages = [
      '/logo.png',
      '/logo_footer.png',
      '/images/banner_1.jpg',
      '/images/banner_2.jpg',
      '/images/hero-bg.jpg'
    ];    // Preload critical third-party resources
    const criticalResources = [
      { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
      { href: 'https://fonts.gstatic.com', rel: 'preconnect' },
      { href: 'https://api.dicebear.com', rel: 'dns-prefetch' },
      { href: 'https://bizweb.dktcdn.net', rel: 'dns-prefetch' },
      { href: 'https://images.unsplash.com', rel: 'dns-prefetch' },
      { href: 'https://cdn.jsdelivr.net', rel: 'dns-prefetch' },
      { href: 'https://unpkg.com', rel: 'dns-prefetch' }
    ];

    // Add font preloads
    criticalFonts.forEach(font => {
      if (!document.querySelector(`link[href="${font}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = font;
        link.as = 'style';
        link.onload = function() { this.rel = 'stylesheet'; };
        document.head.appendChild(link);
      }
    });

    // Add image preloads
    criticalImages.forEach(imageSrc => {
      if (!document.querySelector(`link[href="${imageSrc}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = imageSrc;
        link.as = 'image';
        document.head.appendChild(link);
      }
    });

    // Add DNS prefetch and preconnect
    criticalResources.forEach(({ href, rel }) => {
      if (!document.querySelector(`link[href="${href}"][rel="${rel}"]`)) {
        const link = document.createElement('link');
        link.rel = rel;
        link.href = href;
        if (rel === 'preconnect') {
          link.crossOrigin = 'anonymous';
        }
        document.head.appendChild(link);
      }
    });

    // Add viewport meta if not exists
    if (!document.querySelector('meta[name="viewport"]')) {
      const viewport = document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover';
      document.head.appendChild(viewport);
    }

    // Add theme-color meta
    if (!document.querySelector('meta[name="theme-color"]')) {
      const themeColor = document.createElement('meta');
      themeColor.name = 'theme-color';
      themeColor.content = '#2563eb';
      document.head.appendChild(themeColor);    }

    // Inline critical CSS
    const criticalCSS = `
      /* Critical CSS cho Above-the-Fold */
      .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      
      .hero-section {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
      
      .loading-spinner { display: none; }
      
      /* Preload animations */
      .fade-in {
        animation: fadeIn 0.5s ease-in-out;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;

    if (!document.querySelector('#critical-css')) {
      const style = document.createElement('style');
      style.id = 'critical-css';
      style.innerHTML = criticalCSS;
      document.head.insertBefore(style, document.head.firstChild);
    }

  }, []);

  return null; // Component này không render gì
};

export default ResourceHints;
