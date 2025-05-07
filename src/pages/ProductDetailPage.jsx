import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaTruck, FaShieldAlt, FaExchangeAlt, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../context/CartProvider';
import { useToast } from '../context/ToastProvider';
import '../styles/pages/ProductDetailPage.css';

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();
  const toast = useToast();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const mockProducts = [
        {
          id: 1,
          name: 'Xi măng Portland PC40',
          image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2VtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
          price: 95000,
          salePrice: 85000,
          rating: 4.8,
          reviewCount: 124,
          slug: 'xi-mang-portland-pc40',
          category: 'vat-lieu-xay-dung',
          brand: 'Hà Tiên',
          description: 'Xi măng Portland PC40 Hà Tiên là loại xi măng chất lượng cao, đáp ứng tiêu chuẩn TCVN 2682:2009 và ASTM C150. Sản phẩm phù hợp cho các công trình dân dụng, công nghiệp, thủy lợi và cầu đường.',
          features: [
            'Cường độ nén cao sau 28 ngày',
            'Khả năng chống thấm tốt',
            'Độ bền cao trong môi trường khắc nghiệt',
            'Thời gian đông kết phù hợp cho thi công'
          ],
          specifications: {
            'Khối lượng': '50kg/bao',
            'Màu sắc': 'Xám',
            'Cường độ nén sau 28 ngày': '≥ 40 MPa',
            'Thời gian đông kết ban đầu': '≥ 45 phút',
            'Độ mịn (Blaine)': '≥ 2800 cm²/g'
          },
          stock: 500,
          images: [
            'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2VtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1577490441774-691eff7263c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNlbWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1621410163841-61c76effd36e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2VtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
          ]
        },
        {
          id: 2,
          name: 'Gạch ốp tường Đồng Tâm 30x60',
          image: 'https://images.unsplash.com/photo-1584733303662-e5dcc1801cad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
          price: 180000,
          salePrice: null,
          rating: 4.5,
          reviewCount: 98,
          slug: 'gach-op-tuong-dong-tam-30x60',
          category: 'vat-lieu-xay-dung',
          brand: 'Đồng Tâm',
          description: 'Gạch ốp tường Đồng Tâm kích thước 30x60cm với họa tiết sang trọng, phù hợp cho phòng khách, phòng ngủ và các không gian nội thất khác.',
          features: [
            'Bề mặt phẳng, họa tiết sắc nét',
            'Chống thấm, chống trầy xước',
            'Dễ lau chùi, vệ sinh',
            'Khả năng chịu nhiệt tốt'
          ],
          specifications: {
            'Kích thước': '30x60cm',
            'Độ dày': '8mm',
            'Số viên/hộp': '8 viên',
            'Diện tích/hộp': '1.44m²',
            'Màu sắc': 'Trắng vân đá'
          },
          stock: 1200,
          images: [
            'https://images.unsplash.com/photo-1584733303662-e5dcc1801cad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1565706199018-1bbfe59adfa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
          ]
        },
      ];

      const foundProduct = mockProducts.find(p => p.slug === slug);
      setProduct(foundProduct || null);

      if (foundProduct) {
        const related = mockProducts
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }

      setLoading(false);
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, [slug]);

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(99, quantity + value));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`Đã thêm ${quantity} ${product.name} vào giỏ hàng!`);
    }
  };

  const getCategoryName = (categorySlug) => {
    const categories = {
      'vat-lieu-xay-dung': 'Vật liệu xây dựng',
      'son-phu-kien': 'Sơn & Phụ kiện',
      'thiet-bi-dien': 'Thiết bị điện',
      'dung-cu-xay-dung': 'Dụng cụ xây dựng',
      'vat-lieu-noi-that': 'Vật liệu nội thất',
      'vat-tu-cap-thoat-nuoc': 'Vật tư cấp thoát nước',
    };
    return categories[categorySlug] || 'Danh mục sản phẩm';
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Sản phẩm không tồn tại</h2>
          <p className="text-gray-600 mb-6">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Link 
            to="/san-pham" 
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700"
          >
            Quay lại trang sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page py-8">
      <div className="container mx-auto px-4">
        {}
        <div className="breadcrumb mb-6">
          <nav className="flex text-sm">
            <Link to="/" className="text-gray-500 hover:text-blue-600">Trang chủ</Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link to="/san-pham" className="text-gray-500 hover:text-blue-600">Sản phẩm</Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link 
              to={`/san-pham/${product.category}`} 
              className="text-gray-500 hover:text-blue-600"
            >
              {getCategoryName(product.category)}
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-blue-600">{product.name}</span>
          </nav>
        </div>

        {}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
          <div className="flex flex-col md:flex-row">
            {}
            <div className="md:w-1/2 p-6">
              <div className="product-image mb-4">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              <div className="product-thumbnails flex gap-2">
                {product.images.map((img, index) => (
                  <div 
                    key={index} 
                    className="w-20 h-20 border rounded cursor-pointer hover:border-blue-500"
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} - ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {}
            <div className="md:w-1/2 p-6 border-l">
              <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">({product.reviewCount} đánh giá)</span>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-600">
                  Thương hiệu: <span className="font-medium">{product.brand}</span>
                </p>
                <p className="text-gray-600">
                  Tình trạng: <span className="font-medium text-green-600">Còn hàng ({product.stock} sản phẩm)</span>
                </p>
              </div>
              
              <div className="price-section mb-6">
                {product.salePrice ? (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-3xl text-red-600">{formatPrice(product.salePrice)}</span>
                      <span className="text-gray-500 line-through text-xl">{formatPrice(product.price)}</span>
                      <span className="bg-red-100 text-red-600 text-sm font-bold py-1 px-2 rounded">
                        -{Math.round((1 - product.salePrice / product.price) * 100)}%
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">
                      Tiết kiệm: {formatPrice(product.price - product.salePrice)}
                    </p>
                  </>
                ) : (
                  <span className="font-bold text-3xl">{formatPrice(product.price)}</span>
                )}
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700 mb-3">{product.description.substring(0, 150)}...</p>
              </div>
              
              <div className="quantity-section flex items-center mb-6">
                <span className="mr-4">Số lượng:</span>
                <div className="flex items-center border rounded">
                  <button 
                    className="px-3 py-2 border-r hover:bg-gray-100"
                    onClick={() => handleQuantityChange(-1)}
                  >
                    <FaMinus />
                  </button>
                  <input 
                    type="number" 
                    min="1" 
                    max="99" 
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-12 text-center py-2 border-0 focus:outline-none focus:ring-0"
                  />
                  <button 
                    className="px-3 py-2 border-l hover:bg-gray-100"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button 
                  className="px-8 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 flex-1"
                  onClick={handleAddToCart}
                >
                  Thêm vào giỏ hàng
                </button>
                <button className="px-8 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 flex-1">
                  Mua ngay
                </button>
              </div>
              
              <div className="benefits mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaTruck className="text-blue-600 mr-2" />
                    <span>Giao hàng nhanh toàn quốc</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaShieldAlt className="text-blue-600 mr-2" />
                    <span>Bảo hành chính hãng</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaExchangeAlt className="text-blue-600 mr-2" />
                    <span>Đổi trả trong 7 ngày</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaShieldAlt className="text-blue-600 mr-2" />
                    <span>Sản phẩm chính hãng 100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {}
        <div className="product-details mb-10">
          <div className="border-b mb-6">
            <div className="flex flex-wrap -mb-px">
              <button 
                className={`inline-block py-4 px-6 text-sm font-medium ${
                  activeTab === 'description' 
                    ? 'border-b-2 border-blue-600 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Mô tả sản phẩm
              </button>
              <button 
                className={`inline-block py-4 px-6 text-sm font-medium ${
                  activeTab === 'specifications' 
                    ? 'border-b-2 border-blue-600 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('specifications')}
              >
                Thông số kỹ thuật
              </button>
              <button 
                className={`inline-block py-4 px-6 text-sm font-medium ${
                  activeTab === 'reviews' 
                    ? 'border-b-2 border-blue-600 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Đánh giá ({product.reviewCount})
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            {activeTab === 'description' && (
              <div className="description">
                <p className="text-gray-700 mb-4">{product.description}</p>
                <h3 className="text-lg font-medium mb-3">Tính năng nổi bật</h3>
                <ul className="list-disc pl-5 mb-4">
                  {product.features.map((feature, index) => (
                    <li key={index} className="mb-2 text-gray-700">{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div className="specifications">
                <h3 className="text-lg font-medium mb-4">Thông số kỹ thuật</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(product.specifications).map(([key, value], index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-4 py-3 border-r font-medium">{key}</td>
                          <td className="px-4 py-3">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="reviews">
                <div className="flex items-center mb-6">
                  <div className="mr-6">
                    <div className="text-4xl font-bold text-center">{product.rating.toFixed(1)}</div>
                    <div className="flex text-yellow-400 justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 text-center mt-1">
                      {product.reviewCount} đánh giá
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className="w-24 text-sm">5 sao</div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-yellow-400 h-full rounded-full" style={{ width: '70%' }}></div>
                      </div>
                      <div className="w-12 text-sm text-right">70%</div>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="w-24 text-sm">4 sao</div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-yellow-400 h-full rounded-full" style={{ width: '20%' }}></div>
                      </div>
                      <div className="w-12 text-sm text-right">20%</div>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="w-24 text-sm">3 sao</div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-yellow-400 h-full rounded-full" style={{ width: '5%' }}></div>
                      </div>
                      <div className="w-12 text-sm text-right">5%</div>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="w-24 text-sm">2 sao</div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-yellow-400 h-full rounded-full" style={{ width: '3%' }}></div>
                      </div>
                      <div className="w-12 text-sm text-right">3%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-24 text-sm">1 sao</div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-yellow-400 h-full rounded-full" style={{ width: '2%' }}></div>
                      </div>
                      <div className="w-12 text-sm text-right">2%</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center py-10">
                  <p className="text-gray-500 mb-4">Tính năng đánh giá chi tiết sẽ sớm được cập nhật</p>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700">
                    Viết đánh giá
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <div key={related.id} className="product-card bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative">
                    <Link to={`/san-pham/${related.slug}`} className="block">
                      <img 
                        src={related.image} 
                        alt={related.name} 
                        className="w-full h-48 object-cover"
                      />
                    </Link>
                    
                    {related.salePrice && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold py-1 px-2 rounded">
                        {Math.round((1 - related.salePrice / related.price) * 100)}% Giảm
                      </span>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <Link to={`/san-pham/${related.slug}`} className="block">
                      <h3 className="font-medium text-lg mb-2 hover:text-blue-600 line-clamp-2">{related.name}</h3>
                    </Link>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < Math.floor(related.rating) ? 'text-yellow-400' : 'text-gray-300'} size={12} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600 ml-2">({related.reviewCount})</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {related.salePrice ? (
                        <>
                          <span className="font-bold text-lg text-red-600">{formatPrice(related.salePrice)}</span>
                          <span className="text-gray-500 line-through text-sm">{formatPrice(related.price)}</span>
                        </>
                      ) : (
                        <span className="font-bold text-lg">{formatPrice(related.price)}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};