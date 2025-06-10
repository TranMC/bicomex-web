import { useState } from 'react';
import { FaLock, FaBell, FaUserShield, FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useConfirmDialog from '../hooks/useConfirmDialog';
import AccountLayout from '../components/account/AccountLayout';
import '../styles/pages/SettingsPageUpdated.css';

const SettingsPage = () => {
  const { user, updateUserProfile } = useAuth();
  const { confirm, alert } = useConfirmDialog();
  
  // Password change state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailOrders: user?.settings?.emailOrders ?? true,
    emailPromotions: user?.settings?.emailPromotions ?? true,
    emailNews: user?.settings?.emailNews ?? false,
    smsOrders: user?.settings?.smsOrders ?? false,
    smsPromotions: user?.settings?.smsPromotions ?? false,
    pushNotifications: user?.settings?.pushNotifications ?? true
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: user?.settings?.profileVisibility ?? 'private',
    showEmail: user?.settings?.showEmail ?? false,
    showPhone: user?.settings?.showPhone ?? false,
    allowDataCollection: user?.settings?.allowDataCollection ?? true
  });

  const [isLoading, setIsLoading] = useState(false);

  // Password validation
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push('Mật khẩu phải có ít nhất 8 ký tự');
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Mật khẩu phải có ít nhất 1 chữ thường');
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Mật khẩu phải có ít nhất 1 chữ hoa');
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Mật khẩu phải có ít nhất 1 số');
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.push('Mật khẩu phải có ít nhất 1 ký tự đặc biệt');
    }
    return errors;
  };

  // Handle password form change
  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear errors when user starts typing
    if (passwordErrors[field]) {
      setPasswordErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Handle password form submit
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    const errors = {};
    
    // Validate current password
    if (!passwordForm.currentPassword) {
      errors.currentPassword = 'Vui lòng nhập mật khẩu hiện tại';
    }
    
    // Validate new password
    const passwordValidation = validatePassword(passwordForm.newPassword);
    if (passwordValidation.length > 0) {
      errors.newPassword = passwordValidation[0];
    }
    
    // Validate confirm password
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }
    
    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }

    const confirmed = await confirm({
      title: 'Xác nhận đổi mật khẩu',
      message: 'Bạn có chắc chắn muốn đổi mật khẩu không?',
      confirmText: 'Đổi mật khẩu',
      cancelText: 'Hủy'
    });

    if (!confirmed) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update user profile
      await updateUserProfile({
        password: passwordForm.newPassword
      });
      
      // Reset form
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      alert({
        title: 'Thành công',
        message: 'Đã đổi mật khẩu thành công!',
        type: 'success'
      });    } catch (err) {
      alert({
        title: 'Lỗi',
        message: 'Có lỗi xảy ra khi đổi mật khẩu. Vui lòng thử lại.',
        type: 'error'
      });
      console.error('Password change error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle notification settings change
  const handleNotificationChange = async (key, value) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));

    try {
      await updateUserProfile({
        settings: {
          ...user.settings,
          [key]: value
        }
      });    } catch (err) {
      // Revert on error
      setNotifications(prev => ({
        ...prev,
        [key]: !value
      }));
      
      alert({
        title: 'Lỗi',
        message: 'Không thể cập nhật cài đặt thông báo',
        type: 'error'
      });
      console.error('Notification setting error:', err);
    }
  };

  // Handle privacy settings change
  const handlePrivacyChange = async (key, value) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));

    try {
      await updateUserProfile({
        settings: {
          ...user.settings,
          [key]: value
        }
      });    } catch (err) {
      // Revert on error
      setPrivacy(prev => ({
        ...prev,
        [key]: key === 'profileVisibility' ? (value === 'public' ? 'private' : 'public') : !value
      }));
      
      alert({
        title: 'Lỗi',
        message: 'Không thể cập nhật cài đặt quyền riêng tư',
        type: 'error'
      });
      console.error('Privacy setting error:', err);
    }
  };

  const breadcrumbs = [
    { label: 'Tài khoản', path: '/tai-khoan' },
    { label: 'Cài đặt' }
  ];

  const getPasswordStrength = (password) => {
    if (!password) return { level: 0, text: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/(?=.*[a-z])/.test(password)) score++;
    if (/(?=.*[A-Z])/.test(password)) score++;
    if (/(?=.*\d)/.test(password)) score++;
    if (/(?=.*[@$!%*?&])/.test(password)) score++;
    
    const levels = [
      { level: 0, text: '', class: '' },
      { level: 1, text: 'Rất yếu', class: 'very-weak' },
      { level: 2, text: 'Yếu', class: 'weak' },
      { level: 3, text: 'Trung bình', class: 'medium' },
      { level: 4, text: 'Mạnh', class: 'strong' },
      { level: 5, text: 'Rất mạnh', class: 'very-strong' }
    ];
    
    return levels[score];
  };

  const passwordStrength = getPasswordStrength(passwordForm.newPassword);

  return (
    <AccountLayout title="Cài đặt tài khoản" breadcrumbs={breadcrumbs}>
      <div className="settings-content">
        
        {/* Password Settings */}
        <div className="settings-section">
          <div className="section-header">
            <div className="section-icon">
              <FaLock />
            </div>
            <div className="section-info">
              <h3>Đổi mật khẩu</h3>
              <p>Cập nhật mật khẩu để bảo vệ tài khoản của bạn</p>
            </div>
          </div>
          
          <form onSubmit={handlePasswordSubmit} className="password-form">
            <div className="form-group">
              <label htmlFor="currentPassword">Mật khẩu hiện tại</label>
              <div className="password-input-group">
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  id="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                  className={passwordErrors.currentPassword ? 'error' : ''}
                  placeholder="Nhập mật khẩu hiện tại"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPasswords(prev => ({
                    ...prev,
                    current: !prev.current
                  }))}
                >
                  {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {passwordErrors.currentPassword && (
                <span className="error-message">{passwordErrors.currentPassword}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">Mật khẩu mới</label>
              <div className="password-input-group">
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  id="newPassword"
                  value={passwordForm.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  className={passwordErrors.newPassword ? 'error' : ''}
                  placeholder="Nhập mật khẩu mới"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPasswords(prev => ({
                    ...prev,
                    new: !prev.new
                  }))}
                >
                  {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {passwordForm.newPassword && (
                <div className={`password-strength ${passwordStrength.class}`}>
                  <div className="strength-bar">
                    <div 
                      className="strength-fill" 
                      style={{ width: `${(passwordStrength.level / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="strength-text">{passwordStrength.text}</span>
                </div>
              )}
              {passwordErrors.newPassword && (
                <span className="error-message">{passwordErrors.newPassword}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
              <div className="password-input-group">
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  id="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                  className={passwordErrors.confirmPassword ? 'error' : ''}
                  placeholder="Nhập lại mật khẩu mới"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPasswords(prev => ({
                    ...prev,
                    confirm: !prev.confirm
                  }))}
                >
                  {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {passwordForm.confirmPassword && passwordForm.newPassword && (
                <div className={`password-match ${passwordForm.newPassword === passwordForm.confirmPassword ? 'match' : 'no-match'}`}>
                  {passwordForm.newPassword === passwordForm.confirmPassword ? (
                    <>
                      <FaCheck /> Mật khẩu khớp
                    </>
                  ) : (
                    <>
                      <FaTimes /> Mật khẩu không khớp
                    </>
                  )}
                </div>
              )}
              {passwordErrors.confirmPassword && (
                <span className="error-message">{passwordErrors.confirmPassword}</span>
              )}
            </div>

            <div className="password-requirements">
              <h4>Yêu cầu mật khẩu:</h4>
              <ul>
                <li className={passwordForm.newPassword.length >= 8 ? 'valid' : ''}>
                  Ít nhất 8 ký tự
                </li>
                <li className={/(?=.*[a-z])/.test(passwordForm.newPassword) ? 'valid' : ''}>
                  Ít nhất 1 chữ thường
                </li>
                <li className={/(?=.*[A-Z])/.test(passwordForm.newPassword) ? 'valid' : ''}>
                  Ít nhất 1 chữ hoa
                </li>
                <li className={/(?=.*\d)/.test(passwordForm.newPassword) ? 'valid' : ''}>
                  Ít nhất 1 số
                </li>
                <li className={/(?=.*[@$!%*?&])/.test(passwordForm.newPassword) ? 'valid' : ''}>
                  Ít nhất 1 ký tự đặc biệt (@$!%*?&)
                </li>
              </ul>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Đang cập nhật...' : 'Đổi mật khẩu'}
            </button>
          </form>
        </div>

        {/* Notification Settings */}
        <div className="settings-section">
          <div className="section-header">
            <div className="section-icon">
              <FaBell />
            </div>
            <div className="section-info">
              <h3>Cài đặt thông báo</h3>
              <p>Quản lý các thông báo bạn muốn nhận</p>
            </div>
          </div>
          
          <div className="notification-settings">
            <div className="notification-group">
              <h4>Thông báo qua Email</h4>
              <div className="notification-item">
                <div className="notification-info">
                  <span className="notification-title">Thông báo đơn hàng</span>
                  <span className="notification-desc">Nhận thông báo về trạng thái đơn hàng</span>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications.emailOrders}
                    onChange={(e) => handleNotificationChange('emailOrders', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="notification-item">
                <div className="notification-info">
                  <span className="notification-title">Khuyến mãi & Ưu đãi</span>
                  <span className="notification-desc">Nhận thông báo về các chương trình khuyến mãi</span>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications.emailPromotions}
                    onChange={(e) => handleNotificationChange('emailPromotions', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="notification-item">
                <div className="notification-info">
                  <span className="notification-title">Tin tức & Cập nhật</span>
                  <span className="notification-desc">Nhận thông báo về tin tức mới và cập nhật sản phẩm</span>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications.emailNews}
                    onChange={(e) => handleNotificationChange('emailNews', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <div className="notification-group">
              <h4>Thông báo qua SMS</h4>
              <div className="notification-item">
                <div className="notification-info">
                  <span className="notification-title">Thông báo đơn hàng</span>
                  <span className="notification-desc">Nhận SMS về trạng thái đơn hàng</span>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications.smsOrders}
                    onChange={(e) => handleNotificationChange('smsOrders', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="notification-item">
                <div className="notification-info">
                  <span className="notification-title">Khuyến mãi đặc biệt</span>
                  <span className="notification-desc">Nhận SMS về các ưu đãi hấp dẫn</span>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications.smsPromotions}
                    onChange={(e) => handleNotificationChange('smsPromotions', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <div className="notification-group">
              <h4>Thông báo đẩy</h4>
              <div className="notification-item">
                <div className="notification-info">
                  <span className="notification-title">Thông báo trên trình duyệt</span>
                  <span className="notification-desc">Nhận thông báo đẩy trên trình duyệt</span>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications.pushNotifications}
                    onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="settings-section">
          <div className="section-header">            <div className="section-icon">
              <FaUserShield />
            </div>
            <div className="section-info">
              <h3>Quyền riêng tư</h3>
              <p>Quản lý quyền riêng tư và hiển thị thông tin</p>
            </div>
          </div>
          
          <div className="privacy-settings">
            <div className="privacy-item">
              <div className="privacy-info">
                <span className="privacy-title">Hiển thị hồ sơ</span>
                <span className="privacy-desc">Ai có thể xem thông tin hồ sơ của bạn</span>
              </div>
              <select
                value={privacy.profileVisibility}
                onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                className="privacy-select"
              >
                <option value="private">Riêng tư</option>
                <option value="public">Công khai</option>
                <option value="friends">Chỉ bạn bè</option>
              </select>
            </div>

            <div className="privacy-item">
              <div className="privacy-info">
                <span className="privacy-title">Hiển thị email</span>
                <span className="privacy-desc">Cho phép hiển thị địa chỉ email của bạn</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={privacy.showEmail}
                  onChange={(e) => handlePrivacyChange('showEmail', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="privacy-item">
              <div className="privacy-info">
                <span className="privacy-title">Hiển thị số điện thoại</span>
                <span className="privacy-desc">Cho phép hiển thị số điện thoại của bạn</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={privacy.showPhone}
                  onChange={(e) => handlePrivacyChange('showPhone', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="privacy-item">
              <div className="privacy-info">
                <span className="privacy-title">Thu thập dữ liệu</span>
                <span className="privacy-desc">Cho phép thu thập dữ liệu để cải thiện trải nghiệm</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={privacy.allowDataCollection}
                  onChange={(e) => handlePrivacyChange('allowDataCollection', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="settings-section danger-zone">
          <div className="section-header">
            <div className="section-info">
              <h3>Vùng nguy hiểm</h3>
              <p>Các hành động không thể hoàn tác</p>
            </div>
          </div>
          
          <div className="danger-actions">
            <button 
              className="btn btn-danger"
              onClick={async () => {
                const confirmed = await confirm({
                  title: 'Xác nhận xóa tài khoản',
                  message: 'Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.',
                  confirmText: 'Xóa tài khoản',
                  cancelText: 'Hủy',
                  type: 'danger'
                });
                
                if (confirmed) {
                  alert({
                    title: 'Thông báo',
                    message: 'Chức năng xóa tài khoản đang được phát triển.',
                    type: 'info'
                  });
                }
              }}
            >
              Xóa tài khoản
            </button>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default SettingsPage;