import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaCreditCard, FaMoneyBillWave, FaShieldAlt } from 'react-icons/fa';
import useCart from '../hooks/useCart';
import useToast from '../hooks/useToast';
import '../styles/pages/CheckoutPage.css';

export const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const toast = useToast();
  const navigate = useNavigate();
  
  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    province: '',
    district: '',
    ward: '',
    note: ''
  });
  
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [shippingCost, setShippingCost] = useState(30000);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && !orderComplete) {
      navigate('/gio-hang');
      toast.error('Giỏ hàng của bạn đang trống!');
    }
  }, [cartItems, navigate, toast, orderComplete]);
  
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
  
  // Format price in VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };
  
  // Calculate total
  const calculateTotal = () => {
    return cartTotal + shippingCost;
  };
  
  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ tên';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Vui lòng nhập địa chỉ';
    }
    
    if (!formData.province.trim()) {
      newErrors.province = 'Vui lòng chọn tỉnh/thành phố';
    }
    
    if (!formData.district.trim()) {
      newErrors.district = 'Vui lòng chọn quận/huyện';
    }
    
    if (!formData.ward.trim()) {
      newErrors.ward = 'Vui lòng chọn phường/xã';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Vui lòng kiểm tra lại thông tin!');
      return;
    }
    
    setIsSubmitting(true);
    
    const timer = setTimeout(() => {
      const randomOrderNumber = 'BIC' + Math.floor(100000 + Math.random() * 900000).toString();
      setOrderNumber(randomOrderNumber);
      setOrderComplete(true);
      clearCart();
      
      window.scrollTo(0, 0);
      setIsSubmitting(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  };
  
  const handleContinueShopping = () => {
    navigate('/');
  };
  
  const provinces = ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ'];
  
  const districts = {
    'Hà Nội': ['Ba Đình', 'Hoàn Kiếm', 'Hai Bà Trưng', 'Đống Đa', 'Cầu Giấy'],
    'TP. Hồ Chí Minh': ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 7', 'Thủ Đức'],
    'Đà Nẵng': ['Hải Châu', 'Thanh Khê', 'Liên Chiểu', 'Ngũ Hành Sơn', 'Sơn Trà'],
    'Hải Phòng': ['Hồng Bàng', 'Ngô Quyền', 'Lê Chân', 'Kiến An', 'Hải An'],
    'Cần Thơ': ['Ninh Kiều', 'Bình Thủy', 'Cái Răng', 'Ô Môn', 'Thốt Nốt']
  };
  
  const wards = {
    'Ba Đình': ['Phúc Xá', 'Trúc Bạch', 'Vĩnh Phúc', 'Cống Vị', 'Liễu Giai'],
    'Quận 1': ['Bến Nghé', 'Bến Thành', 'Cầu Kho', 'Cầu Ông Lãnh', 'Phạm Ngũ Lão'],
    'Hải Châu': ['Hải Châu 1', 'Hải Châu 2', 'Thanh Bình', 'Thuận Phước', 'Hòa Cường Bắc'],
    'Hồng Bàng': ['Hoàng Văn Thụ', 'Minh Khai', 'Quán Toan', 'Sở Dầu', 'Thượng Lý'],
    'Ninh Kiều': ['An Hòa', 'An Nghiệp', 'Cái Khế', 'Hưng Lợi', 'Tân An']
  };
  
  const getAvailableDistricts = () => {
    return formData.province ? districts[formData.province] || [] : [];
  };
  
  const getAvailableWards = () => {
    return formData.district ? wards[formData.district] || [] : [];
  };
  
  if (orderComplete) {
    return (
      <div className="checkout-page py-10">
        <div className="container mx-auto px-4">
          <div className="order-complete bg-white rounded-lg shadow-md p-10 text-center max-w-2xl mx-auto">
            <div className="order-complete-icon mb-6">
              <FaCheckCircle className="text-green-500 text-6xl mx-auto" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Đặt hàng thành công!</h1>
            <p className="text-xl mb-2">Cảm ơn bạn đã mua sắm tại Bicomex</p>
            <p className="text-gray-600 mb-8">
              Mã đơn hàng của bạn là: <span className="font-bold">{orderNumber}</span>
            </p>
            <p className="text-gray-600 mb-4">
              Chúng tôi đã gửi email xác nhận đơn hàng tới <span className="font-medium">{formData.email}</span>.
              Bạn có thể kiểm tra email để xem chi tiết đơn hàng.
            </p>
            <p className="text-gray-600 mb-8">
              Đơn hàng sẽ được giao tới bạn trong khoảng thời gian từ 3-5 ngày làm việc.
            </p>
            <button 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
              onClick={handleContinueShopping}
            >
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="checkout-page py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit}>
              {}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold mb-6">Thông tin giao hàng</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="fullName">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="fullName" 
                      name="fullName" 
                      className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Nhập họ và tên" 
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Nhập email" 
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Nhập số điện thoại" 
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                  
                  <div className="form-group md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="address">
                      Địa chỉ <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="address" 
                      name="address" 
                      className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Nhập địa chỉ" 
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="province">
                      Tỉnh/Thành phố <span className="text-red-500">*</span>
                    </label>
                    <select 
                      id="province" 
                      name="province" 
                      className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.province ? 'border-red-500' : 'border-gray-300'}`}
                      value={formData.province}
                      onChange={handleInputChange}
                    >
                      <option value="">Chọn tỉnh/thành phố</option>
                      {provinces.map(province => (
                        <option key={province} value={province}>{province}</option>
                      ))}
                    </select>
                    {errors.province && (
                      <p className="text-red-500 text-sm mt-1">{errors.province}</p>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="district">
                      Quận/Huyện <span className="text-red-500">*</span>
                    </label>
                    <select 
                      id="district" 
                      name="district" 
                      className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.district ? 'border-red-500' : 'border-gray-300'}`}
                      value={formData.district}
                      onChange={handleInputChange}
                      disabled={!formData.province}
                    >
                      <option value="">Chọn quận/huyện</option>
                      {getAvailableDistricts().map(district => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                    {errors.district && (
                      <p className="text-red-500 text-sm mt-1">{errors.district}</p>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="ward">
                      Phường/Xã <span className="text-red-500">*</span>
                    </label>
                    <select 
                      id="ward" 
                      name="ward" 
                      className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.ward ? 'border-red-500' : 'border-gray-300'}`}
                      value={formData.ward}
                      onChange={handleInputChange}
                      disabled={!formData.district}
                    >
                      <option value="">Chọn phường/xã</option>
                      {getAvailableWards().map(ward => (
                        <option key={ward} value={ward}>{ward}</option>
                      ))}
                    </select>
                    {errors.ward && (
                      <p className="text-red-500 text-sm mt-1">{errors.ward}</p>
                    )}
                  </div>
                  
                  <div className="form-group md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="note">
                      Ghi chú
                    </label>
                    <textarea 
                      id="note" 
                      name="note" 
                      rows="3"
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn"
                      value={formData.note}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>
              
              {}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold mb-6">Phương thức vận chuyển</h2>
                
                <div className="space-y-3">
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
                    <div className="font-medium">{formatPrice(30000)}</div>
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
                    <div className="font-medium">{formatPrice(50000)}</div>
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
                    <div className="font-medium">{formatPrice(70000)}</div>
                  </label>
                </div>
              </div>
              
              {}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold mb-6">Phương thức thanh toán</h2>
                
                <div className="space-y-3">
                  <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="cod" 
                      checked={paymentMethod === 'cod'} 
                      onChange={() => setPaymentMethod('cod')} 
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <FaMoneyBillWave className="text-green-500 mr-3 text-xl" />
                      <div>
                        <div className="font-medium">Thanh toán khi nhận hàng (COD)</div>
                        <div className="text-sm text-gray-500">Thanh toán bằng tiền mặt khi nhận hàng</div>
                      </div>
                    </div>
                  </label>
                  
                  <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="bank" 
                      checked={paymentMethod === 'bank'} 
                      onChange={() => setPaymentMethod('bank')} 
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <FaCreditCard className="text-blue-500 mr-3 text-xl" />
                      <div>
                        <div className="font-medium">Chuyển khoản ngân hàng</div>
                        <div className="text-sm text-gray-500">Chuyển khoản đến tài khoản ngân hàng của chúng tôi</div>
                      </div>
                    </div>
                  </label>
                  
                  <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="credit" 
                      checked={paymentMethod === 'credit'} 
                      onChange={() => setPaymentMethod('credit')} 
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <FaCreditCard className="text-red-500 mr-3 text-xl" />
                      <div>
                        <div className="font-medium">Thẻ tín dụng/Ghi nợ</div>
                        <div className="text-sm text-gray-500">Thanh toán an toàn với các loại thẻ Visa, MasterCard, JCB</div>
                      </div>
                    </div>
                  </label>
                </div>
                
                {paymentMethod === 'bank' && (
                  <div className="mt-4 p-4 bg-gray-50 rounded">
                    <h3 className="font-medium mb-2">Thông tin tài khoản</h3>
                    <p className="mb-1">Ngân hàng: <strong>Vietcombank</strong></p>
                    <p className="mb-1">Số tài khoản: <strong>1234567890</strong></p>
                    <p className="mb-1">Chủ tài khoản: <strong>CÔNG TY TNHH BICOMEX</strong></p>
                    <p className="text-sm text-gray-600 mt-2">
                      * Vui lòng ghi nội dung chuyển khoản là "Thanh toán đơn hàng + Số điện thoại"
                    </p>
                  </div>
                )}
              </div>
              
              <div className="mt-8">
                <button 
                  type="submit" 
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 disabled:bg-green-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Đang xử lý...' : 'Hoàn tất đặt hàng'}
                </button>
              </div>
            </form>
          </div>
          
          {}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-6">Đơn hàng của bạn</h2>
              
              <div className="order-items space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex py-4 border-b">
                    <div className="w-16 h-16 mr-4 relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover rounded"
                      />
                      <span className="absolute -top-2 -right-2 bg-gray-200 text-gray-700 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-gray-500 text-xs">{item.brand}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {formatPrice((item.salePrice || item.price) * item.quantity)}
                      </p>
                      {item.salePrice && (
                        <p className="text-gray-500 line-through text-xs">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="order-summary mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="font-medium">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="font-medium">{formatPrice(shippingCost)}</span>
                </div>
                <div className="border-t mt-4 pt-4 flex justify-between">
                  <span className="font-bold">Tổng cộng:</span>
                  <span className="font-bold text-xl text-red-600">{formatPrice(calculateTotal())}</span>
                </div>
              </div>
              
              <div className="payment-security flex items-center justify-center border-t pt-4">
                <FaShieldAlt className="text-green-600 mr-2 text-lg" />
                <span className="text-sm text-gray-600">Thanh toán an toàn & bảo mật</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};