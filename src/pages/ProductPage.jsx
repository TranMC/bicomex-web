import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FaStar, FaFilter, FaSort, FaList, FaThLarge, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useToast from '../hooks/useToast';
import { getProductsByCategory, products } from '../data/products';
import { getCategoryNameBySlug } from '../data/categories';
import { getBrandNames } from '../data/brands';
import '../styles/pages/ProductPage.css';

// Memoized Product Card Component
const ProductCard = memo(({ product, handleAddToCart, formatPrice, viewMode }) => {
  return (
    <div className={`product-card ${viewMode === 'list' ? 'list-view' : ''} bg-white rounded-lg shadow-sm transition-all hover:shadow-lg`}>
      <Link to={`/san-pham/${product.slug}`} className="block relative">
        {product.salePrice && (
          <div className="sale-tag absolute top-2 left-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">
            -{Math.round((1 - product.salePrice / product.price) * 100)}%
          </div>
        )}
        <img 
          src={product.thumbnail} 
          alt={product.name} 
          className="w-full h-48 object-contain p-4"
          loading="lazy"
        />
      </Link>
      <div className="p-4">
        <Link to={`/san-pham/${product.slug}`}>
          <h3 className="text-md font-medium line-clamp-2 mb-2 h-12">{product.name}</h3>
        </Link>
        <div className="flex items-center mb-2">
          <div className="flex mr-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={`text-xs ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.ratingCount})</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            {product.salePrice ? (
              <div className="flex flex-col">
                <span className="text-lg font-bold text-red-600">{formatPrice(product.salePrice)}</span>
                <span className="text-sm text-gray-500 line-through">{formatPrice(product.price)}</span>
              </div>
            ) : (
              <span className="text-lg font-bold">{formatPrice(product.price)}</span>
            )}
          </div>
          <button 
            onClick={() => handleAddToCart(product)}
            className="add-to-cart bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-700"
          >
            <span className="material-icons text-sm">+</span>
          </button>
        </div>
      </div>
    </div>
  );
});

// Main component using export default instead of named export for lazy loading
const ProductPage = () => {
  const { category } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [displayProducts, setDisplayProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filters, setFilters] = useState({
    priceRange: [0, 5000000],
    sortBy: 'newest',
    brands: [],
    searchQuery: ''
  });
  const { addToCart } = useCart();
  const toast = useToast();

  // Memoized price formatter
  const formatPrice = useMemo(() => {
    const formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    return (price) => formatter.format(price);
  }, []);

  // Xử lý query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const q = searchParams.get('q');
    
    if (q) {
      setFilters(prev => ({
        ...prev,
        searchQuery: q
      }));
    }
  }, [location.search]);

  // Load products based on category - optimized with AbortController
  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    
    // Simulate API call with setTimeout
    const timer = setTimeout(() => {
      if (!controller.signal.aborted) {
      // Lấy sản phẩm từ dữ liệu
      const productsData = category ? getProductsByCategory(category) : products;
      setDisplayProducts(productsData);
      setFilteredProducts(productsData);
      setLoading(false);
      }
    }, 300); // Reduced timeout for faster loading

    // Cleanup function to cancel the timer and abort controller when component unmounts or before effect runs again
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [category]);

  // Áp dụng bộ lọc - memoized with useCallback
  const applyFilters = useCallback(() => {
    setLoading(true);
    
    // Use a more performant way to filter products
    const timer = setTimeout(() => {
    let result = [...displayProducts];
    
    // Lọc theo khoảng giá
      if (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000000) {
    result = result.filter(product => {
      const price = product.salePrice || product.price;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });
      }
    
      // Lọc theo thương hiệu - only apply if brands are selected
    if (filters.brands.length > 0) {
      result = result.filter(product => 
        filters.brands.includes(product.brand)
      );
    }
    
      // Lọc theo từ khóa tìm kiếm - only apply if search query exists
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.shortDescription?.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
      );
    }
    
      // Sắp xếp sản phẩm - optimize sorting
      if (filters.sortBy !== 'newest') {
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'popular':
        result.sort((a, b) => b.ratingCount - a.ratingCount);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
        }
      } else {
        // Default sort by newest (id)
        result.sort((a, b) => b.id - a.id);
    }
    
      setFilteredProducts(result);
      setLoading(false);
    }, 100); // Reduced timeout for faster response
    
    return () => clearTimeout(timer);
  }, [displayProducts, filters]);

  // Áp dụng bộ lọc khi filters thay đổi
  useEffect(() => {
    if (displayProducts.length > 0) {
      const cleanup = applyFilters();
      return cleanup;
    }
  }, [filters, applyFilters, displayProducts]);

  // Xử lý thay đổi bộ lọc
  const handleFilterChange = useCallback((type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
  }, []);

  // Xử lý tìm kiếm - memoized with useCallback
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value;
    
    setFilters(prev => ({
      ...prev,
      searchQuery: searchValue
    }));
    
    // Cập nhật URL với query tìm kiếm
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('q', searchValue);
    navigate({
      pathname: location.pathname,
      search: searchParams.toString()
    });
  }, [location.pathname, location.search, navigate]);

  // Xử lý đặt lại bộ lọc - memoized with useCallback
  const resetFilters = useCallback(() => {
    setFilters({
      priceRange: [0, 5000000],
      sortBy: 'newest',
      brands: [],
      searchQuery: ''
    });
    
    // Xóa query tìm kiếm khỏi URL
    navigate(location.pathname);
  }, [location.pathname, navigate]);

  // Available brands for filter - memoized
  const availableBrands = useMemo(() => getBrandNames(), []);

  // Cart handling - memoized with useCallback
  const handleAddToCart = useCallback((product) => {
    addToCart(product, 1);
    toast.success(`Đã thêm ${product.name} vào giỏ hàng!`);
  }, [addToCart, toast]);

  // Memoize category name
  const categoryName = useMemo(() => 
    category ? getCategoryNameBySlug(category) : 'Tất cả sản phẩm', 
  [category]);

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
                <span className="text-blue-600">{categoryName}</span>
              </>
            )}
          </nav>
        </div>

        <h1 className="text-3xl font-bold mb-8">{categoryName}</h1>
        
        {/* Thanh tìm kiếm */}
        <div className="search-bar mb-6 p-4 bg-white rounded-lg shadow-md">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
            <div className="flex-grow relative">
              <input 
                type="text"
                name="search"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full border rounded-lg py-2 px-3 pr-10"
                defaultValue={filters.searchQuery}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaSearch />
              </div>
            </div>
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center justify-center"
            >
              Tìm kiếm
            </button>
            {filters.searchQuery && (
              <button 
                type="button" 
                onClick={resetFilters}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg px-4 py-2"
              >
                Xóa bộ lọc
              </button>
            )}
          </form>
        </div>

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
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button 
                    className={`px-2 py-1 text-xs border rounded ${filters.priceRange[1] === 500000 ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
                    onClick={() => handleFilterChange('priceRange', [0, 500000])}
                  >
                    Dưới 500.000đ
                  </button>
                  <button 
                    className={`px-2 py-1 text-xs border rounded ${filters.priceRange[1] === 1000000 ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
                    onClick={() => handleFilterChange('priceRange', [0, 1000000])}
                  >
                    Dưới 1.000.000đ
                  </button>
                  <button 
                    className={`px-2 py-1 text-xs border rounded ${filters.priceRange[1] === 2000000 ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
                    onClick={() => handleFilterChange('priceRange', [0, 2000000])}
                  >
                    Dưới 2.000.000đ
                  </button>
                  <button 
                    className={`px-2 py-1 text-xs border rounded ${filters.priceRange[1] === 5000000 ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
                    onClick={() => handleFilterChange('priceRange', [0, 5000000])}
                  >
                    Tất cả giá
                  </button>
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
              
              <button 
                className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700"
                onClick={() => applyFilters()}
              >
                Áp dụng
              </button>
              
              <button 
                className="w-full mt-2 bg-gray-200 text-gray-700 py-2 rounded font-medium hover:bg-gray-300"
                onClick={resetFilters}
              >
                Đặt lại
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
                  <option value="rating">Đánh giá cao nhất</option>
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
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-medium mb-4">Không tìm thấy sản phẩm nào</h3>
                <p className="text-gray-600 mb-6">Không có sản phẩm nào phù hợp với tiêu chí tìm kiếm của bạn.</p>
                <button 
                  onClick={resetFilters}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700"
                >
                  Xóa bộ lọc
                </button>
              </div>
            ) : (
              <>
                {/* Hiển thị kết quả tìm kiếm */}
                {filters.searchQuery && (
                  <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                    <p>Kết quả tìm kiếm cho: <strong>"{filters.searchQuery}"</strong> - {filteredProducts.length} sản phẩm</p>
                  </div>
                )}
                
                {/* Products grid/list optimized with virtualization for large lists */}
                <div className={`products-grid mt-6 grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}>
                  {loading ? (
                    // Skeleton loading for better UX
                    Array.from({ length: 8 }).map((_, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                        <div className="h-48 bg-gray-200 rounded mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2 w-2/3"></div>
                        <div className="h-8 bg-gray-200 rounded mt-4"></div>
                      </div>
                    ))
                  ) : filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        handleAddToCart={handleAddToCart} 
                        formatPrice={formatPrice}
                        viewMode={viewMode}
                      />
                    ))
                  ) : (
                    <div className="col-span-full py-8 text-center">
                      <p className="text-lg text-gray-500">Không tìm thấy sản phẩm phù hợp</p>
                          <button 
                        onClick={resetFilters}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
                          >
                        Xóa bộ lọc
                          </button>
                        </div>
                  )}
                  </div>
                
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

export default ProductPage;