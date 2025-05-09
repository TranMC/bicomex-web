import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaArrowRight, FaClock } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useState, useEffect, useMemo } from 'react';
import { getSafeImageUrl, preloadImage } from '../../utils/imageUtils';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../styles/components/BlogSection.css';

export const BlogSection = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  const blogPosts = useMemo(() => [
    {
      id: 1,
      title: 'Giải pháp sử dụng sơn phủ cho chung cư xanh',
      excerpt: 'Khám phá các xu hướng thiết kế nội thất nổi bật và phổ biến nhất năm 2025, giúp không gian sống của bạn trở nên hiện đại và tiện nghi hơn.',
      image: 'https://bizweb.dktcdn.net/thumb/large/100/330/753/articles/sg-banners02-810x540.jpg?v=1537496913357',
      date: '01/05/2025',
      author: 'Nguyễn Văn A',
      slug: 'xu-huong-thiet-ke-noi-that-2025',
      readTime: '5 phút đọc'
    },
    {
      id: 2,
      title: 'Chuyên gia mách nước 3 hướng đi tốt để kinh doanh tiếp',
      excerpt: 'Tìm hiểu cách lựa chọn vật liệu xây dựng chất lượng và phù hợp với công trình của bạn, giúp tiết kiệm chi phí và đảm bảo độ bền.',
      image: 'https://bizweb.dktcdn.net/thumb/large/100/330/753/articles/emre-group-offices-renda-helin-5-810x540-a8ac9d18-c0fd-4a35-ab52-107efab679d8.jpg?v=1537496869637',
      date: '28/04/2025',
      author: 'Trần Thị B',
      slug: 'huong-dan-chon-vat-lieu-xay-dung',
      readTime: '7 phút đọc'
    },
    {
      id: 3,
      title: 'Giám sát chặt thép nhập khẩu do nghi gian lận trốn thuế',
      excerpt: 'Những bí quyết giúp bạn tiết kiệm chi phí khi xây dựng nhà ở mà vẫn đảm bảo chất lượng và tính thẩm mỹ cho công trình.',
      image: 'https://bizweb.dktcdn.net/thumb/large/100/330/753/articles/grid-apolloarchitects-3-810x540-afb67722-beeb-42df-af8a-f04a084d5be3.jpg?v=1537496942110',
      date: '25/04/2025',
      author: 'Lê Văn C',
      slug: 'bi-quyet-thi-cong-nha-o-tiet-kiem',
      readTime: '6 phút đọc'
    },
  ], []);

  // Preload images to prevent CORB issues
  useEffect(() => {
    let isMounted = true;
    
    const loadImages = async () => {
      try {
        const imagePromises = blogPosts.map(post => 
          preloadImage(getSafeImageUrl(post.image))
        );
        
        await Promise.all(imagePromises);
        if (isMounted) {
          setImagesLoaded(true);
        }
      } catch (error) {
        console.error('Error preloading blog images:', error);
        if (isMounted) {
          setImagesLoaded(true);
        }
      }
    };
    
    loadImages();
    
    return () => {
      isMounted = false;
    };
  }, [blogPosts]);

  // Xử lý lỗi hình ảnh
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = getSafeImageUrl("https://bizweb.dktcdn.net/thumb/large/100/330/753/articles/giai-phap-su-dung-son-phu-cho-chung-cu-xanh.jpg?v=1553520880287");
  };

  return (
    <section className="blog-section">
      <div className="container mx-auto px-4 py-12">
        <div className="section-title-container text-center mb-10">
          <h2 className="section-title text-3xl font-semibold">
            Tin tức <span className="section-title-highlight text-primary">mới nhất</span>
          </h2>
          <p className="section-subtitle text-gray-600 mt-2">
            Cập nhật những tin tức và xu hướng mới nhất về vật liệu xây dựng
          </p>
        </div>

        {imagesLoaded ? (
          <div className="blog-slider-container">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                640: {
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
                  <div className="blog-post-card bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="blog-post-image aspect-w-16 aspect-h-9 relative">
                      <img
                        src={getSafeImageUrl(post.image)}
                        alt={post.title}
                        className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                        onError={handleImageError}
                        loading="lazy"
                      />
                    </div>
                    <div className="blog-post-content p-5">
                      <div className="blog-post-meta flex text-sm text-gray-500 mb-2">
                        <div className="flex items-center mr-4">
                          <FaCalendarAlt className="mr-1" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center mr-4">
                          <FaUser className="mr-1" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center">
                          <FaClock className="mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <h3 className="blog-post-title text-xl font-medium mb-2">
                        <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="blog-post-excerpt text-gray-600 mb-4">
                        {post.excerpt}
                      </p>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="blog-post-link inline-flex items-center text-primary hover:underline"
                      >
                        Đọc tiếp <FaArrowRight className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="loading-placeholder text-center py-20">
            <p>Đang tải bài viết...</p>
          </div>
        )}
      </div>
    </section>
  );
};