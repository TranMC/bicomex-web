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
    <section className="section_new_blog py-10">
      <div className="container mx-auto px-4">
        <div className="section-title mb-8">
          <h2 className="title-head text-center text-3xl font-bold">
            Tin tức & <span className="text-blue-600">Bài viết</span>
          </h2>
          <p className="text-center text-gray-600 mt-2">Cập nhật những thông tin mới nhất về xu hướng nội thất và vật liệu xây dựng</p>
        </div>

        <div className="blog-wrapper">
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
            className="swiper-blog"
          >
            {blogPosts.map((post) => (
              <SwiperSlide key={post.id}>
                <article className="blog_index bg-white rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden h-full">
                  <div className="myblog cursor-pointer">
                    <div className="image-blog-left relative">
                      <Link to={`/tin-tuc/${post.slug}`} className="block relative pb-[60%] overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover absolute top-0 left-0 transition-transform duration-500 hover:scale-110"
                          onError={handleImageError}
                        />
                      </Link>
                      <div className="read-time absolute bottom-3 right-3 bg-blue-600 text-white text-xs py-1 px-2 rounded-full flex items-center">
                        <FaClock className="mr-1" /> {post.readTime}
                      </div>
                    </div>
                    
                    <div className="content_blog p-5">
                      <div className="blog_meta flex items-center text-xs text-gray-500 mb-3">
                        <div className="flex items-center mr-4">
                          <FaCalendarAlt className="mr-1 text-gray-400" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center">
                          <FaUser className="mr-1 text-gray-400" />
                          <span>{post.author}</span>
                        </div>
                      </div>
                      
                      <h3 className="blog_name">
                        <Link to={`/tin-tuc/${post.slug}`} className="block font-semibold text-lg mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                          {post.title}
                        </Link>
                      </h3>
                      
                      <div className="blog_description">
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                      </div>
                      
                      <div className="text-end">
                        <Link to={`/tin-tuc/${post.slug}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center justify-end">
                          Xem thêm <FaArrowRight className="ml-1 text-xs" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="text-center mt-6">
          <Link 
            to="/tin-tuc" 
            className="view-more border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-2 rounded inline-block transition-colors font-medium"
          >
            Xem tất cả bài viết
          </Link>
        </div>
      </div>
    </section>
  );
};