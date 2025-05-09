import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useEffect, useState, useMemo } from 'react';
import { getSafeImageUrl, preloadImage } from '../../utils/imageUtils';
import 'swiper/css';
import '../../styles/components/Partners.css';

export const Partners = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  // Move brands to useMemo to prevent unnecessary re-renders
  const brands = useMemo(() => [
    {
      id: 1,
      name: 'Dulux',
      logo: 'https://bizweb.dktcdn.net/thumb/compact/100/330/753/themes/894755/assets/brand_1.png?1676258071193',
    },
    {
      id: 2,
      name: 'JOTUN',
      logo: 'https://bizweb.dktcdn.net/thumb/compact/100/330/753/themes/894755/assets/brand_2.png?1676258071193',
    },
    {
      id: 3,
      name: 'OEXPO',
      logo: 'https://bizweb.dktcdn.net/thumb/compact/100/330/753/themes/894755/assets/brand_3.png?1676258071193',
    },
    {
      id: 4,
      name: 'Viglacera',
      logo: 'https://bizweb.dktcdn.net/thumb/compact/100/330/753/themes/894755/assets/brand_4.png?1676258071193',
    },
    {
      id: 5,
      name: 'Mê Kông',
      logo: 'https://bizweb.dktcdn.net/thumb/compact/100/330/753/themes/894755/assets/brand_5.png?1676258071193',
    },
    {
      id: 7,
      name: 'Ruby Floor',
      logo: 'https://bizweb.dktcdn.net/thumb/compact/100/330/753/themes/894755/assets/brand_6.png?1676258071193',
    },
  ], []);

  // Preload images to prevent CORB issues
  useEffect(() => {
    let isMounted = true;
    
    const loadImages = async () => {
      try {
        // Create an array of promises for loading all images
        const imagePromises = brands.map(brand => 
          preloadImage(getSafeImageUrl(brand.logo))
        );
        
        // Wait for all images to load
        await Promise.all(imagePromises);
        
        // Only update state if component is still mounted
        if (isMounted) {
          setImagesLoaded(true);
        }
      } catch (error) {
        console.error('Error preloading images:', error);
        // Set as loaded even if there's an error to show fallback images
        if (isMounted) {
          setImagesLoaded(true);
        }
      }
    };
    
    loadImages();
    
    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, [brands]);

  // Xử lý lỗi hình ảnh
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = getSafeImageUrl("https://bizweb.dktcdn.net/100/330/753/themes/894755/assets/partner_1.png?1676258071193");
  };

  return (
    <section className="partners-section">
      <div className="partners-container">
        <div className="section-title-container">
          <h2 className="section-title">
            Thương hiệu <span className="section-title-highlight">nổi bật</span>
          </h2>
          <p className="section-subtitle">Bicomex tự hào là đại lý phân phối chính thức của nhiều thương hiệu nổi tiếng</p>
        </div>

        <div className="partners-slider-wrapper">
          {imagesLoaded ? (
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={2}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 4,
                },
                1024: {
                  slidesPerView: 6,
                },
              }}
              className="partners-swiper"
            >
              {brands.map((brand) => (
                <SwiperSlide key={brand.id}>
                  <div className="brand-item">
                    <img 
                      src={getSafeImageUrl(brand.logo)} 
                      alt={brand.name} 
                      className="brand-logo"
                      onError={handleImageError}
                      loading="lazy"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="loading-placeholder">
              <p>Đang tải thương hiệu...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};