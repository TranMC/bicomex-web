import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import '../../styles/components/Partners.css';

export const Partners = () => {
  const brands = [
    {
      id: 1,
      name: 'Dulux',
      logo: '//bizweb.dktcdn.net/thumb/compact/100/330/753/themes/894755/assets/brand_1.png?1676258071193',
    },
    {
      id: 2,
      name: 'JOTUN',
      logo: '//bizweb.dktcdn.net/thumb/compact/100/330/753/themes/894755/assets/brand_2.png?1676258071193',
    },
    {
      id: 3,
      name: 'OEXPO',
      logo: '//bizweb.dktcdn.net/thumb/compact/100/330/753/themes/894755/assets/brand_3.png?1676258071193',
    },
    {
      id: 4,
      name: 'Viglacera',
      logo: '//bizweb.dktcdn.net/thumb/compact/100/330/753/themes/894755/assets/brand_4.png?1676258071193',
    },
    {
      id: 5,
      name: 'Mê Kông',
      logo: '//bizweb.dktcdn.net/thumb/compact/100/330/753/themes/894755/assets/brand_5.png?1676258071193',
    },
    {
      id: 7,
      name: 'Ruby Floor',
      logo: '//bizweb.dktcdn.net/thumb/compact/100/330/753/themes/894755/assets/brand_6.png?1676258071193 ',
    },
  ];

  // Xử lý lỗi hình ảnh
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://bizweb.dktcdn.net/100/330/753/themes/894755/assets/partner_1.png?1676258071193";
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
                    src={brand.logo} 
                    alt={brand.name} 
                    className="brand-logo"
                    onError={handleImageError}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};