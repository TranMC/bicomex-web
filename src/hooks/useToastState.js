import { useState } from 'react';

/**
 * Custom hook để quản lý trạng thái của toast notifications
 * @returns {Object} - Các phương thức và state để quản lý toast
 */
const useToastState = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
    return id;
  };

  const hideToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const toast = {
    success: (message, duration) => showToast(message, 'success', duration),
    error: (message, duration) => showToast(message, 'error', duration),
    warning: (message, duration) => showToast(message, 'warning', duration),
    info: (message, duration) => showToast(message, 'info', duration),
    hide: hideToast
  };

  return {
    toasts,
    toast
  };
};

export default useToastState;