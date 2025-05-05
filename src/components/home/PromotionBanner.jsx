import { Link } from 'react-router-dom';
import './PromotionBanner.css';

export const PromotionBanner = () => {
  return (
    <section className="promotion-banner py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="promo-item relative rounded-lg overflow-hidden">
          <img 
            src="/src/assets/images/promo-building.jpg" 
            alt="Vật liệu xây dựng khuyến mãi" 
            className="w-full h-[200px] md:h-[250px] object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center p-6">
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-2">Giảm giá đến 20%</h3>
              <p className="mb-4">Vật liệu xây dựng chất lượng cao</p>
              <Link 
                to="/khuyen-mai/vat-lieu" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-medium"
              >
                Mua ngay
              </Link>
            </div>
          </div>
        </div>
        
        <div className="promo-item relative rounded-lg overflow-hidden">
          <img 
            src="/src/assets/images/promo-tools.jpg" 
            alt="Dụng cụ xây dựng" 
            className="w-full h-[200px] md:h-[250px] object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center p-6">
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-2">Dụng cụ xây dựng</h3>
              <p className="mb-4">Mua 2 tặng 1 - Chỉ trong tháng 5</p>
              <Link 
                to="/khuyen-mai/dung-cu" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-medium"
              >
                Xem ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};