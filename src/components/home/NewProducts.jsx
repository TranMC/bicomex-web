import { Link } from 'react-router-dom';
import { FaStar, FaCartPlus, FaEye, FaRegHeart } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import useCart from '../../hooks/useCart';
import useToast from '../../hooks/useToast';
import { newProducts } from '../../data/newProducts';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../styles/components/NewProducts.css';

export const NewProducts = () => {
  const { addToCart } = useCart();
  const toast = useToast();
  
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
    e.target.src = "https://bizweb.dktcdn.net/thumb/large/100/330/753/products/gach-lat-nen-1.jpg?v=1553259461737";
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
            1280: {
              slidesPerView: 5,
            },
          }}
          className="swiper-new-products"
        >
          {newProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="product-card">
                <div className="product-thumbnail">
                  <Link to={`/san-pham/${product.slug}`} className="product-image-link">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="product-image"
                      onError={handleImageError}
                    />
                  </Link>
                  
                  {/* Labels */}
                  <div className="product-labels">
                    <span className="new-label">Mới</span>
                    
                    {product.salePrice && (
                      <span className="sale-label">
                        -{Math.round((1 - product.salePrice / product.price) * 100)}%
                      </span>
                    )}
                  </div>
                  
                  {/* Quick actions */}
                  <div className="quick-actions">
                    <button 
                      className="action-button cart-action"
                      onClick={(e) => handleAddToCart(e, product)}
                      title="Thêm vào giỏ hàng"
                    >
                      <FaCartPlus className="action-icon" />
                    </button>
                    <Link 
                      to={`/san-pham/${product.slug}`} 
                      className="action-button view-action"
                      title="Xem nhanh"
                    >
                      <FaEye className="action-icon" />
                    </Link>
                    <button 
                      className="action-button wishlist-action"
                      title="Thêm vào yêu thích"
                    >
                      <FaRegHeart className="action-icon" />
                    </button>
                  </div>
                </div>
                
                <div className="product-info">
                  <h3 className="product-name">
                    <Link to={`/san-pham/${product.slug}`} className="product-name-link line-clamp-2">
                      {product.name}
                    </Link>
                  </h3>
                  
                  {/* Stars */}
                  <div className="product-reviews">
                    <div className="rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={`star-icon ${i < Math.floor(product.rating) ? '' : 'star-inactive'}`} />
                      ))}
                    </div>
                    <span className="review-count">({product.reviewCount})</span>
                  </div>
                  
                  {/* Price */}
                  <div className="price-container">
                    {product.salePrice ? (
                      <div className="price-sale-container">
                        <span className="price-sale">{formatPrice(product.salePrice)}</span>
                        <span className="price-original">{formatPrice(product.price)}</span>
                      </div>
                    ) : (
                      <span className="price-current">{formatPrice(product.price)}</span>
                    )}
                  </div>

                  {/* Add to cart button - Mobile only */}
                  <div className="mobile-cart-container">
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className="mobile-cart-button"
                    >
                      <FaCartPlus className="mobile-cart-icon" /> Thêm vào giỏ
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="view-more-container">
          <Link 
            to="/san-pham-moi" 
            className="view-more-link"
          >
            Xem tất cả sản phẩm mới
          </Link>
        </div>
      </div>
    </section>
  );
};