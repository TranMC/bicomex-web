import React from 'react';
import '../styles/pages/AboutPage.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFax, FaUsers, FaMedal, FaShieldAlt, FaTruck } from 'react-icons/fa';

export const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-banner">
        <div className="container">
          <h1>Về Bicomex</h1>
          <p>Nhà phân phối vật liệu xây dựng uy tín hàng đầu Việt Nam</p>
        </div>
      </div>

      <div className="container">
        <div className="about-section">
          <div className="about-content">
            <h2>Về chúng tôi</h2>
            <p className="about-intro">
              Bicomex được thành lập vào năm 2010, là nhà phân phối vật liệu xây dựng uy tín hàng đầu tại Việt Nam. 
              Với hơn 13 năm kinh nghiệm, chúng tôi tự hào là đối tác tin cậy của hàng nghìn công trình xây dựng trên khắp cả nước.
            </p>
              <div className="about-vision-mission">
              <div className="vision-mission-item">
                <h3>Tầm nhìn</h3>
                <p>Trở thành nhà phân phối vật liệu xây dựng hàng đầu tại Việt Nam, mang đến giải pháp toàn diện, chất lượng cao và đáng tin cậy cho mọi công trình.</p>
              </div>
              
              <div className="vision-mission-item">
                <h3>Sứ mệnh</h3>
                <p>Cung cấp sản phẩm chất lượng cao với giá thành hợp lý, đáp ứng mọi nhu cầu xây dựng và trang trí, góp phần kiến tạo không gian sống hoàn hảo cho người Việt.</p>
              </div>
            </div>          </div>
          
          <div className="about-image">
            <img src="/bicomex-web/src/assets/images/about-company.jpg" alt="Bicomex trụ sở" onError={(e) => e.target.src = "https://placehold.co/500x300?text=Bicomex+Headquarter"} />
          </div>
        </div>
        
        <div className="values-section">
          <h2>Giá trị cốt lõi</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">
                <FaUsers />
              </div>
              <h3>Khách hàng là trọng tâm</h3>
              <p>Chúng tôi luôn đặt lợi ích và sự hài lòng của khách hàng lên hàng đầu trong mọi hoạt động kinh doanh.</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <FaMedal />
              </div>
              <h3>Chất lượng vượt trội</h3>
              <p>Cam kết cung cấp sản phẩm và dịch vụ chất lượng cao nhất, vượt trên mong đợi của khách hàng.</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <FaShieldAlt />
              </div>
              <h3>Trách nhiệm</h3>
              <p>Chúng tôi làm việc có trách nhiệm với khách hàng, đối tác, nhân viên và cộng đồng xã hội.</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <FaTruck />
              </div>
              <h3>Phục vụ tận tâm</h3>
              <p>Bicomex cam kết mang đến dịch vụ tận tâm, chuyên nghiệp và hiệu quả nhất cho mọi khách hàng.</p>
            </div>
          </div>
        </div>
        
        <div className="history-section">
          <h2>Lịch sử phát triển</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2010</h3>
                <p>Thành lập Bicomex với cửa hàng đầu tiên tại Hà Nội, chuyên cung cấp vật liệu xây dựng cơ bản.</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2015</h3>
                <p>Mở rộng hệ thống phân phối đến các tỉnh thành lớn, trở thành đối tác chiến lược của nhiều thương hiệu vật liệu xây dựng uy tín.</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2018</h3>
                <p>Ra mắt website thương mại điện tử, mở rộng kênh phân phối trực tuyến và dịch vụ giao hàng nhanh chóng.</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2020</h3>
                <p>Kỷ niệm 10 năm thành lập, Bicomex đã trở thành một trong những nhà phân phối vật liệu xây dựng hàng đầu Việt Nam với hơn 20 chi nhánh trên toàn quốc.</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2023</h3>
                <p>Triển khai hệ thống quản lý kho thông minh và ứng dụng công nghệ hiện đại vào quá trình vận hành, nâng cao trải nghiệm khách hàng.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-info-section">
          <h2>Thông tin liên hệ</h2>
          <div className="contact-cards">
            <div className="contact-card">
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>
              <h3>Địa chỉ</h3>
              <p>154 Nguyễn Chí Thanh, Đống Đa, Hà Nội</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">
                <FaPhone />
              </div>
              <h3>Điện thoại</h3>
              <p>Hotline: 1900 6750</p>
              <p>Di động: 0987 654 321</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <h3>Email</h3>
              <p>support@bicomex.com</p>
              <p>sales@bicomex.com</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">
                <FaFax />
              </div>
              <h3>Fax</h3>
              <p>+84 24 3766 5678</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 