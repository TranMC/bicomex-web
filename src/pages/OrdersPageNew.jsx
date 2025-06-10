import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaSearch, FaEye, FaFileInvoice, FaShoppingBag } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import AccountLayout from '../components/account/AccountLayout';
import '../styles/pages/OrdersPageNew.css';

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
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
    if (!isAuthenticated) {
      navigate('/dang-nhap');
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
      const searchTermLower = searchTerm.toLowerCase();
      result = result.filter(order => 
        order.id.toLowerCase().includes(searchTermLower) ||
        order.items.some(item => item.name.toLowerCase().includes(searchTermLower))
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

  const breadcrumbs = [
    { label: 'Tài khoản', path: '/tai-khoan' },
    { label: 'Đơn hàng' }
  ];

  return (
    <AccountLayout title="Đơn hàng của tôi" breadcrumbs={breadcrumbs}>
      <div className="orders-main">
        <div className="orders-header">
          <div className="orders-search">
            <div className="search-input">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Tìm đơn theo mã hoặc tên sản phẩm" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Tìm kiếm đơn hàng"
              />
            </div>
          </div>
        </div>
        
        <div className="orders-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`} 
            onClick={() => setFilter('all')}
          >
            Tất cả ({orders.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'processing' ? 'active' : ''}`} 
            onClick={() => setFilter('processing')}
          >
            Đang xử lý ({orders.filter(o => o.status === 'processing').length})
          </button>
          <button 
            className={`filter-btn ${filter === 'shipping' ? 'active' : ''}`} 
            onClick={() => setFilter('shipping')}
          >
            Đang vận chuyển ({orders.filter(o => o.status === 'shipping').length})
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`} 
            onClick={() => setFilter('completed')}
          >
            Đã giao hàng ({orders.filter(o => o.status === 'completed').length})
          </button>
          <button 
            className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`} 
            onClick={() => setFilter('cancelled')}
          >
            Đã hủy ({orders.filter(o => o.status === 'cancelled').length})
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
                    {order.items.slice(0, 2).map(item => (
                      <div key={item.id} className="order-item">
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">x{item.quantity}</span>
                        <span className="item-price">{formatPrice(item.price)}</span>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <div className="more-items">
                        + {order.items.length - 2} sản phẩm khác
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
                      <span className="value total-price">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="order-actions">
                  <button 
                    className="btn btn-outline view-detail-btn"
                    onClick={() => handleViewOrderDetail(order)}
                  >
                    <FaEye /> Xem chi tiết
                  </button>
                  
                  {order.status === 'completed' && (
                    <button className="btn btn-outline invoice-btn">
                      <FaFileInvoice /> Hóa đơn
                    </button>
                  )}
                  
                  {order.status === 'processing' && (
                    <button className="btn btn-danger cancel-btn">
                      Hủy đơn hàng
                    </button>
                  )}
                  
                  {order.status === 'shipped' && (
                    <button className="btn btn-primary track-btn">
                      Theo dõi đơn hàng
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
              <p>
                {searchTerm 
                  ? `Không có đơn hàng nào phù hợp với từ khóa "${searchTerm}"`
                  : filter !== 'all' 
                    ? `Không có đơn hàng nào ở trạng thái "${getStatusLabel(filter).text}"`
                    : 'Bạn chưa có đơn hàng nào. Hãy bắt đầu mua sắm ngay!'
                }
              </p>
              <Link to="/san-pham" className="btn btn-primary shop-now-btn">
                Mua sắm ngay
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Modal chi tiết đơn hàng */}
      {selectedOrder && (
        <div className="modal-overlay">
          <div className="modal-backdrop" onClick={closeOrderDetail}></div>
          <div className="modal-content order-detail-modal">
            <div className="modal-header">
              <h3>Chi tiết đơn hàng #{selectedOrder.id}</h3>
              <button className="close-btn" onClick={closeOrderDetail}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="order-status-detail">
                <span className="label">Trạng thái:</span>
                <span className={`status-badge ${getStatusLabel(selectedOrder.status).class}`}>
                  {getStatusLabel(selectedOrder.status).text}
                </span>
              </div>
              
              <div className="order-info-detail">
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Ngày đặt hàng:</span>
                    <span className="value">{formatDate(selectedOrder.date)}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Số lượng sản phẩm:</span>
                    <span className="value">{selectedOrder.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Tổng giá trị:</span>
                    <span className="value total-price">{formatPrice(selectedOrder.total)}</span>
                  </div>
                </div>
              </div>
              
              <div className="order-items-detail">
                <h4>Danh sách sản phẩm</h4>
                <div className="items-list">
                  {selectedOrder.items.map(item => (
                    <div key={item.id} className="item-row">
                      <div className="item-info">
                        <h5 className="item-name">{item.name}</h5>
                        <div className="item-details">
                          <span className="item-price">Đơn giá: {formatPrice(item.price)}</span>
                          <span className="item-quantity">Số lượng: {item.quantity}</span>
                        </div>
                      </div>
                      <div className="item-total">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="order-summary">
                  <div className="summary-row">
                    <span className="label">Tạm tính:</span>
                    <span className="value">{formatPrice(selectedOrder.total)}</span>
                  </div>
                  <div className="summary-row">
                    <span className="label">Phí vận chuyển:</span>
                    <span className="value">Miễn phí</span>
                  </div>
                  <div className="summary-row total">
                    <span className="label">Tổng cộng:</span>
                    <span className="value">{formatPrice(selectedOrder.total)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={closeOrderDetail}>
                Đóng
              </button>
              
              {selectedOrder.status === 'completed' && (
                <button className="btn btn-primary">
                  <FaFileInvoice /> Xem hóa đơn
                </button>
              )}
              
              {selectedOrder.status === 'processing' && (
                <button className="btn btn-danger">
                  Hủy đơn hàng
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </AccountLayout>
  );
};

export default OrdersPage;
