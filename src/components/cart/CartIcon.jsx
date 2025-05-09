import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import useCart from '../../hooks/useCart';
import '../../styles/components/CartIcon.css';

export const CartIcon = () => {
  const { cartItems, cartTotal, removeFromCart } = useCart();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isHoveringCartIcon, setIsHoveringCartIcon] = useState(false);
  const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);
  const [dropdownManuallyOpened, setDropdownManuallyOpened] = useState(false);

  const dropdownRef = useRef(null);
  const cartIconContainerRef = useRef(null); 
  const hideDropdownTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cartIconContainerRef.current &&
        !cartIconContainerRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
        setDropdownManuallyOpened(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (showDropdown) {
        setShowDropdown(false);
        setDropdownManuallyOpened(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showDropdown]);

  useEffect(() => {
    // Clear any existing timeout when dependencies change
    if (hideDropdownTimeoutRef.current) {
      clearTimeout(hideDropdownTimeoutRef.current);
    }

    if (isHoveringCartIcon || isHoveringDropdown) {
      setShowDropdown(true);
    } else if (!dropdownManuallyOpened) {
      // Only set timeout to hide if not manually opened and not hovering
      hideDropdownTimeoutRef.current = setTimeout(() => {
        setShowDropdown(false);
      }, 300); // Delay before hiding
    }

    // Cleanup timeout on unmount or when dependencies change
    return () => {
      if (hideDropdownTimeoutRef.current) {
        clearTimeout(hideDropdownTimeoutRef.current);
      }
    };
  }, [isHoveringCartIcon, isHoveringDropdown, dropdownManuallyOpened]);


  const handleCartIconMouseEnter = () => {
    setIsHoveringCartIcon(true);
  };

  const handleCartIconMouseLeave = () => {
    setIsHoveringCartIcon(false);
  };

  const handleDropdownMouseEnter = () => {
    setIsHoveringDropdown(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsHoveringDropdown(false);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newShowState = !showDropdown;
    setShowDropdown(newShowState);
    setDropdownManuallyOpened(newShowState); // If we toggle it on, it's manually opened
  };

  const handleNavigate = (path) => {
    setShowDropdown(false);
    setDropdownManuallyOpened(false);
    navigate(path);
  };
  
  const handleViewCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleNavigate('/gio-hang');
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleNavigate('/thanh-toan');
  };

  const handleRemoveItem = (e, itemId) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromCart(itemId);
    // Keep dropdown open after removing an item if it was manually opened or still hovering
    if (dropdownManuallyOpened || isHoveringCartIcon || isHoveringDropdown) {
        setShowDropdown(true);
    }
  };

  return (
    <div
      className="cart-icon-container relative" // Changed class name for clarity
      ref={cartIconContainerRef}
      onMouseEnter={handleCartIconMouseEnter}
      onMouseLeave={handleCartIconMouseLeave}
      style={{ zIndex: 99998 }} 
    >
      <div
        className="cart-icon flex items-center text-white cursor-pointer"
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleDropdown(e);}}
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
        <div
          className="cart-dropdown absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl"
          ref={dropdownRef}
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside dropdown from closing it via handleClickOutside
          style={{ zIndex: 99999, animation: 'none', transition: 'none' }} // Increased z-index
        >
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
                        onClick={() => handleNavigate(`/san-pham/${item.slug}`)}
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
                          aria-label={`Xóa ${item.name} khỏi giỏ hàng`}
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