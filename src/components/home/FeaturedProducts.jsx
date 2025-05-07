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
    <section className="sec_tab_prd_bestsale section_tab_feature section_tab_base py-10">
      <div className="container mx-auto px-4">
        <div className="section-title mb-8">
          <h2 className="title-head text-center text-3xl font-bold">
            <span className="text-blue-600">Sản phẩm</span> nổi bật
          </h2>
          <p className="text-center text-gray-600 mt-2">Các sản phẩm được khách hàng tin dùng nhất</p>
        </div>

        {/* Tabs */}
        <div className="tabs_wrapper mb-6">
          <ul className="tabs flex flex-wrap justify-center border-b border-gray-200">
            {tabs.map(tab => (
              <li key={tab.id} className="mr-2">
                <button
                  className={`py-2 px-4 font-medium rounded-t-lg ${
                    activeTab === tab.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Products grid */}
        <div className="content_tab_h">
          <div className="content-tab">
            <div className="wrap_item_list products-view-grid-bb products-view-grid">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="col-span-1">
                    <div className="item wrp_item_large product-col">
                      <div className="product-box-h product-box-tab-1 bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="product-thumbnail relative">
                          <Link to={`/san-pham/${filteredProducts[0].slug}`} className="image_link display_flex block">
                            <img 
                              src={filteredProducts[0].image} 
                              alt={filteredProducts[0].name} 
                              className="w-full h-80 object-cover"
                              onError={handleImageError}
                            />
                          </Link>
                          
                          {filteredProducts[0].isNew && (
                            <div className="sale-flash new absolute top-3 left-3 bg-green-500 text-white text-sm font-bold py-1 px-2 rounded">Mới</div>
                          )}
                          
                          {filteredProducts[0].isHot && (
                            <div className="sale-flash hot absolute top-3 left-3 bg-red-500 text-white text-sm font-bold py-1 px-2 rounded">Hot</div>
                          )}
                        </div>
                        
                        <div className="product-info a-left p-4">
                          <h3 className="product-name">
                            <Link to={`/san-pham/${filteredProducts[0].slug}`} className="font-medium text-xl hover:text-blue-600 line-clamp-2">
                              {filteredProducts[0].name}
                            </Link>
                          </h3>
                          
                          <div className="flex items-center my-2">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={i < Math.floor(filteredProducts[0].rating) ? 'text-yellow-400' : 'text-gray-300'} />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600 ml-2">({filteredProducts[0].reviewCount})</span>
                          </div>
                          
                          <div className="product-summary-list my-3">
                            <span className="text-gray-600 line-clamp-3">{filteredProducts[0].description || 'Sản phẩm chất lượng cao, được ưa chuộng trên thị trường'}</span>
                          </div>
                          
                          <div className="product-hideoff">
                            <div className="product-hide flex flex-wrap items-center justify-between">
                              <div className="price-box mb-2">
                                {filteredProducts[0].salePrice ? (
                                  <div className="flex items-center">
                                    <span className="font-bold text-xl text-red-600 mr-2">{formatPrice(filteredProducts[0].salePrice)}</span>
                                    <span className="text-gray-500 line-through text-sm">{formatPrice(filteredProducts[0].price)}</span>
                                  </div>
                                ) : (
                                  <span className="font-bold text-xl">{formatPrice(filteredProducts[0].price)}</span>
                                )}
                              </div>
                              
                              <div className="actions">
                                <button
                                  className="btn-cart add_to_cart bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium"
                                  onClick={(e) => handleAddToCart(e, filteredProducts[0])}
                                >
                                  <FaCartPlus className="inline mr-2" />
                                  Thêm vào giỏ
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {filteredProducts.slice(1, 5).map(product => (
                        <div key={product.id} className="item wrp_item_small product-col">
                          <div className="product-box-h product-box-tab-1 bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="product-thumbnail relative">
                              <Link to={`/san-pham/${product.slug}`} className="image_link display_flex block">
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  className="w-full h-40 object-cover"
                                  onError={handleImageError}
                                />
                              </Link>
                              
                              {product.isNew && (
                                <div className="sale-flash new absolute top-2 left-2 bg-green-500 text-white text-xs font-bold py-1 px-2 rounded">Mới</div>
                              )}
                              
                              {product.isHot && (
                                <div className="sale-flash hot absolute top-2 left-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">Hot</div>
                              )}
                            </div>
                            
                            <div className="product-info a-left p-3">
                              <h3 className="product-name">
                                <Link to={`/san-pham/${product.slug}`} className="font-medium hover:text-blue-600 line-clamp-2 text-base">
                                  {product.name}
                                </Link>
                              </h3>
                              
                              <div className="bizweb-product-reviews-badge flex items-center my-1">
                                <div className="flex text-yellow-400">
                                  {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className={`text-xs ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                                  ))}
                                </div>
                                <span className="text-xs text-gray-600 ml-1">({product.reviewCount})</span>
                              </div>
                              
                              <div className="product-hideoff">
                                <div className="product-hide flex justify-between items-center">
                                  <div className="price-box">
                                    {product.salePrice ? (
                                      <div>
                                        <span className="font-bold text-red-600 text-sm mr-1">{formatPrice(product.salePrice)}</span>
                                        <span className="text-gray-500 line-through text-xs">{formatPrice(product.price)}</span>
                                      </div>
                                    ) : (
                                      <span className="font-bold text-sm">{formatPrice(product.price)}</span>
                                    )}
                                  </div>
                                  
                                  <button
                                    className="btn-cart text-blue-600 hover:text-blue-800"
                                    onClick={(e) => handleAddToCart(e, product)}
                                  >
                                    <FaCartPlus className="text-lg" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no-products text-center py-10">
                  <div className="text-gray-400 text-6xl mb-4">
                    <FaRegHeart className="mx-auto" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Không có sản phẩm nào</h3>
                  <p className="text-gray-600">Không tìm thấy sản phẩm nào trong danh mục này.</p>
                  <Link to="/san-pham" className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
                    Xem tất cả sản phẩm
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to={`/san-pham/${tabs.find(tab => tab.id === activeTab)?.slug || 'san-pham'}`} className="view-more border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-2 rounded inline-block transition-colors font-medium">
            Xem tất cả sản phẩm
          </Link>
        </div>
      </div>
    </section>
  );
};