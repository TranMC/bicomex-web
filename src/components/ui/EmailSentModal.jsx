import React from 'react';
import { FaCheckCircle, FaEnvelope, FaTimes } from 'react-icons/fa';
import '../../styles/components/EmailSentModal.css';

/**
 * Modal hiển thị thông báo đã gửi email thành công
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Trạng thái hiển thị của modal
 * @param {Function} props.onClose - Hàm đóng modal
 * @param {string} props.email - Email người dùng đã đăng ký
 * @returns {JSX.Element|null} Component EmailSentModal
 */
const EmailSentModal = ({ isOpen, onClose, email }) => {
  if (!isOpen) return null;

  return (
    <div className="email-sent-modal-overlay">
      <div className="email-sent-modal">
        <button className="email-sent-modal-close" onClick={onClose} aria-label="Đóng">
          <FaTimes />
        </button>

        <div className="email-sent-modal-content">
          <div className="email-sent-modal-icon">
            <FaCheckCircle />
          </div>

          <h3 className="email-sent-modal-title">Đăng ký thành công!</h3>
          
          <p className="email-sent-modal-message">
            Cảm ơn bạn đã đăng ký nhận bản tin của BICOMEX.
          </p>

          <div className="email-sent-modal-details">
            <FaEnvelope className="email-sent-modal-details-icon" />
            <p>
              Chúng tôi đã gửi email xác nhận đăng ký tới: 
              <strong> {email}</strong>
            </p>
          </div>

          <div className="email-sent-modal-info">
            <h4>Email của bạn sẽ bao gồm:</h4>
            <ul>
              <li>Thông báo xác nhận đăng ký</li>
              <li>Mã giảm giá đặc biệt cho thành viên mới</li>
              <li>Thông tin về các ưu đãi hấp dẫn</li>
            </ul>
          </div>

          <div className="email-sent-modal-actions">
            <button 
              className="email-sent-modal-button" 
              onClick={onClose}
            >
              Đóng
            </button>
          </div>

          <p className="email-sent-modal-note">
            Nếu bạn không nhận được email, vui lòng kiểm tra thư mục spam hoặc thử đăng ký lại.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailSentModal;
