import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBirthdayCake, FaIdCard, FaSave, FaTimes } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useConfirmDialog from '../hooks/useConfirmDialog';
import AccountLayout from '../components/account/AccountLayout';
import '../styles/pages/ProfilePage.css';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUserProfile } = useAuth();
  const { alert } = useConfirmDialog();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    birthday: '',
    gender: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

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
        birthday: user?.birthday || '',
        gender: user?.gender || '',
      });
    }
  }, [isAuthenticated, navigate, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      updateUserProfile(formData);
      setIsEditing(false);
      setLoading(false);
      
      alert({
        title: 'Thành công',
        message: 'Thông tin tài khoản đã được cập nhật!',
        type: 'success'
      });
    }, 1000);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form data
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      birthday: user?.birthday || '',
      gender: user?.gender || '',
    });
  };

  const breadcrumbs = [
    { label: 'Hồ sơ cá nhân' }
  ];

  return (
    <AccountLayout 
      title="Thông tin tài khoản"
      breadcrumbs={breadcrumbs}
      enableAvatarUpload={true}
    >
      <div className="account-info">
        <div className="section-header">
          <h3>Thông tin cá nhân</h3>
          <div className="header-actions">
            {isEditing ? (
              <>
                <button 
                  type="button"
                  className="cancel-button"
                  onClick={handleCancelEdit}
                >
                  <FaTimes /> Hủy
                </button>
                <button 
                  type="submit"
                  form="profile-form" 
                  className="save-button"
                  disabled={loading}
                >
                  <FaSave /> {loading ? 'Đang lưu...' : 'Lưu'}
                </button>
              </>
            ) : (
              <button 
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                <FaUser /> Chỉnh sửa
              </button>
            )}
          </div>
        </div>
        
        {isEditing ? (
          <form id="profile-form" onSubmit={handleSubmit} className="edit-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">
                  <FaUser className="field-icon" />
                  Họ và tên
                </label>
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
                <label htmlFor="email">
                  <FaEnvelope className="field-icon" />
                  Email
                </label>
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
                <label htmlFor="phone">
                  <FaPhone className="field-icon" />
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="birthday">
                  <FaBirthdayCake className="field-icon" />
                  Ngày sinh
                </label>
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="gender">
                  <FaIdCard className="field-icon" />
                  Giới tính
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Chọn giới tính</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>
            
            <div className="form-group full-width">
              <label htmlFor="address">
                <FaMapMarkerAlt className="field-icon" />
                Địa chỉ
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                placeholder="Nhập địa chỉ của bạn"
              ></textarea>
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
              <span className="info-icon"><FaBirthdayCake /></span>
              <div className="info-content">
                <p className="info-label">Ngày sinh</p>
                <p className="info-value">{user?.birthday ? new Date(user.birthday).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}</p>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon"><FaIdCard /></span>
              <div className="info-content">
                <p className="info-label">Giới tính</p>
                <p className="info-value">
                  {user?.gender === 'male' ? 'Nam' : 
                   user?.gender === 'female' ? 'Nữ' : 
                   user?.gender === 'other' ? 'Khác' : 'Chưa cập nhật'}
                </p>
              </div>
            </div>
            
            <div className="info-item full-width">
              <span className="info-icon"><FaMapMarkerAlt /></span>
              <div className="info-content">
                <p className="info-label">Địa chỉ</p>
                <p className="info-value">{user?.address || 'Chưa cập nhật'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AccountLayout>
  );
};

export default ProfilePage;
