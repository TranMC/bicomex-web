import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaBell, FaUserShield } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useConfirmDialog from '../hooks/useConfirmDialog';
import AccountLayout from '../components/account/AccountLayout';

const SettingsPageSimple = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { alert } = useConfirmDialog();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/dang-nhap');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, navigate]);

  const breadcrumbs = [
    { label: 'Tài khoản', path: '/tai-khoan' },
    { label: 'Cài đặt' }
  ];

  const handleChangePassword = () => {
    if (alert) {
      alert({
        title: 'Thông báo',
        message: 'Tính năng đổi mật khẩu đang được phát triển',
        type: 'info'
      });
    }
  };

  const handleNotificationSetting = (setting) => {
    if (alert) {
      alert({
        title: 'Thông báo',
        message: `Cập nhật cài đặt thông báo: ${setting}`,
        type: 'info'
      });
    }
  };

  const handlePrivacySetting = (setting) => {
    if (alert) {
      alert({
        title: 'Thông báo',
        message: `Cập nhật cài đặt quyền riêng tư: ${setting}`,
        type: 'info'
      });
    }
  };

  if (loading) {
    return (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div>Đang tải...</div>
      </div>
    );
  }

  return (
    <AccountLayout title="Cài đặt tài khoản" breadcrumbs={breadcrumbs}>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* Password Section */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            paddingBottom: '16px',
            borderBottom: '2px solid #f5f5f5'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaLock />
            </div>
            <div>
              <h3 style={{ margin: 0, color: '#333' }}>Bảo mật tài khoản</h3>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                Quản lý mật khẩu và bảo mật tài khoản
              </p>
            </div>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#333'
            }}>
              Mật khẩu hiện tại
            </label>
            <p style={{ 
              margin: 0,
              color: '#666',
              fontSize: '14px',
              marginBottom: '16px'
            }}>
              Được cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
            </p>
            <button
              onClick={handleChangePassword}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Đổi mật khẩu
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            paddingBottom: '16px',
            borderBottom: '2px solid #f5f5f5'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaBell />
            </div>
            <div>
              <h3 style={{ margin: 0, color: '#333' }}>Cài đặt thông báo</h3>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                Quản lý các loại thông báo bạn muốn nhận
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '16px' }}>
            {[
              { id: 'emailOrders', label: 'Thông báo đơn hàng qua Email', checked: true },
              { id: 'emailPromotions', label: 'Thông báo khuyến mãi qua Email', checked: true },
              { id: 'smsOrders', label: 'Thông báo đơn hàng qua SMS', checked: false },
              { id: 'pushNotifications', label: 'Thông báo đẩy trên trình duyệt', checked: true }
            ].map(setting => (
              <div key={setting.id} style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0'
              }}>
                <span style={{ color: '#333', fontWeight: '500' }}>
                  {setting.label}
                </span>
                <button
                  onClick={() => handleNotificationSetting(setting.label)}
                  style={{
                    background: setting.checked ? '#667eea' : '#e2e8f0',
                    color: setting.checked ? 'white' : '#666',
                    padding: '6px 12px',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}
                >
                  {setting.checked ? 'BẬT' : 'TẮT'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Section */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            paddingBottom: '16px',
            borderBottom: '2px solid #f5f5f5'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaUserShield />
            </div>
            <div>
              <h3 style={{ margin: 0, color: '#333' }}>Quyền riêng tư</h3>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                Kiểm soát quyền riêng tư và bảo mật dữ liệu
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '16px' }}>
            {[
              { id: 'profileVisibility', label: 'Hiển thị thông tin cá nhân', checked: false },
              { id: 'showEmail', label: 'Hiển thị email công khai', checked: false },
              { id: 'showPhone', label: 'Hiển thị số điện thoại', checked: false },
              { id: 'allowDataCollection', label: 'Cho phép thu thập dữ liệu', checked: true }
            ].map(setting => (
              <div key={setting.id} style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0'
              }}>
                <span style={{ color: '#333', fontWeight: '500' }}>
                  {setting.label}
                </span>
                <button
                  onClick={() => handlePrivacySetting(setting.label)}
                  style={{
                    background: setting.checked ? '#667eea' : '#e2e8f0',
                    color: setting.checked ? 'white' : '#666',
                    padding: '6px 12px',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}
                >
                  {setting.checked ? 'BẬT' : 'TẮT'}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AccountLayout>
  );
};

export default SettingsPageSimple;
