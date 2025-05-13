import { createContext } from 'react';
import useConfirm from '../hooks/useConfirm';
import ConfirmDialog from '../components/ui/ConfirmDialog';

// Create the context for confirmation dialogs
export const ConfirmContext = createContext({
  confirm: () => Promise.resolve(false),
  alert: () => Promise.resolve(false)
});

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