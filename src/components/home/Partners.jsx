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
    <section className="section_brand py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="section-title mb-8">
          <h2 className="title-head text-center text-3xl font-bold">
            Thương hiệu <span className="text-blue-600">nổi bật</span>
          </h2>
          <p className="text-center text-gray-600 mt-2">Bicomex tự hào là đại lý phân phối chính thức của nhiều thương hiệu nổi tiếng</p>
        </div>

        <div className="brand-wrapper">
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
            className="swiper-brand"
          >
            {brands.map((brand) => (
              <SwiperSlide key={brand.id}>
                <div className="item-brand bg-white p-4 rounded shadow-sm border border-gray-100 h-24 flex items-center justify-center hover:shadow-md transition-all">
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="max-h-16 max-w-full object-contain opacity-70 hover:opacity-100 transition-opacity"
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