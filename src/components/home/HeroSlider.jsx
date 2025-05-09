import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getSafeImageUrl, preloadImage } from '../../utils/imageUtils';
import '../../styles/components/HeroSlider.css';

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  const slides = useMemo(() => [
    {
      id: 1,
      image: '/images/slider1.jpg',
      fallbackImage: 'https://bizweb.dktcdn.net/100/330/753/themes/894755/assets/slider_1.jpg?1676258071193',
      type: 'left' // Text trái
    },
    // Add other slides here if needed
  ], []);

  // Preload slider images to prevent CORB issues
  useEffect(() => {
    let isMounted = true;
    
    const loadImages = async () => {
      try {
        const imagePromises = slides.map(slide => 
          preloadImage(getSafeImageUrl(slide.image)).catch(() => 
            preloadImage(getSafeImageUrl(slide.fallbackImage))
          )
        );
        
        await Promise.all(imagePromises);
        if (isMounted) {
          setImagesLoaded(true);
        }
      } catch (error) {
        console.error('Error preloading slider images:', error);
        if (isMounted) {
          setImagesLoaded(true);
        }
      }
    };
    
    loadImages();
    
    return () => {
      isMounted = false;
    };
  }, [slides]);

  // Tự động chuyển slide mỗi 5 giây
  useEffect(() => {
    if (!imagesLoaded) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length, imagesLoaded]);

  // Chuyển đến slide trước đó
  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  // Chuyển đến slide tiếp theo
  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  // Xử lý lỗi hình ảnh
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = getSafeImageUrl("https://bizweb.dktcdn.net/100/330/753/themes/894755/assets/slider_1.jpg?1676258071193");
  };

  return (
    <section className="hero-slider">
      {imagesLoaded ? (
        <>
          <div className="slider-container">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`slider-slide ${index === currentSlide ? 'active' : ''} ${slide.type}`}
              >
                <div className="slide-image-container">
                  <img
                    src={getSafeImageUrl(slide.image)}
                    alt={`Slide ${index + 1}`}
                    className="slide-image"
                    onError={handleImageError}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
                {slide.title && (
                  <div className={`slide-content content-${slide.type}`}>
                    <h2 className="slide-title">{slide.title}</h2>
                    {slide.description && <p className="slide-description">{slide.description}</p>}
                    {slide.ctaText && (
                      <Link to={slide.ctaLink} className="slide-cta">
                        {slide.ctaText}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {slides.length > 1 && (
            <>
              <button className="slider-control prev" onClick={goToPrevSlide} aria-label="Previous slide">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button className="slider-control next" onClick={goToNextSlide} aria-label="Next slide">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
              <div className="slider-indicators">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`slider-indicator ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  ></button>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="loading-placeholder text-center py-20">
          <p>Đang tải hình ảnh...</p>
        </div>
      )}
    </section>
  );
};