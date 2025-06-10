import { useRef } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserSidebar from './UserSidebar';
import useAuth from '../../hooks/useAuth';
import useConfirmDialog from '../../hooks/useConfirmDialog';
import './AccountLayout.css';

const AccountLayout = ({ 
  title, 
  breadcrumbs = [], 
  children, 
  enableAvatarUpload = false,
  onAvatarChange 
}) => {
  const fileInputRef = useRef(null);
  const { updateUserProfile } = useAuth();
  const { alert } = useConfirmDialog();

  const handleAvatarClick = () => {
    if (enableAvatarUpload) {
      fileInputRef.current?.click();
    }
  };

  const handleAvatarFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert({
          title: 'Lỗi',
          message: 'Kích thước file không được vượt quá 5MB',
          type: 'error'
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result;
        updateUserProfile({ avatar: base64 });
        if (onAvatarChange) {
          onAvatarChange(base64);
        }
        alert({
          title: 'Thành công',
          message: 'Đã cập nhật ảnh đại diện!',
          type: 'success'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="account-page">
      <div className="container">
        <div className="account-content">
          <UserSidebar 
            onAvatarChange={enableAvatarUpload ? handleAvatarClick : null}
          />
          
          <div className="account-main">
            <div className="account-header">
              <h2>{title}</h2>
              {breadcrumbs.length > 0 && (
                <div className="breadcrumbs">
                  <Link to="/">Trang chủ</Link>
                  <FaAngleRight className="breadcrumb-separator" />
                  <Link to="/tai-khoan">Tài khoản</Link>
                  {breadcrumbs.map((crumb, index) => (
                    <span key={index}>
                      <FaAngleRight className="breadcrumb-separator" />
                      {crumb.link ? (
                        <Link to={crumb.link}>{crumb.label}</Link>
                      ) : (
                        <span>{crumb.label}</span>
                      )}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="account-body">
              {children}
            </div>
          </div>

          {enableAvatarUpload && (
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarFileChange}
              style={{ display: 'none' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
