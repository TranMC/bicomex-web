import { useState, useCallback } from 'react';


const useToastState = () => {
  const [toasts, setToasts] = useState([]);
  const MAX_TOASTS = 5; // Giới hạn số lượng toast hiển thị cùng lúc

  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random(); // Đảm bảo unique id
    
    setToasts(prev => {
      const newToasts = [...prev, { id, message, type, duration }];
      
      // Giới hạn số lượng toast, xóa toast cũ nhất nếu vượt quá
      if (newToasts.length > MAX_TOASTS) {
        return newToasts.slice(-MAX_TOASTS);
      }
      
      return newToasts;
    });
    
    return id;
  }, []);

  const hideToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const toast = {
    success: (message, duration = 4000) => showToast(message, 'success', duration),
    error: (message, duration = 5000) => showToast(message, 'error', duration),
    warning: (message, duration = 4500) => showToast(message, 'warning', duration),
    info: (message, duration = 3500) => showToast(message, 'info', duration),
    hide: hideToast,
    clear: clearAllToasts
  };

  return {
    toasts,
    toast
  };
};

export default useToastState;