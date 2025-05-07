import { Link } from 'react-router-dom';
import { FaStar, FaCartPlus, FaEye, FaRegHeart } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import useCart from '../../hooks/useCart';
import useToast from '../../hooks/useToast';
import { newProducts } from '../../data/newProducts';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../styles/components/NewProducts.css';

export const NewProducts = () => {
  const { addToCart } = useCart();
  const toast = useToast();
  
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
    e.target.src = "https://bizweb.dktcdn.net/thumb/large/100/330/753/products/gach-lat-nen-1.jpg?v=1553259461737";
  };

  return (
    <section className="section_new_prd py-10">
      <div className="container mx-auto px-4">
        <div className="section-title mb-8">
          <h2 className="title-head text-center text-3xl font-bold">
            Sản phẩm <span className="text-blue-600">mới về</span>
          </h2>
          <p className="text-center text-gray-600 mt-2">Cập nhật những sản phẩm mới nhất từ các thương hiệu hàng đầu</p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
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
            1280: {
              slidesPerView: 5,
            },
          }}
          className="swiper-new-products"
        >
          {newProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="item_product_main bg-white rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden h-full">
                <div className="product-thumbnail relative">
                  <Link to={`/san-pham/${product.slug}`} className="image_thumb block relative pb-[100%] overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover absolute top-0 left-0 transition-transform duration-500 hover:scale-110"
                      onError={handleImageError}
                    />
                  </Link>
                  
                  {/* Labels */}
                  <div className="product-labels absolute top-2 left-2 flex flex-col gap-1">
                    <span className="new-label bg-green-500 text-white text-xs font-bold py-1 px-2 rounded">Mới</span>
                    
                    {product.salePrice && (
                      <span className="sale-label bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">
                        -{Math.round((1 - product.salePrice / product.price) * 100)}%
                      </span>
                    )}
                  </div>
                  
                  {/* Quick actions */}
                  <div className="product-actions absolute bottom-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                      onClick={(e) => handleAddToCart(e, product)}
                      title="Thêm vào giỏ hàng"
                    >
                      <FaCartPlus className="text-sm" />
                    </button>
                    <Link 
                      to={`/san-pham/${product.slug}`} 
                      className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-full transition-colors"
                      title="Xem nhanh"
                    >
                      <FaEye className="text-sm" />
                    </Link>
                    <button 
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                      title="Thêm vào yêu thích"
                    >
                      <FaRegHeart className="text-sm" />
                    </button>
                  </div>
                </div>
                
                <div className="product-info p-3">
                  <h3 className="product-name">
                    <Link to={`/san-pham/${product.slug}`} className="block font-medium text-base mb-1 hover:text-blue-600 transition-colors line-clamp-2">
                      {product.name}
                    </Link>
                  </h3>
                  
                  {/* Stars */}
                  <div className="product-review flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={`text-xs ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                  </div>
                  
                  {/* Price */}
                  <div className="price-box">
                    {product.salePrice ? (
                      <div className="flex items-center">
                        <span className="special-price text-red-600 font-bold text-base mr-2">{formatPrice(product.salePrice)}</span>
                        <span className="old-price text-gray-500 line-through text-xs">{formatPrice(product.price)}</span>
                      </div>
                    ) : (
                      <span className="regular-price font-bold text-base">{formatPrice(product.price)}</span>
                    )}
                  </div>

                  {/* Add to cart button - Mobile only */}
                  <div className="mt-3 sm:hidden">
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center justify-center"
                    >
                      <FaCartPlus className="mr-1" /> Thêm vào giỏ
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-6">
          <Link 
            to="/san-pham-moi" 
            className="view-more border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-2 rounded inline-block transition-colors font-medium"
          >
            Xem tất cả sản phẩm mới
          </Link>
        </div>
      </div>
    </section>
  );
};