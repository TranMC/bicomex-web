import React, { useState, useRef, useEffect } from 'react';

/**
 * Component Image được tối ưu hóa với lazy loading, WebP support, và progressive loading
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder = 'blur',
  priority = false,
  sizes = '100vw',
  quality = 75,
  loading = 'lazy',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  // Intersection Observer cho lazy loading
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);
  // Tạo srcSet với nhiều sizes
  const generateSrcSet = (baseSrc) => {
    if (!baseSrc) return '';
    
    const sizes = [480, 768, 1024, 1280, 1920];
    const ext = baseSrc.split('.').pop();
    const baseName = baseSrc.replace(`.${ext}`, '');
    
    return sizes
      .map(size => `${baseName}-${size}.${ext}?quality=${quality} ${size}w`)
      .join(', ');
  };

  // WebP fallback
  const getWebPSrc = (src) => {
    if (!src) return '';
    return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  };

  // Placeholder cho blur effect
  const getPlaceholderSrc = (src) => {
    if (!src) return '';
    const ext = src.split('.').pop();
    const baseName = src.replace(`.${ext}`, '');
    return `${baseName}-placeholder.${ext}`;
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
  };

  // Blur-up placeholder styles
  const placeholderStyle = {
    filter: isLoaded ? 'blur(0px)' : 'blur(10px)',
    transition: 'filter 0.3s ease-out',
    transform: isLoaded ? 'scale(1)' : 'scale(1.05)'
  };

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
      {...props}
    >
      {/* Placeholder/Loading state */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
      )}

      {/* Main image với WebP support */}
      {isInView && !error && (
        <picture>
          <source
            srcSet={generateSrcSet(getWebPSrc(src))}
            sizes={sizes}
            type="image/webp"
          />
          <img
            src={src}
            srcSet={generateSrcSet(src)}
            sizes={sizes}
            alt={alt}
            loading={priority ? 'eager' : loading}
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
            className={`w-full h-full object-cover transition-all duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={placeholder === 'blur' ? placeholderStyle : {}}
          />
        </picture>
      )}

      {/* Placeholder image cho blur effect */}
      {placeholder === 'blur' && !isLoaded && !error && isInView && (
        <img
          src={getPlaceholderSrc(src)}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={placeholderStyle}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
