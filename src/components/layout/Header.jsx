import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaPhone, FaShoppingCart, FaMapMarkerAlt } from 'react-icons/fa';
import './Header.css';

export const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <header className="header">
      <div className="top-bar bg-primary text-white py-1 px-4 flex justify-between items-center">
        <div className="contact-info flex items-center">
          <FaPhone className="mr-1" />
          <span className="text-sm">Hotline: 0900-000-000</span>
        </div>
        <div className="user-actions flex items-center gap-4">
          <Link to="/help" className="text-sm hover:text-gray-200">Trợ giúp</Link>
          <Link to="/register" className="text-sm hover:text-gray-200">Đăng ký</Link>
        </div>
      </div>

      <div className="main-header bg-white py-4 px-4 flex justify-between items-center">
        <div className="logo">
          <Link to="/">
            <img src="/src/assets/images/logo.png" alt="Bicomex Logo" className="h-10" />
          </Link>
        </div>
        
        <div className="search-bar flex items-center flex-1 max-w-xl mx-4">
          <input 
            type="text" 
            placeholder="Tìm kiếm sản phẩm..." 
            className="border border-gray-300 rounded-l py-2 px-3 flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-primary text-white px-4 py-2 rounded-r">
            <FaSearch />
          </button>
        </div>
        
        <div className="header-actions flex items-center gap-6">
          <div className="cart-info flex items-center">
            <FaShoppingCart className="text-primary text-2xl mr-2" />
            <span className="cart-count bg-danger text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
            <span className="ml-2 text-sm">Giỏ hàng</span>
          </div>
          <div className="location-info flex items-center">
            <FaMapMarkerAlt className="text-primary text-xl mr-2" />
            <span className="text-sm">Địa điểm cửa hàng</span>
          </div>
        </div>
      </div>

      <nav className="main-nav bg-primary text-white">
        <ul className="flex px-4">
          <li className="px-4 py-3 hover:bg-secondary transition-colors duration-200">
            <Link to="/">Trang chủ</Link>
          </li>
          <li className="px-4 py-3 hover:bg-secondary transition-colors duration-200">
            <Link to="/gioi-thieu">Giới thiệu</Link>
          </li>
          <li className="px-4 py-3 hover:bg-secondary transition-colors duration-200">
            <Link to="/san-pham/vat-lieu">Sản phẩm vật liệu</Link>
          </li>
          <li className="px-4 py-3 hover:bg-secondary transition-colors duration-200">
            <Link to="/he-thong-cung-cap">Hệ thống cung cấp</Link>
          </li>
          <li className="px-4 py-3 hover:bg-secondary transition-colors duration-200">
            <Link to="/du-an">Dự án</Link>
          </li>
          <li className="px-4 py-3 hover:bg-secondary transition-colors duration-200">
            <Link to="/tin-tuc">Tin tức</Link>
          </li>
          <li className="px-4 py-3 hover:bg-secondary transition-colors duration-200">
            <Link to="/lien-he">Liên hệ</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};