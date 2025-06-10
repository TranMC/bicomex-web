import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaUser, FaAddressCard, FaShoppingBag, FaCog, FaLock, FaBell, FaTrash, FaShieldAlt, FaEye, FaEyeSlash, FaSave } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useConfirmDialog from '../hooks/useConfirmDialog';
import '../styles/pages/SettingsPage.css';

export const SettingsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, updateUserSettings, logout } = useAuth();
  const { alert, confirm } = useConfirmDialog();
  const [activeSection, setActiveSection] = useState('password');
  const [activeTab, setActiveTab] = useState('settings');
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    productUpdates: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  });
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'private',
    activityTracking: true,
    dataCollection: false,
    marketingEmails: false,
  });
  const [errors, setErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/dang-nhap');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/don-hang')) {
      setActiveTab('orders');
    } else if (path.includes('/cai-dat')) {
      setActiveTab('settings');
    } else if (path.includes('/so-dia-chi')) {
      setActiveTab('addresses');
    } else if (path.includes('/tai-khoan')) {
      setActiveTab('info');
    }
  }, [location.pathname]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handlePrivacyChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPrivacySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Vui lòng nhập mật khẩu hiện tại';
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'Vui lòng nhập mật khẩu mới';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Mật khẩu mới phải có ít nhất 6 ký tự';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu mới';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (validatePasswordForm()) {
      setLoading(true);
      
      setTimeout(() => {
        alert({
          title: 'Thành công',
          message: 'Mật khẩu đã được thay đổi thành công!',
          type: 'success'
        });
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setLoading(false);
      }, 1500);
    }
  };

  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      updateUserSettings({ notifications: notificationSettings });
      alert({
        title: 'Thành công',
        message: 'Cài đặt thông báo đã được cập nhật!',
        type: 'success'
      });
      setLoading(false);
    }, 1000);
  };

  const handlePrivacySubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      updateUserSettings({ privacy: privacySettings });
      alert({
        title: 'Thành công',
        message: 'Cài đặt bảo mật đã được cập nhật!',
        type: 'success'
      });
      setLoading(false);
    }, 1000);
  };

  const handleDeleteAccount = () => {
    confirm({
      title: 'Xóa tài khoản',
      message: 'Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.',
      type: 'error',
      confirmText: 'Xóa tài khoản',
      cancelText: 'Hủy'
    }).then(confirmed => {
      if (confirmed) {
        logout();
        navigate('/');
      }
    });
  };

  return (
    <div className="settings-page">
      <div className="container">
        <div className="settings-content">
          <div className="profile-sidebar">
            <div className="user-info">
              <div className="user-avatar-container">
                <div className="user-avatar">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    <div className="avatar-placeholder">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                </div>
              </div>
              <div className="user-details">
                <h3>{user?.name || 'Người dùng'}</h3>
                <p>{user?.email || ''}</p>
                <div className="user-status">
                  <span className="status-badge active">Đã xác thực</span>
                </div>
              </div>
            </div>
            
            <nav className="profile-navigation">
              <ul>
                <li>
                  <Link 
                    to="/tai-khoan"
                    className={activeTab === 'info' ? 'active' : ''}
                  >
                    <span className="nav-icon"><FaUser /></span>
                    <span className="nav-label">Thông tin tài khoản</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/so-dia-chi"
                    className={activeTab === 'addresses' ? 'active' : ''}
                  >
                    <span className="nav-icon"><FaAddressCard /></span>
                    <span className="nav-label">Sổ địa chỉ</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/don-hang"
                    className={activeTab === 'orders' ? 'active' : ''}
                  >
                    <span className="nav-icon"><FaShoppingBag /></span>
                    <span className="nav-label">Đơn hàng của tôi</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/cai-dat"
                    className={activeTab === 'settings' ? 'active' : ''}
                  >
                    <span className="nav-icon"><FaCog /></span>
                    <span className="nav-label">Cài đặt tài khoản</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          
          <div className="settings-main">
            <div className="settings-header">
              <h2>Cài đặt tài khoản</h2>
              <p>Quản lý cài đặt bảo mật, thông báo và quyền riêng tư của bạn</p>
            </div>
            
            <div className="settings-nav">
              <button 
                className={`settings-nav-item ${activeSection === 'password' ? 'active' : ''}`}
                onClick={() => setActiveSection('password')}
              >
                <FaLock /> Đổi mật khẩu
              </button>
              <button 
                className={`settings-nav-item ${activeSection === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveSection('notifications')}
              >
                <FaBell /> Thông báo
              </button>
              <button 
                className={`settings-nav-item ${activeSection === 'privacy' ? 'active' : ''}`}
                onClick={() => setActiveSection('privacy')}
              >
                <FaShieldAlt /> Bảo mật & Riêng tư
              </button>
              <button 
                className={`settings-nav-item ${activeSection === 'delete' ? 'active' : ''}`}
                onClick={() => setActiveSection('delete')}
              >
                <FaTrash /> Xóa tài khoản
              </button>
            </div>
            
            <div className="settings-body">
              {activeSection === 'password' && (
                <div className="settings-section">
                  <div className="section-header">
                    <h3><FaLock /> Đổi mật khẩu</h3>
                    <p>Cập nhật mật khẩu để bảo mật tài khoản của bạn</p>
                  </div>
                  
                  <form onSubmit={handlePasswordSubmit} className="password-form">
                    <div className="form-group">
                      <label htmlFor="currentPassword">
                        <FaLock className="field-icon" />
                        Mật khẩu hiện tại
                      </label>
                      <div className="password-input-wrapper">
                        <input
                          type={showPasswords.current ? "text" : "password"}
                          id="currentPassword"
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          className={errors.currentPassword ? 'error' : ''}
                          placeholder="Nhập mật khẩu hiện tại"
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => togglePasswordVisibility('current')}
                        >
                          {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      {errors.currentPassword && <span className="error-message">{errors.currentPassword}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="newPassword">
                        <FaLock className="field-icon" />
                        Mật khẩu mới
                      </label>
                      <div className="password-input-wrapper">
                        <input
                          type={showPasswords.new ? "text" : "password"}
                          id="newPassword"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          className={errors.newPassword ? 'error' : ''}
                          placeholder="Nhập mật khẩu mới"
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => togglePasswordVisibility('new')}
                        >
                          {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="confirmPassword">
                        <FaLock className="field-icon" />
                        Xác nhận mật khẩu mới
                      </label>
                      <div className="password-input-wrapper">
                        <input
                          type={showPasswords.confirm ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={errors.confirmPassword ? 'error' : ''}
                          placeholder="Nhập lại mật khẩu mới"
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => togglePasswordVisibility('confirm')}
                        >
                          {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                    </div>
                    
                    <div className="form-actions">
                      <button 
                        type="submit" 
                        className="save-button"
                        disabled={loading}
                      >
                        <FaSave /> {loading ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {activeSection === 'notifications' && (
                <div className="settings-section">
                  <div className="section-header">
                    <h3><FaBell /> Cài đặt thông báo</h3>
                    <p>Quản lý cách bạn nhận thông báo từ chúng tôi</p>
                  </div>
                  
                  <form onSubmit={handleNotificationSubmit} className="notification-form">
                    <div className="notification-categories">
                      <div className="category-section">
                        <h4>Thông báo đơn hàng</h4>
                        <div className="form-group checkbox-group">
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              name="orderUpdates"
                              checked={notificationSettings.orderUpdates}
                              onChange={handleNotificationChange}
                            />
                            <span className="checkmark"></span>
                            <div className="label-content">
                              <span className="label-title">Cập nhật đơn hàng</span>
                              <p className="help-text">Nhận thông báo về trạng thái đơn hàng của bạn</p>
                            </div>
                          </label>
                        </div>
                        
                        <div className="form-group checkbox-group">
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              name="emailNotifications"
                              checked={notificationSettings.emailNotifications}
                              onChange={handleNotificationChange}
                            />
                            <span className="checkmark"></span>
                            <div className="label-content">
                              <span className="label-title">Thông báo qua Email</span>
                              <p className="help-text">Nhận email xác nhận và cập nhật đơn hàng</p>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div className="category-section">
                        <h4>Khuyến mãi & Marketing</h4>
                        <div className="form-group checkbox-group">
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              name="promotions"
                              checked={notificationSettings.promotions}
                              onChange={handleNotificationChange}
                            />
                            <span className="checkmark"></span>
                            <div className="label-content">
                              <span className="label-title">Khuyến mãi và giảm giá</span>
                              <p className="help-text">Nhận thông báo về các chương trình khuyến mãi và giảm giá</p>
                            </div>
                          </label>
                        </div>
                        
                        <div className="form-group checkbox-group">
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              name="newsletter"
                              checked={notificationSettings.newsletter}
                              onChange={handleNotificationChange}
                            />
                            <span className="checkmark"></span>
                            <div className="label-content">
                              <span className="label-title">Bản tin định kỳ</span>
                              <p className="help-text">Nhận bản tin hàng tháng với tin tức và ưu đãi mới</p>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div className="category-section">
                        <h4>Sản phẩm & Cập nhật</h4>
                        <div className="form-group checkbox-group">
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              name="productUpdates"
                              checked={notificationSettings.productUpdates}
                              onChange={handleNotificationChange}
                            />
                            <span className="checkmark"></span>
                            <div className="label-content">
                              <span className="label-title">Sản phẩm mới</span>
                              <p className="help-text">Nhận thông báo khi có sản phẩm mới phù hợp với sở thích</p>
                            </div>
                          </label>
                        </div>
                        
                        <div className="form-group checkbox-group">
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              name="pushNotifications"
                              checked={notificationSettings.pushNotifications}
                              onChange={handleNotificationChange}
                            />
                            <span className="checkmark"></span>
                            <div className="label-content">
                              <span className="label-title">Thông báo đẩy</span>
                              <p className="help-text">Nhận thông báo trực tiếp trên trình duyệt</p>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="form-actions">
                      <button 
                        type="submit" 
                        className="save-button"
                        disabled={loading}
                      >
                        <FaSave /> {loading ? 'Đang lưu...' : 'Lưu cài đặt'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeSection === 'privacy' && (
                <div className="settings-section">
                  <div className="section-header">
                    <h3><FaShieldAlt /> Bảo mật & Riêng tư</h3>
                    <p>Kiểm soát thông tin cá nhân và cách chúng tôi sử dụng dữ liệu của bạn</p>
                  </div>
                  
                  <form onSubmit={handlePrivacySubmit} className="privacy-form">
                    <div className="privacy-categories">
                      <div className="category-section">
                        <h4>Hiển thị hồ sơ</h4>
                        <div className="form-group radio-group">
                          <label className="radio-label">
                            <input
                              type="radio"
                              name="profileVisibility"
                              value="public"
                              checked={privacySettings.profileVisibility === 'public'}
                              onChange={handlePrivacyChange}
                            />
                            <span className="radio-checkmark"></span>
                            <div className="label-content">
                              <span className="label-title">Công khai</span>
                              <p className="help-text">Hồ sơ của bạn có thể được tìm thấy bởi người khác</p>
                            </div>
                          </label>
                        </div>
                        
                        <div className="form-group radio-group">
                          <label className="radio-label">
                            <input
                              type="radio"
                              name="profileVisibility"
                              value="private"
                              checked={privacySettings.profileVisibility === 'private'}
                              onChange={handlePrivacyChange}
                            />
                            <span className="radio-checkmark"></span>
                            <div className="label-content">
                              <span className="label-title">Riêng tư</span>
                              <p className="help-text">Chỉ bạn có thể xem hồ sơ của mình</p>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div className="category-section">
                        <h4>Thu thập dữ liệu</h4>
                        <div className="form-group checkbox-group">
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              name="activityTracking"
                              checked={privacySettings.activityTracking}
                              onChange={handlePrivacyChange}
                            />
                            <span className="checkmark"></span>
                            <div className="label-content">
                              <span className="label-title">Theo dõi hoạt động</span>
                              <p className="help-text">Cho phép theo dõi hoạt động để cải thiện trải nghiệm</p>
                            </div>
                          </label>
                        </div>
                        
                        <div className="form-group checkbox-group">
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              name="dataCollection"
                              checked={privacySettings.dataCollection}
                              onChange={handlePrivacyChange}
                            />
                            <span className="checkmark"></span>
                            <div className="label-content">
                              <span className="label-title">Thu thập dữ liệu phân tích</span>
                              <p className="help-text">Cho phép thu thập dữ liệu để phân tích và cải thiện dịch vụ</p>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="form-actions">
                      <button 
                        type="submit" 
                        className="save-button"
                        disabled={loading}
                      >
                        <FaSave /> {loading ? 'Đang lưu...' : 'Lưu cài đặt'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {activeSection === 'delete' && (
                <div className="settings-section delete-account-section">
                  <div className="section-header">
                    <h3><FaTrash /> Xóa tài khoản</h3>
                    <p>Xóa vĩnh viễn tài khoản và toàn bộ dữ liệu của bạn</p>
                  </div>
                  
                  <div className="warning-box">
                    <div className="warning-header">
                      <FaTrash className="warning-icon" />
                      <h4>Chú ý: Hành động này không thể hoàn tác!</h4>
                    </div>
                    <div className="warning-content">
                      <p>Khi xóa tài khoản, những thông tin sau sẽ bị xóa vĩnh viễn:</p>
                      <ul>
                        <li>Thông tin cá nhân và hồ sơ</li>
                        <li>Lịch sử đơn hàng và giao dịch</li>
                        <li>Địa chỉ giao hàng đã lưu</li>
                        <li>Cài đặt và tùy chọn cá nhân</li>
                        <li>Dữ liệu và tệp đã tải lên</li>
                      </ul>
                    </div>
                  </div>
                  
                  <button 
                    className="delete-button"
                    onClick={handleDeleteAccount}
                  >
                    <FaTrash /> Xóa tài khoản vĩnh viễn
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
