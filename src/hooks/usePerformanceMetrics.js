import { useEffect, useState } from 'react';

/**
 * Hook để đo đạc Core Web Vitals và performance metrics
 */
const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState({
    fcp: null,      // First Contentful Paint
    lcp: null,      // Largest Contentful Paint
    fid: null,      // First Input Delay
    cls: null,      // Cumulative Layout Shift
    ttfb: null,     // Time to First Byte
    loadTime: null  // Page Load Time
  });

  useEffect(() => {
    // Đo First Contentful Paint (FCP)
    const measureFCP = () => {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          setMetrics(prev => ({ ...prev, fcp: fcpEntry.startTime }));
          observer.disconnect();
        }
      });
      observer.observe({ entryTypes: ['paint'] });
    };

    // Đo Largest Contentful Paint (LCP)
    const measureLCP = () => {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    };

    // Đo First Input Delay (FID)
    const measureFID = () => {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          if (entry.name === 'first-input') {
            const fid = entry.processingStart - entry.startTime;
            setMetrics(prev => ({ ...prev, fid }));
          }
        });
      });
      observer.observe({ entryTypes: ['first-input'] });
    };

    // Đo Cumulative Layout Shift (CLS)
    const measureCLS = () => {
      let clsValue = 0;
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            setMetrics(prev => ({ ...prev, cls: clsValue }));
          }
        });
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    };

    // Đo Time to First Byte (TTFB)
    const measureTTFB = () => {
      const navigationEntry = performance.getEntriesByType('navigation')[0];
      if (navigationEntry) {
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        setMetrics(prev => ({ ...prev, ttfb }));
      }
    };

    // Đo Load Time
    const measureLoadTime = () => {
      const navigationEntry = performance.getEntriesByType('navigation')[0];
      if (navigationEntry) {
        const loadTime = navigationEntry.loadEventEnd - navigationEntry.fetchStart;
        setMetrics(prev => ({ ...prev, loadTime }));
      }
    };

    // Kiểm tra browser support
    if ('PerformanceObserver' in window) {
      measureFCP();
      measureLCP();
      measureFID();
      measureCLS();
    }

    // Đo TTFB và Load Time
    if (performance.getEntriesByType) {
      measureTTFB();
      
      // Đo load time sau khi page load
      if (document.readyState === 'complete') {
        measureLoadTime();
      } else {
        window.addEventListener('load', measureLoadTime);
      }
    }

    // Cleanup
    return () => {
      window.removeEventListener('load', measureLoadTime);
    };
  }, []);

  // Function để gửi metrics lên analytics
  const sendMetrics = (customMetrics = {}) => {
    const allMetrics = { ...metrics, ...customMetrics };
      // Log to console in development
    if (import.meta.env.DEV) {
      console.group('🚀 Performance Metrics');
      console.log('FCP (First Contentful Paint):', allMetrics.fcp?.toFixed(2), 'ms');
      console.log('LCP (Largest Contentful Paint):', allMetrics.lcp?.toFixed(2), 'ms');
      console.log('FID (First Input Delay):', allMetrics.fid?.toFixed(2), 'ms');
      console.log('CLS (Cumulative Layout Shift):', allMetrics.cls?.toFixed(4));
      console.log('TTFB (Time to First Byte):', allMetrics.ttfb?.toFixed(2), 'ms');
      console.log('Load Time:', allMetrics.loadTime?.toFixed(2), 'ms');
      console.groupEnd();
    }    // Gửi lên analytics service (Google Analytics, etc.)
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      Object.entries(allMetrics).forEach(([key, value]) => {
        if (value !== null) {
          window.gtag('event', 'page_performance', {
            metric_name: key,
            metric_value: Math.round(value),
            custom_parameter: true
          });
        }
      });
    }

    return allMetrics;
  };

  return {
    metrics,
    sendMetrics,
    // Helper functions để đánh giá performance
    getPerformanceGrade: () => {
      const { fcp, lcp, fid, cls } = metrics;
      let score = 0;
      let total = 0;

      if (fcp !== null) {
        score += fcp < 1800 ? 100 : fcp < 3000 ? 50 : 0;
        total += 100;
      }
      if (lcp !== null) {
        score += lcp < 2500 ? 100 : lcp < 4000 ? 50 : 0;
        total += 100;
      }
      if (fid !== null) {
        score += fid < 100 ? 100 : fid < 300 ? 50 : 0;
        total += 100;
      }
      if (cls !== null) {
        score += cls < 0.1 ? 100 : cls < 0.25 ? 50 : 0;
        total += 100;
      }

      return total > 0 ? Math.round((score / total) * 100) : 0;
    }
  };
};

export default usePerformanceMetrics;
