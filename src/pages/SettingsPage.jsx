import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaUser, FaAddressCard, FaShoppingBag, FaCog, FaLock, FaBell, FaTrash } from 'react-icons/fa';
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
  });
  const [errors, setErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
    if (!isAuthenticated) {
      navigate('/dang-nhap');
    }
  }, [isAuthenticated, navigate]);

  // Xác định tab active từ đường dẫn
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
    
    // Xóa lỗi khi người dùng bắt đầu gõ
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
      // Gửi yêu cầu thay đổi mật khẩu
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
    }
  };

  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    
    // Cập nhật cài đặt thông báo
    updateUserSettings({ notifications: notificationSettings });
    alert({
      title: 'Thành công',
      message: 'Cài đặt thông báo đã được cập nhật!',
      type: 'success'
    });
  };

  const handleDeleteAccount = () => {
    // Xác nhận xóa tài khoản bằng popup thay vì window.confirm
    confirm({
      title: 'Xóa tài khoản',
      message: 'Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.',
      type: 'error',
      confirmText: 'Xóa tài khoản',
      cancelText: 'Hủy'
    }).then(confirmed => {
      if (confirmed) {
        // Xóa tài khoản
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
              <div className="user-avatar">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <div className="avatar-placeholder">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
              </div>
              <div className="user-details">
                <h3>{user?.name || 'Người dùng'}</h3>
                <p>{user?.email || ''}</p>
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
                className={`settings-nav-item ${activeSection === 'delete' ? 'active' : ''}`}
                onClick={() => setActiveSection('delete')}
              >
                <FaTrash /> Xóa tài khoản
              </button>
            </div>
            
            <div className="settings-body">
              {activeSection === 'password' && (
                <div className="settings-section">
                  <h3>Đổi mật khẩu</h3>
                  <form onSubmit={handlePasswordSubmit} className="password-form">
                    <div className="form-group">
                      <label htmlFor="currentPassword">Mật khẩu hiện tại</label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                      />
                      {errors.currentPassword && <div className="error-message">{errors.currentPassword}</div>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="newPassword">Mật khẩu mới</label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                      />
                      {errors.newPassword && <div className="error-message">{errors.newPassword}</div>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                      {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                    </div>
                    
                    <div className="form-actions">
                      <button type="submit" className="save-button">
                        Cập nhật mật khẩu
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {activeSection === 'notifications' && (
                <div className="settings-section">
                  <h3>Cài đặt thông báo</h3>
                  <form onSubmit={handleNotificationSubmit} className="notification-form">
                    <div className="form-group checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="orderUpdates"
                          checked={notificationSettings.orderUpdates}
                          onChange={handleNotificationChange}
                        />
                        <span>Cập nhật đơn hàng</span>
                        <p className="help-text">Nhận thông báo về trạng thái đơn hàng của bạn</p>
                      </label>
                    </div>
                    
                    <div className="form-group checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="promotions"
                          checked={notificationSettings.promotions}
                          onChange={handleNotificationChange}
                        />
                        <span>Khuyến mãi và giảm giá</span>
                        <p className="help-text">Nhận thông báo về các chương trình khuyến mãi và giảm giá</p>
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
                        <span>Bản tin định kỳ</span>
                        <p className="help-text">Nhận bản tin hàng tháng của chúng tôi</p>
                      </label>
                    </div>
                    
                    <div className="form-group checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="productUpdates"
                          checked={notificationSettings.productUpdates}
                          onChange={handleNotificationChange}
                        />
                        <span>Cập nhật sản phẩm mới</span>
                        <p className="help-text">Nhận thông báo khi có sản phẩm mới</p>
                      </label>
                    </div>
                    
                    <div className="form-actions">
                      <button type="submit" className="save-button">
                        Lưu cài đặt
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {activeSection === 'delete' && (
                <div className="settings-section delete-account-section">
                  <h3>Xóa tài khoản</h3>
                  <div className="warning-box">
                    <p className="warning-title">Chú ý: Hành động này không thể hoàn tác!</p>
                    <p>Khi xóa tài khoản, tất cả thông tin cá nhân, lịch sử đơn hàng và dữ liệu khác sẽ bị xóa vĩnh viễn.</p>
                  </div>
                  
                  {!showDeleteConfirm ? (
                    <button 
                      className="delete-button"
                      onClick={() => setShowDeleteConfirm(true)}
                    >
                      Xóa tài khoản
                    </button>
                  ) : (
                    <div className="delete-confirm">
                      <p>Bạn có chắc chắn muốn xóa tài khoản này?</p>
                      <div className="delete-actions">
                        <button 
                          className="cancel-button"
                          onClick={() => setShowDeleteConfirm(false)}
                        >
                          Hủy
                        </button>
                        <button 
                          className="confirm-delete-button"
                          onClick={handleDeleteAccount}
                        >
                          Xác nhận xóa
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 