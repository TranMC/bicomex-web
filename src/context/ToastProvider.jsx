import { ToastContext } from './ToastContext';
import { Toast } from '../components/ui/Toast';
import useToastState from '../hooks/useToastState';

export const ToastProvider = ({ children }) => {
  const { toasts, toast } = useToastState();

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="toast-wrapper">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => toast.hide(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};