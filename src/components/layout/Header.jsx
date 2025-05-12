import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaPhone, FaHome, FaMapMarkerAlt, FaUser, FaEnvelope, FaClock, FaShoppingCart, FaBars, FaAngleDown, FaTruck, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { CartIcon } from '../cart/CartIcon';
import '../../styles/components/Header.css';
import useAuth from '../../hooks/useAuth';

export const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const categoriesRef = useRef(null);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const categories = useMemo(() => [
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
  ], []);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    // Lấy danh mục đã chọn từ dropdown
    const categorySelect = e.target.querySelector('.category-select');
    const selectedCategory = categorySelect?.value;
    
    // Nếu chọn một danh mục cụ thể (không phải Tất cả sản phẩm)
    const categoryParam = selectedCategory && selectedCategory !== 'Tất cả sản phẩm' 
      ? categories.find(cat => cat.name === selectedCategory)?.slug
      : '';
    
    // Tạo URL tìm kiếm
    let searchUrl = '/san-pham';
    if (categoryParam) {
      searchUrl += `/${categoryParam}`;
    }
    searchUrl += `?q=${encodeURIComponent(searchTerm)}`;
    
    // Chuyển hướng đến trang sản phẩm với query tìm kiếm
    navigate(searchUrl);
  }, [searchTerm, navigate, categories]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const handleLogout = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.target.tagName.toLowerCase() === 'button') {
      e.target.classList.add('logout-active');
    }
    
    logout();
  }, [logout]);

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

  const displayName = useMemo(() => {
    if (!user?.name) return '';
    return user.name.length > 15 ? `${user.name.substring(0, 12)}...` : user.name;
  }, [user]);

  const handleCategoryClick = useCallback((e, category) => {
    // Kiểm tra nếu thiết bị là mobile (dưới 768px)
    if (window.innerWidth < 768) {
      // Nếu có submenu, ngăn chặn hành vi mặc định (chuyển trang)
      if (category.subCategories.length > 0) {
        e.preventDefault();
        
        // Toggle class để hiển thị/ẩn submenu
        const categoryItem = e.currentTarget.parentNode;
        const submenuContainer = categoryItem.querySelector('.subcategories-container');
        
        if (submenuContainer) {
          const isVisible = submenuContainer.classList.contains('visible');
          
          // Ẩn tất cả submenu trước
          document.querySelectorAll('.subcategories-container.visible').forEach(el => {
            el.classList.remove('visible');
          });
          
          // Hiển thị submenu hiện tại nếu chưa hiển thị
          if (!isVisible) {
            submenuContainer.classList.add('visible');
          }
        }
      } else {
        // Đóng mobile menu nếu không có submenu
        closeMobileMenu();
      }
    } else {
      // Trên desktop, luôn đóng mobile menu khi click
      closeMobileMenu();
    }
  }, [closeMobileMenu]);

  // Hàm xử lý chuyển hướng đến các trang hồ sơ
  const handleProfileNavigation = (path) => (e) => {
    e.preventDefault();
    navigate(path);
    if (mobileMenuOpen) {
      closeMobileMenu();
    }
  };

  return (
    <>
      <div id="mySidenav" className={`sidenav ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="top_menu_mobile">
          <span className="close_menu" onClick={closeMobileMenu}></span>
        </div>
        <div className="content_memu_mb">
          <div className="link_list_mobile">
            <ul className="ct-mobile">
              <li className="level0 level-top parent">
                <Link to="/" onClick={closeMobileMenu}>Trang chủ</Link>
              </li>
              <li className="level0 level-top parent">
                <Link to="/san-pham" onClick={closeMobileMenu}>Tất cả sản phẩm</Link>
              </li>
              <li className="level0 level-top parent">
                <Link to="/khuyen-mai-hot" onClick={closeMobileMenu}>Khuyến mãi hot</Link>
              </li>
              {categories.map(category => (
                <li key={category.id} className="level0 level-top parent">
                  <Link to={`/san-pham/${category.slug}`} onClick={closeMobileMenu}>{category.name}</Link>
                  <ul className="level0">
                    {category.subCategories.map(subCat => (
                      <li key={subCat.id} className="level1">
                        <Link to={`/san-pham/${subCat.slug}`} onClick={closeMobileMenu}>{subCat.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li className="level0 level-top parent">
                <Link to="/gioi-thieu" onClick={closeMobileMenu}>Về chúng tôi</Link>
              </li>
              <li className="level0 level-top parent">
                <Link to="/tin-tuc" onClick={closeMobileMenu}>Tin tức</Link>
              </li>
              <li className="level0 level-top parent">
                <Link to="/lien-he" onClick={closeMobileMenu}>Liên hệ</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div id="menu-overlay" className={mobileMenuOpen ? 'menu_overlay active' : 'menu_overlay'}></div>
      
      <header className="header">
        <div className="topbar">
          <div className="topbar-container">
            <div className="contact-info">
              <div className="contact-item contact-phone">
                <FaPhone className="contact-icon" />
                <span>Hotline: </span>
                <a href="tel:19006750" className="hai01">19006750</a>
              </div>
              <div className="contact-item contact-address">
                <FaMapMarkerAlt className="contact-icon" />
                <span className="dia-chi">Địa chỉ: Tầng 6 Ladeco, 266 Đội Cấn, Ba Đình, Hà Nội</span>
              </div>
            </div>            
            <div className="user-actions">
              {isAuthenticated ? (
                <div className="user-dropdown">
                  <div className="greeting-text">
                    <span>Xin chào, {displayName}<FaAngleDown className="user-dropdown-arrow" /></span>
                  </div>
                  <div className="user-dropdown-content">
                    <Link to="/ho-so" className="user-dropdown-item" onClick={handleProfileNavigation('/ho-so')}>
                      <FaUser className="user-dropdown-icon" />
                      <span>Tài khoản của tôi</span>
                    </Link>
                    <Link to="/don-hang" className="user-dropdown-item" onClick={handleProfileNavigation('/don-hang')}>
                      <FaTruck className="user-dropdown-icon" />
                      <span>Đơn hàng của tôi</span>
                    </Link>
                    <Link to="/cai-dat" className="user-dropdown-item" onClick={handleProfileNavigation('/cai-dat')}>
                      <FaCog className="user-dropdown-icon" />
                      <span>Cài đặt tài khoản</span>
                    </Link>
                    <div className="user-dropdown-divider"></div>
                    <button 
                      onClick={handleLogout} 
                      className="user-dropdown-item logout-btn"
                    >
                      <FaSignOutAlt className="user-dropdown-icon" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Link to="/register" className="user-link">Đăng ký</Link>
                  <span className="divider">|</span>
                  <Link to="/login" className="user-link">Đăng nhập</Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mid-header header-bg-primary">
          <div className="mid-header-container">            <div className="logo-container">
              <Link to="/">                <img 
                  src="/logo.png" 
                  alt="Bicomex" 
                  className="logo-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/logo_footer.png";
                    // Sử dụng endsWith để kiểm tra thay vì so sánh chuỗi chính xác
                    if (e.target.src.endsWith("/logo_footer.png")) {
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
            
            <div className="search-container">
              <form onSubmit={handleSearch} className="search-form">
                <div className="search-input-group">
                  <div className="search-select-container">
                    <select className="category-select" aria-label="Chọn danh mục">
                      <option>Tất cả sản phẩm</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.name}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <input 
                    type="search" 
                    placeholder="Nhập từ khóa tìm kiếm..." 
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Tìm kiếm sản phẩm"
                    autoComplete="off"
                  />
                  
                  <button 
                    type="submit"
                    className="search-button"
                    aria-label="Tìm kiếm"
                    title="Tìm kiếm"
                  >
                    <FaSearch />
                  </button>
                </div>
              </form>
            </div>
            
            <div className="cart-container">
              <div className="cart-actions">
                <div className="cart-wrapper">
                  <CartIcon />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-nav">
          <div className="nav-container">
            <div className="categories-container"
                 onMouseEnter={() => setShowCategories(true)}
                 onMouseLeave={() => setShowCategories(false)}
                 ref={categoriesRef}>
              <div className="categories-toggle">
                <span className="categories-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
                  </svg>
                </span>
                <span className="categories-title">DANH MỤC SẢN PHẨM</span>
                <span className="categories-arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                  </svg>
                </span>
              </div>
              
              {showCategories && (
                <div className="categories-dropdown">
                  <ul className="categories-list">
                    <li className="category-item">
                      <Link 
                        to="/san-pham"
                        className="category-link"
                        onClick={closeMobileMenu}
                      >
                        <span>Tất cả sản phẩm</span>
                      </Link>
                    </li>
                    {categories.map(category => (
                      <li key={category.id} className="category-item">
                        <Link 
                          to={`/san-pham/${category.slug}`}
                          className="category-link"
                          onClick={(e) => handleCategoryClick(e, category)}
                        >
                          <span>{category.name}</span>
                          {category.subCategories.length > 0 && (
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </Link>
                        
                        {category.subCategories.length > 0 && (
                          <div className="subcategories-container">
                            <ul className="subcategories-list">
                              {category.subCategories.map(subCat => (
                                <li key={subCat.id}>
                                  <Link 
                                    to={`/san-pham/${subCat.slug}`}
                                    className="subcategory-item"
                                    onClick={closeMobileMenu}
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
            
            <nav className="main-nav">
              <ul className="main-nav-list">
                <li className="nav-item">
                  <Link to="/" className="nav-link" onClick={closeMobileMenu}>
                    <FaHome className="home-icon" />
                    <span>Trang chủ</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/khuyen-mai-hot" className="nav-link" onClick={closeMobileMenu}>
                    <span>Khuyến mãi hot</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/gioi-thieu" className="nav-link" onClick={closeMobileMenu}>
                    <span>Về chúng tôi</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/tin-tuc" className="nav-link" onClick={closeMobileMenu}>
                    <span>Tin tức</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/lien-he" className="nav-link" onClick={closeMobileMenu}>
                    <span>Liên hệ</span>
                  </Link>
                </li>
              </ul>
            </nav>
            
            <div className="working-hours">
              <FaClock className="hours-icon" />
              <div>
                <p className="hours-label">Thời gian làm việc</p>
                <p className="hours-value">T2 - CN: 8:00 - 19:00</p>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </button>
      </header>
    </>
  );
};