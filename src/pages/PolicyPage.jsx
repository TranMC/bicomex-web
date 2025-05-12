import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const PolicyPage = ({ type }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    let pageTitle = '';
    
    switch (type) {
      case 'payment':
        pageTitle = 'Chính sách thanh toán';
        setTitle(pageTitle);
        setContent(paymentPolicyContent);
        break;
      case 'shipping':
        pageTitle = 'Chính sách vận chuyển';
        setTitle(pageTitle);
        setContent(shippingPolicyContent);
        break;
      case 'warranty':
        pageTitle = 'Chính sách bảo hành';
        setTitle(pageTitle);
        setContent(warrantyPolicyContent);
        break;
      case 'return':
        pageTitle = 'Chính sách đổi trả';
        setTitle(pageTitle);
        setContent(returnPolicyContent);
        break;
      case 'privacy':
        pageTitle = 'Chính sách bảo mật';
        setTitle(pageTitle);
        setContent(privacyPolicyContent);
        break;
      default:
        pageTitle = 'Chính sách';
        setTitle(pageTitle);
        setContent([]);
    }
    
    // Cập nhật title và meta description trực tiếp
    document.title = `${pageTitle} | BICOMEX`;
    
    // Cập nhật meta description (nếu cần)
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `Thông tin về ${pageTitle.toLowerCase()} của BICOMEX`);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = `Thông tin về ${pageTitle.toLowerCase()} của BICOMEX`;
      document.head.appendChild(meta);
    }
    
    return () => {
      // Cleanup khi component unmount (tùy chọn)
      document.title = 'BICOMEX';
    };
  }, [type]);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">{title}</h1>
          <div className="breadcrumbs">
            <Link to="/">Trang chủ</Link>
            <FaArrowRight className="breadcrumb-separator" />
            <span>{title}</span>
          </div>
        </div>
      </div>

      <div className="page-content-wrapper">
        <div className="policy-content">
          {content.map((section, index) => (
            <div key={index} className="policy-section">
              <h2 className="policy-section-title">{section.title}</h2>
              <div className="policy-section-content">
                {section.paragraphs.map((paragraph, idx) => (
                  <p key={idx} className="policy-paragraph">{paragraph}</p>
                ))}
                {section.list && (
                  <ul className="policy-list">
                    {section.list.map((item, idx) => (
                      <li key={idx} className="policy-list-item">{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Nội dung chính sách thanh toán
const paymentPolicyContent = [
  {
    title: 'Phương thức thanh toán',
    paragraphs: [
      'BICOMEX cung cấp nhiều phương thức thanh toán khác nhau để khách hàng lựa chọn theo nhu cầu và sự tiện lợi của mình.'
    ],
    list: [
      'Thanh toán tiền mặt khi nhận hàng (COD)',
      'Thanh toán qua thẻ ATM nội địa/Internet Banking',
      'Thanh toán qua thẻ tín dụng/thẻ ghi nợ quốc tế',
      'Thanh toán qua ví điện tử (MoMo, ZaloPay, VNPay)',
      'Chuyển khoản ngân hàng'
    ]
  },
  {
    title: 'Thông tin tài khoản ngân hàng',
    paragraphs: [
      'Quý khách có thể thanh toán bằng cách chuyển khoản đến tài khoản ngân hàng của BICOMEX theo thông tin sau:',
      'Tên tài khoản: CÔNG TY TNHH BICOMEX',
      'Số tài khoản: 19035610xxxxx',
      'Ngân hàng: Techcombank - Chi nhánh Đống Đa, Hà Nội',
      'Nội dung chuyển khoản: [Mã đơn hàng] - [Tên khách hàng] - [Số điện thoại]'
    ]
  },
  {
    title: 'Chính sách hoàn tiền',
    paragraphs: [
      'Trong trường hợp đơn hàng bị hủy hoặc trả lại, BICOMEX sẽ hoàn tiền cho khách hàng theo phương thức thanh toán ban đầu:',
      'Thời gian hoàn tiền: 3-15 ngày làm việc tùy theo phương thức thanh toán và ngân hàng của khách hàng.'
    ]
  }
];

// Nội dung chính sách vận chuyển
const shippingPolicyContent = [
  {
    title: 'Phạm vi giao hàng',
    paragraphs: [
      'BICOMEX cung cấp dịch vụ giao hàng trên toàn quốc.',
      'Một số khu vực vùng sâu, vùng xa có thể mất thêm 1-2 ngày so với thời gian giao hàng tiêu chuẩn.'
    ]
  },
  {
    title: 'Thời gian giao hàng',
    paragraphs: [
      'Thời gian giao hàng dự kiến được tính từ khi đơn hàng được xác nhận:'
    ],
    list: [
      'Nội thành Hà Nội và TP.HCM: 1-2 ngày làm việc',
      'Các tỉnh thành khác: 2-5 ngày làm việc',
      'Vùng sâu, vùng xa: 5-7 ngày làm việc'
    ]
  },
  {
    title: 'Phí vận chuyển',
    paragraphs: [
      'Phí vận chuyển sẽ được tính dựa trên khối lượng, kích thước của sản phẩm và địa điểm giao hàng.',
      'Đơn hàng trên 5.000.000đ sẽ được miễn phí vận chuyển cho khu vực nội thành Hà Nội và TP.HCM.',
      'Chi phí vận chuyển sẽ được hiển thị rõ ràng trước khi khách hàng hoàn tất đơn hàng.'
    ]
  },
  {
    title: 'Kiểm tra hàng khi nhận',
    paragraphs: [
      'Quý khách vui lòng kiểm tra kỹ hàng hóa khi nhận để đảm bảo hàng nguyên vẹn, không bị hư hỏng.',
      'Trường hợp phát hiện sản phẩm bị hư hỏng, không đúng số lượng hoặc chủng loại, vui lòng liên hệ ngay với BICOMEX trong vòng 24h kể từ khi nhận hàng để được hỗ trợ.'
    ]
  }
];

// Nội dung chính sách bảo hành
const warrantyPolicyContent = [
  {
    title: 'Thời hạn bảo hành',
    paragraphs: [
      'Sản phẩm được bảo hành từ 6 tháng đến 36 tháng tùy theo loại sản phẩm và thương hiệu.',
      'Thời hạn bảo hành cụ thể của từng sản phẩm sẽ được ghi rõ trên phiếu bảo hành và trang thông tin sản phẩm.'
    ]
  },
  {
    title: 'Điều kiện bảo hành',
    paragraphs: [
      'Sản phẩm được bảo hành miễn phí nếu:'
    ],
    list: [
      'Sản phẩm vẫn trong thời hạn bảo hành',
      'Sản phẩm có tem bảo hành và phiếu bảo hành còn nguyên vẹn',
      'Sản phẩm bị lỗi do nhà sản xuất',
      'Sản phẩm được sử dụng đúng theo hướng dẫn sử dụng'
    ]
  },
  {
    title: 'Không bảo hành trong các trường hợp',
    paragraphs: [],
    list: [
      'Sản phẩm đã quá thời hạn bảo hành',
      'Sản phẩm bị hư hỏng do sử dụng không đúng cách, va đập, rơi vỡ',
      'Sản phẩm bị hư hỏng do thiên tai, hỏa hoạn, lụt lội',
      'Sản phẩm bị thay đổi, sửa chữa bởi người không được ủy quyền',
      'Tem bảo hành bị rách, không còn nguyên vẹn'
    ]
  },
  {
    title: 'Quy trình bảo hành',
    paragraphs: [
      'Khách hàng có thể yêu cầu bảo hành sản phẩm thông qua các kênh sau:',
      '- Liên hệ trực tiếp với BICOMEX qua hotline: 19006750',
      '- Mang sản phẩm đến trung tâm bảo hành được ủy quyền',
      '- Gửi yêu cầu bảo hành qua email: support@bicomex.com'
    ]
  }
];

// Nội dung chính sách đổi trả
const returnPolicyContent = [
  {
    title: 'Điều kiện đổi trả',
    paragraphs: [
      'BICOMEX chấp nhận đổi trả sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng nếu thỏa mãn các điều kiện sau:'
    ],
    list: [
      'Sản phẩm còn nguyên vẹn, không có dấu hiệu đã qua sử dụng',
      'Sản phẩm còn đầy đủ tem nhãn, nhãn mác, thẻ bảo hành',
      'Sản phẩm còn đầy đủ phụ kiện, tặng phẩm, quà khuyến mãi (nếu có)',
      'Có hóa đơn mua hàng hoặc phiếu giao hàng'
    ]
  },
  {
    title: 'Các trường hợp được đổi trả',
    paragraphs: [],
    list: [
      'Sản phẩm bị lỗi kỹ thuật do nhà sản xuất',
      'Sản phẩm không đúng chủng loại, mẫu mã như đã đặt',
      'Sản phẩm không đủ số lượng như trong đơn hàng',
      'Sản phẩm giao đến bị hư hỏng do quá trình vận chuyển'
    ]
  },
  {
    title: 'Chi phí đổi trả',
    paragraphs: [
      'Đối với sản phẩm lỗi do nhà sản xuất hoặc do lỗi từ BICOMEX: Chúng tôi sẽ chịu toàn bộ chi phí đổi trả.',
      'Đối với yêu cầu đổi trả do khách hàng thay đổi nhu cầu: Khách hàng sẽ chịu phí vận chuyển hai chiều.'
    ]
  },
  {
    title: 'Quy trình đổi trả',
    paragraphs: [
      'Khách hàng liên hệ với BICOMEX qua hotline 19006750 hoặc email support@bicomex.com để được hướng dẫn thủ tục đổi trả.',
      'Thời gian xử lý đổi trả: 3-5 ngày làm việc kể từ khi BICOMEX nhận được sản phẩm trả lại.',
      'Thời gian hoàn tiền: 5-15 ngày làm việc tùy theo phương thức thanh toán ban đầu.'
    ]
  }
];

// Nội dung chính sách bảo mật
const privacyPolicyContent = [
  {
    title: 'Thông tin thu thập',
    paragraphs: [
      'BICOMEX thu thập các thông tin sau đây từ khách hàng:'
    ],
    list: [
      'Thông tin cá nhân: họ tên, số điện thoại, email, địa chỉ',
      'Thông tin giao dịch: lịch sử mua hàng, phương thức thanh toán',
      'Thông tin thiết bị: địa chỉ IP, loại thiết bị, trình duyệt web',
      'Thông tin hoạt động: thời gian truy cập, trang đã xem, tương tác'
    ]
  },
  {
    title: 'Mục đích sử dụng thông tin',
    paragraphs: [
      'Chúng tôi sử dụng thông tin của khách hàng cho các mục đích sau:'
    ],
    list: [
      'Xử lý đơn hàng và giao hàng',
      'Cung cấp dịch vụ chăm sóc khách hàng',
      'Thông báo về trạng thái đơn hàng, khuyến mãi',
      'Cải thiện sản phẩm và dịch vụ',
      'Phân tích hành vi người dùng để tối ưu trải nghiệm'
    ]
  },
  {
    title: 'Bảo mật thông tin',
    paragraphs: [
      'BICOMEX cam kết bảo vệ thông tin cá nhân của khách hàng bằng các biện pháp sau:',
      'Mã hóa dữ liệu khi truyền tải qua internet',
      'Hạn chế quyền truy cập vào thông tin cá nhân',
      'Thường xuyên cập nhật các biện pháp an ninh',
      'Không bán, cho thuê hay trao đổi thông tin cá nhân của khách hàng cho bên thứ ba'
    ]
  },
  {
    title: 'Quyền của khách hàng',
    paragraphs: [
      'Khách hàng có các quyền sau đây đối với thông tin cá nhân của mình:'
    ],
    list: [
      'Truy cập và kiểm tra thông tin cá nhân',
      'Yêu cầu cập nhật hoặc chỉnh sửa thông tin',
      'Yêu cầu xóa thông tin',
      'Hủy đăng ký nhận thông báo tiếp thị',
      'Khiếu nại về việc sử dụng thông tin'
    ]
  }
]; 