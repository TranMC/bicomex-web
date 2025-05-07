import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaPhone, FaHome, FaMapMarkerAlt, FaUser, FaEnvelope, FaClock, FaShoppingCart, FaBars, FaAngleDown, FaTruck } from 'react-icons/fa';
import { CartIcon } from '../cart/CartIcon';
import '../../styles/components/Header.css';

export const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const categoriesRef = useRef(null);
  const navigate = useNavigate();

  // Danh mục sản phẩm
  const categories = [
    {
      id: 1,
      name: 'Gạch ốp lát',
      slug: 'gach-op-lat',
      subCategories: [
        { id: 101, name: 'Gạch lát nền Viglacera', slug: 'gach-lat-nen-viglacera' },
        { id: 102, name: 'Gạch men Viglacera', slug: 'gach-men-viglacera' },
        { id: 103, name: 'Gạch bông ký ức', slug: 'gach-bong-ky-uc' },
        { id: 104, name: 'Gạch lát sân vườn', slug: 'gach-lat-san-vuon' }
      ]
    },
    {
      id: 2,
      name: 'Sơn nội ngoại thất',
      slug: 'son-noi-ngoai-that',
      subCategories: [
        { id: 201, name: 'Sơn nước OEXPO', slug: 'son-nuoc-oexpo' },
        { id: 202, name: 'Sơn nước Dulux Hight Gloss', slug: 'son-nuoc-dulux-hight-gloss' },
        { id: 203, name: 'Sơn nước Dulux Stain Block', slug: 'son-nuoc-dulux-stain-block' },
        { id: 204, name: 'Sơn nước JOTUN Majestic', slug: 'son-nuoc-jotun-majestic' }
      ]
    },
    {
      id: 3,
      name: 'Sàn gỗ ốp lát',
      slug: 'san-go-op-lat',
      subCategories: [
        { id: 301, name: 'Sàn gỗ ốp lát Ruby Floor', slug: 'san-go-op-lat-ruby-floor' },
        { id: 302, name: 'Sàn gỗ ốp lát Ruby Floor 01', slug: 'san-go-op-lat-001' },
        { id: 303, name: 'Sàn gỗ ốp lát Ruby Floor 02', slug: 'san-go-op-lat-ruby-floor-02' }
      ]
    },
    {
      id: 4,
      name: 'Xi măng & vật liệu thô',
      slug: 'xi-mang-vat-lieu-tho',
      subCategories: [
        { id: 401, name: 'Xi măng INSEE Wall Pro', slug: 'xi-mang-insee-wall-pro' },
        { id: 402, name: 'Xi măng Fico đa dụng', slug: 'xi-mang-fico-da-dung' },
        { id: 403, name: 'Xi măng Hocim đa dụng', slug: 'xi-mang-hocim-da-dung' },
        { id: 404, name: 'Xi măng Octopus', slug: 'xi-mang-octopus' }
      ]
    },
    {
      id: 5,
      name: 'Đèn trang trí',
      slug: 'den-trang-tri',
      subCategories: [
        { id: 501, name: 'Đèn trang trí TOMY 002', slug: 'den-trang-tri-tomy-002' },
        { id: 502, name: 'Đèn trang trí TOMY 003', slug: 'den-trang-tri-tomy-003' },
        { id: 503, name: 'Đèn trang trí TOMY 004', slug: 'den-trang-tri-tomy-004' },
        { id: 504, name: 'Đèn trang trí TOMY 005', slug: 'den-trang-tri-tomy-005' }
      ]
    },
    {
      id: 6,
      name: 'Máy móc xây dựng',
      slug: 'may-moc-xay-dung',
      subCategories: [
        { id: 601, name: 'Máy cắt gạch đá', slug: 'may-cat-gach-da' },
        { id: 602, name: 'Máy cắt Plasma', slug: 'may-cat-plasma' },
        { id: 603, name: 'Máy cắt hơi', slug: 'may-cat-hoi' },
        { id: 604, name: 'Máy phát điện Honda', slug: 'may-phat-dien-honda' }
      ]
    }
  ];

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/san-pham?q=${encodeURIComponent(searchTerm)}`);
  };

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setShowCategories(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Xử lý đóng menu mobile
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Menu mobile */}
      <div id="mySidenav" className={`sidenav menu_mobile ${mobileMenuOpen ? 'active' : ''} md:hidden lg:hidden`}>
        <div className="top_menu_mobile">
          <span className="close_menu" onClick={closeMobileMenu}></span>
        </div>
        <div className="content_memu_mb">
          <div className="link_list_mobile">
            <ul className="ct-mobile">
              <li className="level0 level-top parent">
                <Link to="/">Trang chủ</Link>
              </li>
              <li className="level0 level-top parent">
                <Link to="/khuyen-mai-hot">Khuyến mãi hot</Link>
              </li>
              {categories.map(category => (
                <li key={category.id} className="level0 level-top parent">
                  <Link to={`/san-pham/${category.slug}`}>{category.name}</Link>
                  <ul className="level0">
                    {category.subCategories.map(subCat => (
                      <li key={subCat.id} className="level1">
                        <Link to={`/san-pham/${subCat.slug}`}>{subCat.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li className="level0 level-top parent">
                <Link to="/gioi-thieu">Về chúng tôi</Link>
              </li>
              <li className="level0 level-top parent">
                <Link to="/tin-tuc">Tin tức</Link>
              </li>
              <li className="level0 level-top parent">
                <Link to="/lien-he">Liên hệ</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="hidden-md hidden-lg opacity_menu"></div>
      
      <header className="header">
        {/* Topbar với thông tin liên hệ */}
        <div className="topbar bg-blue-600 text-white py-2">
          <div className="container">
            <div className="row flex justify-between items-center">
              <div className="contact-info flex items-center gap-4">
                <div className="flex items-center">
                  <FaPhone className="mr-2 text-xs" />
                  <span>Hotline: 19006750</span>
                </div>
                <div className="hidden md:flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-xs" />
                  <span>Địa chỉ: Tầng 6 Ladeco, 266 Đội Cấn, Hà Nội</span>
                </div>
                <div className="hidden md:flex items-center">
                  <FaEnvelope className="mr-2 text-xs" />
                  <span>Email: support@bicomex.com</span>
                </div>
              </div>
              <div className="user-actions flex items-center gap-3 text-sm">
                <Link to="/dang-ky" className="hover:text-blue-200">Đăng ký</Link>
                <span>|</span>
                <Link to="/dang-nhap" className="hover:text-blue-200">Đăng nhập</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Header chính với logo, tìm kiếm, giỏ hàng */}
        <div className="mid-header wid_100 bg-white py-4 shadow-sm">
          <div className="container">
            <div className="flex flex-wrap items-center">
              <div className="logo lg:w-1/4 md:w-1/4 w-full flex justify-center lg:justify-start md:justify-start mb-4 lg:mb-0 md:mb-0">
                <Link to="/">
                  <img 
                    src="/src/assets/images/logo.png" 
                    alt="Bicomex" 
                    className="h-16"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/src/assets/images/logo_footer.png";
                      if (e.target.src === "/src/assets/images/logo_footer.png") {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        const logoText = document.createElement('div');
                        logoText.innerHTML = '<div style="font-size: 24px; font-weight: bold; color: #2563eb;">BICOMEX</div>';
                        e.target.parentNode.appendChild(logoText);
                      }
                    }} 
                  />
                </Link>
              </div>
              
              <div className="header_search header_searchs lg:w-1/2 md:w-1/2 w-full px-4">
                <form onSubmit={handleSearch} className="input-group search-bar w-full">
                  <div className="w-full flex shadow-sm rounded-md overflow-hidden">
                    <div className="hidden md:block">
                      <select className="h-full bg-gray-50 text-gray-700 py-3 pl-3 pr-8 border-r border-gray-200 focus:outline-none text-sm">
                        <option>Tất cả sản phẩm</option>
                        {categories.map(category => (
                          <option key={category.id}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <input 
                      type="search" 
                      placeholder="Nhập từ khóa tìm kiếm..." 
                      className="flex-grow py-3 px-4 focus:outline-none text-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    
                    <button 
                      type="submit"
                      className="bg-blue-600 text-white px-5 hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      <FaSearch />
                    </button>
                  </div>
                </form>
              </div>
              
              <div className="col-cart lg:w-1/4 md:w-1/4 w-full px-4 flex justify-center md:justify-end lg:justify-end mt-4 md:mt-0 lg:mt-0">
                <div className="flex items-center gap-6">
                  <div className="account-header flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
                      <FaUser className="text-blue-600" />
                    </div>
                    <div className="ml-2 hidden md:block">
                      <span className="block text-xs text-gray-500">Tài khoản</span>
                      <Link to="/tai-khoan" className="block font-medium text-sm hover:text-blue-600">Đăng nhập</Link>
                    </div>
                  </div>
                  
                  <div className="cart-wrapper">
                    <CartIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu chính */}
        <div className="header-nav bg-blue-600 text-white">
          <div className="container">
            <div className="flex justify-between">
              {/* Menu danh mục */}
              <div className="relative group hidden md:block"
                   onMouseEnter={() => setShowCategories(true)}
                   onMouseLeave={() => setShowCategories(false)}
                   ref={categoriesRef}>
                <div className="flex items-center bg-blue-700 hover:bg-blue-800 px-4 py-3 cursor-pointer">
                  <span className="inline-block mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
                    </svg>
                  </span>
                  <span className="font-medium">DANH MỤC SẢN PHẨM</span>
                  <span className="ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
                  </span>
                </div>
                
                {showCategories && (
                  <div className="absolute left-0 top-full w-64 bg-white text-gray-800 shadow-lg z-10">
                    <ul className="py-2">
                      {categories.map(category => (
                        <li key={category.id} className="group/item relative">
                          <Link 
                            to={`/san-pham/${category.slug}`}
                            className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 hover:text-blue-600"
                          >
                            <span>{category.name}</span>
                            {category.subCategories.length > 0 && (
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            )}
                          </Link>
                          
                          {category.subCategories.length > 0 && (
                            <div className="absolute left-full top-0 w-64 bg-white shadow-lg opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all">
                              <ul className="py-2">
                                {category.subCategories.map(subCat => (
                                  <li key={subCat.id}>
                                    <Link 
                                      to={`/san-pham/${subCat.slug}`}
                                      className="block px-4 py-2 hover:bg-gray-100 hover:text-blue-600"
                                    >
                                      {subCat.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Menu chính */}
              <nav className="hidden md:block flex-grow">
                <ul className="flex">
                  <li className="group relative">
                    <Link to="/" className="flex items-center px-4 py-3 hover:bg-blue-700">
                      <FaHome className="mr-2" />
                      <span>Trang chủ</span>
                    </Link>
                  </li>
                  <li className="group relative">
                    <Link to="/khuyen-mai-hot" className="flex items-center px-4 py-3 hover:bg-blue-700">
                      <span>Khuyến mãi hot</span>
                    </Link>
                  </li>
                  <li className="group relative">
                    <Link to="/gioi-thieu" className="flex items-center px-4 py-3 hover:bg-blue-700">
                      <span>Về chúng tôi</span>
                    </Link>
                  </li>
                  <li className="group relative">
                    <Link to="/tin-tuc" className="flex items-center px-4 py-3 hover:bg-blue-700">
                      <span>Tin tức</span>
                    </Link>
                  </li>
                  <li className="group relative">
                    <Link to="/lien-he" className="flex items-center px-4 py-3 hover:bg-blue-700">
                      <span>Liên hệ</span>
                    </Link>
                  </li>
                </ul>
              </nav>
              
              {/* Giờ làm việc */}
              <div className="hidden md:flex items-center border-l border-blue-500 pl-4">
                <FaClock className="mr-2 text-blue-300" />
                <div>
                  <p className="text-xs text-blue-200">Thời gian làm việc</p>
                  <p className="text-sm font-semibold">T2 - CN: 8:00 - 19:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Nút menu mobile */}
        <div className="md:hidden fixed top-4 right-4 z-50">
          <button 
            className="bg-blue-600 text-white p-2 rounded shadow-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </button>
        </div>
      </header>
      
      <div id="menu-overlay" className={mobileMenuOpen ? 'active' : ''}></div>
    </>
  );
};