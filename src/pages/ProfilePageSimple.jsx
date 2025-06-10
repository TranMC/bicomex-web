import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProfilePageSimple = () => {
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
    <div style={{ 
      padding: '40px', 
      maxWidth: '800px', 
      margin: '0 auto',
      backgroundColor: '#f5f5f5',
      minHeight: '60vh'
    }}>
      <h2>Thông tin tài khoản</h2>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <p><strong>Tên:</strong> {user?.name || 'Chưa cập nhật'}</p>
        <p><strong>Email:</strong> {user?.email || 'Chưa cập nhật'}</p>
        <p><strong>Số điện thoại:</strong> {user?.phone || 'Chưa cập nhật'}</p>
        <p><strong>Địa chỉ:</strong> {user?.address || 'Chưa cập nhật'}</p>
      </div>
    </div>
  );
};

export default ProfilePageSimple;
