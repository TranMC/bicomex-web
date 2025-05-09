import React, { useEffect } from 'react';

/**
 * Component dialog xác nhận dùng để thay thế alert và confirm
 */
const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Xác nhận', 
  message, 
  confirmText = 'Đồng ý', 
  cancelText = 'Hủy',
  type = 'info' // 'info', 'success', 'warning', 'error'
}) => {
  // Ngăn cuộn trang khi dialog mở
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Ngăn sự kiện click từ bên trong dialog lan ra backdrop
  const handleDialogClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
        onClick={onClose} 
      />
      <div 
        className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden" 
        onClick={handleDialogClick}
      >
        <div className={`px-4 py-3 ${
          type === 'info' ? 'bg-blue-50 text-blue-800' :
          type === 'success' ? 'bg-green-50 text-green-800' :
          type === 'warning' ? 'bg-yellow-50 text-yellow-800' :
          type === 'error' ? 'bg-red-50 text-red-800' : 'bg-gray-50'
        }`}>
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        
        <div className="p-4 sm:p-6">
          <p className="text-sm text-gray-700">{message}</p>
        </div>
        
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${
              type === 'info' ? 'bg-blue-600 hover:bg-blue-700' :
              type === 'success' ? 'bg-green-600 hover:bg-green-700' :
              type === 'warning' ? 'bg-yellow-600 hover:bg-yellow-700' :
              type === 'error' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={onClose}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog; 