import { useState } from 'react';
import useToast from '../../hooks/useToast';

const ToastDemo = () => {
  const toast = useToast();
  const [customMessage, setCustomMessage] = useState('');

  const showSuccessToast = () => {
    toast.success('Sản phẩm đã được thêm vào giỏ hàng thành công!');
  };

  const showErrorToast = () => {
    toast.error('Đã xảy ra lỗi khi thực hiện thao tác. Vui lòng thử lại!');
  };

  const showWarningToast = () => {
    toast.warning('Số lượng sản phẩm trong kho sắp hết. Vui lòng đặt hàng sớm!');
  };

  const showInfoToast = () => {
    toast.info('Chương trình khuyến mãi đặc biệt sẽ bắt đầu vào tuần tới!');
  };

  const showCustomToast = () => {
    if (customMessage.trim()) {
      toast.info(customMessage);
      setCustomMessage('');
    }
  };

  const showMultipleToasts = () => {
    toast.success('Toast thứ nhất');
    setTimeout(() => toast.info('Toast thứ hai'), 500);
    setTimeout(() => toast.warning('Toast thứ ba'), 1000);
    setTimeout(() => toast.error('Toast thứ tư'), 1500);
  };

  const clearAllToasts = () => {
    toast.clear();
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      zIndex: 10001,
      minWidth: '300px'
    }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'bold' }}>
        🍞 Toast Demo
      </h3>
      
      <div style={{ display: 'grid', gap: '8px', marginBottom: '16px' }}>
        <button 
          onClick={showSuccessToast}
          style={{
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 12px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Success Toast
        </button>
        
        <button 
          onClick={showErrorToast}
          style={{
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 12px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Error Toast
        </button>
        
        <button 
          onClick={showWarningToast}
          style={{
            background: '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 12px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Warning Toast
        </button>
        
        <button 
          onClick={showInfoToast}
          style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 12px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Info Toast
        </button>
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Nhập tin nhắn tùy chỉnh..."
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && showCustomToast()}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            marginBottom: '8px'
          }}
        />
        <button 
          onClick={showCustomToast}
          disabled={!customMessage.trim()}
          style={{
            background: customMessage.trim() ? '#6b7280' : '#9ca3af',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 12px',
            cursor: customMessage.trim() ? 'pointer' : 'not-allowed',
            fontSize: '14px',
            width: '100%'
          }}
        >
          Gửi Custom Toast
        </button>
      </div>
      
      <div style={{ display: 'grid', gap: '8px' }}>
        <button 
          onClick={showMultipleToasts}
          style={{
            background: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 12px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Hiển thị nhiều Toast
        </button>
        
        <button 
          onClick={clearAllToasts}
          style={{
            background: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 12px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Xóa tất cả Toast
        </button>
      </div>
    </div>
  );
};

export default ToastDemo;
