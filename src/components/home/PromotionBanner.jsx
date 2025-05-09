import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import '../../styles/components/PromotionBanner.css';

export const PromotionBanner = () => {
  const [promotionProducts] = useState([
    {
      id: 1,
      name: 'Sơn nước DULUX',
      description: 'Sơn Nước Trong Nhà Dulux sử dụng công nghệ chống nấm mốc, giữ cho màu sắc tươi mới lâu dài',
      image: '//bizweb.dktcdn.net/thumb/large/100/330/753/products/dulux-trade-pure-briiliant-white-gloss-1lt-1-copy.jpg?v=1537516026273',
      price: 850000,
      salePrice: 680000,
      discount: 20,
      slug: 'son-nuoc-dulux-hight-gloss',
      endDate: new Date('2023-12-31') // Ngày kết thúc khuyến mãi
    },
    {
      id: 2,
      name: 'Sơn nước JOTUN',
      description: 'Sơn Nước Trong Nhà sử dụng công nghệ chống bám bẩn, có khả năng chùi rửa vượt trội',
      image: '//bizweb.dktcdn.net/thumb/medium/100/330/753/products/jotun-true-beauty-sheen-5l.jpg?v=1537515328247',
      price: 950000,
      salePrice: 760000,
      discount: 20,
      slug: 'son-nuoc-jotun-majestic',
      endDate: new Date('2023-12-25')
    },
    {
      id: 3,
      name: 'Sàn gỗ Ruby Floor',
      description: 'RUBY Foor có khả năng chịu nước tốt, cấp độ mài mòn AC4, phù hợp cho mọi không gian',
      image: '//bizweb.dktcdn.net/thumb/large/100/330/753/products/17342-gach-lat-nen-toko-tk-811.jpg?v=1537513889877',
      price: 450000,
      salePrice: 380000,
      discount: 16,
      slug: 'san-go-op-lat-ruby-floor-02',
      endDate: new Date('2023-11-30')
    },
    {
      id: 4,
      name: 'Gạch lát nền Viglacera',
      description: 'Gạch granite cao cấp với đa dạng mẫu mã, kích thước và họa tiết',
      image: '//bizweb.dktcdn.net/thumb/large/100/330/753/products/16-eac3ec33-44fc-4bb8-9eac-cf2b988db085.jpg?v=1537500385490',
      price: 320000,
      salePrice: 280000,
      discount: 12,
      slug: 'gach-lat-nen-viglacera-001',
      endDate: new Date('2023-12-15')
    },
    {
      id: 5,
      name: 'Gạch men Viglacera',
      description: 'Gạch men với độ bền cao, chống thấm tốt, dễ dàng vệ sinh',
      image: '/images/promotion/gach-men.jpg',
      price: 280000,
      salePrice: 250000,
      discount: 11,
      slug: 'gach-men-viglacera',
      endDate: new Date('2023-12-10')
    },
    {
      id: 6,
      name: 'Gạch granite 80x80',
      description: 'Kích thước: 80x80 cm. Màu sắc: Xám đậm. Loại gạch: Gạch granite. Phong cách hiện đại, tông màu xám thanh nhã',
      image: '/images/promotion/gach-granite.jpg',
      price: 550000,
      salePrice: 430000,
      discount: 22,
      slug: 'gach-lat-nen',
      endDate: new Date('2023-12-20')
    }
  ]);

  // Hàm format giá tiền sang VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Hàm tính thời gian còn lại cho flash sale
  const calculateTimeRemaining = (endDate) => {
    const now = new Date();
    const difference = endDate - now;
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  // Component đồng hồ đếm ngược
  const CountdownTimer = ({ endDate }) => {
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(endDate));

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeRemaining(calculateTimeRemaining(endDate));
      }, 1000);

      return () => clearInterval(timer);
    }, [endDate]);

    return (
      <div className="countdown-container">
        <div className="time-block">
          <span className="time-value">{timeRemaining.days}</span>
          <p className="time-label">Ngày</p>
        </div>
        <div className="time-block">
          <span className="time-value">{timeRemaining.hours}</span>
          <p className="time-label">Giờ</p>
        </div>
        <div className="time-block">
          <span className="time-value">{timeRemaining.minutes}</span>
          <p className="time-label">Phút</p>
        </div>
        <div className="time-block">
          <span className="time-value">{timeRemaining.seconds}</span>
          <p className="time-label">Giây</p>
        </div>
      </div>
    );
  };

  return (
    <section className="promotion-section">
      <div className="promotion-container">
        <div className="section-title-container">
          <h2 className="section-title">
            <span className="section-title-highlight">Flash Sale</span> - Giảm giá sốc
          </h2>
          <p className="section-subtitle">Chương trình khuyến mãi có giới hạn, hãy nhanh tay mua ngay!</p>
        </div>

        <div className="promotion-slider-wrapper">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 1 },
              1024: { slidesPerView: 2 }
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop={true}
            className="swiper-promotion"
          >
            {promotionProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="promotion-item">
                  <div className="promotion-card">
                    <div className="promotion-image-container">
                      <Link to={`/san-pham/${product.slug}`}>
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="promotion-image"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://bizweb.dktcdn.net/thumb/large/100/330/753/products/son-nuoc-jotun-majestic-dep-hoan-hao-2-1.jpg?v=1553090388617";
                          }}
                        />
                      </Link>
                    </div>
                    <div className="promotion-content">
                      <div className="discount-tag">Giảm {product.discount}%</div>
                      <Link to={`/san-pham/${product.slug}`}>
                        <h3 className="product-title">{product.name}</h3>
                      </Link>
                      <div className="price-container">
                        <span className="price-current">{formatPrice(product.salePrice)}</span>
                        <span className="price-original">{formatPrice(product.price)}</span>
                      </div>
                      <div className="product-description line-clamp-3">
                        {product.description}
                      </div>

                      {/* Countdown timer */}
                      <CountdownTimer endDate={product.endDate} />
                      
                      <Link 
                        to={`/san-pham/${product.slug}`} 
                        className="buy-now-btn"
                      >
                        Mua ngay
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};