import { useEffect, useRef, useState } from 'react';
import { getSafeImageUrl, supportsWebP } from '../../utils/imageUtils';

/**
 * Component LazyImage tối ưu hóa cho performance
 */
const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+',
  onLoad,
  loading = 'lazy',
  ...props 
}) => {
  const imgRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const [hasError, setHasError] = useState(false);

  // Intersection Observer cho lazy loading
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(img);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px 0px' // Preload trước 50px
      }
    );

    observer.observe(img);
    return () => observer.disconnect();
  }, []);

  // Load image khi vào viewport
  useEffect(() => {
    if (!isInView || !src) return;

    const img = new Image();
    
    img.onload = () => {
      setCurrentSrc(getSafeImageUrl(src));
      setIsLoaded(true);
      setHasError(false);
      if (onLoad) onLoad();
    };

    img.onerror = () => {
      setHasError(true);
      setCurrentSrc(placeholder);
    };

    // Tối ưu hóa format ảnh
    const optimizedSrc = getSafeImageUrl(src, { 
      width, 
      height, 
      quality: 85,
      format: supportsWebP() ? 'webp' : 'jpg'
    });
    
    img.src = optimizedSrc;
  }, [isInView, src, width, height, placeholder, onLoad]);

  return (
    <img
      ref={imgRef}
      src={currentSrc}
      alt={alt}
      className={`${className} ${isLoaded ? 'loaded' : 'loading'} ${hasError ? 'error' : ''}`}
      width={width}
      height={height}
      loading={loading}
      style={{
        transition: 'opacity 0.3s ease-in-out',
        opacity: isLoaded ? 1 : 0.7,
        ...props.style
      }}
      {...props}
    />
  );
};

export default LazyImage;
