import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrashAlt, FaStar, FaMapMarkerAlt, FaPhone, FaSave, FaTimes, FaCheck } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useConfirmDialog from '../hooks/useConfirmDialog';
import AccountLayout from '../components/account/AccountLayout';
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
  const { isAuthenticated } = useAuth();
  const { confirm, alert } = useConfirmDialog();
  const [addresses, setAddresses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    ward: '',
    district: '',
    city: '',
    isDefault: false
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

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
        alert({
          title: 'Thành công',
          message: 'Đã xóa địa chỉ thành công!',
          type: 'success'
        });
      }
    });
  };

  // Đặt địa chỉ mặc định
  const handleSetDefault = (id) => {
    setAddresses(addresses.map(address => ({
      ...address,
      isDefault: address.id === id
    })));
    alert({
      title: 'Thành công',
      message: 'Đã đặt làm địa chỉ mặc định!',
      type: 'success'
    });
  };

  // Xử lý form input
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Vui lòng nhập địa chỉ';
    }
    
    if (!formData.ward.trim()) {
      newErrors.ward = 'Vui lòng nhập phường/xã';
    }
    
    if (!formData.district.trim()) {
      newErrors.district = 'Vui lòng nhập quận/huyện';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'Vui lòng nhập tỉnh/thành phố';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    
    setTimeout(() => {
      if (editingAddress) {
        // Update existing address
        setAddresses(addresses.map(addr => 
          addr.id === editingAddress.id 
            ? { ...formData, id: editingAddress.id }
            : addr
        ));
        alert({
          title: 'Thành công',
          message: 'Đã cập nhật địa chỉ thành công!',
          type: 'success'
        });
      } else {
        // Add new address
        const newAddress = {
          ...formData,
          id: Date.now()
        };
        setAddresses(prev => [...prev, newAddress]);
        alert({
          title: 'Thành công',
          message: 'Đã thêm địa chỉ mới thành công!',
          type: 'success'
        });
      }
      
      handleCancelForm();
      setSubmitting(false);
    }, 1000);
  };

  // Handle edit address
  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setFormData(address);
    setShowAddForm(true);
  };

  // Cancel form
  const handleCancelForm = () => {
    setShowAddForm(false);
    setEditingAddress(null);
    setFormData({
      name: '',
      phone: '',
      address: '',
      ward: '',
      district: '',
      city: '',
      isDefault: false
    });
    setErrors({});
  };

  const breadcrumbs = [
    { label: 'Sổ địa chỉ' }
  ];

  return (
    <AccountLayout 
      title="Sổ địa chỉ"
      breadcrumbs={breadcrumbs}
    >
      <div className="addresses-section">
        <div className="section-header">
          <h3>Danh sách địa chỉ</h3>
          <button 
            className="add-address-btn"
            onClick={() => setShowAddForm(true)}
          >
            <FaPlus /> Thêm địa chỉ mới
          </button>
        </div>

        {showAddForm && (
          <div className="address-form-overlay">
            <div className="address-form-container">
              <div className="form-header">
                <h4>{editingAddress ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}</h4>
                <button 
                  className="close-btn"
                  onClick={handleCancelForm}
                >
                  <FaTimes />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="address-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Họ và tên *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Số điện thoại *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="address">Địa chỉ cụ thể *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={errors.address ? 'error' : ''}
                      placeholder="Số nhà, tên đường..."
                    />
                    {errors.address && <span className="error-message">{errors.address}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="ward">Phường/Xã *</label>
                    <input
                      type="text"
                      id="ward"
                      name="ward"
                      value={formData.ward}
                      onChange={handleInputChange}
                      className={errors.ward ? 'error' : ''}
                    />
                    {errors.ward && <span className="error-message">{errors.ward}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="district">Quận/Huyện *</label>
                    <input
                      type="text"
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className={errors.district ? 'error' : ''}
                    />
                    {errors.district && <span className="error-message">{errors.district}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="city">Tỉnh/Thành phố *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={errors.city ? 'error' : ''}
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={formData.isDefault}
                      onChange={handleInputChange}
                    />
                    Đặt làm địa chỉ mặc định
                  </label>
                </div>

                <div className="form-actions">
                  <button 
                    type="button"
                    className="cancel-button"
                    onClick={handleCancelForm}
                  >
                    <FaTimes /> Hủy
                  </button>
                  <button 
                    type="submit"
                    className="save-button"
                    disabled={submitting}
                  >
                    <FaSave /> {submitting ? 'Đang lưu...' : 'Lưu địa chỉ'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
                  <div className="address-info">
                    <h4>{address.name}</h4>
                    {address.isDefault && (
                      <span className="default-badge">
                        <FaStar /> Mặc định
                      </span>
                    )}
                  </div>
                  <div className="address-actions">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEditAddress(address)}
                      title="Chỉnh sửa"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteAddress(address.id)}
                      title="Xóa"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
                
                <div className="address-details">
                  <div className="detail-item">
                    <FaPhone className="detail-icon" />
                    <span>{address.phone}</span>
                  </div>
                  <div className="detail-item">
                    <FaMapMarkerAlt className="detail-icon" />
                    <span>
                      {address.address}, {address.ward}, {address.district}, {address.city}
                    </span>
                  </div>
                </div>

                {!address.isDefault && (
                  <div className="address-footer">
                    <button 
                      className="set-default-btn"
                      onClick={() => handleSetDefault(address.id)}
                    >
                      <FaCheck /> Đặt làm mặc định
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="empty-state">
              <FaMapMarkerAlt />
              <h4>Chưa có địa chỉ nào</h4>
              <p>Thêm địa chỉ để thuận tiện cho việc giao hàng</p>
              <button 
                className="add-first-address-btn"
                onClick={() => setShowAddForm(true)}
              >
                <FaPlus /> Thêm địa chỉ đầu tiên
              </button>
            </div>
          )}
        </div>
      </div>
    </AccountLayout>
  );
};

export default AddressesPage;
