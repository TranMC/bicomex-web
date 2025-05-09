import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaTag, FaSearch, FaShoppingCart, FaEye } from 'react-icons/fa';
import '../styles/pages/PromotionsPage.css';

export const PromotionsPage = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  
  useEffect(() => {
    // Giả lập dữ liệu - trong thực tế sẽ call API
    setTimeout(() => {
      setPromotions([
        {
          id: 1,
          title: 'Khuyến mãi lớn - Giảm đến 50% các sản phẩm trang trí nội thất',
          slug: 'khuyen-mai-lon-giam-den-50-cac-san-pham-trang-tri-noi-that',
          summary: 'Cơ hội lớn để sở hữu các sản phẩm trang trí nội thất cao cấp với giá ưu đãi nhất',
          content: 'Chương trình khuyến mãi áp dụng cho tất cả các sản phẩm trang trí nội thất tại Bicomex. Cơ hội mua sắm với giá rẻ nhất trong năm, số lượng có hạn.',
          image: 'https://placehold.co/800x400?text=Promo+1',
          start_date: '2023-11-01',
          end_date: '2023-11-30',
          type: 'sale',
          discount_percent: 50,
        },
        {
          id: 2,
          title: 'Mua 1 tặng 1 - Sơn nội thất cao cấp',
          slug: 'mua-1-tang-1-son-noi-that-cao-cap',
          summary: 'Chương trình mua 1 tặng 1 dành cho tất cả các loại sơn nội thất cao cấp',
          content: 'Khi mua 1 thùng sơn nội thất cao cấp, khách hàng sẽ được tặng thêm 1 thùng cùng loại. Áp dụng cho tất cả các thương hiệu sơn cao cấp tại Bicomex.',
          image: 'https://placehold.co/800x400?text=Promo+2',
          start_date: '2023-11-05',
          end_date: '2023-12-05',
          type: 'buy_get',
          discount_percent: null,
        },
        {
          id: 3,
          title: 'Tặng voucher 1 triệu đồng khi mua gạch ốp lát',
          slug: 'tang-voucher-1-trieu-dong-khi-mua-gach-op-lat',
          summary: 'Nhận ngay voucher trị giá 1 triệu đồng khi mua gạch ốp lát với hóa đơn từ 10 triệu',
          content: 'Khi mua gạch ốp lát với hóa đơn từ 10 triệu đồng, khách hàng sẽ nhận được voucher trị giá 1 triệu đồng để sử dụng cho lần mua hàng tiếp theo tại Bicomex.',
          image: 'https://placehold.co/800x400?text=Promo+3',
          start_date: '2023-11-10',
          end_date: '2023-12-10',
          type: 'voucher',
          discount_percent: null,
        },
        {
          id: 4,
          title: 'Giảm giá 30% cho dòng sản phẩm thiết bị vệ sinh',
          slug: 'giam-gia-30-cho-dong-san-pham-thiet-bi-ve-sinh',
          summary: 'Cơ hội lớn để nâng cấp thiết bị vệ sinh với giá tốt nhất',
          content: 'Giảm giá 30% cho tất cả các sản phẩm thiết bị vệ sinh cao cấp từ các thương hiệu uy tín. Áp dụng cho bồn cầu, bồn tắm, vòi sen, lavabo và các phụ kiện phòng tắm.',
          image: 'https://placehold.co/800x400?text=Promo+4',
          start_date: '2023-11-15',
          end_date: '2023-12-15',
          type: 'sale',
          discount_percent: 30,
        },
        {
          id: 5,
          title: 'Miễn phí vận chuyển toàn quốc',
          slug: 'mien-phi-van-chuyen-toan-quoc',
          summary: 'Miễn phí vận chuyển cho tất cả đơn hàng, không giới hạn khoảng cách',
          content: 'Chương trình miễn phí vận chuyển áp dụng cho tất cả các đơn hàng, không giới hạn khoảng cách vận chuyển. Cơ hội tuyệt vời để tiết kiệm chi phí khi mua sắm tại Bicomex.',
          image: 'https://placehold.co/800x400?text=Promo+5',
          start_date: '2023-11-01',
          end_date: '2023-12-31',
          type: 'shipping',
          discount_percent: null,
        },
        {
          id: 6,
          title: 'Ưu đãi lớn - Giảm 40% thiết bị điện',
          slug: 'uu-dai-lon-giam-40-thiet-bi-dien',
          summary: 'Cơ hội lớn để sở hữu các thiết bị điện với giá ưu đãi',
          content: 'Giảm giá 40% cho tất cả các sản phẩm thiết bị điện bao gồm đèn, công tắc, ổ cắm và thiết bị điện gia dụng. Áp dụng cho các thương hiệu uy tín.',
          image: 'https://placehold.co/800x400?text=Promo+6',
          start_date: '2023-11-20',
          end_date: '2023-12-20',
          type: 'sale',
          discount_percent: 40,
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Lọc khuyến mãi theo loại và từ khóa tìm kiếm
  const filteredPromotions = promotions.filter(promo => {
    const matchesType = filterType === 'all' || promo.type === filterType;
    const matchesSearch = promo.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          promo.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });
  
  // Chuyển đổi định dạng ngày hiển thị
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  // Kiểm tra nếu khuyến mãi còn hiệu lực
  const isActive = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    return today <= end;
  };
  
  // Lấy loại badge dựa vào loại khuyến mãi
  const getBadgeType = (type) => {
    switch(type) {
      case 'sale':
        return 'sale-badge';
      case 'buy_get':
        return 'buyget-badge';
      case 'voucher':
        return 'voucher-badge';
      case 'shipping':
        return 'shipping-badge';
      default:
        return 'default-badge';
    }
  };
  
  // Lấy tên hiển thị của loại khuyến mãi
  const getTypeName = (type) => {
    switch(type) {
      case 'sale':
        return 'Giảm giá';
      case 'buy_get':
        return 'Mua tặng';
      case 'voucher':
        return 'Voucher';
      case 'shipping':
        return 'Miễn phí vận chuyển';
      default:
        return 'Khuyến mãi';
    }
  };
  
  return (
    <div className="promotions-page">
      <div className="promotions-banner">
        <div className="container">
          <h1>Khuyến mãi hot</h1>
          <p>Những ưu đãi tốt nhất dành cho bạn</p>
        </div>
      </div>
      
      <div className="container">
        <div className="promotions-filters">
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Tìm kiếm khuyến mãi..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>
          
          <div className="filter-buttons">
            <button 
              className={filterType === 'all' ? 'active' : ''} 
              onClick={() => setFilterType('all')}
            >
              Tất cả
            </button>
            <button 
              className={filterType === 'sale' ? 'active' : ''} 
              onClick={() => setFilterType('sale')}
            >
              Giảm giá
            </button>
            <button 
              className={filterType === 'buy_get' ? 'active' : ''} 
              onClick={() => setFilterType('buy_get')}
            >
              Mua tặng
            </button>
            <button 
              className={filterType === 'voucher' ? 'active' : ''} 
              onClick={() => setFilterType('voucher')}
            >
              Voucher
            </button>
            <button 
              className={filterType === 'shipping' ? 'active' : ''} 
              onClick={() => setFilterType('shipping')}
            >
              Miễn phí vận chuyển
            </button>
          </div>
        </div>
        
        <div className="promotions-list">
          {loading ? (
            <div className="loading-message">Đang tải khuyến mãi...</div>
          ) : filteredPromotions.length > 0 ? (
            filteredPromotions.map(promo => (
              <div className="promo-card" key={promo.id}>
                <div className="promo-image">
                  <img src={promo.image} alt={promo.title} />
                  <span className={`promo-badge ${getBadgeType(promo.type)}`}>
                    {getTypeName(promo.type)}
                  </span>
                  {!isActive(promo.end_date) && (
                    <div className="expired-overlay">
                      <span>Đã kết thúc</span>
                    </div>
                  )}
                </div>
                
                <div className="promo-content">
                  <h2 className="promo-title">
                    <Link to={`/khuyen-mai-hot/${promo.slug}`}>{promo.title}</Link>
                  </h2>
                  
                  <p className="promo-summary">{promo.summary}</p>
                  
                  <div className="promo-dates">
                    <FaCalendarAlt className="date-icon" />
                    <span>
                      {formatDate(promo.start_date)} - {formatDate(promo.end_date)}
                    </span>
                  </div>
                  
                  <div className="promo-discount">
                    {promo.discount_percent && (
                      <div className="discount-tag">
                        <FaTag className="discount-icon" />
                        <span>Giảm {promo.discount_percent}%</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="promo-actions">
                    <Link to={`/khuyen-mai-hot/${promo.slug}`} className="view-details">
                      <FaEye /> Xem chi tiết
                    </Link>
                    
                    {isActive(promo.end_date) && (
                      <Link to="/san-pham" className="shop-now">
                        <FaShoppingCart /> Mua ngay
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">Không tìm thấy khuyến mãi phù hợp</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromotionsPage;