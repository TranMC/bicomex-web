import { useContext } from 'react';
import { ToastContext } from '../context/ToastContext';

/**
 * Custom hook để sử dụng các thông báo toast
 * @returns {Object} Các phương thức để hiển thị và ẩn toast
 */
const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default useToast;