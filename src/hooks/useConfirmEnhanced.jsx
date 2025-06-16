import React, { useRef, useCallback,  } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import FocusTrap from 'focus-trap-react';

/**
 * CustomFocusTrap - Component để quản lý trap focus bên trong modal
 */
// const CustomFocusTrap = ({ children, isActive }) => {
//   return (
//     <FocusTrap
//       focusTrapOptions={{
//         escapeDeactivates: true, 
//         clickOutsideDeactivates: true,
//         initialFocus: 'button[autoFocus]'
//       }}
//       active={isActive}
//     >
//       {children}
//     </FocusTrap>
//   );
// };

/**
 * Custom hook để quản lý dialog xác nhận với accessibility cải tiến
 * @returns {Object} Các phương thức để hiển thị và quản lý dialog xác nhận
 */
const useConfirmEnhanced = () => {  
  const modalRef = useRef(null);
  
  const confirm = useCallback((options) => {
    return new Promise((resolve) => {
      confirmAlert({
        title: options.title || 'Xác nhận',
        message: options.message || '',        customUI: ({ onClose, title, message }) => {
          const type = options.type || 'info';
          
          // Auto-focus vào container để có thể đóng bằng ESC
          const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
              onClose();
              resolve(false);
            }
          };
          
          // Hiệu ứng glowing khi user hover
          const handleMouseEnter = (e) => {
            if (e.currentTarget.classList.contains('bg-blue-600')) {
              e.currentTarget.style.boxShadow = 
                '0 8px 25px rgba(59, 130, 246, 0.5), 0 0 0 2px rgba(59, 130, 246, 0.3), 0 0 15px rgba(59, 130, 246, 0.3)';
            } else if (e.currentTarget.classList.contains('bg-red-600')) {
              e.currentTarget.style.boxShadow = 
                '0 8px 25px rgba(239, 68, 68, 0.5), 0 0 0 2px rgba(239, 68, 68, 0.3), 0 0 15px rgba(239, 68, 68, 0.3)';
            } else if (e.currentTarget.classList.contains('bg-yellow-600')) {
              e.currentTarget.style.boxShadow = 
                '0 8px 25px rgba(245, 158, 11, 0.5), 0 0 0 2px rgba(245, 158, 11, 0.3), 0 0 15px rgba(245, 158, 11, 0.3)';
            } else if (e.currentTarget.classList.contains('bg-green-600')) {
              e.currentTarget.style.boxShadow = 
                '0 8px 25px rgba(16, 185, 129, 0.5), 0 0 0 2px rgba(16, 185, 129, 0.3), 0 0 15px rgba(16, 185, 129, 0.3)';
            } else {
              e.currentTarget.style.boxShadow = 
                '0 8px 20px rgba(0, 0, 0, 0.15), 0 0 0 2px rgba(0, 0, 0, 0.05)';
            }
          };
          
          const handleMouseLeave = (e) => {
            e.currentTarget.style.boxShadow = '';
          };
          
          return (
            <CustomFocusTrap isActive={true}>
              <div 
                className={`react-confirm-alert-body react-confirm-alert-body-${type} react-confirm-alert-body-with-close-btn`}
                onKeyDown={handleKeyDown}
                tabIndex={-1}
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
                style={{ outline: 'none' }}
              >
                {options.showCloseButton !== false && (
                  <button
                    className="react-confirm-alert-close-button"
                    onClick={() => {
                      onClose();
                      resolve(false);
                    }}
                    aria-label="Đóng dialog"
                  >
                    ✕
                  </button>
                )
                }<h1 id="dialog-title">{title}</h1>
                <p id="dialog-description">{message}</p>
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
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {options.confirmText || 'Đồng ý'}
                  </button>
                  <button
                    className="bg-gray-200"
                    onClick={() => {
                      onClose();
                      resolve(false);
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {options.cancelText || 'Hủy'}
                  </button>
                </div>
              </div>
            </CustomFocusTrap>
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
          
          // Hiệu ứng glowing khi user hover
          const handleMouseEnter = (e) => {
            if (e.currentTarget.classList.contains('bg-blue-600')) {
              e.currentTarget.style.boxShadow = 
                '0 8px 25px rgba(59, 130, 246, 0.5), 0 0 0 2px rgba(59, 130, 246, 0.3), 0 0 15px rgba(59, 130, 246, 0.3)';
            } else if (e.currentTarget.classList.contains('bg-red-600')) {
              e.currentTarget.style.boxShadow = 
                '0 8px 25px rgba(239, 68, 68, 0.5), 0 0 0 2px rgba(239, 68, 68, 0.3), 0 0 15px rgba(239, 68, 68, 0.3)';
            } else if (e.currentTarget.classList.contains('bg-yellow-600')) {
              e.currentTarget.style.boxShadow = 
                '0 8px 25px rgba(245, 158, 11, 0.5), 0 0 0 2px rgba(245, 158, 11, 0.3), 0 0 15px rgba(245, 158, 11, 0.3)';
            } else if (e.currentTarget.classList.contains('bg-green-600')) {
              e.currentTarget.style.boxShadow = 
                '0 8px 25px rgba(16, 185, 129, 0.5), 0 0 0 2px rgba(16, 185, 129, 0.3), 0 0 15px rgba(16, 185, 129, 0.3)';
            }
          };
          
          const handleMouseLeave = (e) => {
            e.currentTarget.style.boxShadow = '';
          };
          
          return (
            <CustomFocusTrap isActive={true}>
              <div 
                className={`react-confirm-alert-body react-confirm-alert-body-${type}`}
                onKeyDown={handleKeyDown}
                tabIndex={-1}
                ref={modalRef}
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={{ outline: 'none' }}
              >
                <h1 id="alert-dialog-title">{title}</h1>
                <p id="alert-dialog-description">{message}</p>
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
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {options.confirmText || 'Đóng'}
                  </button>
                </div>
              </div>
            </CustomFocusTrap>
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

export default useConfirmEnhanced;
