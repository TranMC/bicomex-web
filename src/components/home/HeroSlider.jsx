import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../styles/components/HeroSlider.css';

export const HeroSlider = () => {
  const [slides] = useState([
    {
      id: 1,
      image: '/src/assets/images/slider1.jpg',
      title: 'Vật liệu xây dựng chất lượng cao',
      description: 'Giải pháp hoàn hảo cho công trình của bạn',
      ctaText: 'Mua ngay',
      ctaLink: '/san-pham/vat-lieu-xay-dung',
    },
    {
      id: 2,
      image: '/src/assets/images/slider2.jpg',
      title: 'Sản phẩm đa dạng, giá cả cạnh tranh',
      description: 'Đáp ứng mọi nhu cầu xây dựng của bạn',
      ctaText: 'Khám phá',
      ctaLink: '/san-pham',
    },
    {
      id: 3,
      image: '/src/assets/images/slider3.jpg',
      title: 'Hệ thống phân phối toàn quốc',
      description: 'Giao hàng nhanh chóng, uy tín',
      ctaText: 'Tìm hiểu thêm',
      ctaLink: '/he-thong-cung-cap',
    },
  ]);

  return (
    <div className="hero-slider">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative">
              <img src={slide.image} alt={slide.title} className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-lg text-white">
                    <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                    <p className="text-xl mb-6">{slide.description}</p>
                    <a
                      href={slide.ctaLink}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium text-lg inline-block"
                    >
                      {slide.ctaText}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};