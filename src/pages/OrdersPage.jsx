import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaAddressCard, FaShoppingBag, FaCog, FaSearch, FaEye, FaFileInvoice } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import '../styles/pages/OrdersPage.css';

// Dữ liệu mẫu đơn hàng
const dummyOrders = [
  {
    id: 'DH001',
    date: '2023-11-01',
    total: 3500000,
    status: 'completed',
    items: [
      { id: 1, name: 'Sơn nước OEXPO', quantity: 2, price: 310000 },
      { id: 5, name: 'Sơn nước Dulux Hight Gloss', quantity: 1, price: 2300000 }
    ]
  },
  {
    id: 'DH002',
    date: '2023-10-25',
    total: 4250000,
    status: 'shipping',
    items: [
      { id: 6, name: 'Sơn nước Dulux Stain Block', quantity: 2, price: 2100000 }
    ]
  },
  {
    id: 'DH003',
    date: '2023-10-15',
    total: 1380000,
    status: 'processing',
    items: [
      { id: 3, name: 'Sơn nước OEXPO', quantity: 1, price: 310000 },
      { id: 7, name: 'Sơn nước JOTUN Majestic', quantity: 1, price: 1200000 }
    ]
  },
  {
    id: 'DH004',
    date: '2023-09-28',
    total: 265000,
    status: 'cancelled',
    items: [
      { id: 1, name: 'Xi măng Portland PC40', quantity: 3, price: 85000 }
    ]
  }
];

export const OrdersPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      // Giả lập lấy dữ liệu từ API
      setTimeout(() => {
        setOrders(dummyOrders);
        setFilteredOrders(dummyOrders);
        setIsLoading(false);
      }, 1000);
    }
  }, [isAuthenticated, navigate]);

  // Lọc đơn hàng theo trạng thái và từ khóa tìm kiếm
  useEffect(() => {
    let result = orders;
    
    // Lọc theo trạng thái
    if (filter !== 'all') {
      result = result.filter(order => order.status === filter);
    }
    
    // Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      result = result.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredOrders(result);
  }, [filter, searchTerm, orders]);

  // Format giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Format ngày
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
  };

  // Hiển thị trạng thái đơn hàng
  const getStatusLabel = (status) => {
    switch(status) {
      case 'completed':
        return { text: 'Đã giao hàng', class: 'status-completed' };
      case 'shipping':
        return { text: 'Đang vận chuyển', class: 'status-shipping' };
      case 'processing':
        return { text: 'Đang xử lý', class: 'status-processing' };
      case 'cancelled':
        return { text: 'Đã hủy', class: 'status-cancelled' };
      default:
        return { text: 'Không xác định', class: '' };
    }
  };

  // Xem chi tiết đơn hàng
  const handleViewOrderDetail = (order) => {
    setSelectedOrder(order);
  };

  // Đóng modal chi tiết đơn hàng
  const closeOrderDetail = () => {
    setSelectedOrder(null);
  };

  // Các menu tab
  const tabs = [
    { id: 'info', label: 'Thông tin tài khoản', icon: <FaUser /> },
    { id: 'addresses', label: 'Sổ địa chỉ', icon: <FaAddressCard /> },
    { id: 'orders', label: 'Đơn hàng của tôi', icon: <FaShoppingBag /> },
    { id: 'settings', label: 'Cài đặt tài khoản', icon: <FaCog /> },
  ];

  return (
    <div className="orders-page">
      <div className="container">
        <div className="orders-content">
          <div className="profile-sidebar">
            <div className="user-info">
              <div className="user-avatar">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <div className="avatar-placeholder">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
              </div>
              <div className="user-details">
                <h3>{user?.name || 'Người dùng'}</h3>
                <p>{user?.email || ''}</p>
              </div>
            </div>
            
            <nav className="profile-navigation">
              <ul>
                <li>
                  <Link 
                    to="/ho-so"
                    className={false ? 'active' : ''}
                  >
                    <span className="nav-icon"><FaUser /></span>
                    <span className="nav-label">Thông tin tài khoản</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/so-dia-chi"
                    className={false ? 'active' : ''}
                  >
                    <span className="nav-icon"><FaAddressCard /></span>
                    <span className="nav-label">Sổ địa chỉ</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/don-hang"
                    className="active"
                  >
                    <span className="nav-icon"><FaShoppingBag /></span>
                    <span className="nav-label">Đơn hàng của tôi</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/cai-dat"
                    className={false ? 'active' : ''}
                  >
                    <span className="nav-icon"><FaCog /></span>
                    <span className="nav-label">Cài đặt tài khoản</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          
          <div className="orders-main">
            <div className="orders-header">
              <h2>Đơn hàng của tôi</h2>
              <div className="orders-search">
                <div className="search-input">
                  <FaSearch className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Tìm đơn theo mã hoặc tên" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="orders-filters">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`} 
                onClick={() => setFilter('all')}
              >
                Tất cả
              </button>
              <button 
                className={`filter-btn ${filter === 'processing' ? 'active' : ''}`} 
                onClick={() => setFilter('processing')}
              >
                Đang xử lý
              </button>
              <button 
                className={`filter-btn ${filter === 'shipping' ? 'active' : ''}`} 
                onClick={() => setFilter('shipping')}
              >
                Đang vận chuyển
              </button>
              <button 
                className={`filter-btn ${filter === 'completed' ? 'active' : ''}`} 
                onClick={() => setFilter('completed')}
              >
                Đã giao hàng
              </button>
              <button 
                className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`} 
                onClick={() => setFilter('cancelled')}
              >
                Đã hủy
              </button>
            </div>
            
            <div className="orders-list">
              {isLoading ? (
                <div className="loading">
                  <div className="spinner"></div>
                  <p>Đang tải đơn hàng...</p>
                </div>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-id">
                        <span className="label">Mã đơn hàng:</span>
                        <span className="value">{order.id}</span>
                      </div>
                      <div className={`order-status ${getStatusLabel(order.status).class}`}>
                        {getStatusLabel(order.status).text}
                      </div>
                    </div>
                    
                    <div className="order-body">
                      <div className="order-item-preview">
                        {order.items.slice(0, 1).map(item => (
                          <div key={item.id} className="order-item">
                            <span className="item-name">{item.name}</span>
                            <span className="item-quantity">x{item.quantity}</span>
                          </div>
                        ))}
                        {order.items.length > 1 && (
                          <div className="more-items">
                            + {order.items.length - 1} sản phẩm khác
                          </div>
                        )}
                      </div>
                      
                      <div className="order-info">
                        <div className="order-date">
                          <span className="label">Ngày đặt:</span>
                          <span className="value">{formatDate(order.date)}</span>
                        </div>
                        <div className="order-total">
                          <span className="label">Tổng tiền:</span>
                          <span className="value">{formatPrice(order.total)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="order-actions">
                      <button 
                        className="view-detail-btn"
                        onClick={() => handleViewOrderDetail(order)}
                      >
                        <FaEye /> Xem chi tiết
                      </button>
                      
                      {order.status === 'completed' && (
                        <button className="invoice-btn">
                          <FaFileInvoice /> Hóa đơn
                        </button>
                      )}
                      
                      {order.status === 'processing' && (
                        <button className="cancel-btn">
                          Hủy đơn hàng
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-orders">
                  <div className="empty-icon">
                    <FaShoppingBag />
                  </div>
                  <h3>Không tìm thấy đơn hàng nào</h3>
                  <p>Bạn chưa có đơn hàng nào hoặc không có đơn hàng nào phù hợp với bộ lọc.</p>
                  <Link to="/san-pham" className="shop-now-btn">
                    Mua sắm ngay
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal chi tiết đơn hàng */}
      {selectedOrder && (
        <div className="order-detail-modal">
          <div className="modal-backdrop" onClick={closeOrderDetail}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Chi tiết đơn hàng #{selectedOrder.id}</h3>
              <button className="close-btn" onClick={closeOrderDetail}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="order-status-detail">
                <span className="label">Trạng thái:</span>
                <span className={`status-value ${getStatusLabel(selectedOrder.status).class}`}>
                  {getStatusLabel(selectedOrder.status).text}
                </span>
              </div>
              
              <div className="order-info-detail">
                <div className="info-row">
                  <span className="label">Ngày đặt hàng:</span>
                  <span className="value">{formatDate(selectedOrder.date)}</span>
                </div>
                <div className="info-row">
                  <span className="label">Tổng giá trị:</span>
                  <span className="value">{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>
              
              <div className="order-items-detail">
                <h4>Các sản phẩm trong đơn hàng</h4>
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th>Đơn giá</th>
                      <th>Số lượng</th>
                      <th>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map(item => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{formatPrice(item.price)}</td>
                        <td>{item.quantity}</td>
                        <td>{formatPrice(item.price * item.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" className="total-label">Tổng cộng</td>
                      <td className="total-value">{formatPrice(selectedOrder.total)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="close-modal-btn" onClick={closeOrderDetail}>
                Đóng
              </button>
              
              {selectedOrder.status === 'completed' && (
                <button className="invoice-btn">
                  <FaFileInvoice /> Xem hóa đơn
                </button>
              )}
              
              {selectedOrder.status === 'processing' && (
                <button className="cancel-btn">
                  Hủy đơn hàng
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 