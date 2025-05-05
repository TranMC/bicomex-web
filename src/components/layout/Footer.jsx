import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">BICOMEX</h3>
            <p className="mb-4">Cung cấp vật liệu xây dựng chất lượng cao và dịch vụ toàn diện cho mọi công trình.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white"><FaFacebook size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-white"><FaTwitter size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-white"><FaInstagram size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-white"><FaYoutube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><Link to="/gioi-thieu" className="text-gray-300 hover:text-white">Giới thiệu</Link></li>
              <li><Link to="/san-pham" className="text-gray-300 hover:text-white">Sản phẩm</Link></li>
              <li><Link to="/du-an" className="text-gray-300 hover:text-white">Dự án</Link></li>
              <li><Link to="/tin-tuc" className="text-gray-300 hover:text-white">Tin tức</Link></li>
              <li><Link to="/lien-he" className="text-gray-300 hover:text-white">Liên hệ</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Danh mục sản phẩm</h3>
            <ul className="space-y-2">
              <li><Link to="/san-pham/vat-lieu-xay-dung" className="text-gray-300 hover:text-white">Vật liệu xây dựng</Link></li>
              <li><Link to="/san-pham/son-phu-kien" className="text-gray-300 hover:text-white">Sơn & Phụ kiện</Link></li>
              <li><Link to="/san-pham/thiet-bi-dien" className="text-gray-300 hover:text-white">Thiết bị điện</Link></li>
              <li><Link to="/san-pham/dung-cu-xay-dung" className="text-gray-300 hover:text-white">Dụng cụ xây dựng</Link></li>
              <li><Link to="/san-pham/vat-lieu-noi-that" className="text-gray-300 hover:text-white">Vật liệu nội thất</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Thông tin liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-primary" />
                <span>123 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-primary" />
                <span>0900-000-000</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-primary" />
                <span>info@bicomex.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Bicomex. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};