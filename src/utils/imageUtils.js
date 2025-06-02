/**
 * Enhanced utilities for optimizing image loading and preventing CORB issues
 */

// Cache for WebP support detection
let webpSupported = null;

/**
 * Detect WebP support
 * @returns {boolean}
 */
const supportsWebP = () => {
  if (webpSupported !== null) {
    return webpSupported;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  webpSupported = canvas.toDataURL('image/webp').indexOf('image/webp') === 5;
  return webpSupported;
};

/**
 * Get optimized image URL with CDN parameters
 * @param {string} originalUrl - Original image URL
 * @param {Object} options - Optimization options
 * @returns {string} - Optimized URL
 */
const getSafeImageUrl = (originalUrl, options = {}) => {
  if (!originalUrl) return '';
  
  const {
    width = null,
    height = null,
    quality = 85,
    format = supportsWebP() ? 'webp' : 'jpg'
  } = options;

  // Handle local images
  if (originalUrl.startsWith('/') || originalUrl.startsWith('./')) {
    return originalUrl;
  }

  // Handle Bizweb CDN URLs
  if (originalUrl.includes('bizweb.dktcdn.net')) {
    const baseUrl = originalUrl.split('?')[0];
    const params = new URLSearchParams();
    
    params.append('v', '1');
    params.append('format', format);
    params.append('quality', quality.toString());
    
    if (width) params.append('width', width.toString());
    if (height) params.append('height', height.toString());
    
    return `${baseUrl}?${params.toString()}`;
  }

  // Handle Unsplash URLs
  if (originalUrl.includes('unsplash.com')) {
    const url = new URL(originalUrl);
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', 'crop');
    url.searchParams.set('q', quality.toString());
    
    if (width) url.searchParams.set('w', width.toString());
    if (height) url.searchParams.set('h', height.toString());
    
    return url.toString();
  }

  return originalUrl;
};

/**
 * Pre-loads images to prevent CORB errors during rendering
 * @param {string} src - Image source URL
 * @returns {Promise} - Promise that resolves when image is loaded
 */
const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
    
    // Set timeout to prevent hanging
    setTimeout(() => {
      reject(new Error(`Image load timeout: ${src}`));
    }, 10000);
  });
};

/**
 * Batch preload multiple images with progress tracking
 * @param {Array} imageUrls - Array of image URLs
 * @param {Function} onProgress - Progress callback (loaded, total)
 * @returns {Promise} - Promise that resolves when all images are loaded
 */
const preloadImages = async (imageUrls, onProgress) => {
  let loaded = 0;
  const total = imageUrls.length;
  const results = [];

  for (const url of imageUrls) {
    try {
      const result = await preloadImage(getSafeImageUrl(url));
      results.push(result);
      loaded++;
      if (onProgress) onProgress(loaded, total);
    } catch (error) {
      console.warn(`Failed to preload image: ${url}`, error);
      loaded++;
      if (onProgress) onProgress(loaded, total);
    }
  }

  return results;
};

/**
 * Create intersection observer for lazy loading images
 * @param {Function} callback - Callback when image intersects
 * @param {Object} options - Observer options
 * @returns {IntersectionObserver}
 */
const createLazyImageObserver = (callback, options = {}) => {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '50px 0px'
  };

  return new IntersectionObserver(callback, { ...defaultOptions, ...options });
};

// Named exports
export {
  supportsWebP,
  getSafeImageUrl,
  preloadImage,
  preloadImages,
  createLazyImageObserver
};

// Default export
export default {
  supportsWebP,
  getSafeImageUrl,
  preloadImage,
  preloadImages,
  createLazyImageObserver
};