import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaUser, FaAddressCard, FaShoppingBag, FaCog, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import '../styles/pages/ProfilePage.css';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, updateUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('info');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      // Lấy thông tin người dùng
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
      });
    }
  }, [isAuthenticated, navigate, user]);

  // Xác định tab active từ đường dẫn
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/don-hang')) {
      setActiveTab('orders');
    } else if (path.includes('/cai-dat')) {
      setActiveTab('settings');
    } else if (path.includes('/so-dia-chi')) {
      setActiveTab('addresses');
    } else {
      setActiveTab('info');
    }
  }, [location.pathname]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Cập nhật thông tin người dùng
    updateUserProfile(formData);
    setIsEditing(false);
    // Hiển thị thông báo thành công
    alert('Thông tin tài khoản đã được cập nhật!');
  };

  // Các menu tab
  const tabs = [
    { id: 'info', label: 'Thông tin tài khoản', icon: <FaUser /> },
    { id: 'addresses', label: 'Sổ địa chỉ', icon: <FaAddressCard /> },
    { id: 'orders', label: 'Đơn hàng của tôi', icon: <FaShoppingBag /> },
    { id: 'settings', label: 'Cài đặt tài khoản', icon: <FaCog /> },
  ];

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-content">
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
                    to="/ho-so"
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
          
          <div className="profile-main">
            <div className="profile-header">
              <h2>
                {tabs.find(tab => tab.id === activeTab)?.label || 'Thông tin tài khoản'}
              </h2>
            </div>
            
            <div className="profile-body">
              {activeTab === 'info' && (
                <div className="account-info">
                  <div className="section-header">
                    <h3>Thông tin cá nhân</h3>
                    <button 
                      className="edit-button"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? 'Hủy' : 'Chỉnh sửa'}
                    </button>
                  </div>
                  
                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="edit-form">
                      <div className="form-group">
                        <label htmlFor="name">Họ và tên</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="address">Địa chỉ</label>
                        <textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          rows="3"
                        ></textarea>
                      </div>
                      
                      <div className="form-actions">
                        <button type="submit" className="save-button">
                          Lưu thông tin
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="info-display">
                      <div className="info-item">
                        <span className="info-icon"><FaUser /></span>
                        <div className="info-content">
                          <p className="info-label">Họ và tên</p>
                          <p className="info-value">{user?.name || 'Chưa cập nhật'}</p>
                        </div>
                      </div>
                      
                      <div className="info-item">
                        <span className="info-icon"><FaEnvelope /></span>
                        <div className="info-content">
                          <p className="info-label">Email</p>
                          <p className="info-value">{user?.email || 'Chưa cập nhật'}</p>
                        </div>
                      </div>
                      
                      <div className="info-item">
                        <span className="info-icon"><FaPhone /></span>
                        <div className="info-content">
                          <p className="info-label">Số điện thoại</p>
                          <p className="info-value">{user?.phone || 'Chưa cập nhật'}</p>
                        </div>
                      </div>
                      
                      <div className="info-item">
                        <span className="info-icon"><FaMapMarkerAlt /></span>
                        <div className="info-content">
                          <p className="info-label">Địa chỉ</p>
                          <p className="info-value">{user?.address || 'Chưa cập nhật'}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'addresses' && (
                <div className="addresses-section">
                  <p className="empty-state">Chức năng sổ địa chỉ sẽ được cập nhật trong thời gian tới.</p>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div className="settings-section">
                  <p className="empty-state">Chức năng cài đặt tài khoản sẽ được cập nhật trong thời gian tới.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 