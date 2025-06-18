/**
 * Dịch vụ gửi email mẫu cho người đăng ký nhận bản tin
 * 
 * Lưu ý: Đây chỉ là dịch vụ mô phỏng, không thực sự gửi email.
 * Trong môi trường thực tế, bạn sẽ sử dụng một dịch vụ email thực như
 * SendGrid, Mailchimp, AWS SES, hoặc các dịch vụ tương tự.
 */

/**
 * Gửi email xác nhận đăng ký nhận bản tin
 * @param {string} email - Email người đăng ký
 * @returns {Promise<Object>} - Kết quả của việc gửi email
 */
export const sendWelcomeEmail = async (email) => {
  // Giả lập độ trễ của quá trình gửi email
  return new Promise((resolve) => {
    // Đợi 1.5 giây để giả lập thời gian gửi
    setTimeout(() => {
      console.log(`📧 [DEMO] Đã gửi email xác nhận tới: ${email}`);
      
      // Giả lập thành công (thực tế sẽ trả về kết quả từ API gửi mail)
      resolve({
        success: true,
        message: `Đã gửi email xác nhận tới ${email}. Vui lòng kiểm tra hộp thư của bạn.`
      });
      
    }, 1500);
  });
};

/**
 * Tạo nội dung email mẫu xác nhận đăng ký nhận bản tin
 * @param {string} email - Email người đăng ký
 * @returns {Object} - Nội dung email
 */
export const generateWelcomeEmailContent = (email) => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  
  return {
    to: email,
    from: 'newsletter@bicomex.com',
    subject: 'Chào mừng bạn đến với Bản tin BICOMEX',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://bicomex.com/logo.png" alt="BICOMEX" style="max-width: 180px;">
        </div>
        
        <h2 style="color: #2563eb; text-align: center;">Cảm ơn bạn đã đăng ký nhận bản tin!</h2>
        
        <p>Chào bạn,</p>
        
        <p>Cảm ơn bạn đã đăng ký nhận bản tin từ BICOMEX. Từ bây giờ, bạn sẽ nhận được những thông tin mới nhất về:</p>
        
        <ul style="line-height: 1.6;">
          <li>Sản phẩm mới và bộ sưu tập mới</li>
          <li>Khuyến mãi và ưu đãi đặc biệt</li>
          <li>Mẹo và hướng dẫn về vật liệu xây dựng</li>
          <li>Thông tin về xu hướng thiết kế và trang trí</li>
        </ul>
        
        <p>Email của bạn (<strong>${email}</strong>) đã được thêm vào danh sách nhận bản tin của chúng tôi vào ngày ${formattedDate}.</p>
        
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 0; font-weight: bold;">Mã giảm giá đặc biệt cho thành viên mới:</p>
          <p style="font-size: 24px; font-weight: bold; text-align: center; color: #1e40af; margin: 10px 0;">WELCOME15</p>
          <p style="margin: 0; text-align: center;">Giảm 15% cho đơn hàng đầu tiên của bạn!</p>
        </div>
        
        <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email <a href="mailto:support@bicomex.com">support@bicomex.com</a> hoặc gọi số hotline 19006750.</p>
        
        <p>Trân trọng,<br>Đội ngũ BICOMEX</p>
        
        <hr style="border: none; border-top: 1px solid #eaeaea; margin: 25px 0;">
        
        <p style="font-size: 12px; color: #6b7280; text-align: center;">
          © ${new Date().getFullYear()} BICOMEX. Tất cả quyền được bảo lưu.<br>
          Địa chỉ: 154 Nguyễn Chí Thanh, Đống Đa, Hà Nội<br>
          <a href="https://bicomex.com/huy-dang-ky" style="color: #6b7280;">Huỷ đăng ký</a>
        </p>
      </div>
    `
  };
};
