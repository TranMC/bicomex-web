import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartProvider } from './context/CartProvider';
import { ToastProvider } from './context/ToastProvider';
import { AuthProvider } from './context/AuthProvider';
import { ConfirmProvider } from './context/ConfirmContext';
import './App.css';

// Import các trang
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ContactPage } from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import { NewsPage } from './pages/NewsPage';
import { OrdersPage } from './pages/OrdersPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import ProductPage from './pages/ProductPage';
import { ProfilePage } from './pages/ProfilePage';
import { PromotionsPage } from './pages/PromotionsPage';
import RegisterPage from './pages/RegisterPage';
import { SettingsPage } from './pages/SettingsPage';
import { PolicyPage } from './pages/PolicyPage';

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
