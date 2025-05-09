import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { FaUser, FaEnvelope, FaKey, FaPhone, FaLock, FaHome, FaAngleRight, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import '../styles/pages/RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: '',
    color: ''
  });
  const { register } = useAuth();
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
    
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength({ score: 0, message: '', color: '' });
      return;
    }
    
    let score = 0;
    
    if (password.length >= 8) score += 1;
    if (password.length >= 10) score += 1;
    
    if (/\d/.test(password)) score += 1;
    
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
    
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
    
    let message = '';
    let color = '';
    
    switch (true) {
      case (score <= 1):
        message = 'Yếu';
        color = 'text-red-500';
        break;
      case (score <= 3):
        message = 'Trung bình';
        color = 'text-yellow-500';
        break;
      case (score <= 5):
        message = 'Mạnh';
        color = 'text-green-500';
        break;
      default:
        message = '';
        color = '';
    }
    
    setPasswordStrength({ score, message, color });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên';
    }
    
    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }
    
    if (formData.phone && !/^[0-9]{10,11}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    
    if (!acceptTerms) {
      newErrors.terms = 'Bạn phải đồng ý với điều khoản và điều kiện';
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
    
    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
    };
    
    const success = register(userData);
    
    if (success) {
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="register-page">
      {/* Breadcrumb */}
      <div className="register-breadcrumb-container">
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
            <FaHome className="breadcrumb-icon" />
            <span>Trang chủ</span>
          </Link>
          <FaAngleRight className="breadcrumb-separator" />
          <span className="breadcrumb-active">Đăng ký tài khoản</span>
        </div>
      </div>
      
      <div className="register-container">
        <div className="register-card">
          <div className="register-card-body">
            <h1 className="register-title">Đăng ký tài khoản</h1>
            <p className="register-subtitle">Tạo tài khoản để mua sắm và theo dõi đơn hàng dễ dàng hơn</p>
            
            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="name" className="field-label">
                    <FaUser className="label-icon" />
                    <span>Họ tên <span className="required-mark">*</span></span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className={`input-field ${errors.name ? 'input-field-error' : ''}`}
                      placeholder="Nguyễn Văn A"
                    />
                    {errors.name && (
                      <div className="input-icon-error">
                        <FaExclamationTriangle />
                      </div>
                    )}
                  </div>
                  {errors.name && <p className="error-message">{errors.name}</p>}
                </div>
                
                <div className="form-field">
                  <label htmlFor="email" className="field-label">
                    <FaEnvelope className="label-icon" />
                    <span>Email <span className="required-mark">*</span></span>
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
              </div>
              
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="password" className="field-label">
                    <FaKey className="label-icon" />
                    <span>Mật khẩu <span className="required-mark">*</span></span>
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
                  
                  {formData.password && (
                    <div className="password-strength">
                      <div className="strength-label">
                        <span>Độ mạnh:</span>
                        <span className={`strength-text ${
                          passwordStrength.score <= 1 
                            ? 'strength-weak' 
                            : passwordStrength.score <= 3 
                              ? 'strength-medium' 
                              : 'strength-strong'
                        }`}>
                          {passwordStrength.message}
                        </span>
                      </div>
                      <div className="strength-bar-container">
                        <div 
                          className={`strength-bar ${
                            passwordStrength.score <= 1 
                              ? 'strength-bar-weak' 
                              : passwordStrength.score <= 3 
                                ? 'strength-bar-medium' 
                                : 'strength-bar-strong'
                          }`}
                          style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="form-field">
                  <label htmlFor="confirmPassword" className="field-label">
                    <FaLock className="label-icon" />
                    <span>Xác nhận mật khẩu <span className="required-mark">*</span></span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`input-field ${errors.confirmPassword ? 'input-field-error' : ''}`}
                      placeholder="Nhập lại mật khẩu"
                    />
                    {errors.confirmPassword && (
                      <div className="input-icon-error">
                        <FaExclamationTriangle />
                      </div>
                    )}
                    {formData.confirmPassword && formData.password === formData.confirmPassword && (
                      <div className="input-icon-success">
                        <FaCheckCircle />
                      </div>
                    )}
                  </div>
                  {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                </div>
              </div>
              
              <div className="form-field">
                <label htmlFor="phone" className="field-label">
                  <FaPhone className="label-icon" />
                  <span>Số điện thoại</span>
                </label>
                <div className="input-wrapper">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`input-field ${errors.phone ? 'input-field-error' : ''}`}
                    placeholder="0987654321"
                  />
                  {errors.phone && (
                    <div className="input-icon-error">
                      <FaExclamationTriangle />
                    </div>
                  )}
                </div>
                {errors.phone && <p className="error-message">{errors.phone}</p>}
              </div>
              
              <div className="checkbox-container">
                <input
                  id="terms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms(!acceptTerms)}
                  className="checkbox"
                />
                <div className="checkbox-label">
                  <label htmlFor="terms">
                    Tôi đồng ý với <a href="#" className="terms-link">điều khoản và điều kiện</a>
                  </label>
                  {errors.terms && <p className="error-message">{errors.terms}</p>}
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="register-btn"
                >
                  {loading ? (
                    <div className="btn-loading">
                      <div className="loading-spinner"></div>
                      <span>Đang xử lý...</span>
                    </div>
                  ) : (
                    'Đăng ký'
                  )}
                </button>
              </div>
            </form>
          </div>
          
          <div className="register-card-footer">
            <p className="login-text">
              Đã có tài khoản?{' '}
              <Link to="/login" className="login-link">
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;