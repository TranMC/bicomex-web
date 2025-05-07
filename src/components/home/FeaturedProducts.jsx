import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaCartPlus, FaEye } from 'react-icons/fa';
import { useCart } from '../../context/CartProvider';
import { useToast } from '../../context/ToastProvider';
import '../../styles/components/FeaturedProducts.css';

export const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const toast = useToast();
  const [products] = useState([
    {
      id: 1,
      name: 'Xi măng Portland PC40',
      image: '/assets/images/product-cement.jpg',
      price: 95000,
      salePrice: 85000,
      rating: 4.8,
      reviewCount: 124,
      slug: 'xi-mang-portland-pc40',
    },
    {
      id: 2,
      name: 'Gạch ốp tường Đồng Tâm 30x60',
      image: '/assets/images/product-tile.jpg',
      price: 180000,
      salePrice: null,
      rating: 4.5,
      reviewCount: 98,
      slug: 'gach-op-tuong-dong-tam-30x60',
    },
    {
      id: 3,
      name: 'Sơn nội thất Dulux',
      image: '/assets/images/product-paint.jpg',
      price: 650000,
      salePrice: 590000,
      rating: 4.7,
      reviewCount: 156,
      slug: 'son-noi-that-dulux',
    },
    {
      id: 4,
      name: 'Thép xây dựng Pomina Φ10',
      image: '/assets/images/product-steel.jpg',
      price: 320000,
      salePrice: null,
      rating: 4.9,
      reviewCount: 210,
      slug: 'thep-xay-dung-pomina-phi10',
    },
    {
      id: 5,
      name: 'Ống nhựa uPVC Bình Minh Φ90',
      image: '/assets/images/product-pipe.jpg',
      price: 245000,
      salePrice: 220000,
      rating: 4.6,
      reviewCount: 87,
      slug: 'ong-nhua-upvc-binh-minh-phi90',
    },
    {
      id: 6,
      name: 'Dây điện Cadisun 2x2.5mm',
      image: '/assets/images/product-wire.jpg',
      price: 18000,
      salePrice: null,
      rating: 4.4,
      reviewCount: 65,
      slug: 'day-dien-cadisun-2x2-5mm',
    },
    {
      id: 7,
      name: 'Keo dán gạch Weber',
      image: '/assets/images/product-adhesive.jpg',
      price: 120000,
      salePrice: 110000,
      rating: 4.7,
      reviewCount: 92,
      slug: 'keo-dan-gach-weber',
    },
    {
      id: 8,
      name: 'Khóa cửa chính Yale',
      image: '/assets/images/product-lock.jpg',
      price: 1200000,
      salePrice: 1050000,
      rating: 4.8,
      reviewCount: 113,
      slug: 'khoa-cua-chinh-yale',
    },
  ]);

  // Format currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Handle add to cart
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  // Handle image error
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.style.display = 'none';
    const placeholder = document.createElement('div');
    placeholder.className = 'w-full h-64 bg-gray-200 flex items-center justify-center';
    placeholder.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>';
    e.target.parentNode.appendChild(placeholder);
  };

  return (
    <section className="featured-products py-10">
      <div className="section-header flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Sản phẩm nổi bật</h2>
        <Link to="/san-pham" className="text-blue-600 hover:underline font-medium">
          Xem tất cả
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="product-card bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <Link to={`/san-pham/${product.slug}`} className="block">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-64 object-cover"
                  onError={handleImageError}
                />
              </Link>
              
              {product.salePrice && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold py-1 px-2 rounded">
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
        ))}
      </div>
    </section>
  );
};