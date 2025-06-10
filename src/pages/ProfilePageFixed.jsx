import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import AccountLayout from '../components/account/AccountLayout';

const ProfilePageFixed = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
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
    { label: 'Thông tin cá nhân' }
  ];

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
    <AccountLayout title="Thông tin tài khoản" breadcrumbs={breadcrumbs}>
      <div style={{ padding: '20px' }}>
        <div style={{ 
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <h3 style={{ marginBottom: '20px', color: '#333' }}>Thông tin cá nhân</h3>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <strong>Tên:</strong> {user?.name || 'Chưa cập nhật'}
            </div>
            <div>
              <strong>Email:</strong> {user?.email || 'Chưa cập nhật'}
            </div>
            <div>
              <strong>Số điện thoại:</strong> {user?.phone || 'Chưa cập nhật'}
            </div>
            <div>
              <strong>Địa chỉ:</strong> {user?.address || 'Chưa cập nhật'}
            </div>
          </div>
        </div>
        
        <button 
          style={{
            backgroundColor: '#667eea',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
          onClick={() => alert('Chức năng chỉnh sửa sẽ được thêm vào')}
        >
          Cập nhật thông tin
        </button>
      </div>
    </AccountLayout>
  );
};

export default ProfilePageFixed;
