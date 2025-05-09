import { Link } from 'react-router-dom';
import { FaStar, FaCartPlus, FaEye, FaRegHeart } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useState, useEffect, useMemo } from 'react';
import { getSafeImageUrl, preloadImage } from '../../utils/imageUtils';
import useCart from '../../hooks/useCart';
import useToast from '../../hooks/useToast';
import { newProducts } from '../../data/newProducts';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../styles/components/NewProducts.css';

export const NewProducts = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const { addToCart } = useCart();
  const toast = useToast();
  
  // Memoize products to prevent unnecessary re-renders
  const products = useMemo(() => newProducts, []);
  
  // Preload images to prevent CORB issues
  useEffect(() => {
    let isMounted = true;
    
    const loadImages = async () => {
      try {
        const imagePromises = products.map(product => 
          preloadImage(getSafeImageUrl(product.image))
        );
        
        await Promise.all(imagePromises);
        if (isMounted) {
          setImagesLoaded(true);
        }
      } catch (error) {
        console.error('Error preloading product images:', error);
        if (isMounted) {
          setImagesLoaded(true);
        }
      }
    };
    
    loadImages();
    
    return () => {
      isMounted = false;
    };
  }, [products]);
    const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ';
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`Đã thêm ${product.name} vào giỏ hàng!`);
  };
  
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = getSafeImageUrl("https://bizweb.dktcdn.net/thumb/large/100/330/753/products/son-nuoc-jotun-majestic-dep-hoan-hao-2-1.jpg");
  };
  return (
    <section className="section-new-products">
      <div className="new-products-container">        <div className="section-title-container">
          <div className="section-title-wrapper">
            <div className="title-line left"></div>
            <h2 className="section-title">SẢN PHẨM MỚI VỀ</h2>
            <div className="title-line right"></div>
          </div>
        </div>
        
        <div className="section-subtitle">
          <p>Cập nhật những sản phẩm mới nhất từ các thương hiệu hàng đầu với chất lượng đảm bảo</p>
        </div>

        {imagesLoaded ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              576: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20
              },
              992: {
                slidesPerView: 4,
                spaceBetween: 20
              }
            }}
            className="new-products-swiper"          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="product-card">
                  <div className="product-badges">
                    {product.isNew && <span className="badge-new">Mới</span>}
                    {product.discount > 0 && <span className="badge-sale">-{product.discount}%</span>}
                  </div>                  <div className="product-image-container">
                    <img 
                      src={getSafeImageUrl(product.image)} 
                      alt={product.name} 
                      className="product-image"
                      onError={handleImageError}
                      loading="lazy"
                    />                    <div className="product-actions">
                      <button 
                        className="action-button buy-button" 
                        onClick={(e) => handleAddToCart(e, product)}
                      >
                        <FaCartPlus className="button-icon" />
                        <span>Mua ngay</span>
                      </button>
                      <Link to={`/san-pham/${product.slug}`} className="action-button view-button">
                        <FaEye />
                      </Link>
                    </div>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">
                      <Link to={`/san-pham/${product.slug}`}>{product.name}</Link>
                    </h3>
                    <div className="product-rating">
                      {[...Array(5)].map((_, index) => (
                        <FaStar 
                          key={index} 
                          className={index < product.rating ? "star-rated" : "star-unrated"} 
                        />
                      ))}
                      <span className="rating-count">({product.reviewCount || 0})</span>
                    </div>
                    <div className="product-price">
                      {product.salePrice ? (
                        <>
                          <span className="sale-price">{formatPrice(product.salePrice)}</span>
                          <span className="original-price">{formatPrice(product.price)}</span>
                        </>
                      ) : (
                        <span className="regular-price">{formatPrice(product.price)}</span>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="loading-placeholder">
            <p>Đang tải sản phẩm mới...</p>
          </div>
        )}
      </div>
    </section>
  );
};