import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaUser, FaCreditCard, FaTruck, FaQuestionCircle } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="footer">
      {/* Newsletter Section */}
      <div className="new-letter bg-blue-600 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between">
            <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
              <h3 className="text-2xl font-bold text-white mb-2">Đăng ký nhận bản tin</h3>
              <p className="text-white opacity-90">Đăng ký nhận bản tin của BICOMEX để được cập nhật những ưu đãi mới nhất.</p>
            </div>
            <div className="w-full lg:w-1/2">
              <form className="flex flex-wrap md:flex-nowrap">
                <input 
                  type="email" 
                  placeholder="Nhập email của bạn" 
                  className="w-full md:flex-1 px-4 py-3 rounded-l outline-none" 
                />
                <button className="w-full md:w-auto mt-2 md:mt-0 px-6 py-3 bg-blue-800 text-white font-medium rounded-r hover:bg-blue-900 transition-colors">
                  Đăng ký
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="site-footer bg-gray-800 text-white pt-10 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="footer-title relative text-xl font-bold mb-4 pb-2 border-b border-gray-700">
                Về BICOMEX
              </h3>
              <div className="footer-content">
                <div className="logo-footer mb-4">
                  <img 
                    src="src\assets\images\oexpo-easywipe.jpgg" 
                    alt="Bicomex" 
                    className="max-h-16"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      const logoText = document.createElement('div');
                      logoText.innerHTML = '<div style="font-size: 24px; font-weight: bold; color: white;">BICOMEX</div>';
                      e.target.parentNode.appendChild(logoText);
                    }} 
                  />
                </div>
                <p className="mb-4 text-gray-300">Bicomex là đơn vị phân phối vật liệu xây dựng chính hãng cho các công trình dân dụng và nhà ở. Chúng tôi cam kết mang đến những sản phẩm chất lượng với giá cả cạnh tranh nhất.</p>
                <div className="social-icons flex space-x-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                    <FaFacebook className="text-white" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                    <FaTwitter className="text-white" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                    <FaInstagram className="text-white" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                    <FaYoutube className="text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Policies */}
            <div>
              <h3 className="footer-title relative text-xl font-bold mb-4 pb-2 border-b border-gray-700">
                Chính sách
              </h3>
              <ul className="footer-content space-y-2">
                <li>
                  <Link to="/chinh-sach/thanh-toan" className="text-gray-300 hover:text-white flex items-center">
                    <FaCreditCard className="mr-2 text-sm" />
                    <span>Chính sách thanh toán</span>
                  </Link>
                </li>
                <li>
                  <Link to="/chinh-sach/van-chuyen" className="text-gray-300 hover:text-white flex items-center">
                    <FaTruck className="mr-2 text-sm" />
                    <span>Chính sách vận chuyển</span>
                  </Link>
                </li>
                <li>
                  <Link to="/chinh-sach/bao-hanh" className="text-gray-300 hover:text-white flex items-center">
                    <FaQuestionCircle className="mr-2 text-sm" />
                    <span>Chính sách bảo hành</span>
                  </Link>
                </li>
                <li>
                  <Link to="/chinh-sach/doi-tra" className="text-gray-300 hover:text-white flex items-center">
                    <FaTruck className="mr-2 text-sm transform rotate-180" />
                    <span>Chính sách đổi trả</span>
                  </Link>
                </li>
                <li>
                  <Link to="/chinh-sach/bao-mat" className="text-gray-300 hover:text-white flex items-center">
                    <FaUser className="mr-2 text-sm" />
                    <span>Chính sách bảo mật</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="footer-title relative text-xl font-bold mb-4 pb-2 border-b border-gray-700">
                Danh mục sản phẩm
              </h3>
              <ul className="footer-content space-y-2">
                <li>
                  <Link to="/san-pham/gach-op-lat" className="text-gray-300 hover:text-white">
                    Gạch ốp lát
                  </Link>
                </li>
                <li>
                  <Link to="/san-pham/son-noi-ngoai-that" className="text-gray-300 hover:text-white">
                    Sơn nội ngoại thất
                  </Link>
                </li>
                <li>
                  <Link to="/san-pham/san-go-op-lat" className="text-gray-300 hover:text-white">
                    Sàn gỗ ốp lát
                  </Link>
                </li>
                <li>
                  <Link to="/san-pham/xi-mang-vat-lieu-tho" className="text-gray-300 hover:text-white">
                    Xi măng & vật liệu thô
                  </Link>
                </li>
                <li>
                  <Link to="/san-pham/den-trang-tri" className="text-gray-300 hover:text-white">
                    Đèn trang trí
                  </Link>
                </li>
                <li>
                  <Link to="/san-pham/may-moc-xay-dung" className="text-gray-300 hover:text-white">
                    Máy móc xây dựng
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="footer-title relative text-xl font-bold mb-4 pb-2 border-b border-gray-700">
                Liên hệ với chúng tôi
              </h3>
              <div className="footer-content">
                <div className="mb-4">
                  <p className="font-bold text-lg">CÔNG TY TNHH BICOMEX</p>
                  <p className="text-sm text-gray-400">MSDN: 0123456789 do Sở KHĐT TP.HCM cấp ngày 01/01/2022</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FaMapMarkerAlt className="mt-1 mr-3 text-blue-400" />
                    <span>Tầng 6 Ladeco, 266 Đội Cấn, Ba Đình, Hà Nội</span>
                  </li>
                  <li className="flex items-center">
                    <FaPhone className="mr-3 text-blue-400" />
                    <span>19006750</span>
                  </li>
                  <li className="flex items-center">
                    <FaEnvelope className="mr-3 text-blue-400" />
                    <span>support@bicomex.com</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} BICOMEX. Tất cả quyền được bảo lưu.</p>
            <p className="mt-2 text-sm">Thiết kế bởi <a href="#" className="text-blue-400 hover:underline">Team Bicomex</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
};