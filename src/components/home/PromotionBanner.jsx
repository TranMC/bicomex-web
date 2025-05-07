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
      <div className="wrap_time flex space-x-2 mt-2">
        <div className="time-item bg-blue-600 text-white px-2 py-1 rounded">
          <span className="font-bold">{timeRemaining.days}</span>
          <p className="text-xs">Ngày</p>
        </div>
        <div className="time-item bg-blue-600 text-white px-2 py-1 rounded">
          <span className="font-bold">{timeRemaining.hours}</span>
          <p className="text-xs">Giờ</p>
        </div>
        <div className="time-item bg-blue-600 text-white px-2 py-1 rounded">
          <span className="font-bold">{timeRemaining.minutes}</span>
          <p className="text-xs">Phút</p>
        </div>
        <div className="time-item bg-blue-600 text-white px-2 py-1 rounded">
          <span className="font-bold">{timeRemaining.seconds}</span>
          <p className="text-xs">Giây</p>
        </div>
      </div>
    );
  };

  return (
    <section className="section_sale_shock py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="section-title mb-8">
          <h2 className="title-head text-center text-3xl font-bold">
            <span className="text-blue-600">Flash Sale</span> - Giảm giá sốc
          </h2>
          <p className="text-center text-gray-600 mt-2">Chương trình khuyến mãi có giới hạn, hãy nhanh tay mua ngay!</p>
        </div>

        <div className="swiper_sale_shock_wrapper">
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
            className="swiper_sale_shock"
          >
            {promotionProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="saler_item">
                  <div className="product-box-h product-box-big bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2">
                        <Link to={`/san-pham/${product.slug}`} className="block p-4">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-48 md:h-60 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://bizweb.dktcdn.net/thumb/large/100/330/753/products/son-nuoc-jotun-majestic-dep-hoan-hao-2-1.jpg?v=1553090388617";
                            }}
                          />
                        </Link>
                      </div>
                      <div className="md:w-1/2 p-4">
                        <div className="sale-flash-tag bg-red-600 text-white px-2 py-1 rounded inline-block mb-2 text-sm">Giảm {product.discount}%</div>
                        <Link to={`/san-pham/${product.slug}`}>
                          <h3 className="font-bold text-xl mb-2 hover:text-blue-600 transition-colors">{product.name}</h3>
                        </Link>
                        <div className="price-box mb-3 flex items-center">
                          <span className="price text-red-600 text-lg font-bold mr-2">{formatPrice(product.salePrice)}</span>
                          <span className="price-old text-gray-500 line-through text-sm">{formatPrice(product.price)}</span>
                        </div>
                        <div className="product-summary mb-4">
                          <span className="text-gray-600 line-clamp-3">{product.description}</span>
                        </div>

                        {/* Countdown timer */}
                        <CountdownTimer endDate={product.endDate} />
                        
                        <Link 
                          to={`/san-pham/${product.slug}`} 
                          className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-medium transition-colors"
                        >
                          Mua ngay
                        </Link>
                      </div>
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