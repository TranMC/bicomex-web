import { ToastContext } from './ToastContext';
import { Toast } from '../components/ui/Toast';
import useToastState from '../hooks/useToastState';

export const ToastProvider = ({ children }) => {
  const { toasts, toast } = useToastState();

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {toasts.length > 0 && (
        <div className="toast-wrapper">
          {toasts.map((toastItem, index) => (
            <Toast
              key={toastItem.id}
              message={toastItem.message}
              type={toastItem.type}
              duration={toastItem.duration}
              onClose={() => toast.hide(toastItem.id)}
              style={{
                zIndex: 9999 - index,
                transform: `translateY(${index * 8}px) scale(${1 - index * 0.02})`,
                opacity: Math.max(0.5, 1 - index * 0.1)
              }}
            />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
};