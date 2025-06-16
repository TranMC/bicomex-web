import React from 'react';
import { useCallback } from 'react';
import { confirmAlert } from 'react-confirm-alert';

/**
 * Custom hook để quản lý dialog xác nhận
 * @returns {Object} Các phương thức để hiển thị và quản lý dialog xác nhận
 */
const useConfirm = () => {  const confirm = useCallback((options) => {
    return new Promise((resolve) => {
      confirmAlert({
        title: options.title || 'Xác nhận',
        message: options.message || '',
        customUI: ({ onClose, title, message }) => {
          const type = options.type || 'info';
          
          // Auto-focus vào container để có thể đóng bằng ESC
          const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
              onClose();
              resolve(false);
            }
          };
          
          return (
            <div 
              className={`react-confirm-alert-body react-confirm-alert-body-${type}`}
              onKeyDown={handleKeyDown}
              tabIndex={-1}
              style={{ outline: 'none' }}
            >
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
                  autoFocus
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
        closeOnClickOutside: true,
        overlayClassName: 'react-confirm-alert-overlay'
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
          
          // Auto-focus và keyboard handling
          const handleKeyDown = (e) => {
            if (e.key === 'Escape' || e.key === 'Enter') {
              onClose();
              resolve(true);
            }
          };
          
          return (
            <div 
              className={`react-confirm-alert-body react-confirm-alert-body-${type}`}
              onKeyDown={handleKeyDown}
              tabIndex={-1}
              style={{ outline: 'none' }}
            >
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
                  autoFocus
                >
                  {options.confirmText || 'Đóng'}
                </button>
              </div>
            </div>
          );
        },
        closeOnEscape: true,
        closeOnClickOutside: true,
        overlayClassName: 'react-confirm-alert-overlay'
      });
    });
  }, []);

  return {
    confirm,
    alert
  };
};

export default useConfirm;