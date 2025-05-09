import { useState, useCallback } from 'react';

/**
 * Custom hook để quản lý dialog xác nhận
 * @returns {Object} Các phương thức để hiển thị và quản lý dialog xác nhận
 */
const useConfirm = () => {
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Đồng ý',
    cancelText: 'Hủy',
    onConfirm: () => {},
    type: 'info'
  });

  const confirm = useCallback((options) => {
    return new Promise((resolve) => {
      setDialogState({
        isOpen: true,
        title: options.title || 'Xác nhận',
        message: options.message || '',
        confirmText: options.confirmText || 'Đồng ý',
        cancelText: options.cancelText || 'Hủy',
        type: options.type || 'info',
        onConfirm: () => {
          setDialogState(state => ({ ...state, isOpen: false }));
          resolve(true);
        },
        onCancel: () => {
          setDialogState(state => ({ ...state, isOpen: false }));
          resolve(false);
        }
      });
    });
  }, []);

  const alert = useCallback((options) => {
    return new Promise((resolve) => {
      setDialogState({
        isOpen: true,
        title: options.title || 'Thông báo',
        message: options.message || '',
        confirmText: options.confirmText || 'Đồng ý',
        cancelText: null, // Không hiển thị nút hủy
        type: options.type || 'info',
        onConfirm: () => {
          setDialogState(state => ({ ...state, isOpen: false }));
          resolve(true);
        },
        onCancel: () => {
          setDialogState(state => ({ ...state, isOpen: false }));
          resolve(false);
        }
      });
    });
  }, []);

  const closeDialog = useCallback(() => {
    setDialogState(state => ({ ...state, isOpen: false }));
  }, []);

  return {
    dialogState,
    confirm,
    alert,
    closeDialog
  };
};

export default useConfirm; 