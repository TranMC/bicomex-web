import './index.css'
import { renderApp } from './hmr';

// Preload critical resources before app renders
const preloadCriticalResources = () => {
  // Preload critical Google Fonts
  const preloadFont = (href) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    link.onload = function() { this.rel = 'stylesheet'; };
    document.head.appendChild(link);
  };

  // Preload Inter font
  if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
    preloadFont('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  }

  // Preload critical images
  const criticalImages = [
    '/logo.png',
    '/logo_footer.png'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });

  // Add viewport meta for mobile optimization
  if (!document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover';
    document.head.appendChild(viewport);
  }

  // Add theme-color for PWA
  if (!document.querySelector('meta[name="theme-color"]')) {
    const themeColor = document.createElement('meta');
    themeColor.name = 'theme-color';
    themeColor.content = '#2563eb';
    document.head.appendChild(themeColor);
  }
};

// Run preloading
preloadCriticalResources();

// Render app sau khi preload xong
renderApp();

// Thiết lập HMR
if (import.meta.hot) {
  import.meta.hot.accept('./App.jsx', () => {
    renderApp();
  });

  import.meta.hot.accept('./hmr.jsx', () => {
    renderApp();
  });
}
