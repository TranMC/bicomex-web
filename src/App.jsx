import React, { useState, useEffect, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartProvider } from './context/CartProvider';
import { ToastProvider } from './context/ToastProvider';
import { AuthProvider } from './context/AuthProvider';
import { ConfirmProvider } from './context/ConfirmContext';
import usePerformanceMetrics from './hooks/usePerformanceMetrics';
import PerformancePanel from './components/debug/PerformancePanel';
import CoreWebVitalsMonitor from './components/debug/CoreWebVitalsMonitor';
import ResourceHints from './components/optimization/ResourceHints';
import PWAInstallPrompt from './components/pwa/PWAInstallPrompt';
import { initializeOptimizations } from './utils/optimizationUtils';
import './App.css';

// Import HomePage ngay lập tức (critical page)
import { HomePage } from './pages/HomePage';

// Lazy load các trang khác để giảm bundle size ban đầu
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const CartPage = lazy(() => import('./pages/CartPage').then(module => ({ default: module.CartPage })));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage').then(module => ({ default: module.CheckoutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const NewsPage = lazy(() => import('./pages/NewsPage').then(module => ({ default: module.NewsPage })));
const OrdersPage = lazy(() => import('./pages/OrdersPage').then(module => ({ default: module.OrdersPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then(module => ({ default: module.ProductDetailPage })));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(module => ({ default: module.ProfilePage })));
const PromotionsPage = lazy(() => import('./pages/PromotionsPage').then(module => ({ default: module.PromotionsPage })));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage').then(module => ({ default: module.SettingsPage })));
const PolicyPage = lazy(() => import('./pages/PolicyPage').then(module => ({ default: module.PolicyPage })));
const AddressesPage = lazy(() => import('./pages/AddressesPage').then(module => ({ default: module.AddressesPage })));

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

// Enhanced Loading fallback với better UX
const LoadingFallback = () => (
  <div className="flex flex-col justify-center items-center min-h-[50vh] bg-gray-50">
    <div className="relative">
      <div className="w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
      <div className="w-12 h-12 rounded-full border-4 border-blue-300 border-b-transparent animate-spin absolute top-2 left-2" style={{animationDirection: 'reverse', animationDuration: '0.8s'}}></div>
    </div>
    <p className="mt-4 text-gray-600 font-medium">Đang tải trang...</p>
    <div className="mt-2 w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full bg-blue-500 rounded-full animate-pulse"></div>
    </div>
  </div>
);

function App() {
  const [isErrored, setIsErrored] = useState(false);
  const { sendMetrics, getPerformanceGrade } = usePerformanceMetrics();

  // Reset lỗi
  const resetError = () => {
    setIsErrored(false);
  };
    // Performance monitoring chỉ hoạt động trong production
  useEffect(() => {
    // Initialize optimizations
    initializeOptimizations();
    
    // Chỉ chạy performance monitoring trong production
    if (import.meta.env.PROD) {
      const timer = setTimeout(() => {
        sendMetrics();
        const grade = getPerformanceGrade();
        
        // Log performance grade
        console.log(`🎯 Performance Grade: ${grade}/100`);
      }, 3000); // Đợi 3 giây để metrics ổn định

      return () => clearTimeout(timer);
    }
  }, [sendMetrics, getPerformanceGrade]);
  return (
    <Router>
      {/* ResourceHints chỉ hoạt động trong production */}
      {!import.meta.env.DEV && <ResourceHints />}
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
                    <Suspense fallback={<LoadingFallback />}>
                      <Routes>
                        {/* Trang chính */}
                        <Route path="/" element={<HomePage />} />
                        
                        {/* Trang thông tin */}
                        <Route path="/gioi-thieu" element={<AboutPage />} />
                        <Route path="/lien-he" element={<ContactPage />} />
                        <Route path="/tin-tuc" element={<NewsPage />} />
                        <Route path="/khuyen-mai" element={<PromotionsPage />} />
                        
                        {/* Trang sản phẩm */}
                        <Route path="/san-pham" element={<ProductPage />} />
                        <Route path="/san-pham/:id" element={<ProductDetailPage />} />
                        
                        {/* Trang người dùng */}
                        <Route path="/dang-nhap" element={<LoginPage />} />
                        <Route path="/dang-ky" element={<RegisterPage />} />
                        <Route path="/tai-khoan" element={<ProfilePage />} />
                        <Route path="/so-dia-chi" element={<AddressesPage />} />
                        <Route path="/cai-dat" element={<SettingsPage />} />
                        <Route path="/don-hang" element={<OrdersPage />} />
                        
                        {/* Trang giỏ hàng và thanh toán */}
                        <Route path="/gio-hang" element={<CartPage />} />
                        <Route path="/thanh-toan" element={<CheckoutPage />} />
                        
                        {/* Trang chính sách */}
                        <Route path="/chinh-sach/thanh-toan" element={<PolicyPage type="payment" />} />
                        <Route path="/chinh-sach/van-chuyen" element={<PolicyPage type="shipping" />} />
                        <Route path="/chinh-sach/bao-hanh" element={<PolicyPage type="warranty" />} />
                        <Route path="/chinh-sach/doi-tra" element={<PolicyPage type="return" />} />
                        <Route path="/chinh-sach/bao-mat" element={<PolicyPage type="privacy" />} />
                      </Routes>
                    </Suspense>
                  )}
                </main>
                <Footer />              </div>
              {/* Core Web Vitals Monitor chỉ hiển thị trong development */}
              {import.meta.env.DEV && <CoreWebVitalsMonitor />}
              {/* PWA Install Prompt chỉ hiển thị trong production */}
              {!import.meta.env.DEV && <PWAInstallPrompt />}
            </ConfirmProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
