import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import useCart from '../hooks/useCart';
import useToast from '../hooks/useToast';
import '../styles/pages/CartPage.css';

export const CartPage = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const toast = useToast();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [shippingCost, setShippingCost] = useState(30000); // Default shipping cost

  // Format price in VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Calculate shipping cost based on selected method
  useEffect(() => {
    switch (shippingMethod) {
      case 'express':
        setShippingCost(50000);
        break;
      case 'sameday':
        setShippingCost(70000);
        break;
      default:
        setShippingCost(30000);
    }
  }, [shippingMethod]);

  // Calculate total with shipping and discount
  const calculateFinalTotal = () => {
    return cartTotal + shippingCost - discount;
  };

  // Handle quantity change
  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
      // Show confirmation before removing item
      if (window.confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?')) {
        removeFromCart(item.id);
        toast.success(`Đã xóa ${item.name} khỏi giỏ hàng!`);
      }
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  // Handle direct input of quantity
  const handleQuantityInput = (item, e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      if (value <= 0) {
        if (window.confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?')) {
          removeFromCart(item.id);
          toast.success(`Đã xóa ${item.name} khỏi giỏ hàng!`);
        }
      } else {
        updateQuantity(item.id, value);
      }
    }
  };

  // Handle remove item
  const handleRemoveItem = (item) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?')) {
      removeFromCart(item.id);
      toast.success(`Đã xóa ${item.name} khỏi giỏ hàng!`);
    }
  };

  // Handle clear cart
  const handleClearCart = () => {
    if (window.confirm('Bạn có chắc muốn xóa tất cả sản phẩm khỏi giỏ hàng?')) {
      clearCart();
      toast.success('Đã xóa tất cả sản phẩm khỏi giỏ hàng!');
    }
  };

  // Handle apply coupon
  const handleApplyCoupon = () => {
    setIsApplyingCoupon(true);
    
    // Simulate API call with timeout
    const timer = setTimeout(() => {
      if (couponCode.toUpperCase() === 'BICOMEX10') {
        const discountAmount = Math.round(cartTotal * 0.5); // 10% discount
        setDiscount(discountAmount);
        toast.success(`Đã áp dụng mã giảm giá: Giảm ${formatPrice(discountAmount)}`);
      } else if (couponCode.toUpperCase() === 'WELCOME50K') {
        setDiscount(500000);
        toast.success('Đã áp dụng mã giảm giá: Giảm 500.000₫');
      } else {
        toast.error('Mã giảm giá không hợp lệ hoặc đã hết hạn!');
      }
      setIsApplyingCoupon(false);
    }, 800);
    
    // Cleanup timer if component unmounts during the timeout
    return () => clearTimeout(timer);
  };

  // Handle proceed to checkout
  const handleProceedToCheckout = () => {
    navigate('/thanh-toan');
  };


  if (cartItems.length === 0) {
    return (
      <div className="cart-page py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Giỏ hàng</h1>
          
          <div className="empty-cart bg-white rounded-lg shadow-md p-10 text-center">
            <div className="empty-cart-icon mb-6">
              <FaShoppingCart className="text-gray-300 text-6xl mx-auto" />
            </div>
            <h2 className="text-2xl font-medium mb-4">Giỏ hàng của bạn đang trống</h2>
            <p className="text-gray-600 mb-8">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
            <Link 
              to="/san-pham" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 inline-block"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Giỏ hàng</h1>
          <button 
            className="text-red-500 flex items-center hover:text-red-700"
            onClick={handleClearCart}
          >
            <FaTrash className="mr-2" />
            <span>Xóa tất cả</span>
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="py-4 px-6 text-left">Sản phẩm</th>
                    <th className="py-4 px-6 text-center">Giá</th>
                    <th className="py-4 px-6 text-center">Số lượng</th>
                    <th className="py-4 px-6 text-center">Tổng</th>
                    <th className="py-4 px-6 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-16 h-16 object-cover rounded mr-4"
                          />
                          <div>
                            <Link 
                              to={`/san-pham/${item.slug}`} 
                              className="font-medium hover:text-blue-600"
                            >
                              {item.name}
                            </Link>
                            {item.brand && (
                              <p className="text-sm text-gray-500">Thương hiệu: {item.brand}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        {item.salePrice ? (
                          <div>
                            <span className="font-medium">{formatPrice(item.salePrice)}</span>
                            <span className="text-gray-500 line-through text-sm block">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                        ) : (
                          <span className="font-medium">{formatPrice(item.price)}</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center">
                          <button 
                            className="w-8 h-8 flex items-center justify-center border rounded-l hover:bg-gray-100"
                            onClick={() => handleQuantityChange(item, -1)}
                          >
                            <FaMinus size={12} />
                          </button>
                          <input 
                            type="number" 
                            min="1" 
                            value={item.quantity} 
                            onChange={(e) => handleQuantityInput(item, e)}
                            className="w-12 h-8 border-t border-b text-center"
                          />
                          <button 
                            className="w-8 h-8 flex items-center justify-center border rounded-r hover:bg-gray-100"
                            onClick={() => handleQuantityChange(item, 1)}
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center font-medium">
                        {formatPrice((item.salePrice || item.price) * item.quantity)}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleRemoveItem(item)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex items-center">
              <Link to="/san-pham" className="flex items-center text-blue-600 hover:text-blue-800">
                <FaArrowLeft className="mr-2" />
                <span>Tiếp tục mua sắm</span>
              </Link>
            </div>
          </div>
          
          {}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Tóm tắt đơn hàng</h2>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="font-medium">{formatPrice(cartTotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Giảm giá:</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="font-medium">{formatPrice(shippingCost)}</span>
                </div>
                <div className="border-t mt-4 pt-4 flex justify-between">
                  <span className="font-bold">Tổng cộng:</span>
                  <span className="font-bold text-xl text-red-600">{formatPrice(calculateFinalTotal())}</span>
                </div>
              </div>
              
              <div className="shipping-options mb-6">
                <h3 className="font-medium mb-3">Phương thức vận chuyển</h3>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                    <input 
                      type="radio" 
                      name="shipping" 
                      value="standard" 
                      checked={shippingMethod === 'standard'} 
                      onChange={() => setShippingMethod('standard')} 
                      className="mr-3"
                    />
                    <div className="flex-grow">
                      <div className="font-medium">Giao hàng tiêu chuẩn</div>
                      <div className="text-sm text-gray-500">Nhận hàng trong 3-5 ngày</div>
                    </div>
                    <div className="font-medium">30.000₫</div>
                  </label>
                  
                  <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                    <input 
                      type="radio" 
                      name="shipping" 
                      value="express" 
                      checked={shippingMethod === 'express'} 
                      onChange={() => setShippingMethod('express')} 
                      className="mr-3"
                    />
                    <div className="flex-grow">
                      <div className="font-medium">Giao hàng nhanh</div>
                      <div className="text-sm text-gray-500">Nhận hàng trong 1-2 ngày</div>
                    </div>
                    <div className="font-medium">50.000₫</div>
                  </label>
                  
                  <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                    <input 
                      type="radio" 
                      name="shipping" 
                      value="sameday" 
                      checked={shippingMethod === 'sameday'} 
                      onChange={() => setShippingMethod('sameday')} 
                      className="mr-3"
                    />
                    <div className="flex-grow">
                      <div className="font-medium">Giao hàng trong ngày</div>
                      <div className="text-sm text-gray-500">Nhận hàng trong 24 giờ</div>
                    </div>
                    <div className="font-medium">70.000₫</div>
                  </label>
                </div>
              </div>
              
              <div className="coupon-code mb-6">
                <h3 className="font-medium mb-3">Mã giảm giá</h3>
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="Nhập mã giảm giá" 
                    className="flex-grow px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 disabled:bg-blue-300"
                    onClick={handleApplyCoupon}
                    disabled={isApplyingCoupon || !couponCode}
                  >
                    {isApplyingCoupon ? 'Đang áp dụng...' : 'Áp dụng'}
                  </button>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  * Nhập mã "BICOMEX10" để được giảm 50%, "WELCOME50K" để giảm 500.000₫
                </div>
              </div>
              
              <button 
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700"
                onClick={handleProceedToCheckout}
              >
                Tiến hành thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};