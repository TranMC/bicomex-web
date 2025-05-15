import { ToastContext } from './ToastContext';
import { Toast } from '../components/ui/Toast';
import useToastState from '../hooks/useToastState';

export const ToastProvider = ({ children }) => {
  const { toasts, toast } = useToastState();

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="toast-wrapper">
        {toasts.map(toast2 => (
          <Toast
            key={toast2.id}
            message={toast2.message}
            type={toast2.type}
            duration={toast2.duration}
            onClose={() => toast.hide(toast2.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};