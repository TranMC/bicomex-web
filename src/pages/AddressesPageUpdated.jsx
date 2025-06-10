import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaStar, FaRegStar, FaTimes, FaSave } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useConfirmDialog from '../hooks/useConfirmDialog';
import AccountLayout from '../components/account/AccountLayout';
import '../styles/pages/AddressesPageUpdated.css';

// Dữ liệu mẫu địa chỉ
const dummyAddresses = [
  {
    id: 1,
    name: 'Nhà riêng',
    fullName: 'Nguyễn Văn A',
    phone: '0123456789',
    address: '123 Đường ABC, Phường XYZ',
    ward: 'Phường 1',
    district: 'Quận 1',
    city: 'Hồ Chí Minh',
    isDefault: true
  },
  {
    id: 2,
    name: 'Văn phòng',
    fullName: 'Nguyễn Văn A',
    phone: '0987654321',
    address: '456 Đường DEF, Phường ABC',
    ward: 'Phường 2',
    district: 'Quận 3',
    city: 'Hồ Chí Minh',
    isDefault: false
  }
];

const AddressesPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { confirm, alert } = useConfirmDialog();
  
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    fullName: '',
    phone: '',
    address: '',
    ward: '',
    district: '',
    city: '',
    isDefault: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/dang-nhap');
    } else {
      // Load addresses from API or localStorage
      setAddresses(dummyAddresses);
    }
  }, [isAuthenticated, navigate]);

  // Validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Tên địa chỉ không được để trống';
    }
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Họ tên không được để trống';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Số điện thoại không được để trống';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Địa chỉ không được để trống';
    }
    
    if (!formData.ward.trim()) {
      newErrors.ward = 'Phường/Xã không được để trống';
    }
    
    if (!formData.district.trim()) {
      newErrors.district = 'Quận/Huyện không được để trống';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'Tỉnh/Thành phố không được để trống';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Open modal for adding new address
  const handleAddAddress = () => {
    setEditingAddress(null);
    setFormData({
      name: '',
      fullName: user?.name || '',
      phone: user?.phone || '',
      address: '',
      ward: '',
      district: '',
      city: '',
      isDefault: addresses.length === 0
    });
    setErrors({});
    setIsModalOpen(true);
  };

  // Open modal for editing address
  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setFormData({ ...address });
    setErrors({});
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingAddress) {
        // Update existing address
        setAddresses(prev => prev.map(addr => 
          addr.id === editingAddress.id ? { ...formData, id: addr.id } : addr
        ));
      } else {
        // Add new address
        const newAddress = {
          ...formData,
          id: Date.now() // Simple ID generation
        };
        setAddresses(prev => [...prev, newAddress]);
      }
      
      // If this is set as default, update others
      if (formData.isDefault) {
        setAddresses(prev => prev.map(addr => ({
          ...addr,
          isDefault: addr.id === (editingAddress?.id || Date.now())
        })));
      }
      
      setIsModalOpen(false);
      alert({
        title: 'Thành công',
        message: editingAddress ? 'Địa chỉ đã được cập nhật!' : 'Địa chỉ mới đã được thêm!',
        type: 'success'
      });
    } catch (err) {
      alert({
        title: 'Lỗi',
        message: 'Có lỗi xảy ra. Vui lòng thử lại.',
        type: 'error'
      });
      console.error('Address save error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete address
  const handleDeleteAddress = async (address) => {
    const confirmed = await confirm({
      title: 'Xác nhận xóa',
      message: `Bạn có chắc chắn muốn xóa địa chỉ "${address.name}"?`,
      confirmText: 'Xóa',
      cancelText: 'Hủy',
      type: 'danger'
    });
    
    if (confirmed) {
      setAddresses(prev => {
        const filtered = prev.filter(addr => addr.id !== address.id);
        // If deleted address was default and there are others, make first one default
        if (address.isDefault && filtered.length > 0) {
          filtered[0].isDefault = true;
        }
        return filtered;
      });
      
      alert({
        title: 'Thành công',
        message: 'Địa chỉ đã được xóa!',
        type: 'success'
      });
    }
  };

  // Set default address
  const handleSetDefault = async (address) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === address.id
    })));
    
    alert({
      title: 'Thành công',
      message: 'Đã đặt làm địa chỉ mặc định!',
      type: 'success'
    });
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
    setFormData({
      name: '',
      fullName: '',
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
    { label: 'Tài khoản', path: '/tai-khoan' },
    { label: 'Sổ địa chỉ' }
  ];

  return (
    <AccountLayout title="Sổ địa chỉ" breadcrumbs={breadcrumbs}>
      <div className="addresses-main">
        <div className="addresses-header">
          <button
            onClick={handleAddAddress}
            className="btn btn-primary add-address-btn"
          >
            <FaPlus /> Thêm địa chỉ mới
          </button>
        </div>

        <div className="addresses-list">
          {addresses.length > 0 ? (
            addresses.map(address => (
              <div key={address.id} className="address-card">
                <div className="address-header">
                  <div className="address-name">
                    <h3>{address.name}</h3>
                    {address.isDefault && (
                      <span className="default-badge">Mặc định</span>
                    )}
                  </div>
                  <div className="address-actions">
                    <button
                      onClick={() => handleEditAddress(address)}
                      className="btn btn-outline btn-sm"
                    >
                      <FaEdit /> Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(address)}
                      className="btn btn-outline btn-sm btn-danger"
                    >
                      <FaTrash /> Xóa
                    </button>
                  </div>
                </div>
                
                <div className="address-body">
                  <div className="address-info">
                    <p className="recipient-name">{address.fullName}</p>
                    <p className="recipient-phone">{address.phone}</p>
                    <p className="full-address">
                      {address.address}, {address.ward}, {address.district}, {address.city}
                    </p>
                  </div>
                </div>
                
                {!address.isDefault && (
                  <div className="address-footer">
                    <button
                      onClick={() => handleSetDefault(address)}
                      className="btn btn-outline btn-sm set-default-btn"
                    >
                      <FaRegStar /> Đặt làm mặc định
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="empty-addresses">
              <div className="empty-icon">
                <FaPlus />
              </div>
              <h3>Chưa có địa chỉ nào</h3>
              <p>Thêm địa chỉ để thuận tiện cho việc đặt hàng</p>
              <button
                onClick={handleAddAddress}
                className="btn btn-primary"
              >
                Thêm địa chỉ đầu tiên
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-backdrop" onClick={handleCloseModal}></div>
          <div className="modal-content address-modal">
            <div className="modal-header">
              <h3>
                {editingAddress ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}
              </h3>
              <button 
                className="close-btn" 
                onClick={handleCloseModal}
                type="button"
              >
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Tên địa chỉ *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? 'error' : ''}
                    placeholder="VD: Nhà riêng, Văn phòng..."
                  />
                  {errors.name && (
                    <span className="error-message">{errors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="fullName">Họ và tên *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={errors.fullName ? 'error' : ''}
                    placeholder="Nhập họ và tên người nhận"
                  />
                  {errors.fullName && (
                    <span className="error-message">{errors.fullName}</span>
                  )}
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
                    placeholder="Nhập số điện thoại"
                  />
                  {errors.phone && (
                    <span className="error-message">{errors.phone}</span>
                  )}
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
                  {errors.address && (
                    <span className="error-message">{errors.address}</span>
                  )}
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
                    placeholder="Chọn phường/xã"
                  />
                  {errors.ward && (
                    <span className="error-message">{errors.ward}</span>
                  )}
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
                    placeholder="Chọn quận/huyện"
                  />
                  {errors.district && (
                    <span className="error-message">{errors.district}</span>
                  )}
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
                    placeholder="Chọn tỉnh/thành phố"
                  />
                  {errors.city && (
                    <span className="error-message">{errors.city}</span>
                  )}
                </div>

                <div className="form-group full-width">
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
              </div>
            </form>
            
            <div className="modal-footer">
              <button
                type="button"
                onClick={handleCloseModal}
                className="btn btn-outline"
                disabled={loading}
              >
                Hủy
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary"
                disabled={loading}
              >
                <FaSave /> {loading ? 'Đang lưu...' : 'Lưu địa chỉ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AccountLayout>
  );
};

export default AddressesPage;
