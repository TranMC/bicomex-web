import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CartProvider } from './context/CartProvider';
import { ToastProvider } from './context/ToastProvider';
import './App.css';

function App() {
  return (
    <ToastProvider>
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
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ToastProvider>
  );
}

export default App;
