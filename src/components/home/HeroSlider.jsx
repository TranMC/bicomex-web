import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/HeroSlider.css';

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides] = useState([
    {
      id: 1,
      image: '/images/slider1.jpg',
      // title: 'Vật liệu xây dựng chính hãng',
      // description: 'Giải pháp hoàn hảo cho công trình của bạn',
      // ctaText: 'Mua ngay',
      // ctaLink: '/san-pham',
      type: 'left' // Text trái
    },
    // {
    //   id: 2,
    //   image: '/images/slider2.jpg',
    //   // title: 'Thiết bị hiện đại',
    //   // description: 'Cung cấp các thiết bị xây dựng hiện đại nhất',
    //   // ctaText: 'Khám phá',
    //   // ctaLink: '/san-pham/may-moc-xay-dung',
    //   type: 'center' // Text giữa
    // },
    // {
    //   id: 3,
    //   image: '/images/slider3.jpg',
    //   // title: 'Hệ thống phân phối toàn quốc',
    //   // description: 'Vận chuyển nhanh chóng, uy tín',
    //   // ctaText: 'Tìm hiểu thêm',
    //   // ctaLink: '/lien-he',
    //   type: 'right' // Text phải
    // },
  ]);

  // Tự động chuyển slide mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  // Chuyển đến slide trước đó
  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  // Chuyển đến slide tiếp theo
  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  // Chuyển đến slide cụ thể
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="section-slider">
      <div className="hero-slider">
        <div 
          className="slider-container"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="slide-item">
              <img 
                src={slide.image} 
                alt={slide.title || 'Slider image'} 
                className="slide-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://bizweb.dktcdn.net/100/330/753/themes/894755/assets/slider_1.jpg?1676258071193";
                }} 
              />
              <div className={`slider-content ${
                slide.type === 'center' ? 'content-center' : 
                slide.type === 'right' ? 'content-right' : 'content-left'
              }`}>
                <div className="slider-text-content">
                  {slide.title && <h2 className="slider-title">{slide.title}</h2>}
                  {slide.description && <p className="slider-description">{slide.description}</p>}
                  {slide.ctaText && slide.ctaLink && (
                    <Link
                      to={slide.ctaLink}
                      className="slider-cta"
                    >
                      {slide.ctaText}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nút điều hướng */}
        <button 
          className="slider-nav prev"
          onClick={goToPrevSlide}
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          className="slider-nav next"
          onClick={goToNextSlide}
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Chỉ số slide */}
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button 
              key={index} 
              className={`slider-dot ${currentSlide === index ? 'slider-dot-active' : 'slider-dot-inactive'}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};