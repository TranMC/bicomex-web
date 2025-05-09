import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { getSafeImageUrl, preloadImage } from '../../utils/imageUtils';
import '../../styles/components/PromotionBanner.css';

export const PromotionBanner = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  const promotionProducts = useMemo(() => [
    {
      id: 1,
      name: 'Sơn nước DULUX',
      description: 'Sơn Nước Trong Nhà Dulux sử dụng công nghệ chống nấm mốc, giữ cho màu sắc tươi mới lâu dài',
      image: 'https://bizweb.dktcdn.net/thumb/large/100/330/753/products/dulux-trade-pure-briiliant-white-gloss-1lt-1-copy.jpg?v=1537516026273',
      price: 850000,
      salePrice: 680000,
      discount: 20,
      slug: 'son-nuoc-dulux-hight-gloss',
      endDate: new Date('2023-12-31') // Ngày kết thúc khuyến mãi
    },
    {
      id: 2,
      name: 'Sơn nước JOTUN',
      description: 'Sơn Nước Trong Nhà sử dụng công nghệ chống bám bẩn, có khả năng chùi rửa vượt trội',
      image: 'https://bizweb.dktcdn.net/thumb/medium/100/330/753/products/jotun-true-beauty-sheen-5l.jpg?v=1537515328247',
      price: 950000,
      salePrice: 760000,
      discount: 20,
      slug: 'son-nuoc-jotun-majestic',
      endDate: new Date('2023-12-25')
    },
    {
      id: 3,
      name: 'Sàn gỗ Ruby Floor',
      description: 'RUBY Foor có khả năng chịu nước tốt, cấp độ mài mòn AC4, phù hợp cho mọi không gian',
      image: 'https://bizweb.dktcdn.net/thumb/large/100/330/753/products/17342-gach-lat-nen-toko-tk-811.jpg?v=1537513889877',
      price: 450000,
      salePrice: 380000,
      discount: 16,
      slug: 'san-go-op-lat-ruby-floor-02',
      endDate: new Date('2023-11-30')
    },
    {
      id: 4,
      name: 'Gạch lát nền Viglacera',
      description: 'Gạch granite cao cấp với đa dạng mẫu mã, kích thước và họa tiết',
      image: 'https://bizweb.dktcdn.net/thumb/large/100/330/753/products/16-eac3ec33-44fc-4bb8-9eac-cf2b988db085.jpg?v=1537500385490',
      price: 320000,
      salePrice: 280000,
      discount: 12,
      slug: 'gach-lat-nen-viglacera-001',
      endDate: new Date('2023-12-15')
    }
  ], []);

  // Preload images to prevent CORB issues
  useEffect(() => {
    let isMounted = true;
    
    const loadImages = async () => {
      try {
        const imagePromises = promotionProducts.map(product => 
          preloadImage(getSafeImageUrl(product.image))
        );
        
        await Promise.all(imagePromises);
        if (isMounted) {
          setImagesLoaded(true);
        }
      } catch (error) {
        console.error('Error preloading promotion images:', error);
        if (isMounted) {
          setImagesLoaded(true);
        }
      }
    };
    
    loadImages();
    
    return () => {
      isMounted = false;
    };
  }, [promotionProducts]);

  // Format price with comma separators
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Handle image loading errors
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = getSafeImageUrl("https://bizweb.dktcdn.net/thumb/large/100/330/753/products/son-nuoc-jotun-majestic-dep-hoan-hao-2-1.jpg?v=1553090388617");
  };

  return (
    <section className="promotion-section">
      <div className="container mx-auto px-4 py-12">
        <div className="section-title-container text-center mb-10">
          <h2 className="section-title text-3xl font-semibold">
            Sản phẩm <span className="section-title-highlight text-primary">khuyến mãi</span>
          </h2>
          <p className="section-subtitle text-gray-600 mt-2">
            Chúng tôi cung cấp đa dạng sản phẩm với mức giá ưu đãi nhất
          </p>
        </div>

        {imagesLoaded ? (
          <div className="promotion-grid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {promotionProducts.map((product) => (
                <div key={product.id} className="promotion-card group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="promotion-badge absolute top-3 left-3 bg-red-500 text-white py-1 px-2 rounded z-10">
                    -{product.discount}%
                  </div>
                  <div className="promotion-image-container relative overflow-hidden aspect-w-1 aspect-h-1">
                    <Link to={`/san-pham/${product.slug}`}>
                      <img
                        src={getSafeImageUrl(product.image)}
                        alt={product.name}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={handleImageError}
                        loading="lazy"
                      />
                    </Link>
                    <div className="promotion-overlay absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="promotion-actions flex space-x-2">
                        <button className="action-button bg-white p-2 rounded-full shadow hover:bg-primary hover:text-white transition">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </button>
                        <button className="action-button bg-white p-2 rounded-full shadow hover:bg-primary hover:text-white transition">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                        <button className="action-button bg-white p-2 rounded-full shadow hover:bg-primary hover:text-white transition">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="promotion-content p-4">
                    <h3 className="promotion-title font-medium text-lg mb-2">
                      <Link to={`/san-pham/${product.slug}`} className="hover:text-primary transition-colors">
                        {product.name}
                      </Link>
                    </h3>
                    <p className="promotion-description text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="promotion-price-container flex items-baseline space-x-2">
                      <span className="promotion-sale-price text-primary font-semibold">{formatPrice(product.salePrice)}đ</span>
                      <span className="promotion-original-price text-gray-500 line-through text-sm">{formatPrice(product.price)}đ</span>
                    </div>
                    <button className="promotion-add-button w-full mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition">
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="loading-placeholder text-center py-20">
            <p>Đang tải sản phẩm khuyến mãi...</p>
          </div>
        )}
      </div>
    </section>
  );
};