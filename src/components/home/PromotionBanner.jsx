import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaEye, FaShoppingCart } from 'react-icons/fa';
import { getSafeImageUrl, preloadImage } from '../../utils/imageUtils';
import '../../styles/components/PromotionBanner.css';

export const PromotionBanner = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  const promotionProducts = useMemo(() => [
    {
      id: 1,
      name: 'Sơn nước Dulux Hight Gloss',
      description: 'Là sơn nước trong nhà chất lượng cao, có màu đẹp và lâu phai nhờ tính năng chống bong tróc hiệu quả.',
      image: 'https://bizweb.dktcdn.net/thumb/large/100/330/753/products/dulux-trade-pure-briiliant-white-gloss-1lt-1-copy.jpg',
      price: 2300000,
      originalPrice: null,
      hot: true,
      slug: 'son-nuoc-dulux-hight-gloss'
    },
    {
      id: 2,
      name: 'Sơn nước Dulux Stain Block',
      description: 'Là sơn nước trong nhà chất lượng cao, có màu đẹp và lâu phai nhờ tính năng chống bong tróc hiệu quả.',
      image: 'https://bizweb.dktcdn.net/thumb/medium/100/330/753/products/jotun-true-beauty-sheen-5l.jpg',
      price: 2100000,
      originalPrice: 2450000,
      hot: true,
      slug: 'son-nuoc-dulux-stain-block'
    },
    {
      id: 3,
      name: 'Sơn Dulux Weathershield',
      description: 'Là sơn nước trong nhà chất lượng cao, có màu đẹp và lâu phai nhờ tính năng chống bong tróc hiệu quả.',
      image: 'https://bizweb.dktcdn.net/thumb/large/100/330/753/products/17342-gach-lat-nen-toko-tk-811.jpg',
      price: 1900000,
      originalPrice: 2350000,
      hot: false,
      slug: 'son-dulux-weathershield'
    },
    {
      id: 4,
      name: 'Gạch lát nền Viglacera',
      description: 'Là sơn nước trong nhà chất lượng cao, có màu đẹp và lâu phai nhờ tính năng chống bong tróc hiệu quả.',
      image: 'https://bizweb.dktcdn.net/thumb/large/100/330/753/products/16-eac3ec33-44fc-4bb8-9eac-cf2b988db085.jpg',
      price: 2050000,
      originalPrice: 2650000,
      hot: false,
      slug: 'gach-lat-nen-viglacera'
    }
  ], []);

  // Preload images to prevent CORB issues
  useEffect(() => {
    let isMounted = true;
    
    const loadImages = async () => {
      try {
        const imagePromises = promotionProducts.map(product => 
          preloadImage(getSafeImageUrl(product.image))
        );
        
        await Promise.all(imagePromises);
        if (isMounted) {
          setImagesLoaded(true);
        }
      } catch (error) {
        console.error('Error preloading promotion images:', error);
        if (isMounted) {
          setImagesLoaded(true);
        }
      }
    };
    
    loadImages();
    
    return () => {
      isMounted = false;
    };
  }, [promotionProducts]);

  // Format price with dot separators (e.g., 2.300.000đ)
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ';
  };

  // Handle image loading errors
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = getSafeImageUrl("https://bizweb.dktcdn.net/thumb/large/100/330/753/products/son-nuoc-jotun-majestic-dep-hoan-hao-2-1.jpg");
  };

  return (
    <section className="promotion-section">
      <div className="promotion-container">
        <div className="promotion-header">
          <div className="promotion-title-wrapper">
            <img 
              src={getSafeImageUrl("//bizweb.dktcdn.net/100/330/753/themes/894755/assets/i_title_sale.png?1676258071193")}
              alt="Sale"
              className="promotion-icon"
            />
            <h2 className="promotion-title">KHUYẾN MÃI GIÁ SỐC</h2>
          </div>
        </div>
        
        <div className="promotion-subtitle">
          <p>Cập nhật hàng giờ tất cả những deal giảm giá đặc biệt trên Bicomex. Hãy bookmark trang này và quay lại thường xuyên để không bỏ lỡ bạn nhé!</p>
        </div>

        {imagesLoaded ? (
          <div className="promotion-products">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={2}
              navigation={true}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 10
                },
                576: {
                  slidesPerView: 2,
                  spaceBetween: 20
                },
                992: {
                  slidesPerView: 4,
                  spaceBetween: 20
                }
              }}
              className="promotion-swiper"
            >
              {promotionProducts.map(product => (
                <SwiperSlide key={product.id}>
                  <div className="product-card">
                    {product.hot && <div className="hot-label">Hot</div>}
                    <div className="product-image-container">
                      <img 
                        src={getSafeImageUrl(product.image)}
                        alt={product.name}
                        className="product-image"
                        onError={handleImageError}
                      />
                      <div className="product-action-overlay">
                        <button className="action-button buy-button">Mua ngay</button>
                        <button className="action-button view-button">
                          <FaEye />
                        </button>
                      </div>
                    </div>
                    <div className="product-info">
                      <h3 className="product-title">{product.name}</h3>
                      <div className="product-price-container">
                        <span className="product-price">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="product-original-price">{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>
                      <p className="product-description">{product.description}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="loading">
            <p>Đang tải sản phẩm khuyến mãi...</p>
          </div>
        )}
        
        <div className="promotion-pagination">
          <span className="active"></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </section>
  );
};