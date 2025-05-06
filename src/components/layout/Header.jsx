import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaPhone, FaHome } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { CartIcon } from '../cart/CartIcon';
import './Header.css';

export const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, _setSearchCategory] = useState('Tất cả sản phẩm');

  return (
    <header className="header">
      {/* Top bar with hotline and login links */}
      <div className="top-bar w-full bg-primary">
        <div className="container mx-auto py-2 px-4 flex justify-between items-center">
          <div className="contact-info flex items-center gap-6">
            <div className="flex items-center">
              <FaPhone className="text-white mr-2" />
              <span className="text-white">Hotline: 19006750</span>
            </div>
            <div className="flex items-center">
              <MdLocationOn className="text-white mr-2 text-lg" />
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
      <div className="main-header w-full bg-white py-4 border-b border-gray-200">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="logo">
            <Link to="/">
              <img src="https://via.placeholder.com/150x50?text=BICOMEX" alt="Bicomex Logo" className="h-12" />
            </Link>
          </div>
          
          <div className="search-bar flex-1 max-w-2xl mx-8">
            <div className="flex w-full">
              <div className="relative">
                <button className="flex items-center justify-between bg-gray-50 border border-r-0 border-gray-300 rounded-l px-4 py-2.5 text-gray-700 min-w-[180px]">
                  <span>{searchCategory}</span>
                  <svg className="h-4 w-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {/* Dropdown menu could be added here */}
              </div>
              <input 
                type="text" 
                placeholder="Tìm kiếm sản phẩm..." 
                className="border border-gray-300 py-2.5 px-4 flex-1 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-success text-white px-4 py-2.5 rounded-r hover:bg-success/90 transition-colors">
                <FaSearch />
              </button>
            </div>
          </div>
          
          <div className="cart-wrapper">
            <CartIcon />
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="main-nav w-full bg-primary">
        <div className="container mx-auto flex items-center">
          <Link to="/" className="home-link flex items-center justify-center px-5 py-3 hover:bg-secondary border-r border-blue-600">
            <FaHome className="text-white text-lg" />
          </Link>
          
          <div className="flex items-center flex-grow">
            <Link to="/khuyen-mai-hot" className="px-4 py-3 text-white hover:bg-secondary whitespace-nowrap">Khuyến mãi hot</Link>
            <Link to="/hang-moi-ve" className="px-4 py-3 text-white hover:bg-secondary whitespace-nowrap">Hàng mới về</Link>
            <div className="group relative px-4 py-3 text-white hover:bg-secondary whitespace-nowrap cursor-pointer flex items-center">
              <span>Sản phẩm</span>
              <svg className="h-4 w-4 ml-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              {/* Dropdown menu could be added here */}
            </div>
            <Link to="/ve-chung-toi" className="px-4 py-3 text-white hover:bg-secondary whitespace-nowrap">Về chúng tôi</Link>
            <Link to="/tin-tuc" className="px-4 py-3 text-white hover:bg-secondary whitespace-nowrap">Tin tức</Link>
            <Link to="/lien-he" className="px-4 py-3 text-white hover:bg-secondary whitespace-nowrap">Liên hệ</Link>
          </div>
          
          <div className="store-locations flex items-center border-l border-blue-600">
            <Link to="/he-thong-cua-hang" className="flex items-center px-4 py-3 text-white hover:bg-secondary whitespace-nowrap">
              <MdLocationOn className="mr-2 text-lg" />
              <span>Hệ thống cửa hàng</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};