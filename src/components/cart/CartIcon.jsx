import { FaShoppingCart } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartProvider';
import './CartIcon.css';

export const CartIcon = () => {
  const { cartItems, cartCount, cartTotal, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Format price in VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="cart-icon-container relative" ref={dropdownRef}>
      <button 
        className="cart-icon-button relative p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Giỏ hàng"
      >
        <FaShoppingCart className="text-xl" />
        {cartCount > 0 && (
          <span className="cart-count absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="cart-dropdown absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10 overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="text-lg font-medium">Giỏ hàng ({cartCount})</h3>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              Giỏ hàng trống
            </div>
          ) : (
            <>
              <div className="max-h-80 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item flex p-4 border-b hover:bg-gray-50">
                    <div className="flex-shrink-0 w-16 h-16 mr-4">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <div>
                          <span className="text-sm text-gray-600">{item.quantity} x </span>
                          <span className="text-sm font-medium">
                            {formatPrice(item.salePrice || item.price)}
                          </span>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 text-xs hover:text-red-700"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Tổng cộng:</span>
                  <span className="font-bold text-lg">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex gap-2">
                  <Link 
                    to="/gio-hang" 
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded text-center font-medium hover:bg-blue-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Xem giỏ hàng
                  </Link>
                  <Link 
                    to="/thanh-toan" 
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded text-center font-medium hover:bg-green-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Thanh toán
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};