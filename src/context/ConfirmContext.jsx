import useConfirm from '../hooks/useConfirm';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { ConfirmContext } from './ConfirmContextInstance';

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