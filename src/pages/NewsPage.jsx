import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaSearch, FaEye, FaUser, FaTag } from 'react-icons/fa';
import '../styles/pages/NewsPage.css';

export const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  useEffect(() => {
    // Giả lập dữ liệu - trong thực tế sẽ call API
    setTimeout(() => {
      setNews([
        {
          id: 1,
          title: '5 xu hướng thiết kế nội thất được ưa chuộng nhất năm 2023',
          slug: '5-xu-huong-thiet-ke-noi-that-duoc-ua-chuong-nhat-nam-2023',
          summary: 'Cùng Bicomex khám phá 5 xu hướng thiết kế nội thất đang được ưa chuộng nhất trong năm 2023.',
          content: 'Nội dung chi tiết về 5 xu hướng thiết kế nội thất...',
          image: 'https://placehold.co/800x400?text=News+1',
          date: '2023-10-15',
          author: 'Nguyễn Văn A',
          category: 'design',
          views: 1250,
        },
        {
          id: 2,
          title: 'Hướng dẫn chọn vật liệu xây dựng chất lượng cho ngôi nhà của bạn',
          slug: 'huong-dan-chon-vat-lieu-xay-dung-chat-luong-cho-ngoi-nha-cua-ban',
          summary: 'Những tiêu chí quan trọng cần lưu ý khi lựa chọn vật liệu xây dựng để đảm bảo chất lượng công trình.',
          content: 'Nội dung chi tiết về cách chọn vật liệu xây dựng...',
          image: 'https://placehold.co/800x400?text=News+2',
          date: '2023-10-10',
          author: 'Trần Thị B',
          category: 'guide',
          views: 980,
        },
        {
          id: 3,
          title: 'Bicomex mở rộng hệ thống phân phối tại miền Trung',
          slug: 'bicomex-mo-rong-he-thong-phan-phoi-tai-mien-trung',
          summary: 'Bicomex chính thức khai trương thêm 3 chi nhánh mới tại Đà Nẵng, Huế và Quảng Nam.',
          content: 'Nội dung chi tiết về việc mở rộng hệ thống phân phối...',
          image: 'https://placehold.co/800x400?text=News+3',
          date: '2023-09-28',
          author: 'Lê Văn C',
          category: 'company',
          views: 1500,
        },
        {
          id: 4,
          title: 'Cách lựa chọn gạch ốp lát phù hợp với từng không gian',
          slug: 'cach-lua-chon-gach-op-lat-phu-hop-voi-tung-khong-gian',
          summary: 'Bí quyết chọn gạch ốp lát phù hợp với từng không gian để tạo nên sự hài hòa và độc đáo cho ngôi nhà.',
          content: 'Nội dung chi tiết về cách chọn gạch ốp lát...',
          image: 'https://placehold.co/800x400?text=News+4',
          date: '2023-09-20',
          author: 'Phạm Thị D',
          category: 'guide',
          views: 1100,
        },
        {
          id: 5,
          title: 'Bicomex giành giải thưởng "Nhà phân phối vật liệu xây dựng tốt nhất năm 2023"',
          slug: 'bicomex-gianh-giai-thuong-nha-phan-phoi-vat-lieu-xay-dung-tot-nhat-nam-2023',
          summary: 'Bicomex vinh dự nhận giải thưởng "Nhà phân phối vật liệu xây dựng tốt nhất năm 2023" do Hiệp hội Xây dựng Việt Nam bình chọn.',
          content: 'Nội dung chi tiết về giải thưởng...',
          image: 'https://placehold.co/800x400?text=News+5',
          date: '2023-09-15',
          author: 'Hoàng Văn E',
          category: 'company',
          views: 2000,
        },
        {
          id: 6,
          title: 'Top 10 mẫu thiết kế phòng tắm sang trọng và tiện nghi',
          slug: 'top-10-mau-thiet-ke-phong-tam-sang-trong-va-tien-nghi',
          summary: 'Tổng hợp 10 mẫu thiết kế phòng tắm sang trọng, hiện đại và tiện nghi nhất đang được yêu thích hiện nay.',
          content: 'Nội dung chi tiết về các mẫu thiết kế phòng tắm...',
          image: 'https://placehold.co/800x400?text=News+6',
          date: '2023-09-08',
          author: 'Nguyễn Thị F',
          category: 'design',
          views: 1800,
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Lọc tin tức theo danh mục và từ khóa tìm kiếm
  const filteredNews = news.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Chuyển đổi định dạng ngày hiển thị
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  // Lấy tên hiển thị của danh mục
  const getCategoryName = (category) => {
    switch(category) {
      case 'design':
        return 'Thiết kế';
      case 'guide':
        return 'Hướng dẫn';
      case 'company':
        return 'Công ty';
      default:
        return 'Tin tức';
    }
  };
  
  // Danh sách các danh mục
  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'design', name: 'Thiết kế' },
    { id: 'guide', name: 'Hướng dẫn' },
    { id: 'company', name: 'Công ty' },
  ];
  
  return (
    <div className="news-page">
      <div className="news-banner">
        <div className="container">
          <h1>Tin tức</h1>
          <p>Cập nhật thông tin mới nhất từ Bicomex</p>
        </div>
      </div>
      
      <div className="container">
        <div className="news-filters">
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Tìm kiếm tin tức..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>
          
          <div className="category-tabs">
            {categories.map(category => (
              <button 
                key={category.id}
                className={activeCategory === category.id ? 'active' : ''}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="news-content">
          <div className="news-list">
            {loading ? (
              <div className="loading-message">Đang tải tin tức...</div>
            ) : filteredNews.length > 0 ? (
              filteredNews.map(item => (
                <div className="news-card" key={item.id}>
                  <div className="news-image">
                    <Link to={`/tin-tuc/${item.slug}`}>
                      <img src={item.image} alt={item.title} />
                    </Link>
                    <span className="news-category">{getCategoryName(item.category)}</span>
                  </div>
                  
                  <div className="news-details">
                    <h2 className="news-title">
                      <Link to={`/tin-tuc/${item.slug}`}>{item.title}</Link>
                    </h2>
                    
                    <div className="news-meta">
                      <div className="meta-item">
                        <FaCalendarAlt className="meta-icon" />
                        <span>{formatDate(item.date)}</span>
                      </div>
                      
                      <div className="meta-item">
                        <FaUser className="meta-icon" />
                        <span>{item.author}</span>
                      </div>
                      
                      <div className="meta-item">
                        <FaEye className="meta-icon" />
                        <span>{item.views} lượt xem</span>
                      </div>
                    </div>
                    
                    <p className="news-summary">{item.summary}</p>
                    
                    <Link to={`/tin-tuc/${item.slug}`} className="read-more">
                      Đọc tiếp
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">Không tìm thấy tin tức phù hợp</div>
            )}
          </div>
          
          <div className="news-sidebar">
            <div className="sidebar-section popular-posts">
              <h3 className="sidebar-title">Bài viết nổi bật</h3>
              
              <div className="popular-posts-list">
                {news.slice(0, 4).sort((a, b) => b.views - a.views).map(post => (
                  <div className="popular-post-item" key={post.id}>
                    <div className="popular-post-image">
                      <Link to={`/tin-tuc/${post.slug}`}>
                        <img src={post.image} alt={post.title} />
                      </Link>
                    </div>
                    <div className="popular-post-content">
                      <h4>
                        <Link to={`/tin-tuc/${post.slug}`}>{post.title}</Link>
                      </h4>
                      <div className="popular-post-date">
                        <FaCalendarAlt className="date-icon" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="sidebar-section categories-section">
              <h3 className="sidebar-title">Danh mục</h3>
              
              <ul className="categories-list">
                {categories.filter(cat => cat.id !== 'all').map(category => (
                  <li key={category.id}>
                    <button 
                      onClick={() => setActiveCategory(category.id)}
                      className={activeCategory === category.id ? 'active' : ''}
                    >
                      <FaTag className="category-icon" />
                      <span>{category.name}</span>
                      <span className="category-count">
                        {news.filter(item => item.category === category.id).length}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage; 