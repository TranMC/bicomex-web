import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import './Partners.css';

export const Partners = () => {
  const partners = [
    { id: 1, name: 'Jotun', logo: '/src/assets/images/partner-jotun.png' },
    { id: 2, name: 'Dulux', logo: '/src/assets/images/partner-dulux.png' },
    { id: 3, name: 'TOTO', logo: '/src/assets/images/partner-toto.png' },
    { id: 4, name: 'Viglacera', logo: '/src/assets/images/partner-viglacera.png' },
    { id: 5, name: 'Bosch', logo: '/src/assets/images/partner-bosch.png' },
    { id: 6, name: 'Hoa Sen', logo: '/src/assets/images/partner-hoasen.png' },
    { id: 7, name: 'Cadivi', logo: '/src/assets/images/partner-cadivi.png' },
    { id: 8, name: 'Xingfa', logo: '/src/assets/images/partner-xingfa.png' },
  ];

  return (
    <section className="partners py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Đối tác của chúng tôi</h2>
      
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={2}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
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
        className="partners-slider"
      >
        {partners.map((partner) => (
          <SwiperSlide key={partner.id}>
            <div className="partner-item p-4 flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 h-32">
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-20 max-w-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};