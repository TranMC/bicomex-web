import { useState, useEffect, useRef, useCallback } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaTimesCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';
import '../../styles/components/Toast.css';

export const Toast = ({ message, type = 'success', duration = 3000, onClose, style }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHiding, setIsHiding] = useState(false);
  const progressRef = useRef(null);
  const timerRef = useRef(null);
  

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle />;
      case 'error':
        return <FaTimesCircle />;
      case 'warning':
        return <FaExclamationCircle />;
      case 'info':
        return <FaInfoCircle />;
      default:
        return <FaInfoCircle />;
    }
  };
  

  const getTypeClass = () => {
    return `toast-${type}`;
  };
  

  const handleClose = useCallback(() => {
    setIsHiding(true);
    

    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300);
  }, [onClose]);
  

  useEffect(() => {
    if (duration > 0) {
      if (progressRef.current) {
        progressRef.current.style.animationDuration = `${duration}ms`;
      }
      
      timerRef.current = setTimeout(() => {
        handleClose();
      }, duration);
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [duration, handleClose]);
  
  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (progressRef.current) {
      progressRef.current.style.animationPlayState = 'paused';
    }
  };
  
  const handleMouseLeave = () => {
    if (duration > 0) {
      const remainingTime = duration * 0.3; 
      timerRef.current = setTimeout(() => {
        handleClose();
      }, remainingTime);
      
      if (progressRef.current) {
        progressRef.current.style.animationPlayState = 'running';
      }
    }
  };
  
  if (!isVisible) return null;
    return (
    <div 
      className={`toast-container ${getTypeClass()} ${isHiding ? 'hiding' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      <div className="toast-content">
        <div className="toast-icon">
          {getIcon()}
        </div>
        <p className="toast-message">{message}</p>
        <button onClick={handleClose} className="toast-close">
          <FaTimes />
        </button>
        {duration > 0 && (
          <div 
            ref={progressRef}
            className="toast-progress"
          />
        )}
      </div>
    </div>
  );
};