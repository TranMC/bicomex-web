import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaStar } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useConfirmDialog from '../hooks/useConfirmDialog';
import AccountLayout from '../components/account/AccountLayout';

const AddressesPageSimple = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { confirm, alert } = useConfirmDialog();
  const [loading, setLoading] = useState(true);
  
  const [addresses] = useState([
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
  ]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/dang-nhap');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, navigate]);

  const breadcrumbs = [
    { label: 'Tài khoản', path: '/tai-khoan' },
    { label: 'Sổ địa chỉ' }
  ];

  const handleAddAddress = () => {
    if (alert) {
      alert({
        title: 'Thông báo',
        message: 'Tính năng thêm địa chỉ đang được phát triển',
        type: 'info'
      });
    }
  };

  const handleEditAddress = (address) => {
    if (alert) {
      alert({
        title: 'Thông báo',
        message: `Chỉnh sửa địa chỉ: ${address.name}`,
        type: 'info'
      });
    }
  };

  const handleDeleteAddress = async (address) => {
    if (confirm) {
      const result = await confirm({
        title: 'Xác nhận xóa',
        message: `Bạn có chắc chắn muốn xóa địa chỉ "${address.name}"?`,
        type: 'warning'
      });
      
      if (result) {
        if (alert) {
          alert({
            title: 'Thành công',
            message: 'Đã xóa địa chỉ thành công',
            type: 'success'
          });
        }
      }
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
    <AccountLayout title="Sổ địa chỉ" breadcrumbs={breadcrumbs}>
      <div style={{ padding: '20px' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: 0, color: '#333' }}>Danh sách địa chỉ</h3>
          <button 
            onClick={handleAddAddress}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            <FaPlus /> Thêm địa chỉ mới
          </button>
        </div>

        {/* Addresses Grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '20px'
        }}>
          {addresses.map(address => (
            <div 
              key={address.id}
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: address.isDefault ? '2px solid #667eea' : '2px solid transparent',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Address Header */}
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: '600', color: '#333', fontSize: '16px' }}>
                    {address.name}
                  </span>
                  {address.isDefault && (
                    <span style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      Mặc định
                    </span>
                  )}
                </div>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleEditAddress(address)}
                    style={{
                      padding: '8px',
                      background: '#e3f2fd',
                      color: '#1976d2',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address)}
                    style={{
                      padding: '8px',
                      background: '#ffebee',
                      color: '#d32f2f',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <FaTrash />
                  </button>
                  {!address.isDefault && (
                    <button
                      style={{
                        padding: '8px',
                        background: '#fff3e0',
                        color: '#f57c00',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <FaStar />
                    </button>
                  )}
                </div>
              </div>

              {/* Address Details */}
              <div style={{ lineHeight: '1.6', color: '#555' }}>
                <p style={{ margin: '8px 0' }}>
                  <strong>Họ tên:</strong> {address.fullName}
                </p>
                <p style={{ margin: '8px 0' }}>
                  <strong>Số điện thoại:</strong> {address.phone}
                </p>
                <p style={{ margin: '8px 0' }}>
                  <strong>Địa chỉ:</strong> {address.address}
                </p>
                <p style={{ margin: '8px 0' }}>
                  <strong>Phường/Xã:</strong> {address.ward}
                </p>
                <p style={{ margin: '8px 0' }}>
                  <strong>Quận/Huyện:</strong> {address.district}
                </p>
                <p style={{ margin: '8px 0' }}>
                  <strong>Tỉnh/Thành phố:</strong> {address.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AccountLayout>
  );
};

export default AddressesPageSimple;
