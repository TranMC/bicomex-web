import React, { useState } from 'react';
import { NewsletterContext } from './NewsletterContext';
import { sendWelcomeEmail, generateWelcomeEmailContent } from '../utils/emailUtils';

/**
 * Provider cho Newsletter context
 * @param {Object} props - Component props
 * @returns {JSX.Element} Newsletter Provider component
 */
export const NewsletterProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  
  /**
   * Đăng ký email để nhận bản tin
   * @param {string} email - Email người dùng
   * @returns {Promise<Object>} Kết quả của việc đăng ký
   */  const subscribeNewsletter = async (email) => {
    setLoading(true);
    try {
      // Kiểm tra định dạng email cơ bản
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          
      if (!emailRegex.test(email)) {
        setLoading(false);
        return { 
          success: false, 
          message: 'Email không hợp lệ. Vui lòng kiểm tra lại.' 
        };
      }

      // Tạo nội dung email chào mừng
      const emailContent = generateWelcomeEmailContent(email);
      console.log('Nội dung email chào mừng:', emailContent);
      
      // Gửi email chào mừng
      await sendWelcomeEmail(email);
      
      setLoading(false);
      return { 
        success: true, 
        message: 'Cảm ơn bạn đã đăng ký! Chúng tôi đã gửi email xác nhận tới địa chỉ của bạn.' 
      };} catch (error) {
      console.error("Lỗi khi đăng ký newsletter:", error);
      setLoading(false);
      return { 
        success: false, 
        message: 'Có lỗi xảy ra. Vui lòng thử lại sau.' 
      };
    }
  };

  const value = {
    loading,
    subscribeNewsletter
  };

  return (
    <NewsletterContext.Provider value={value}>
      {children}
    </NewsletterContext.Provider>
  );
};
