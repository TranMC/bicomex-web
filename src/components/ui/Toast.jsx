import { useState, useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaTimesCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';
import './Toast.css';

export const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Set the icon based on the type
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-green-500 text-xl" />;
      case 'error':
        return <FaTimesCircle className="text-red-500 text-xl" />;
      case 'warning':
        return <FaExclamationCircle className="text-yellow-500 text-xl" />;
      case 'info':
        return <FaInfoCircle className="text-blue-500 text-xl" />;
      default:
        return <FaInfoCircle className="text-blue-500 text-xl" />;
    }
  };
  
  // Get background color based on the type
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };
  
  // Auto-close the toast after duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  // Handle close button click
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };
  
  if (!isVisible) return null;
  
  return (
    <div className={`toast-container fixed z-50 ${getBackgroundColor()} shadow-md rounded-md border p-4 flex items-start`}>
      <div className="mr-3 mt-0.5">
        {getIcon()}
      </div>
      <div className="flex-grow">
        <p className="text-gray-800">{message}</p>
      </div>
      <button onClick={handleClose} className="ml-4 text-gray-500 hover:text-gray-700">
        <FaTimes />
      </button>
    </div>
  );
};