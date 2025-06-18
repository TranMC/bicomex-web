import React, { useRef, useCallback } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import FocusTrap from 'focus-trap-react';

// Định nghĩa lại CustomFocusTrap với các options được cải thiện
const CustomFocusTrap = ({ children, isActive }) => {
  return (
    <FocusTrap
      focusTrapOptions={{
        escapeDeactivates: true,
        clickOutsideDeactivates: true,
        initialFocus: 'button[autoFocus]',
        fallbackFocus: '.react-confirm-alert-button-group button',
        returnFocusOnDeactivate: true,
        preventScroll: true,
        // Luôn đảm bảo có focus element
        allowOutsideClick: true
      }}
      active={isActive}
    >
      {children}
    </FocusTrap>
  );
};

const useConfirmEnhanced = () => {  
  const modalRef = useRef(null);
  
  const confirm = useCallback((options) => {
    return new Promise((resolve) => {
      confirmAlert({
        title: options.title || 'Xác nhận',
        message: options.message || '',        customUI: ({ onClose, title, message }) => {
          const type = options.type || 'info';
          
          const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
              onClose();
              resolve(false);
            }
          };
          
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
                {/* Nút vô hình đầu tiên để focus-trap có thể bắt đầu */}
                <div tabIndex="0" className="focus-trap-safety-button" aria-hidden="true" data-focus-guard="true" />
                
                {options.showCloseButton !== false && (
                  <button
                    className="react-confirm-alert-close-button"
                    onClick={() => {
                      onClose();
                      resolve(false);
                    }}
                    aria-label="Đóng dialog"
                    tabIndex={0}
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
                    tabIndex={0}
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
                    tabIndex={0}
                  >
                    {options.cancelText || 'Hủy'}
                  </button>
                  {/* Nút vô hình làm fallback */}
                  <button
                    className="focus-trap-safety-button"
                    tabIndex={0}
                    aria-hidden="true"
                  >Fallback</button>
                </div>
                {/* Nút vô hình cuối cùng để focus-trap có thể kết thúc vòng lặp */}
                <div tabIndex="0" className="focus-trap-safety-button" aria-hidden="true" data-focus-guard="true" />
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
                {/* Nút vô hình đầu tiên để focus-trap có thể bắt đầu */}
                <div tabIndex="0" className="focus-trap-safety-button" aria-hidden="true" data-focus-guard="true" />
                
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
                    tabIndex={0}
                  >
                    {options.confirmText || 'Đóng'}
                  </button>
                  {/* Nút vô hình làm fallback */}
                  <button
                    className="focus-trap-safety-button"
                    tabIndex={0}
                    aria-hidden="true"
                  >Fallback</button>
                </div>
                {/* Nút vô hình cuối cùng để focus-trap có thể kết thúc vòng lặp */}
                <div tabIndex="0" className="focus-trap-safety-button" aria-hidden="true" data-focus-guard="true" />
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
