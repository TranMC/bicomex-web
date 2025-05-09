import { createContext } from 'react';
import useConfirm from '../hooks/useConfirm';
import ConfirmDialog from '../components/ui/ConfirmDialog';

// Tạo context để quản lý các dialog xác nhận
export const ConfirmContext = createContext(null);

export const ConfirmProvider = ({ children }) => {
  const {
    dialogState,
    confirm,
    alert,
    closeDialog
  } = useConfirm();

  return (
    <ConfirmContext.Provider
      value={{
        confirm,
        alert
      }}
    >
      {children}
      <ConfirmDialog
        isOpen={dialogState.isOpen}
        title={dialogState.title}
        message={dialogState.message}
        confirmText={dialogState.confirmText}
        cancelText={dialogState.cancelText}
        type={dialogState.type}
        onConfirm={dialogState.onConfirm}
        onClose={dialogState.onCancel || closeDialog}
      />
    </ConfirmContext.Provider>
  );
};

export default ConfirmProvider; 