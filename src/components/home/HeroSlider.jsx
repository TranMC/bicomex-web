import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../styles/components/HeroSlider.css';

export const HeroSlider = () => {
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
    {
      id: 2,
      image: '/images/slider2.jpg',
      // title: 'Thiết bị hiện đại',
      // description: 'Cung cấp các thiết bị xây dựng hiện đại nhất',
      // ctaText: 'Khám phá',
      ctaLink: '/san-pham/may-moc-xay-dung',
      type: 'center' // Text giữa
    },
    {
      id: 3,
      image: '/images/slider3.jpg',
      // title: 'Hệ thống phân phối toàn quốc',
      // description: 'Vận chuyển nhanh chóng, uy tín',
      // ctaText: 'Tìm hiểu thêm',
      ctaLink: '/lien-he',
      type: 'right' // Text phải
    },
  ]);

  return (
    <section className="section_slider">
      <div className="home-slider">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          // pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          className="swiper-container"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="slide-item relative">
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://bizweb.dktcdn.net/100/330/753/themes/894755/assets/slider_1.jpg?1676258071193";
                  }} 
                />
                <div className={`slider-content absolute inset-0 flex items-center ${
                  slide.type === 'center' ? 'justify-center text-center' : 
                  slide.type === 'right' ? 'justify-end text-right' : 'justify-start text-left'
                }`}>
                  <div className={`slider-text-content ${
                    slide.type === 'center' ? 'px-4' : 
                    slide.type === 'right' ? 'pr-16 pl-4' : 'pl-16 pr-4'
                  } max-w-xl`}>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white drop-shadow-lg">{slide.title}</h2>
                    <p className="text-lg md:text-xl mb-6 text-white drop-shadow-md">{slide.description}</p>
                    {/* <Link
                      to={slide.ctaLink}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium text-lg inline-block transition-colors"
                    >
                      {slide.ctaText}
                    </Link> */}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};