import { FaShippingFast, FaCreditCard, FaShoppingBasket } from 'react-icons/fa';
import '../../styles/components/ServiceGrid.css';

export const ServiceGrid = () => {
  const services = [
    {
      id: 1,
      icon: <FaShippingFast className="service-icon" />,
      title: 'Miễn phí giao hàng',
      description: 'Với đơn hàng trị giá từ 300.000đ trở lên'
    },
    {
      id: 2,
      icon: <FaCreditCard className="service-icon" />,
      title: 'Thanh toán cực kỳ dễ dàng',
      description: 'Phương thức thanh toán dễ dàng, tiện lợi'
    },
    {
      id: 3,
      icon: <FaShoppingBasket className="service-icon" />,
      title: 'Mua hàng siêu tiết kiệm',
      description: 'Tiết kiệm tới hơn 10% so với giá thị trường'
    }
  ];

  return (
    <section className="service-grid-section">
      <div className="service-grid-container">
        <div className="service-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon-wrapper">
                {service.icon}
              </div>
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
