import React from 'react';
import { FaExclamationTriangle, FaHome, FaRefresh } from 'react-icons/fa';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidUpdate(prevProps) {
    // Reset error boundary when location changes
    if (prevProps.location !== this.props.location) {
      this.setState({ 
        hasError: false, 
        error: null, 
        errorInfo: null,
        retryCount: 0 
      });
    }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // In production, you might want to log to an error reporting service
    // logErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState(prevState => ({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }));
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback, showDetails = false } = this.props;
      
      if (Fallback) {
        return <Fallback 
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onRetry={this.handleRetry}
        />;
      }

      return (
        <div className="error-boundary">
          <div className="error-container">
            <div className="error-icon">
              <FaExclamationTriangle />
            </div>
            
            <div className="error-content">
              <h2 className="error-title">Oops! Có lỗi xảy ra</h2>
              <p className="error-message">
                Xin lỗi, đã có lỗi không mong muốn xảy ra. Vui lòng thử lại hoặc quay về trang chủ.
              </p>
              
              {showDetails && this.state.error && (
                <details className="error-details">
                  <summary>Chi tiết lỗi (cho developer)</summary>
                  <div className="error-stack">
                    <strong>Error:</strong> {this.state.error.toString()}
                    <br />
                    <strong>Stack trace:</strong>
                    <pre>{this.state.errorInfo.componentStack}</pre>
                  </div>
                </details>
              )}
            </div>
            
            <div className="error-actions">
              <button 
                className="btn btn-primary"
                onClick={this.handleRetry}
                disabled={this.state.retryCount >= 3}
              >
                <FaRefresh /> 
                {this.state.retryCount >= 3 ? 'Đã thử tối đa' : 'Thử lại'}
              </button>
              
              <button 
                className="btn btn-outline"
                onClick={this.handleGoHome}
              >
                <FaHome /> Về trang chủ
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
