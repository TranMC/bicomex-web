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
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`Đã thêm ${product.name} vào giỏ hàng!`);
  };
  
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = getSafeImageUrl("bizweb.dktcdn.net/thumb/large/100/330/753/products/gach-lat-nen-1.jpg?v=1553259461737");
  };

  return (
    <section className="section-new-products">
      <div className="new-products-container">
        <div className="section-title-container">
          <h2 className="section-title">
            Sản phẩm <span className="section-title-highlight">mới về</span>
          </h2>
          <p className="section-subtitle">Cập nhật những sản phẩm mới nhất từ các thương hiệu hàng đầu</p>
        </div>

        {imagesLoaded ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="new-products-swiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="product-card">
                  <div className="product-badges">
                    {product.isNew && <span className="badge-new">Mới</span>}
                    {product.discount > 0 && <span className="badge-sale">-{product.discount}%</span>}
                  </div>
                  <div className="product-image-container">
                    <Link to={`/san-pham/${product.slug}`}>
                      <img 
                        src={getSafeImageUrl(product.image)} 
                        alt={product.name} 
                        className="product-image"
                        onError={handleImageError}
                        loading="lazy"
                      />
                    </Link>
                    <div className="product-actions">
                      <button 
                        className="action-button add-to-cart" 
                        onClick={(e) => handleAddToCart(e, product)}
                        aria-label="Thêm vào giỏ hàng"
                      >
                        <FaCartPlus />
                      </button>
                      <Link to={`/san-pham/${product.slug}`} className="action-button view-details" aria-label="Xem chi tiết">
                        <FaEye />
                      </Link>
                      <button className="action-button add-to-wishlist" aria-label="Thêm vào yêu thích">
                        <FaRegHeart />
                      </button>
                    </div>
                  </div>
                  <div className="product-info">
                    <div className="product-rating">
                      {[...Array(5)].map((_, index) => (
                        <FaStar 
                          key={index} 
                          className={index < product.rating ? "star-rated" : "star-unrated"} 
                        />
                      ))}
                      <span className="rating-count">({product.ratingCount})</span>
                    </div>
                    <h3 className="product-name">
                      <Link to={`/san-pham/${product.slug}`}>{product.name}</Link>
                    </h3>
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
          <div className="loading-placeholder text-center py-20">
            <p>Đang tải sản phẩm mới...</p>
          </div>
        )}
      </div>
    </section>
  );
};