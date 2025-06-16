import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaSearch, FaExclamationCircle } from 'react-icons/fa';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const popularPages = [
    { name: 'Trang chủ', path: '/', icon: FaHome },
    { name: 'Sản phẩm', path: '/san-pham', icon: FaSearch },
    { name: 'Khuyến mãi', path: '/khuyen-mai', icon: FaExclamationCircle },
    { name: 'Liên hệ', path: '/lien-he', icon: FaExclamationCircle }
  ];

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-animation">
          <div className="error-code">404</div>
          <div className="error-illustration">
            <div className="floating-elements">
              <div className="element-1"></div>
              <div className="element-2"></div>
              <div className="element-3"></div>
            </div>
          </div>
        </div>
        
        <div className="not-found-content">
          <h1 className="not-found-title">Trang không tìm thấy</h1>
          <p className="not-found-description">
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. 
            Hãy thử một trong các tùy chọn bên dưới.
          </p>
          
          <div className="not-found-actions">
            <button 
              className="btn btn-primary"
              onClick={handleGoBack}
            >
              <FaArrowLeft /> Quay lại
            </button>
            
            <Link to="/" className="btn btn-outline">
              <FaHome /> Trang chủ
            </Link>
          </div>
          
          <div className="popular-pages">
            <h3>Hoặc truy cập các trang phổ biến:</h3>
            <div className="popular-links">
              {popularPages.map((page, index) => (
                <Link 
                  key={index}
                  to={page.path} 
                  className="popular-link"
                >
                  <page.icon className="link-icon" />
                  {page.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
