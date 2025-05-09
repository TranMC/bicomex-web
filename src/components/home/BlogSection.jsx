import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaArrowRight, FaClock } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../styles/components/BlogSection.css';

export const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Giải pháp sử dụng sơn phủ cho chung cư xanh',
      excerpt: 'Khám phá các xu hướng thiết kế nội thất nổi bật và phổ biến nhất năm 2025, giúp không gian sống của bạn trở nên hiện đại và tiện nghi hơn.',
      image: '//bizweb.dktcdn.net/thumb/large/100/330/753/articles/sg-banners02-810x540.jpg?v=1537496913357',
      date: '01/05/2025',
      author: 'Nguyễn Văn A',
      slug: 'xu-huong-thiet-ke-noi-that-2025',
      readTime: '5 phút đọc'
    },
    {
      id: 2,
      title: 'Chuyên gia mách nước 3 hướng đi tốt để kinh doanh tiếp',
      excerpt: 'Tìm hiểu cách lựa chọn vật liệu xây dựng chất lượng và phù hợp với công trình của bạn, giúp tiết kiệm chi phí và đảm bảo độ bền.',
      image: '//bizweb.dktcdn.net/thumb/large/100/330/753/articles/emre-group-offices-renda-helin-5-810x540-a8ac9d18-c0fd-4a35-ab52-107efab679d8.jpg?v=1537496869637',
      date: '28/04/2025',
      author: 'Trần Thị B',
      slug: 'huong-dan-chon-vat-lieu-xay-dung',
      readTime: '7 phút đọc'
    },
    {
      id: 3,
      title: 'Giám sát chặt thép nhập khẩu do nghi gian lận trốn thuế',
      excerpt: 'Những bí quyết giúp bạn tiết kiệm chi phí khi xây dựng nhà ở mà vẫn đảm bảo chất lượng và tính thẩm mỹ cho công trình.',
      image: '//bizweb.dktcdn.net/thumb/large/100/330/753/articles/grid-apolloarchitects-3-810x540-afb67722-beeb-42df-af8a-f04a084d5be3.jpg?v=1537496942110',
      date: '25/04/2025',
      author: 'Lê Văn C',
      slug: 'bi-quyet-thi-cong-nha-o-tiet-kiem',
      readTime: '6 phút đọc'
    },
  ];

  // Xử lý lỗi hình ảnh
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://bizweb.dktcdn.net/thumb/large/100/330/753/articles/giai-phap-su-dung-son-phu-cho-chung-cu-xanh.jpg?v=1553520880287";
  };

  return (
    <section className="blog-section">
      <div className="blog-container">
        <div className="section-title-container">
          <h2 className="section-title">
            Tin tức & <span className="section-title-highlight">Bài viết</span>
          </h2>
          <p className="section-subtitle">Cập nhật những thông tin mới nhất về xu hướng nội thất và vật liệu xây dựng</p>
        </div>

        <div className="blog-slider-wrapper">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="blog-swiper"
          >
            {blogPosts.map((post) => (
              <SwiperSlide key={post.id}>
                <article className="blog-card">
                  <div className="blog-inner">
                    <div className="blog-image-container">
                      <Link to={`/tin-tuc/${post.slug}`} className="blog-image-link">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="blog-image"
                          onError={handleImageError}
                        />
                      </Link>
                      <div className="read-time-badge">
                        <FaClock className="read-time-icon" /> {post.readTime}
                      </div>
                    </div>
                    
                    <div className="blog-content">
                      <div className="blog-meta">
                        <div className="meta-date">
                          <FaCalendarAlt className="meta-icon" />
                          <span>{post.date}</span>
                        </div>
                        <div className="meta-author">
                          <FaUser className="meta-icon" />
                          <span>{post.author}</span>
                        </div>
                      </div>
                      
                      <h3 className="blog-title">
                        <Link to={`/tin-tuc/${post.slug}`} className="blog-title-link line-clamp-2">
                          {post.title}
                        </Link>
                      </h3>
                      
                      <div className="blog-excerpt">
                        <p className="line-clamp-3">{post.excerpt}</p>
                      </div>
                      
                      <div className="read-more-container">
                        <Link to={`/tin-tuc/${post.slug}`} className="read-more-link">
                          Xem thêm <FaArrowRight className="read-more-icon" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="view-more-container">
          <Link 
            to="/tin-tuc" 
            className="view-more-link"
          >
            Xem tất cả bài viết
          </Link>
        </div>
      </div>
    </section>
  );
};