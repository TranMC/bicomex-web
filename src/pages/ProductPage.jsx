import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaFilter, FaSort, FaList, FaThLarge } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ProductPage.css';

export const ProductPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filters, setFilters] = useState({
    priceRange: [0, 5000000],
    sortBy: 'newest',
    brands: []
  });

  // Dummy function to format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Load products based on category
  useEffect(() => {
    setLoading(true);
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Mock data - in a real app, this would come from an API
      const mockProducts = [
        {
          id: 1,
          name: 'Xi măng Portland PC40',
          image: '/src/assets/images/product-cement.jpg',
          price: 95000,
          salePrice: 85000,
          rating: 4.8,
          reviewCount: 124,
          slug: 'xi-mang-portland-pc40',
          category: 'vat-lieu-xay-dung',
          brand: 'Hà Tiên',
        },
        {
          id: 2,
          name: 'Gạch ốp tường Đồng Tâm 30x60',
          image: '/src/assets/images/product-tile.jpg',
          price: 180000,
          salePrice: null,
          rating: 4.5,
          reviewCount: 98,
          slug: 'gach-op-tuong-dong-tam-30x60',
          category: 'vat-lieu-xay-dung',
          brand: 'Đồng Tâm',
        },
        {
          id: 3,
          name: 'Sơn nội thất Dulux',
          image: '/src/assets/images/product-paint.jpg',
          price: 650000,
          salePrice: 590000,
          rating: 4.7,
          reviewCount: 156,
          slug: 'son-noi-that-dulux',
          category: 'son-phu-kien',
          brand: 'Dulux',
        },
        {
          id: 4,
          name: 'Thép xây dựng Pomina Φ10',
          image: '/src/assets/images/product-steel.jpg',
          price: 320000,
          salePrice: null,
          rating: 4.9,
          reviewCount: 210,
          slug: 'thep-xay-dung-pomina-phi10',
          category: 'vat-lieu-xay-dung',
          brand: 'Pomina',
        },
        {
          id: 5,
          name: 'Ống nhựa uPVC Bình Minh Φ90',
          image: '/src/assets/images/product-pipe.jpg',
          price: 245000,
          salePrice: 220000,
          rating: 4.6,
          reviewCount: 87,
          slug: 'ong-nhua-upvc-binh-minh-phi90',
          category: 'vat-tu-cap-thoat-nuoc',
          brand: 'Bình Minh',
        },
        {
          id: 6,
          name: 'Dây điện Cadisun 2x2.5mm',
          image: '/src/assets/images/product-wire.jpg',
          price: 18000,
          salePrice: null,
          rating: 4.4,
          reviewCount: 65,
          slug: 'day-dien-cadisun-2x2-5mm',
          category: 'thiet-bi-dien',
          brand: 'Cadisun',
        },
      ];

      // Filter products by category if a category is provided
      let filteredProducts = mockProducts;
      if (category) {
        filteredProducts = mockProducts.filter(product => product.category === category);
      }

      setProducts(filteredProducts);
      setLoading(false);
    }, 1000);
  }, [category]);

  // Handle filter change
  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  // Get category name from slug
  const getCategoryName = (categorySlug) => {
    const categories = {
      'vat-lieu-xay-dung': 'Vật liệu xây dựng',
      'son-phu-kien': 'Sơn & Phụ kiện',
      'thiet-bi-dien': 'Thiết bị điện',
      'dung-cu-xay-dung': 'Dụng cụ xây dựng',
      'vat-lieu-noi-that': 'Vật liệu nội thất',
      'vat-tu-cap-thoat-nuoc': 'Vật tư cấp thoát nước',
    };
    return categories[categorySlug] || 'Tất cả sản phẩm';
  };

  // Available brands for filter
  const availableBrands = [
    'Hà Tiên', 'Đồng Tâm', 'Dulux', 'Pomina', 'Bình Minh', 'Cadisun', 'TOTO', 'Viglacera'
  ];

  return (
    <div className="product-page py-8">
      <div className="container mx-auto px-4">
        <div className="breadcrumb mb-6">
          <nav className="flex text-sm">
            <Link to="/" className="text-gray-500 hover:text-blue-600">Trang chủ</Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link to="/san-pham" className="text-gray-500 hover:text-blue-600">Sản phẩm</Link>
            {category && (
              <>
                <span className="mx-2 text-gray-500">/</span>
                <span className="text-blue-600">{getCategoryName(category)}</span>
              </>
            )}
          </nav>
        </div>

        <h1 className="text-3xl font-bold mb-8">{category ? getCategoryName(category) : 'Tất cả sản phẩm'}</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-5">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <FaFilter className="mr-2" /> Bộ lọc sản phẩm
              </h3>
              
              <div className="filter-section mb-6">
                <h4 className="font-medium mb-3">Khoảng giá</h4>
                <div className="price-range mb-2">
                  <input 
                    type="range" 
                    min="0" 
                    max="5000000" 
                    step="100000" 
                    value={filters.priceRange[1]} 
                    onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span>0đ</span>
                  <span>{formatPrice(filters.priceRange[1])}</span>
                </div>
              </div>
              
              <div className="filter-section mb-6">
                <h4 className="font-medium mb-3">Thương hiệu</h4>
                <div className="brands-list space-y-2">
                  {availableBrands.map(brand => (
                    <div key={brand} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`brand-${brand}`} 
                        value={brand}
                        checked={filters.brands.includes(brand)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleFilterChange('brands', [...filters.brands, brand]);
                          } else {
                            handleFilterChange('brands', filters.brands.filter(b => b !== brand));
                          }
                        }}
                        className="mr-2"
                      />
                      <label htmlFor={`brand-${brand}`}>{brand}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700">
                Áp dụng
              </button>
            </div>
          </div>
          
          {/* Products list */}
          <div className="lg:w-3/4">
            <div className="product-controls flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 p-4 bg-white rounded-lg shadow-md">
              <div className="sort-options flex items-center mb-4 sm:mb-0">
                <FaSort className="mr-2" />
                <label htmlFor="sort" className="mr-2">Sắp xếp:</label>
                <select 
                  id="sort" 
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="border rounded py-1 px-2"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="price-asc">Giá: Thấp đến cao</option>
                  <option value="price-desc">Giá: Cao đến thấp</option>
                  <option value="popular">Phổ biến nhất</option>
                </select>
              </div>
              
              <div className="view-options flex items-center">
                <span className="mr-2">Hiển thị:</span>
                <button 
                  className={`p-2 rounded mr-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <FaThLarge />
                </button>
                <button 
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setViewMode('list')}
                >
                  <FaList />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-medium mb-4">Không tìm thấy sản phẩm nào</h3>
                <p className="text-gray-600 mb-6">Không có sản phẩm nào phù hợp với tiêu chí tìm kiếm của bạn.</p>
                <Link 
                  to="/san-pham" 
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700"
                >
                  Xem tất cả sản phẩm
                </Link>
              </div>
            ) : (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <div key={product.id} className="product-card bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="relative">
                          <Link to={`/san-pham/${product.slug}`} className="block">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-64 object-cover"
                            />
                          </Link>
                          
                          {product.salePrice && (
                            <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold py-1 px-2 rounded">
                              {Math.round((1 - product.salePrice / product.price) * 100)}% Giảm
                            </span>
                          )}
                        </div>
                        
                        <div className="p-4">
                          <Link to={`/san-pham/${product.slug}`} className="block">
                            <h3 className="font-medium text-lg mb-2 hover:text-blue-600 line-clamp-2">{product.name}</h3>
                          </Link>
                          
                          <div className="flex items-center mb-2">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600 ml-2">({product.reviewCount})</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {product.salePrice ? (
                              <>
                                <span className="font-bold text-lg text-red-600">{formatPrice(product.salePrice)}</span>
                                <span className="text-gray-500 line-through text-sm">{formatPrice(product.price)}</span>
                              </>
                            ) : (
                              <span className="font-bold text-lg">{formatPrice(product.price)}</span>
                            )}
                          </div>
                          
                          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700">
                            Thêm vào giỏ hàng
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {products.map((product) => (
                      <div key={product.id} className="product-card-list bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
                        <div className="relative md:w-1/3">
                          <Link to={`/san-pham/${product.slug}`} className="block">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-64 md:h-full object-cover"
                            />
                          </Link>
                          
                          {product.salePrice && (
                            <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold py-1 px-2 rounded">
                              {Math.round((1 - product.salePrice / product.price) * 100)}% Giảm
                            </span>
                          )}
                        </div>
                        
                        <div className="p-6 md:w-2/3">
                          <Link to={`/san-pham/${product.slug}`} className="block">
                            <h3 className="font-medium text-xl mb-3 hover:text-blue-600">{product.name}</h3>
                          </Link>
                          
                          <div className="flex items-center mb-3">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600 ml-2">({product.reviewCount} đánh giá)</span>
                          </div>
                          
                          <p className="text-gray-600 mb-4">
                            Thương hiệu: <span className="font-medium">{product.brand}</span>
                          </p>
                          
                          <div className="flex items-center gap-2 mb-6">
                            {product.salePrice ? (
                              <>
                                <span className="font-bold text-2xl text-red-600">{formatPrice(product.salePrice)}</span>
                                <span className="text-gray-500 line-through text-lg">{formatPrice(product.price)}</span>
                              </>
                            ) : (
                              <span className="font-bold text-2xl">{formatPrice(product.price)}</span>
                            )}
                          </div>
                          
                          <button className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700">
                            Thêm vào giỏ hàng
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="pagination flex justify-center mt-10">
                  <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-l">Trước</button>
                  <button className="bg-blue-600 text-white px-4 py-2">1</button>
                  <button className="bg-gray-200 text-gray-600 px-4 py-2">2</button>
                  <button className="bg-gray-200 text-gray-600 px-4 py-2">3</button>
                  <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-r">Sau</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};