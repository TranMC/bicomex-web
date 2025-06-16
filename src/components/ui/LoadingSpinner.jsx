import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary', 
  text = 'Đang tải...', 
  fullscreen = false,
  overlay = false 
}) => {
  const sizeClasses = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large'
  };

  const colorClasses = {
    primary: 'spinner-primary',
    secondary: 'spinner-secondary',
    white: 'spinner-white'
  };

  const spinnerClass = `loading-spinner ${sizeClasses[size]} ${colorClasses[color]}`;

  const content = (
    <div className="spinner-container">
      <div 
        className={spinnerClass}
        role="status" 
        aria-label={text}
      >
        <div className="spinner-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      {text && (
        <div className="spinner-text" aria-live="polite">
          {text}
        </div>
      )}
    </div>
  );

  if (fullscreen) {
    return (
      <div className="spinner-fullscreen">
        {content}
      </div>
    );
  }

  if (overlay) {
    return (
      <div className="spinner-overlay">
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;
