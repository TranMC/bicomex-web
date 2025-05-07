import { Link } from 'react-router-dom';
import { FaStar, FaCartPlus, FaEye } from 'react-icons/fa';
import useCart from '../../hooks/useCart';
import useToast from '../../hooks/useToast';
import { featuredProducts } from '../../data/featuredProducts';
import '../../styles/components/FeaturedProducts.css';

export const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const toast = useToast();

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
        {featuredProducts.map((product) => (
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