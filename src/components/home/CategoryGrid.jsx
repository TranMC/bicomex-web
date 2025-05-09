import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaTruck, FaTools, FaCogs, FaHeadset, FaCertificate, FaThumbsUp } from 'react-icons/fa';
import '../../styles/components/CategoryGrid.css';

export const CategoryGrid = () => {
  const services = [
    {
      id: 1,
      name: 'Miễn phí vận chuyển',
      description: 'Với giá trị đơn hàng trên 300.000đ trở lên',
      icon: <FaTruck className="service-icon-svg" />,
      link: '/dich-vu/van-chuyen'
    },
    {
      id: 2,
      name: 'Thanh toán cực kỳ dễ dàng',
      description: 'Phương thức thanh toán dễ dàng, tiện lợi',
      icon: <FaTools className="service-icon-svg" />,
      link: '/dich-vu/tu-van-ky-thuat'
    },
    {
      id: 3,
      name: 'Mua hàng siêu tiết kiệm',
      description: 'Tiết kiệm tới 10% so với thị trường',
      icon: <FaCogs className="service-icon-svg" />,
      link: '/dich-vu/lap-dat'
    }
  ];

  return (
    <section className="section-service">
      <div className="service-container">
        <div className="desktop-view hide-on-mobile">
          <div className="service-grid">
            {services.map((service) => (
              <div key={service.id} className="service-item">
                <Link to={service.link} className="service-link">
                  <div className="service-icon">{service.icon}</div>
                  <h3 className="service-title">{service.name}</h3>
                  <p className="service-description">{service.description}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Slider */}
        <div className="mobile-view hide-on-desktop">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
            centeredSlides={true}
            loop={true}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            className="swiper-service"
          >
            {services.map((service) => (
              <SwiperSlide key={service.id}>
                <Link to={service.link} className="service-link">
                  <div className="service-icon">{service.icon}</div>
                  <h3 className="service-title">{service.name}</h3>
                  <p className="service-description">{service.description}</p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};