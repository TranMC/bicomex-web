import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaAddressCard, FaShoppingBag, FaCog, FaCamera } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import './UserSidebar.css';

const UserSidebar = ({ onAvatarChange }) => {
  const location = useLocation();
  const { user } = useAuth();

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/don-hang')) return 'orders';
    if (path.includes('/cai-dat')) return 'settings';
    if (path.includes('/so-dia-chi')) return 'addresses';
    return 'info';
  };

  const activeTab = getActiveTab();

  const menuItems = [
    {
      id: 'info',
      label: 'Thông tin tài khoản',
      icon: <FaUser />,
      path: '/tai-khoan'
    },
    {
      id: 'addresses',
      label: 'Sổ địa chỉ',
      icon: <FaAddressCard />,
      path: '/so-dia-chi'
    },
    {
      id: 'orders',
      label: 'Đơn hàng của tôi',
      icon: <FaShoppingBag />,
      path: '/don-hang'
    },
    {
      id: 'settings',
      label: 'Cài đặt tài khoản',
      icon: <FaCog />,
      path: '/cai-dat'
    }
  ];

  return (
    <div className="user-sidebar">
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
            {onAvatarChange && (
              <div className="avatar-overlay" onClick={onAvatarChange}>
                <FaCamera />
                <span>Đổi ảnh</span>
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

      <nav className="user-navigation">
        <ul>
          {menuItems.map(item => (
            <li key={item.id}>
              <Link 
                to={item.path}
                className={activeTab === item.id ? 'active' : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default UserSidebar;
