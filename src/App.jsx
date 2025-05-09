import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { CartProvider } from './context/CartProvider';
import { ToastProvider } from './context/ToastProvider';
import { AuthProvider } from './context/AuthProvider';
import './App.css';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="App min-h-screen flex flex-col w-full">
              <Header />
              <div className="flex-grow w-full">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/san-pham/:category" element={<ProductPage />} />
                  <Route path="/san-pham/:category/:slug" element={<ProductDetailPage />} />
                  <Route path="/san-pham/:slug" element={<ProductDetailPage />} />
                  <Route path="/gio-hang" element={<CartPage />} />
                  <Route path="/thanh-toan" element={<CheckoutPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
