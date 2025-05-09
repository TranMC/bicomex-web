import { useContext } from 'react';
import { ConfirmContext } from '../context/ConfirmContext';

/**
 * Custom hook để sử dụng các dialog xác nhận
 * @returns {Object} Các phương thức để hiển thị dialog xác nhận
 */
const useConfirmDialog = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirmDialog phải được sử dụng trong ConfirmProvider');
  }
  return context;
};

export default useConfirmDialog; 