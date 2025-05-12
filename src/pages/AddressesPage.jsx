import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaUser, FaAddressCard, FaShoppingBag, FaCog, FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useConfirmDialog from '../hooks/useConfirmDialog';
import '../styles/pages/AddressesPage.css';

// Dữ liệu mẫu địa chỉ
const dummyAddresses = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    phone: '0912345678',
    address: 'Số 5, Ngõ 25, Đường Phạm Hùng',
    ward: 'Phường Mỹ Đình 2',
    district: 'Quận Nam Từ Liêm',
    city: 'Hà Nội',
    isDefault: true
  },
  {
    id: 2,
    name: 'Nguyễn Văn A',
    phone: '0987654321',
    address: 'Số 10, Đường Lê Văn Lương',
    ward: 'Phường Trung Hòa',
    district: 'Quận Cầu Giấy',
    city: 'Hà Nội',
    isDefault: false
  }
];

export const AddressesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { confirm } = useConfirmDialog();
  const [addresses, setAddresses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState('addresses');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
    if (!isAuthenticated) {
      navigate('/dang-nhap');
    } else {
      // Giả lập lấy dữ liệu từ API
      setTimeout(() => {
        setAddresses(dummyAddresses);
        setIsLoading(false);
      }, 1000);
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

  // Xóa địa chỉ
  const handleDeleteAddress = (id) => {
    confirm({
      title: 'Xóa địa chỉ',
      message: 'Bạn có chắc chắn muốn xóa địa chỉ này không?',
      confirmText: 'Xóa',
      cancelText: 'Hủy'
    }).then(confirmed => {
      if (confirmed) {
        setAddresses(addresses.filter(address => address.id !== id));
      }
    });
  };

  // Đặt địa chỉ mặc định
  const handleSetDefault = (id) => {
    setAddresses(addresses.map(address => ({
      ...address,
      isDefault: address.id === id
    })));
  };

  return (
    <div className="addresses-page">
      <div className="container">
        <div className="addresses-content">
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
          
          <div className="addresses-main">
            <div className="addresses-header">
              <h2>Sổ địa chỉ</h2>
              <button 
                className="add-address-btn"
                onClick={() => setShowAddForm(true)}
              >
                <FaPlus /> Thêm địa chỉ mới
              </button>
            </div>
            
            <div className="addresses-list">
              {isLoading ? (
                <div className="loading">
                  <div className="spinner"></div>
                  <p>Đang tải địa chỉ...</p>
                </div>
              ) : addresses.length > 0 ? (
                addresses.map(address => (
                  <div key={address.id} className={`address-card ${address.isDefault ? 'default' : ''}`}>
                    <div className="address-header">
                      <div className="name-phone">
                        <span className="name">{address.name}</span>
                        <span className="phone">{address.phone}</span>
                      </div>
                      {address.isDefault && (
                        <div className="default-badge">Mặc định</div>
                      )}
                    </div>
                    
                    <div className="address-body">
                      <p className="address-text">
                        {[address.address, address.ward, address.district, address.city].join(', ')}
                      </p>
                    </div>
                    
                    <div className="address-actions">
                      <button 
                        className="edit-btn"
                        onClick={() => {/* Edit functionality */}}
                      >
                        <FaEdit /> Sửa
                      </button>
                      
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteAddress(address.id)}
                      >
                        <FaTrashAlt /> Xóa
                      </button>
                      
                      {!address.isDefault && (
                        <button 
                          className="set-default-btn"
                          onClick={() => handleSetDefault(address.id)}
                        >
                          Đặt làm mặc định
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-addresses">
                  <div className="empty-icon">
                    <FaAddressCard />
                  </div>
                  <h3>Bạn chưa có địa chỉ nào</h3>
                  <p>Thêm địa chỉ để tiện lợi hơn khi mua sắm</p>
                  <button 
                    className="add-address-now"
                    onClick={() => setShowAddForm(true)}
                  >
                    <FaPlus /> Thêm địa chỉ mới
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Phần form thêm địa chỉ - chỉ là phác thảo */}
      {showAddForm && (
        <div className="address-form-modal">
          <div className="modal-backdrop" onClick={() => setShowAddForm(false)}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Thêm địa chỉ mới</h3>
              <button className="close-btn" onClick={() => setShowAddForm(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <p className="implementation-note">
                Chức năng đang được phát triển và sẽ được triển khai trong phiên bản tiếp theo.
              </p>
            </div>
            
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowAddForm(false)}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 