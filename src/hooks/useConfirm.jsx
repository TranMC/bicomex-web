import React from 'react';
import { useCallback } from 'react';
import { confirmAlert } from 'react-confirm-alert';

/**
 * Custom hook để quản lý dialog xác nhận
 * @returns {Object} Các phương thức để hiển thị và quản lý dialog xác nhận
 */
const useConfirm = () => {
  const confirm = useCallback((options) => {
    return new Promise((resolve) => {
      confirmAlert({
        title: options.title || 'Xác nhận',
        message: options.message || '',
        customUI: ({ onClose, title, message }) => {
          const type = options.type || 'info';
          return (
            <div className={`react-confirm-alert-body react-confirm-alert-body-${type}`}>
              <h1>{title}</h1>
              <p>{message}</p>
              <div className="react-confirm-alert-button-group">
                <button
                  className={
                    type === 'error' ? 'bg-red-600' : 
                    type === 'warning' ? 'bg-yellow-600' : 
                    type === 'success' ? 'bg-green-600' : 
                    'bg-blue-600'
                  }
                  onClick={() => {
                    onClose();
                    resolve(true);
                  }}
                >
                  {options.confirmText || 'Đồng ý'}
                </button>
                <button
                  className="bg-gray-200"
                  onClick={() => {
                    onClose();
                    resolve(false);
                  }}
                >
                  {options.cancelText || 'Hủy'}
                </button>
              </div>
            </div>
          );
        },
        closeOnEscape: true,
        closeOnClickOutside: true
      });
    });
  }, []);

  const alert = useCallback((options) => {
    return new Promise((resolve) => {
      confirmAlert({
        title: options.title || 'Thông báo',
        message: options.message || '',
        customUI: ({ onClose, title, message }) => {
          const type = options.type || 'info';
          return (
            <div className={`react-confirm-alert-body react-confirm-alert-body-${type}`}>
              <h1>{title}</h1>
              <p>{message}</p>
              <div className="react-confirm-alert-button-group">
                <button
                  className={
                    type === 'error' ? 'bg-red-600' : 
                    type === 'warning' ? 'bg-yellow-600' : 
                    type === 'success' ? 'bg-green-600' : 
                    'bg-blue-600'
                  }
                  onClick={() => {
                    onClose();
                    resolve(true);
                  }}
                >
                  {options.confirmText || 'Đồng ý'}
                </button>
              </div>
            </div>
          );
        },
        closeOnEscape: true,
        closeOnClickOutside: true
      });
    });
  }, []);

  return {
    confirm,
    alert
  };
};

export default useConfirm;