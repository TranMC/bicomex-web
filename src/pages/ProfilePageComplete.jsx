import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBirthdayCake, FaIdCard, FaSave, FaTimes, FaCamera } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useConfirmDialog from '../hooks/useConfirmDialog';
import AccountLayout from '../components/account/AccountLayout';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import '../styles/pages/ProfilePage.css';

const ProfilePageComplete = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUserProfile } = useAuth();
  const { alert } = useConfirmDialog();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    birthday: '',
    gender: '',
    avatar: '',
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/dang-nhap');
    } else {
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
        birthday: user?.birthday || '',
        gender: user?.gender || '',
        avatar: user?.avatar || '',
      });
      setInitialLoading(false);
    }
  }, [isAuthenticated, navigate, user]);
  const validateForm = () => {
    const newErrors = {};
    
    // Tên
    if (!formData.name.trim()) {
      newErrors.name = 'Tên không được để trống';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Tên phải có ít nhất 2 ký tự';
    }
    
    // Email
    if (!formData.email.trim()) {
      newErrors.email = 'Email không được để trống';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    // Số điện thoại (optional nhưng nếu có thì phải đúng format)
    if (formData.phone && formData.phone.trim() && !/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại phải có 10-11 chữ số';
    }
    
    // Ngày sinh (optional nhưng nếu có thì phải hợp lệ)
    if (formData.birthday) {
      const birthDate = new Date(formData.birthday);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 13 || age > 120) {
        newErrors.birthday = 'Tuổi phải từ 13 đến 120';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        if (alert) {
          alert({
            title: 'Lỗi',
            message: 'Kích thước file không được vượt quá 5MB',
            type: 'error'
          });
        }
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        if (alert) {
          alert({
            title: 'Lỗi',
            message: 'Vui lòng chọn file ảnh hợp lệ',
            type: 'error'
          });
        }
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          avatar: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      if (updateUserProfile) {
        await updateUserProfile(formData);
      }
      setIsEditing(false);
      if (alert) {
        alert({
          title: 'Thành công',
          message: 'Thông tin đã được cập nhật thành công!',
          type: 'success'
        });
      }
    } catch (err) {
      if (alert) {
        alert({
          title: 'Lỗi',
          message: 'Có lỗi xảy ra khi cập nhật thông tin. Vui lòng thử lại.',
          type: 'error'
        });
      }
      console.error('Profile update error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      birthday: user?.birthday || '',
      gender: user?.gender || '',
      avatar: user?.avatar || '',
    });
    setErrors({});
    setIsEditing(false);
  };

  const breadcrumbs = [
    { label: 'Tài khoản', path: '/tai-khoan' },
    { label: 'Thông tin cá nhân' }
  ];
  if (initialLoading) {
    return (
      <AccountLayout title="Thông tin tài khoản" breadcrumbs={breadcrumbs}>
        <LoadingSpinner 
          size="large" 
          text="Đang tải thông tin tài khoản..." 
          fullscreen={false}
        />
      </AccountLayout>
    );
  }

  return (
    <AccountLayout title="Thông tin tài khoản" breadcrumbs={breadcrumbs}>
      <div className="profile-main">
        <form onSubmit={handleSubmit} className="profile-form">
          {/* Avatar Section */}
          <div className="avatar-section">
            <div className="avatar-container">
              <div className="avatar-display">
                {formData.avatar ? (
                  <img src={formData.avatar} alt="Avatar" />
                ) : (
                  <div className="avatar-placeholder">
                    <FaUser />
                  </div>
                )}
                {isEditing && (
                  <div 
                    className="avatar-overlay"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FaCamera />
                    <span>Thay đổi</span>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                style={{ display: 'none' }}
              />
            </div>
            <div className="avatar-info">
              <h3>{formData.name || 'Người dùng'}</h3>
              <p>{formData.email}</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">
                <FaUser /> Họ và tên
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={errors.name ? 'error' : ''}
                placeholder="Nhập họ và tên"
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <FaEnvelope /> Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={errors.email ? 'error' : ''}
                placeholder="Nhập địa chỉ email"
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                <FaPhone /> Số điện thoại
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={errors.phone ? 'error' : ''}
                placeholder="Nhập số điện thoại"
              />
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="birthday">
                <FaBirthdayCake /> Ngày sinh
              </label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={formData.birthday}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">
                <FaIdCard /> Giới tính
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                disabled={!isEditing}
              >
                <option value="">Chọn giới tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="address">
                <FaMapMarkerAlt /> Địa chỉ
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Nhập địa chỉ"
                rows="3"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="btn btn-primary"
              >
                Chỉnh sửa thông tin
              </button>
            ) : (
              <div className="edit-actions">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-outline"
                  disabled={loading}
                >
                  <FaTimes /> Hủy
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  <FaSave /> {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </AccountLayout>
  );
};

export default ProfilePageComplete;
