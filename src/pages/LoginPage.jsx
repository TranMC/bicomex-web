import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { FaEnvelope, FaLock, FaHome, FaAngleRight, FaExclamationTriangle } from 'react-icons/fa';
import '../styles/pages/LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    const success = login(formData.email, formData.password);
    
    if (success) {
      if (rememberMe) {
        localStorage.setItem('bicomex_remember_email', formData.email);
      } else {
        localStorage.removeItem('bicomex_remember_email');
      }
      
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('bicomex_remember_email');
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
    
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="login-page">
      {/* Breadcrumb */}
      <div className="login-breadcrumb-container">
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
            <FaHome className="breadcrumb-icon" />
            <span>Trang chủ</span>
          </Link>
          <FaAngleRight className="breadcrumb-separator" />
          <span className="breadcrumb-active">Đăng nhập</span>
        </div>
      </div>
      
      <div className="login-container">
        <div className="login-card">
          <div className="login-card-body">
            <h1 className="login-title">Đăng nhập</h1>
            <p className="login-subtitle">Đăng nhập để xem lịch sử mua hàng, trạng thái đơn hàng và nhiều tiện ích khác</p>
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-field">
                <label htmlFor="email" className="field-label">
                  <FaEnvelope className="label-icon" />
                  <span>Email đăng nhập</span>
                </label>
                <div className="input-wrapper">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input-field ${errors.email ? 'input-field-error' : ''}`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <div className="input-icon-error">
                      <FaExclamationTriangle />
                    </div>
                  )}
                </div>
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>
              
              <div className="form-field">
                <label htmlFor="password" className="field-label">
                  <FaLock className="label-icon" />
                  <span>Mật khẩu</span>
                </label>
                <div className="input-wrapper">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`input-field ${errors.password ? 'input-field-error' : ''}`}
                    placeholder="Nhập mật khẩu"
                  />
                  {errors.password && (
                    <div className="input-icon-error">
                      <FaExclamationTriangle />
                    </div>
                  )}
                </div>
                {errors.password && <p className="error-message">{errors.password}</p>}
              </div>
              
              <div className="remember-forgot-row">
                <div className="remember-me-container">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="checkbox"
                  />
                  <label htmlFor="remember-me" className="remember-label">
                    Ghi nhớ đăng nhập
                  </label>
                </div>
                <div>
                  <a href="#" className="forgot-password">
                    Quên mật khẩu?
                  </a>
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="login-btn"
                >
                  {loading ? (
                    <div className="btn-loading">
                      <div className="loading-spinner"></div>
                      <span>Đang xử lý...</span>
                    </div>
                  ) : (
                    'Đăng nhập'
                  )}
                </button>
              </div>
            </form>
            
            <div className="divider-container">
              <div className="divider-line"></div>
              <div className="divider-text">
                <span className="divider-text-inner">Hoặc đăng nhập với</span>
              </div>
            </div>
            
            <div className="social-buttons-grid">
              <button
                type="button"
                className="social-button"
              >
                <svg className="social-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4"/>
                  <path d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3276 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z" fill="#34A853"/>
                  <path d="M5.50253 14.3003C4.99987 12.8099 4.99987 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z" fill="#FBBC04"/>
                  <path d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z" fill="#EA4335"/>
                </svg>
                <span className="social-button-text">Google</span>
              </button>
              <button
                type="button"
                className="social-button"
              >
                <svg className="social-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073C24 5.40365 18.629 0 12 0C5.37097 0 0 5.40365 0 12.073C0 18.0988 4.38823 23.0935 10.125 24V15.563H7.07661V12.073H10.125V9.41306C10.125 6.38751 11.9153 4.71627 14.6574 4.71627C15.9706 4.71627 17.3439 4.95189 17.3439 4.95189V7.92146H15.8303C14.34 7.92146 13.875 8.85225 13.875 9.8069V12.073H17.2031L16.6708 15.563H13.875V24C19.6118 23.0935 24 18.0988 24 12.073Z" fill="#1877F2"/>
                </svg>
                <span className="social-button-text">Facebook</span>
              </button>
            </div>
          </div>
          
          <div className="login-card-footer">
            <p className="register-text">
              Chưa có tài khoản?{' '}
              <Link to="/register" className="register-link">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;