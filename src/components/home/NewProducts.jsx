import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaCartPlus, FaEye } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useCart } from '../../context/CartProvider';
import { useToast } from '../../context/ToastProvider';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../styles/components/NewProducts.css';

export const NewProducts = () => {
  const { addToCart } = useCart();
  const toast = useToast();
  const [products] = useState([
    {
      id: 1,
      name: 'Cáp điện Cadivi 4x2.5mm²',
      image: '/assets/images/new-product1.jpg',
      price: 45000,
      salePrice: null,
      rating: 4.7,
      reviewCount: 32,
      slug: 'cap-dien-cadivi-4x2-5mm',
    },
    {
      id: 2,
      name: 'Sơn ngoại thất Jotun Jotashield',
      image: '/assets/images/new-product2.jpg',
      price: 850000,
      salePrice: 799000,
      rating: 4.8,
      reviewCount: 18,
      slug: 'son-ngoai-that-jotun-jotashield',
    },
    {
      id: 3,
      name: 'Gạch granite Viglacera 800x800',
      image: '/assets/images/new-product3.jpg',
      price: 320000,
      salePrice: null,
      rating: 4.6,
      reviewCount: 24,
      slug: 'gach-granite-viglacera-800x800',
    },
    {
      id: 4,
      name: 'Bồn cầu TOTO C108',
      image: '/assets/images/new-product4.jpg',
      price: 3500000,
      salePrice: 3200000,
      rating: 4.9,
      reviewCount: 42,
      slug: 'bon-cau-toto-c108',
    },
    {
      id: 5,
      name: 'Máy khoan Bosch GSB 550',
      image: '/assets/images/new-product5.jpg',
      price: 1450000,
      salePrice: 1299000,
      rating: 4.7,
      reviewCount: 56,
      slug: 'may-khoan-bosch-gsb-550',
    },
    {
      id: 6,
      name: 'Keo chống thấm Weber Seal',
      image: '/assets/images/new-product6.jpg',
      price: 185000,
      salePrice: null,
      rating: 4.5,
      reviewCount: 28,
      slug: 'keo-chong-tham-weber-seal',
    },
  ]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`Đã thêm ${product.name} vào giỏ hàng!`);
  };
  
  const handleImageError = (e) => {
    e.target.onerror = null; 
    e.target.style.display = 'none';
    const placeholder = document.createElement('div');
    placeholder.className = 'w-full h-64 bg-gray-200 flex items-center justify-center';
    placeholder.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>';
    e.target.parentNode.appendChild(placeholder);
  };

  return (
    <section className="new-products py-10">
      <div className="section-header flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Sản phẩm mới</h2>
        <Link to="/san-pham-moi" className="text-blue-600 hover:underline font-medium">
          Xem tất cả
        </Link>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        className="new-products-slider"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="product-card bg-white rounded-lg shadow-md overflow-hidden h-full">
              <div className="relative">
                <Link to={`/san-pham/${product.slug}`} className="block">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-64 object-cover"
                    onError={handleImageError}
                  />
                </Link>
                
                <span className="absolute top-3 left-3 bg-green-500 text-white text-sm font-bold py-1 px-2 rounded">
                  Mới
                </span>
                
                {product.salePrice && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-sm font-bold py-1 px-2 rounded">
                    {Math.round((1 - product.salePrice / product.price) * 100)}% Giảm
                  </span>
                )}
                
                <div className="product-actions absolute bottom-3 right-3 flex flex-col gap-2">
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    <FaCartPlus className="text-lg" />
                  </button>
                  <Link to={`/san-pham/${product.slug}`} className="bg-gray-700 hover:bg-gray-800 text-white p-2 rounded-full">
                    <FaEye className="text-lg" />
                  </Link>
                </div>
              </div>
              
              <div className="p-4">
                <Link to={`/san-pham/${product.slug}`} className="block">
                  <h3 className="font-medium text-lg mb-2 hover:text-blue-600 line-clamp-2">{product.name}</h3>
                </Link>
                
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">({product.reviewCount})</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {product.salePrice ? (
                    <>
                      <span className="font-bold text-lg text-red-600">{formatPrice(product.salePrice)}</span>
                      <span className="text-gray-500 line-through text-sm">{formatPrice(product.price)}</span>
                    </>
                  ) : (
                    <span className="font-bold text-lg">{formatPrice(product.price)}</span>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};