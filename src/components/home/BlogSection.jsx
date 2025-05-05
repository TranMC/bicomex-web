import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa';
import './BlogSection.css';

export const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Xu hướng thiết kế nội thất mới nhất năm 2025',
      excerpt: 'Khám phá các xu hướng thiết kế nội thất nổi bật và phổ biến nhất năm 2025, giúp không gian sống của bạn trở nên hiện đại và tiện nghi hơn.',
      image: '/src/assets/images/blog1.jpg',
      date: '01/05/2025',
      author: 'Nguyễn Văn A',
      slug: 'xu-huong-thiet-ke-noi-that-2025',
    },
    {
      id: 2,
      title: 'Hướng dẫn chọn vật liệu xây dựng phù hợp cho công trình',
      excerpt: 'Tìm hiểu cách lựa chọn vật liệu xây dựng chất lượng và phù hợp với công trình của bạn, giúp tiết kiệm chi phí và đảm bảo độ bền.',
      image: '/src/assets/images/blog2.jpg',
      date: '28/04/2025',
      author: 'Trần Thị B',
      slug: 'huong-dan-chon-vat-lieu-xay-dung',
    },
    {
      id: 3,
      title: 'Bí quyết thi công nhà ở tiết kiệm chi phí',
      excerpt: 'Những bí quyết giúp bạn tiết kiệm chi phí khi xây dựng nhà ở mà vẫn đảm bảo chất lượng và tính thẩm mỹ cho công trình.',
      image: '/src/assets/images/blog3.jpg',
      date: '25/04/2025',
      author: 'Lê Văn C',
      slug: 'bi-quyet-thi-cong-nha-o-tiet-kiem',
    },
  ];

  return (
    <section className="blog-section py-10">
      <div className="section-header flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Tin tức & Bài viết</h2>
        <Link to="/tin-tuc" className="text-blue-600 hover:underline font-medium flex items-center gap-1">
          Xem tất cả <FaArrowRight className="text-sm" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <article key={post.id} className="blog-card bg-white rounded-lg shadow-md overflow-hidden">
            <Link to={`/tin-tuc/${post.slug}`} className="block">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="p-5">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <div className="flex items-center mr-4">
                  <FaCalendarAlt className="mr-1" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <FaUser className="mr-1" />
                  <span>{post.author}</span>
                </div>
              </div>
              <Link to={`/tin-tuc/${post.slug}`} className="block">
                <h3 className="text-xl font-bold mb-2 hover:text-blue-600 line-clamp-2">{post.title}</h3>
              </Link>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
              <Link 
                to={`/tin-tuc/${post.slug}`} 
                className="inline-flex items-center font-medium text-blue-600 hover:underline gap-1"
              >
                Đọc tiếp <FaArrowRight className="text-sm" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};