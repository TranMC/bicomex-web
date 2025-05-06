import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaPhone, FaShoppingCart, FaMapMarkerAlt, FaHome } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import './Header.css';

export const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('Tất cả sản phẩm');

  return (
    <header className="header w-full">
      {/* Top bar with hotline and login links */}
      <div className="top-bar bg-primary text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="contact-info flex items-center space-x-6">
            <div className="flex items-center">
              <FaPhone className="mr-2" />
              <span>Hotline: 19006750</span>
            </div>
            <div className="flex items-center">
              <MdLocationOn className="mr-2 text-lg" />
              <span>Địa chỉ: Tầng 6 Ladeco, 266 Đội Cấn, Hà Nội</span>
            </div>
          </div>
          <div className="user-actions flex items-center space-x-4">
            <Link to="/dang-ky" className="hover:underline">Đăng ký</Link>
            <Link to="/dang-nhap" className="hover:underline">Đăng nhập</Link>
          </div>
        </div>
      </div>

      {/* Main header with logo, search and cart */}
      <div className="bg-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="logo">
            <Link to="/">
              <img src="/src/assets/images/logo.png" alt="Bicomex Logo" className="h-10" />
            </Link>
          </div>
          
          <div className="search-bar flex items-center flex-1 max-w-xl mx-6">
            <div className="relative flex w-full">
              <div className="inline-block relative">
                <button className="bg-white border border-r-0 border-gray-300 rounded-l px-4 py-2.5 flex items-center min-w-[170px] justify-between">
                  <span className="truncate">{searchCategory}</span>
                  <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <input 
                type="text" 
                placeholder="Tìm kiếm sản phẩm..." 
                className="border border-gray-300 py-2.5 px-4 flex-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-green-500 text-white px-4 py-2.5 rounded-r">
                <FaSearch />
              </button>
            </div>
          </div>
          
          <div className="cart-wrapper flex items-center">
            <div className="cart flex items-center">
              <div className="relative">
                <FaShoppingCart className="text-2xl text-green-500" />
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
              </div>
              <div className="ml-2">
                <div className="text-sm font-medium">Giỏ hàng</div>
                <div className="text-xs text-gray-500">(0) sản phẩm</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="main-nav bg-primary text-white">
        <div className="container mx-auto flex items-center">
          <Link to="/" className="home-icon flex items-center justify-center px-6 py-3 hover:bg-blue-600 border-r border-blue-600">
            <FaHome className="text-lg" />
          </Link>
          
          <div className="flex items-center flex-grow">
            <Link to="/khuyen-mai-hot" className="px-4 py-3 hover:bg-blue-600">Khuyến mãi hot</Link>
            <Link to="/hang-moi-ve" className="px-4 py-3 hover:bg-blue-600">Hàng mới về</Link>
            <div className="group relative px-4 py-3 hover:bg-blue-600 flex items-center">
              <span>Sản phẩm</span>
              <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <Link to="/ve-chung-toi" className="px-4 py-3 hover:bg-blue-600">Về chúng tôi</Link>
            <Link to="/tin-tuc" className="px-4 py-3 hover:bg-blue-600">Tin tức</Link>
            <Link to="/lien-he" className="px-4 py-3 hover:bg-blue-600">Liên hệ</Link>
          </div>
          
          <div className="location-header flex items-center justify-end px-4 py-3 border-l border-blue-600">
            <MdLocationOn className="mr-2 text-lg" />
            <span>Hệ thống cửa hàng</span>
          </div>
        </div>
      </nav>
    </header>
  );
};