import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaCartPlus, FaEye, FaRegHeart } from 'react-icons/fa';
import useCart from '../../hooks/useCart';
import useToast from '../../hooks/useToast';
import { featuredProducts } from '../../data/featuredProducts';
import '../../styles/components/FeaturedProducts.css';

export const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('gach-op-lat');

  // Dữ liệu tab sản phẩm
  const tabs = [
    { id: 'gach-op-lat', name: 'Gạch ốp lát', slug: 'gach-op-lat' },
    { id: 'son', name: 'Sơn nội ngoại thất', slug: 'son-noi-ngoai-that' },
    { id: 'san-go', name: 'Sàn gỗ ốp lát', slug: 'san-go-op-lat' },
    { id: 'xi-mang', name: 'Xi măng & vật liệu thô', slug: 'xi-mang-vat-lieu-tho' },
    { id: 'den-trang-tri', name: 'Đèn trang trí', slug: 'den-trang-tri' }
  ];

  // Lọc sản phẩm theo danh mục
  const filteredProducts = featuredProducts.filter(
    product => product.categories?.includes(activeTab)
  ) || [];

  // Format currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
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
    e.target.src = "https://bizweb.dktcdn.net/thumb/large/100/330/753/products/son-nuoc-jotun-majestic-dep-hoan-hao-2-1.jpg?v=1553090388617";
  };

  return (
    <section className="section-products">
      <div className="products-container">
        <div className="section-title-container">
          <h2 className="section-title">
            <span className="section-title-highlight">Sản phẩm</span> nổi bật
          </h2>
          <p className="section-subtitle">Các sản phẩm được khách hàng tin dùng nhất</p>
        </div>

        {/* Tabs */}
        <div className="products-tabs">
          <ul className="tabs-list">
            {tabs.map(tab => (
              <li key={tab.id} className="tab-item">
                <button
                  className={`tab-button ${activeTab === tab.id ? 'tab-active' : 'tab-inactive'}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Products grid */}
        <div className="products-content">
          <div className="products-content-inner">
            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                <div className="featured-product-large">
                  <div className="product-card">
                    <div className="product-thumbnail">
                      <Link to={`/san-pham/${filteredProducts[0].slug}`} className="product-link">
                        <img 
                          src={filteredProducts[0].image} 
                          alt={filteredProducts[0].name} 
                          className="product-image-large"
                          onError={handleImageError}
                        />
                      </Link>
                      
                      {filteredProducts[0].isNew && (
                        <div className="product-badge badge-new">Mới</div>
                      )}
                      
                      {filteredProducts[0].isHot && (
                        <div className="product-badge badge-hot">Hot</div>
                      )}
                    </div>
                    
                    <div className="product-info-large">
                      <h3 className="product-name-large">
                        <Link to={`/san-pham/${filteredProducts[0].slug}`} className="product-name-link line-clamp-2">
                          {filteredProducts[0].name}
                        </Link>
                      </h3>
                      
                      <div className="product-ratings">
                        <div className="rating-stars">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={`star-icon ${i < Math.floor(filteredProducts[0].rating) ? '' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="rating-count">({filteredProducts[0].reviewCount})</span>
                      </div>
                      
                      <div className="product-description line-clamp-3">
                        {filteredProducts[0].description || 'Sản phẩm chất lượng cao, được ưa chuộng trên thị trường'}
                      </div>
                      
                      <div className="product-actions">
                        <div className="price-container">
                          {filteredProducts[0].salePrice ? (
                            <div className="price-sale-container">
                              <span className="price-sale">{formatPrice(filteredProducts[0].salePrice)}</span>
                              <span className="price-original">{formatPrice(filteredProducts[0].price)}</span>
                            </div>
                          ) : (
                            <span className="price-current">{formatPrice(filteredProducts[0].price)}</span>
                          )}
                        </div>
                        
                        <div>
                          <button
                            className="add-to-cart-btn"
                            onClick={(e) => handleAddToCart(e, filteredProducts[0])}
                          >
                            <FaCartPlus className="cart-icon" />
                            Thêm vào giỏ
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="small-products-grid">
                    {filteredProducts.slice(1, 5).map(product => (
                      <div key={product.id} className="product-card">
                        <div className="product-thumbnail">
                          <Link to={`/san-pham/${product.slug}`} className="product-link">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="product-image-small"
                              onError={handleImageError}
                            />
                          </Link>
                          
                          {product.isNew && (
                            <div className="product-badge badge-new">Mới</div>
                          )}
                          
                          {product.isHot && (
                            <div className="product-badge badge-hot">Hot</div>
                          )}
                        </div>
                        
                        <div className="product-info-small">
                          <h3 className="product-name-small">
                            <Link to={`/san-pham/${product.slug}`} className="product-name-link line-clamp-2">
                              {product.name}
                            </Link>
                          </h3>
                          
                          <div className="product-ratings ratings-small">
                            <div className="rating-stars">
                              {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={`star-icon-small ${i < Math.floor(product.rating) ? '' : 'text-gray-300'}`} />
                              ))}
                            </div>
                            <span className="rating-count rating-count-small">({product.reviewCount})</span>
                          </div>
                          
                          <div className="product-actions">
                            <div className="price-container">
                              {product.salePrice ? (
                                <div>
                                  <span className="price-sale price-sale-small">{formatPrice(product.salePrice)}</span>
                                  <span className="price-original price-original-small">{formatPrice(product.price)}</span>
                                </div>
                              ) : (
                                <span className="price-current price-current-small">{formatPrice(product.price)}</span>
                              )}
                            </div>
                            
                            <button
                              className="cart-icon-small"
                              onClick={(e) => handleAddToCart(e, product)}
                            >
                              <FaCartPlus />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-products">
                <div className="no-products-icon">
                  <FaRegHeart />
                </div>
                <h3 className="no-products-title">Không có sản phẩm nào</h3>
                <p className="no-products-text">Không tìm thấy sản phẩm nào trong danh mục này.</p>
                <Link to="/san-pham" className="view-all-btn">
                  Xem tất cả sản phẩm
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="view-more-container">
          <Link to={`/san-pham/${tabs.find(tab => tab.id === activeTab)?.slug || 'san-pham'}`} className="view-more-link">
            Xem tất cả sản phẩm
          </Link>
        </div>
      </div>
    </section>
  );
};