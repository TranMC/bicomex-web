import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartProvider } from './context/CartProvider';
import { ToastProvider } from './context/ToastProvider';
import { AuthProvider } from './context/AuthProvider';
import { ConfirmProvider } from './context/ConfirmContext';
import './App.css';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const PromotionsPage = lazy(() => import('./pages/PromotionsPage'));

// Loading fallback
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-[50vh]">
    <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
  </div>
);

function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <ConfirmProvider>
              <div className="app">
                <Header />
                <main className="main-content">
                  <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/san-pham" element={<ProductPage />} />
                      <Route path="/san-pham/:slug" element={<ProductDetailPage />} />
                      <Route path="/gio-hang" element={<CartPage />} />
                      <Route path="/thanh-toan" element={<CheckoutPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/ho-so" element={<ProfilePage />} />
                      <Route path="/don-hang" element={<OrdersPage />} />
                      <Route path="/so-dia-chi" element={<ProfilePage />} />
                      <Route path="/cai-dat" element={<SettingsPage />} />
                      <Route path="/gioi-thieu" element={<AboutPage />} />
                      <Route path="/lien-he" element={<ContactPage />} />
                      <Route path="/tin-tuc" element={<NewsPage />} />
                      <Route path="/khuyen-mai-hot" element={<PromotionsPage />} />
                    </Routes>
                  </Suspense>
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
