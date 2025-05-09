/**
 * Utilities for optimizing image loading and preventing CORB issues
 */

/**
 * Pre-loads images to prevent CORB errors during rendering
 * @param {string} src - Image source URL
 * @returns {Promise} - Promise that resolves when image is loaded
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

/**
 * Safely gets the image URL to prevent CORB errors
 * @param {string} path - Image path
 * @returns {string} - Safe image URL
 */
export const getSafeImageUrl = (path) => {
  // If it's a relative path starting with /, make it relative to the current origin
  if (path && path.startsWith('/')) {
    return new URL(path, window.location.origin).href;
  }
  
  // If it's already a full URL, return it
  if (path && (path.startsWith('http://') || path.startsWith('https://'))) {
    return path;
  }
  
  // For relative paths, prepend the public directory
  if (path) {
    try {
      // Try to import the image (for bundled assets)
      return new URL(`../assets/images/${path}`, import.meta.url).href;
    } catch (error) {
      console.warn(`Failed to load image: ${path}`, error);
      // Fallback to a basic path
      return `/src/assets/images/${path}`;
    }
  }
  
  // Return a placeholder for undefined/null paths
  return '/src/assets/images/placeholder.jpg';
};

/**
 * Debounce function to prevent excessive function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
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