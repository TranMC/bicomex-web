import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaUser, FaCreditCard, FaTruck, FaQuestionCircle, FaExchangeAlt } from 'react-icons/fa';
import '../../styles/components/Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      {/* Newsletter Section */}
      <div className="newsletter">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <h3 className="newsletter-title">Đăng ký nhận bản tin</h3>
            <p className="newsletter-description">Đăng ký nhận bản tin của BICOMEX để được cập nhật những ưu đãi mới nhất.</p>
          </div>
          <div className="newsletter-form-container">
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Nhập email của bạn" 
                className="newsletter-input" 
              />
              <button className="newsletter-button">
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="site-footer">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-column">
              <h3 className="footer-title">
                Về BICOMEX
              </h3>
              <div className="footer-content">                <div className="logo-footer">
                  <img 
                    src="/logo_footer.png" 
                    alt="Bicomex" 
                    className="logo-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      const logoText = document.createElement('div');
                      logoText.innerHTML = '<div style="font-size: 24px; font-weight: bold; color: white;">BICOMEX</div>';
                      e.target.parentNode.appendChild(logoText);
                    }} 
                  />
                </div>
                <p className="footer-description">
                  Bicomex là đơn vị phân phối vật liệu xây dựng chính hãng cho các công trình dân dụng và nhà ở. Chúng tôi cam kết mang đến những sản phẩm chất lượng với giá cả cạnh tranh nhất.
                </p>
                <div className="social-icons">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon social-icon-facebook" aria-label="Facebook">
                    <FaFacebook />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon social-icon-twitter" aria-label="Twitter">
                    <FaTwitter />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon social-icon-instagram" aria-label="Instagram">
                    <FaInstagram />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon social-icon-youtube" aria-label="Youtube">
                    <FaYoutube />
                  </a>
                </div>
              </div>
            </div>

            {/* Policies */}
            <div className="footer-column">
              <h3 className="footer-title">
                Chính sách
              </h3>
              <ul className="footer-content footer-links">
                <li>
                  <Link to="/chinh-sach/thanh-toan" className="footer-link">
                    <FaCreditCard className="footer-link-icon" />
                    <span>Chính sách thanh toán</span>
                  </Link>
                </li>
                <li>
                  <Link to="/chinh-sach/van-chuyen" className="footer-link">
                    <FaTruck className="footer-link-icon" />
                    <span>Chính sách vận chuyển</span>
                  </Link>
                </li>
                <li>
                  <Link to="/chinh-sach/bao-hanh" className="footer-link">
                    <FaQuestionCircle className="footer-link-icon" />
                    <span>Chính sách bảo hành</span>
                  </Link>
                </li>
                <li>
                  <Link to="/chinh-sach/doi-tra" className="footer-link">
                    <FaExchangeAlt className="footer-link-icon" />
                    <span>Chính sách đổi trả</span>
                  </Link>
                </li>
                <li>
                  <Link to="/chinh-sach/bao-mat" className="footer-link">
                    <FaUser className="footer-link-icon" />
                    <span>Chính sách bảo mật</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="footer-column">
              <h3 className="footer-title">
                Danh mục sản phẩm
              </h3>
              <ul className="footer-content footer-links footer-links-simple">
                <li>
                  <Link to="/san-pham/gach-op-lat" className="footer-link-simple">
                    Gạch ốp lát
                  </Link>
                </li>
                <li>
                  <Link to="/san-pham/son-noi-ngoai-that" className="footer-link-simple">
                    Sơn nội ngoại thất
                  </Link>
                </li>
                <li>
                  <Link to="/san-pham/san-go-op-lat" className="footer-link-simple">
                    Sàn gỗ ốp lát
                  </Link>
                </li>
                <li>
                  <Link to="/san-pham/xi-mang-vat-lieu-tho" className="footer-link-simple">
                    Xi măng & vật liệu thô
                  </Link>
                </li>
                <li>
                  <Link to="/san-pham/den-trang-tri" className="footer-link-simple">
                    Đèn trang trí
                  </Link>
                </li>
                <li>
                  <Link to="/san-pham/may-moc-xay-dung" className="footer-link-simple">
                    Máy móc xây dựng
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-column">
              <h3 className="footer-title">
                Liên hệ với chúng tôi
              </h3>
              <div className="footer-content">
                <div className="contact-company">
                  <p className="company-name">CÔNG TY TNHH BICOMEX</p>
                  <p className="company-registration">MST: 0123456789 do Sở KHĐT TP.HCM cấp ngày 01/01/2022</p>
                </div>
                <ul className="contact-list">
                  <li className="contact-item">
                    <div className="contact-icon-wrapper contact-icon-location">
                      <FaMapMarkerAlt className="contact-icon" />
                    </div>
                    <span className="contact-text">154 Nguyễn Chí Thanh, Đống Đa, Hà Nội</span>
                  </li>
                  <li className="contact-item">
                    <div className="contact-icon-wrapper contact-icon-phone">
                      <FaPhone className="contact-icon" />
                    </div>
                    <a href="tel:19006750" className="contact-text contact-link-tel">19006750</a>
                  </li>
                  <li className="contact-item">
                    <div className="contact-icon-wrapper contact-icon-email">
                      <FaEnvelope className="contact-icon" />
                    </div>
                    <a href="mailto:support@bicomex.com" className="contact-text contact-link-email">support@bicomex.com</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="copyright">&copy; {new Date().getFullYear()} BICOMEX. Tất cả quyền được bảo lưu.</p>
            <p className="credits">Thiết kế bởi <a href="#" className="credits-link">Team Lmao</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
};