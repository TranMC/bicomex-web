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
      icon: <FaTruck className="text-4xl text-blue-600" />,
      link: '/dich-vu/van-chuyen'
    },
    {
      id: 2,
      name: 'Tư vấn kỹ thuật',
      description: 'Đội ngũ kỹ sư với kinh nghiệm lâu năm',
      icon: <FaTools className="text-4xl text-blue-600" />,
      link: '/dich-vu/tu-van-ky-thuat'
    },
    {
      id: 3,
      name: 'Lắp đặt chuyên nghiệp',
      description: 'Đội ngũ thợ tay nghề cao, chuyên nghiệp',
      icon: <FaCogs className="text-4xl text-blue-600" />,
      link: '/dich-vu/lap-dat'
    },
    {
      id: 4,
      name: 'Tư vấn 24/7',
      description: 'Hỗ trợ tư vấn mọi lúc mọi nơi',
      icon: <FaHeadset className="text-4xl text-blue-600" />,
      link: '/lien-he'
    },
    {
      id: 5,
      name: 'Sản phẩm chính hãng',
      description: 'Cam kết 100% hàng chính hãng',
      icon: <FaCertificate className="text-4xl text-blue-600" />,
      link: '/chinh-sach/ban-hang'
    },
    {
      id: 6,
      name: 'Chất lượng cao',
      description: 'Chất lượng sản phẩm hàng đầu',
      icon: <FaThumbsUp className="text-4xl text-blue-600" />,
      link: '/ve-chung-toi'
    }
  ];

  return (
    <section className="section_service_end py-10">
      <div className="container mx-auto px-4">
        <div className="hidden md:block">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {services.map((service) => (
              <div key={service.id} className="service-item">
                <Link to={service.link} className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center h-full">
                  <div className="mb-3 flex justify-center">{service.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden">
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
                <Link to={service.link} className="block p-4 bg-white rounded-lg shadow-md text-center">
                  <div className="mb-3 flex justify-center">{service.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};