import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaTruck, FaTools, FaCogs, FaHeadset, FaCertificate, FaThumbsUp } from 'react-icons/fa';
import '../../styles/components/CategoryGrid.css';

export const CategoryGrid = () => {
  const services = [
    {
      id: 1,
      name: 'Vận chuyển nhanh',
      description: 'Giao hàng tận nơi trên toàn quốc',
      icon: <FaTruck className="service-icon-svg" />,
      link: '/dich-vu/van-chuyen'
    },
    {
      id: 2,
      name: 'Tư vấn kỹ thuật',
      description: 'Đội ngũ kỹ sư với kinh nghiệm lâu năm',
      icon: <FaTools className="service-icon-svg" />,
      link: '/dich-vu/tu-van-ky-thuat'
    },
    {
      id: 3,
      name: 'Lắp đặt chuyên nghiệp',
      description: 'Đội ngũ thợ tay nghề cao, chuyên nghiệp',
      icon: <FaCogs className="service-icon-svg" />,
      link: '/dich-vu/lap-dat'
    },
    {
      id: 4,
      name: 'Tư vấn 24/7',
      description: 'Hỗ trợ tư vấn mọi lúc mọi nơi',
      icon: <FaHeadset className="service-icon-svg" />,
      link: '/lien-he'
    },
    {
      id: 5,
      name: 'Sản phẩm chính hãng',
      description: 'Cam kết 100% hàng chính hãng',
      icon: <FaCertificate className="service-icon-svg" />,
      link: '/chinh-sach/ban-hang'
    },
    {
      id: 6,
      name: 'Chất lượng cao',
      description: 'Chất lượng sản phẩm hàng đầu',
      icon: <FaThumbsUp className="service-icon-svg" />,
      link: '/ve-chung-toi'
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