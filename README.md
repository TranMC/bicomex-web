# Bicomex - Trang web thương mại điện tử

## 📖 Tổng quan
Bicomex là một trang web thương mại điện tử hiện đại được xây dựng bằng React + Vite với nhiều tính năng tiên tiến.

## ✨ Tính năng chính

### 🔐 Hệ thống tài khoản
- **Đăng nhập/Đăng ký** với validation form đầy đủ
- **Hồ sơ cá nhân** với upload avatar và chỉnh sửa thông tin
- **Quản lý địa chỉ** với tính năng thêm/sửa/xóa
- **Cài đặt tài khoản** với bảo mật và thông báo
- **Lịch sử đơn hàng** với search và filter

### 🛒 Hệ thống mua hàng
- **Danh mục sản phẩm** với filter và search
- **Chi tiết sản phẩm** với hình ảnh zoom và review
- **Giỏ hàng** với cập nhật số lượng realtime
- **Thanh toán** với nhiều phương thức
- **Khuyến mãi** và giảm giá

### 🎨 Giao diện và UX
- **Responsive design** tối ưu cho mobile
- **Dark mode** support
- **Loading states** với skeleton và spinner
- **Error boundaries** với fallback UI
- **Toast notifications** cho feedback
- **Breadcrumb navigation** cải tiến

### ⚡ Performance và SEO
- **Code splitting** và lazy loading
- **Image optimization** với lazy load
- **Service Worker** cho PWA
- **Core Web Vitals** monitoring
- **SEO meta tags** dynamic

## 🛠️ Công nghệ sử dụng

### Frontend
- **React 18** - UI library
- **Vite** - Build tool và dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS
- **React Icons** - Icon library
- **Swiper** - Touch slider

### State Management
- **Context API** - Global state
- **Local Storage** - Persistent data
- **Custom Hooks** - Logic reuse

### Performance
- **Lazy Loading** - Code splitting
- **Image Optimization** - Responsive images
- **Service Worker** - Caching và offline
- **Bundle Analysis** - Size optimization

## 📁 Cấu trúc dự án

```
src/
├── components/          # React components
│   ├── account/        # Account-related components
│   ├── cart/           # Shopping cart components
│   ├── home/           # Homepage components
│   ├── layout/         # Layout components (Header, Footer)
│   ├── ui/             # Reusable UI components
│   └── ...
├── pages/              # Page components
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── styles/             # CSS files
└── data/               # Mock data
```

## 🚀 Cài đặt và chạy

```bash
# Clone repository
git clone [repository-url]
cd bicomex-web

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build

# Preview build
npm run preview
```

## 📱 Responsive Design

Website được tối ưu cho tất cả các thiết bị:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🔧 Các tính năng nâng cao

### PWA (Progressive Web App)
- Install prompt
- Service Worker caching
- Offline functionality
- App-like experience

### Performance Monitoring
- Core Web Vitals tracking
- Performance metrics
- Error monitoring
- Debug tools (development only)

### Accessibility
- ARIA labels và roles
- Keyboard navigation
- Screen reader support
- Focus management
- High contrast support

### Security
- Input sanitization
- XSS protection
- Safe localStorage
- Error boundary protection

## 🎯 Tối ưu hóa đã thực hiện

### Bundle Size Optimization
- Code splitting theo routes
- Dynamic imports
- Tree shaking
- Minification

### Loading Performance
- Lazy loading cho images
- Preload critical resources
- Efficient caching strategy
- Optimized bundle splitting

### User Experience
- Loading states với skeleton
- Error recovery mechanisms
- Smooth transitions
- Intuitive navigation

## 📊 Thống kê Build

- **Build time**: ~6s
- **Bundle size**: Optimized chunks
- **CSS**: Modular và tree-shaken
- **JS**: Code-split theo features

## 🔮 Roadmap

- [ ] TypeScript migration
- [ ] Backend API integration
- [ ] Real-time notifications
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Payment gateway integration

## 📝 Ghi chú

> [!NOTE]
> Đây là phiên bản demo với dữ liệu mock. Để production cần tích hợp backend API.

> [!IMPORTANT]
> Đã cleanup các file test và backup không cần thiết để tối ưu structure.

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng tạo issue hoặc pull request.

## 📄 License

MIT License - Xem [LICENSE](LICENSE) để biết thêm chi tiết.
