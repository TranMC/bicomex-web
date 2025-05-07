import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaPhone, FaHome, FaMapMarkerAlt } from 'react-icons/fa';
import { CartIcon } from '../cart/CartIcon';
import '../../styles/components/Header.css';

export const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const categoriesRef = useRef(null);
  const navigate = useNavigate();

  // Categories data structure
  const categories = [
    {
      id: 1,
      name: 'Gạch ốp lát',
      subCategories: [
        { id: 101, name: 'Gạch lát tường', slug: 'gach-lat-tuong' },
        { id: 102, name: 'Gạch trang trí', slug: 'gach-trang-tri' },
        { id: 103, name: 'Gạch Inax', slug: 'gach-inax' },
        { id: 104, name: 'Gạch nhập khẩu', slug: 'gach-nhap-khau' }
      ]
    },
    {
      id: 2,
      name: 'Sơn nội ngoại thất',
      subCategories: [
        { id: 201, name: 'Sơn tường', slug: 'son-tuong' },
        { id: 202, name: 'Sơn chống cháy', slug: 'son-chong-chay' },
        { id: 203, name: 'Sơn phủ nano', slug: 'son-phu-nano' },
        { id: 204, name: 'Sơn kim loại', slug: 'son-kim-loai' }
      ]
    },
    {
      id: 3,
      name: 'Sàn và phụ kiện',
      subCategories: [
        { id: 301, name: 'Sàn gỗ ốp lát', slug: 'san-go-op-lat' },
        { id: 302, name: 'Sàn thể thao', slug: 'san-the-thao' },
        { id: 303, name: 'Sàn gạch cao cấp', slug: 'san-gach-cao-cap' },
        { id: 304, name: 'Sàn phủ bóng', slug: 'san-phu-bong' }
      ]
    },
    {
      id: 4,
      name: 'Nhôm kính xây dựng',
      subCategories: [
        { id: 401, name: 'Cửa kính cường lực', slug: 'cua-kinh-cuong-luc' },
        { id: 402, name: 'Bản lề nhôm', slug: 'ban-le-nhom' },
        { id: 403, name: 'Thanh chuyển động', slug: 'thanh-chuyen-dong' },
        { id: 404, name: 'Tay nắm cửa', slug: 'tay-nam-cua' }
      ]
    },
    {
      id: 5,
      name: 'Trang trí nhà cửa',
      subCategories: [
        { id: 501, name: 'Đèn chùm', slug: 'den-chum' },
        { id: 502, name: 'Đèn hoa trang trí', slug: 'den-hoa-trang-tri' },
        { id: 503, name: 'Đèn thả trang trí', slug: 'den-tha-trang-tri' },
        { id: 504, name: 'Gương trang trí', slug: 'guong-trang-tri' }
      ]
    },
    {
      id: 6,
      name: 'Hệ thống điện nước',
      subCategories: [
        { id: 601, name: 'Máy phát điện', slug: 'may-phat-dien' },
        { id: 602, name: 'Phụ kiện ống nước', slug: 'phu-kien-ong-nuoc' },
        { id: 603, name: 'Ổ cắm điện', slug: 'o-cam-dien' },
        { id: 604, name: 'Thiết bị tự động hóa', slug: 'thiet-bi-tu-dong-hoa' }
      ]
    },
    {
      id: 7,
      name: 'Máy móc xây dựng',
      subCategories: [
        { id: 701, name: 'Máy cắt gạch đá', slug: 'may-cat-gach-da' },
        { id: 702, name: 'Máy cắt Plasma', slug: 'may-cat-plasma' },
        { id: 703, name: 'Máy cắt hơi', slug: 'may-cat-hoi' },
        { id: 704, name: 'Dụng cụ dùng xăng', slug: 'dung-cu-dung-xang' }
      ]
    },
    {
      id: 8,
      name: 'Vật liệu thô',
      subCategories: [
        { id: 801, name: 'Bê tông, vữa xây dựng', slug: 'be-tong-vua-xay-dung' },
        { id: 802, name: 'Sắt thép xây dựng', slug: 'sat-thep-xay-dung' },
        { id: 803, name: 'Hệ thống lưới', slug: 'he-thong-luoi' },
        { id: 804, name: 'Sỏi xây dựng', slug: 'soi-xay-dung' }
      ]
    }
  ];

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    // Navigate to search results page
    navigate(`/san-pham?q=${encodeURIComponent(searchTerm)}`);
  };

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setShowCategories(false);
        setActiveCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle hover on main category
  const handleCategoryHover = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <header className="header">
      {/* Top bar with hotline and login links */}
      <div className="top-bar bg-primary">
        <div className="container mx-auto py-2 px-4 flex justify-between items-center">
          <div className="contact-info flex items-center gap-6">
            <div className="flex items-center">
              <FaPhone className="text-white mr-2" />
              <span className="text-white">Hotline: 19006750</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-white mr-2 text-lg" />
              <span className="text-white">Địa chỉ: Tầng 6 Ladeco, 266 Đội Cấn, Hà Nội</span>
            </div>
          </div>
          <div className="user-actions flex items-center gap-4">
            <Link to="/dang-ky" className="text-white hover:underline">Đăng ký</Link>
            <span className="text-white">|</span>
            <Link to="/dang-nhap" className="text-white hover:underline">Đăng nhập</Link>
          </div>
        </div>
      </div>

      {/* Main header with logo, search and cart */}
      <div className="main-header bg-primary py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="logo">
            <Link to="/">
              <img 
                src="/logo-bicomex.png" 
                alt="Bicomex Logo" 
                className="h-12" 
                onError={(e) => {
                  // Create a text-based logo as fallback
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.style.display = 'none';
                  const logoText = document.createElement('div');
                  logoText.innerHTML = '<div style="font-size: 20px; font-weight: bold; color: white;">BICOMEX</div>';
                  e.target.parentNode.appendChild(logoText);
                }} 
              />
            </Link>
          </div>
          
          <div className="search-bar flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="flex w-full">
              <div className="relative w-full flex">
                <select 
                  className="bg-white border-r border-gray-300 text-gray-700 py-2.5 pl-3 pr-8 rounded-l focus:outline-none"
                >
                  <option>Tất cả sản phẩm</option>
                </select>
                
                <input 
                  type="text" 
                  placeholder="Tìm kiếm sản phẩm..." 
                  className="w-full py-2.5 px-4 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                
                <button 
                  type="submit"
                  className="bg-success text-white px-4 py-2.5 rounded-r hover:bg-success/90 transition-colors"
                >
                  <FaSearch />
                </button>
              </div>
            </form>
          </div>
          
          <div className="cart-wrapper">
            <CartIcon />
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="main-nav bg-primary border-t border-blue-400">
        <div className="container mx-auto flex items-center">
          <Link to="/" className="home-link flex items-center justify-center px-5 py-3 hover:bg-blue-600">
            <FaHome className="text-white text-lg" />
          </Link>
          
          <div className="flex items-center overflow-x-auto">
            <Link to="/khuyen-mai-hot" className="px-4 py-3 text-white hover:bg-blue-600 whitespace-nowrap">
              Khuyến mãi hot
            </Link>
            <Link to="/hang-moi-ve" className="px-4 py-3 text-white hover:bg-blue-600 whitespace-nowrap">
              Hàng mới về
            </Link>
            
            <div 
              className="relative px-4 py-3 text-white hover:bg-blue-600 whitespace-nowrap cursor-pointer"
              onMouseEnter={() => setShowCategories(true)}
              ref={categoriesRef}
            >
              <div className="flex items-center">
                <span>Sản phẩm</span>
                <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {showCategories && (
                <div className="calendar-dropdown absolute left-0 top-full bg-white shadow-xl z-50 flex text-black">
                  {/* Calendar left side - Main categories */}
                  <div className="calendar-sidebar w-64 bg-gray-100 border-r">
                    <ul>
                      {categories.map(category => (
                        <li 
                          key={category.id}
                          className={`py-3 px-4 border-b hover:bg-blue-50 cursor-pointer ${activeCategory === category.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''}`}
                          onMouseEnter={() => handleCategoryHover(category.id)}
                        >
                          <span className="font-medium">{category.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Calendar right side - Subcategories */}
                  <div className="calendar-content p-6 min-w-[320px]">
                    {activeCategory ? (
                      <>
                        <h3 className="text-lg font-bold text-blue-600 mb-4 border-b pb-2">
                          {categories.find(c => c.id === activeCategory)?.name}
                        </h3>
                        <ul className="grid grid-cols-2 gap-3">
                          {categories.find(c => c.id === activeCategory)?.subCategories.map(subCat => (
                            <li key={subCat.id}>
                              <Link 
                                to={`/san-pham/${subCat.slug}`} 
                                className="text-gray-700 hover:text-blue-600 hover:underline"
                                onClick={() => setShowCategories(false)}
                              >
                                {subCat.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        Vui lòng chọn danh mục
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <Link to="/ve-chung-toi" className="px-4 py-3 text-white hover:bg-blue-600 whitespace-nowrap">
              Về chúng tôi
            </Link>
            <Link to="/tin-tuc" className="px-4 py-3 text-white hover:bg-blue-600 whitespace-nowrap">
              Tin tức
            </Link>
            <Link to="/lien-he" className="px-4 py-3 text-white hover:bg-blue-600 whitespace-nowrap">
              Liên hệ
            </Link>
          </div>
          
          <div className="ml-auto">
            <Link to="/he-thong-cua-hang" className="flex items-center px-4 py-3 text-white hover:bg-blue-600 whitespace-nowrap">
              <FaMapMarkerAlt className="mr-2 text-lg" />
              <span>Hệ thống cửa hàng</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};