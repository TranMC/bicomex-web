import React, { useRef, useCallback } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import CustomFocusTrap from '../components/ui/CustomFocusTrap';

const useConfirmFixed = () => {
  const modalRef = useRef(null);
  
  const ensurePositionInViewport = useCallback(() => {
    setTimeout(() => {
      const overlayElement = document.querySelector('.react-confirm-alert-overlay');
      const bodyElement = document.querySelector('.react-confirm-alert-body');
      
      if (overlayElement && bodyElement) {
        overlayElement.style.position = 'fixed';
        overlayElement.style.top = '0';
        overlayElement.style.left = '0';
        overlayElement.style.right = '0';
        overlayElement.style.bottom = '0';
        overlayElement.style.display = 'flex';
        overlayElement.style.alignItems = 'center';
        overlayElement.style.justifyContent = 'center';
        overlayElement.style.overflow = 'hidden';
        bodyElement.style.margin = '0';
        bodyElement.style.transform = 'none';
        bodyElement.style.position = 'relative';
      }
    }, 10);
  }, []);
  
  const confirm = useCallback((options) => {
    return new Promise((resolve) => {
      confirmAlert({
        title: options.title || 'Xác nhận',
        message: options.message || '',
        customUI: ({ onClose, title, message }) => {
          const type = options.type || 'info';
          
          ensurePositionInViewport();
          
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
                )}
                
                <h1 id="dialog-title">{title}</h1>
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
                  <button
                    className="focus-trap-safety-button"
                    tabIndex={0}
                    aria-hidden="true"
                  >Fallback</button>
                </div>
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
  }, [ensurePositionInViewport]);
  
  const alert = useCallback((options) => {
    return new Promise((resolve) => {
      confirmAlert({
        title: options.title || 'Thông báo',
        message: options.message || '',
        customUI: ({ onClose, title, message }) => {
          const type = options.type || 'info';
          
          ensurePositionInViewport();
          
          const handleKeyDown = (e) => {
            if (e.key === 'Escape' || e.key === 'Enter') {
              onClose();
              resolve(true);
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
                  <button
                    className="focus-trap-safety-button"
                    tabIndex={0}
                    aria-hidden="true"
                  >Fallback</button>
                </div>
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
  }, [ensurePositionInViewport]);

  return {
    confirm,
    alert
  };
};

export default useConfirmFixed;
