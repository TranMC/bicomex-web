import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaShoppingCart, FaArrowUp } from 'react-icons/fa';
import { getSafeImageUrl, preloadImage } from '../../utils/imageUtils';
import useCart from '../../hooks/useCart';
import useToast from '../../hooks/useToast';
import { featuredProducts } from '../../data/featuredProducts';
import '../../styles/components/FeaturedProducts.css';

export const FeaturedProducts = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const { addToCart } = useCart();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('son');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Dữ liệu tab sản phẩm
  const tabs = useMemo(() => [
    { id: 'son', name: 'Sơn nội thất', slug: 'son-noi-that' },
    { id: 'gach-op-lat', name: 'Gạch ốp lát', slug: 'gach-op-lat' },
    { id: 'vat-lieu-tho', name: 'Vật liệu thô', slug: 'vat-lieu-tho' },
    { id: 'trang-tri-nha-cua', name: 'Trang trí nhà cửa', slug: 'trang-tri-nha-cua' },
    { id: 'may-moc-xay-dung', name: 'Máy móc xây dựng', slug: 'may-moc-xay-dung' }
  ], []);

  // Memoize products to prevent unnecessary re-renders
  const products = useMemo(() => featuredProducts, []);

  // Lọc sản phẩm theo danh mục
  const filteredProducts = useMemo(() => 
    products.filter(product => product.category?.includes(activeTab) || 
                              (product.categories && product.categories.includes(activeTab))) || [],
    [products, activeTab]
  );

  // Lấy 4 sản phẩm để hiển thị
  const displayProducts = useMemo(() => 
    filteredProducts.slice(0, 4),
    [filteredProducts]
  );

  // Xử lý hiển thị nút Back to Top
  const handleScroll = useCallback(() => {
    if (window.scrollY > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  }, []);

  // Xử lý click nút Back to Top
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // Thêm event listener để theo dõi cuộn trang
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Preload images to prevent CORB issues
  useEffect(() => {
    let isMounted = true;
    
    const loadImages = async () => {
      try {
        // Only preload images for the active tab to improve performance
        const imagePromises = displayProducts.map(product => 
          preloadImage(getSafeImageUrl(product.image))
        );
        
        await Promise.all(imagePromises);
        if (isMounted) {
          setImagesLoaded(true);
        }
      } catch (error) {
        console.error('Error preloading featured product images:', error);
        if (isMounted) {
          setImagesLoaded(true);
        }
      }
    };
    
    // Reset loading state when tab changes
    setImagesLoaded(false);
    loadImages();
    
    return () => {
      isMounted = false;
    };
  }, [displayProducts]);

  // Format price with dot separator (e.g., 3.100.000đ)
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ';
  };

  // Handle add to cart
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  // Handle image error
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = getSafeImageUrl("https://bizweb.dktcdn.net/thumb/large/100/330/753/products/son-nuoc-jotun-majestic-dep-hoan-hao-2-1.jpg?v=1553090388617");
  };

  // Xác định loại nút mua hàng dựa vào index
  const getButtonType = (product) => {
    // Dựa vào id của sản phẩm để xác định kiểu nút (Mua ngay hoặc Tùy chọn)
    const isBuyNow = product.id % 2 === 0;
    
    return {
      text: isBuyNow ? 'Mua ngay' : 'Tùy chọn',
      className: isBuyNow ? 'buy-button buy-now' : 'buy-button options'
    };
  };

  return (
    <section className="featured-products-section">
      <div className="container">
        <div className="featured-header">
          <h2 className="featured-title">
            Sản phẩm <span className="featured-title-highlight">nổi bật</span>
          </h2>
          
          <div className="featured-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`featured-tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {imagesLoaded ? (
          <div className="featured-grid">
            {displayProducts.length > 0 ? (
              displayProducts.map((product) => {
                const buttonType = getButtonType(product);
                
                return (
                  <div key={product.id} className="featured-product-card">
                    {/* Badge */}
                    {product.isNew && <div className="product-badge new">Mới</div>}
                    {product.isHot && <div className="product-badge hot">Hot</div>}
                    
                    {/* Product Image */}
                    <div className="product-image-wrapper">
                      <Link to={`/san-pham/${product.slug}`}>
                        <img 
                          src={getSafeImageUrl(product.image)} 
                          alt={product.name} 
                          className="product-image"
                          onError={handleImageError}
                          loading="lazy"
                        />
                      </Link>
                    </div>
                    
                    {/* Product Info */}
                    <div className="product-info">
                      <h3 className="product-name">
                        <Link to={`/san-pham/${product.slug}`}>
                          {product.name}
                        </Link>
                      </h3>
                      
                      {product.shortDescription && (
                        <div className="product-description">
                          {product.shortDescription}
                        </div>
                      )}
                      
                      <div className="product-price-container">
                        {product.salePrice ? (
                          <>
                            <span className="product-sale-price">{formatPrice(product.salePrice)}</span>
                            <span className="product-original-price">{formatPrice(product.price)}</span>
                          </>
                        ) : (
                          <span className="product-regular-price">{formatPrice(product.price)}</span>
                        )}
                      </div>
                      
                      <div className="product-actions-bottom">
                        <button 
                          onClick={(e) => handleAddToCart(e, product)} 
                          className={buttonType.className}
                          disabled={product.isInStock === false}
                        >
                          {product.isInStock === false ? 'Hết hàng' : buttonType.text}
                        </button>
                        
                        <Link 
                          to={`/san-pham/${product.slug}`}
                          className="view-button"
                          title="Xem chi tiết"
                        >
                          <FaEye />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-products">
                <p>Không có sản phẩm nào trong danh mục này.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="loading-placeholder">
            <p>Đang tải sản phẩm...</p>
          </div>
        )}

        <div className="view-all-container">
          <Link to={`/san-pham/${tabs.find(tab => tab.id === activeTab)?.slug || ''}`} className="view-all-button">
            Xem tất cả
          </Link>
        </div>
      </div>
      
      {/* Nút Back to Top */}
      <div 
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        title="Lên đầu trang"
      >
        <FaArrowUp />
      </div>
    </section>
  );
};