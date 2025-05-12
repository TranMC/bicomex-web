import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartProvider } from './context/CartProvider';
import { ToastProvider } from './context/ToastProvider';
import { AuthProvider } from './context/AuthProvider';
import { ConfirmProvider } from './context/ConfirmContext';
import './App.css';

// Import trực tiếp trang HomePage để tránh lỗi lazy loading
import { HomePage } from './pages/HomePage';

// ErrorBoundary component cho Suspense
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container p-4 bg-red-100 text-red-700 rounded-lg">
          <h2>Đã xảy ra lỗi khi tải trang</h2>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Thử lại
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Loading fallback
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-[50vh]">
    <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
  </div>
);

function App() {
  const [isErrored, setIsErrored] = useState(false);

  // Xử lý lỗi
  const handleError = (error) => {
    console.error("App error:", error);
    setIsErrored(true);
  };

  // Reset lỗi
  const resetError = () => {
    setIsErrored(false);
  };

  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <ConfirmProvider>
              <div className="app">
                <Header />
                <main className="main-content">
                  {isErrored ? (
                    <div className="error-container p-4 bg-red-100 text-red-700 rounded-lg">
                      <h2>Đã xảy ra lỗi khi tải trang</h2>
                      <button 
                        onClick={resetError}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                      >
                        Thử lại
                      </button>
                    </div>
                  ) : (
                    <Routes>
                      {/* Sử dụng import trực tiếp cho HomePage */}
                      <Route path="/" element={<HomePage />} />
                      {/* Những trang khác có thể thêm sau khi đã fix được lỗi */}
                    </Routes>
                  )}
                </main>
                <Footer />
              </div>
            </ConfirmProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
