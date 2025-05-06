import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import { useCart } from '../../context/CartProvider';
import './CartIcon.css';

export const CartIcon = () => {
  const { cartItems, cartTotal, removeFromCart } = useCart();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Format price in VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle view cart button click
  const handleViewCart = () => {
    setShowDropdown(false);
    navigate('/gio-hang');
  };

  // Handle checkout button click
  const handleCheckout = () => {
    setShowDropdown(false);
    navigate('/thanh-toan');
  };

  // Handle remove item
  const handleRemoveItem = (e, itemId) => {
    e.stopPropagation();
    removeFromCart(itemId);
  };

  return (
    <div className="cart-icon relative" ref={dropdownRef}>
          <div 
        className="flex items-center text-white cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className="cart-count relative p-2">
          <FaShoppingCart className="text-2xl" />
          <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
            {cartItems.length}
          </span>
        </div>
        <div className="cart-info ml-2">
          <div className="text-xs">Giỏ hàng</div>
          <div className="font-bold text-sm">
            {cartItems.length > 0 ? (
              <span>({cartItems.length}) sản phẩm</span>
            ) : (
              <span>(0) sản phẩm</span>
            )}
          </div>
        </div>
      </div>

      {showDropdown && (
        <div className="cart-dropdown absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50">
          <div className="cart-header border-b p-3">
            <h3 className="text-lg font-medium">Giỏ hàng ({cartItems.length})</h3>
          </div>
          
          <div className="cart-items max-h-[300px] overflow-y-auto p-3">
            {cartItems.length === 0 ? (
              <div className="empty-cart text-center py-6">
                <p className="text-gray-500">Giỏ hàng của bạn đang trống</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item flex items-center p-2 hover:bg-gray-50 rounded">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-14 h-14 object-cover rounded" 
                    />
                    <div className="flex-1 ml-3">
                      <Link 
                        to={`/san-pham/${item.slug}`} 
                        className="text-sm font-medium hover:text-blue-600 line-clamp-2"
                        onClick={() => setShowDropdown(false)}
                      >
                        {item.name}
                      </Link>
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-sm">
                          <span>{item.quantity} x </span>
                          <span className="font-medium text-green-600">
                            {formatPrice(item.salePrice || item.price)}
                          </span>
                        </div>
                        <button 
                          className="text-red-500 hover:text-red-700"
                          onClick={(e) => handleRemoveItem(e, item.id)}
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {cartItems.length > 0 && (
            <>
              <div className="cart-subtotal border-t border-b p-3 flex justify-between">
                <span className="font-medium">Tạm tính:</span>
                <span className="font-bold text-green-600">{formatPrice(cartTotal)}</span>
              </div>
              
              <div className="cart-actions p-3 flex flex-col gap-2">
                <button 
                  className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors"
                  onClick={handleViewCart}
                >
                  Xem giỏ hàng
                </button>
                <button 
                  className="w-full bg-green-500 text-white py-2 rounded font-medium hover:bg-green-600 transition-colors"
                  onClick={handleCheckout}
                >
                  Thanh toán
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};