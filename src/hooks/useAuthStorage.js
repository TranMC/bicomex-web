import { useState, useEffect } from 'react';

// Hook để lưu trữ thông tin xác thực vào localStorage
export const useAuthStorage = () => {
  const [user, setUser] = useState(() => {
    // Khởi tạo state từ localStorage nếu có
    const savedUser = localStorage.getItem('bicomex_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Khởi tạo trạng thái đăng nhập từ localStorage
    return localStorage.getItem('bicomex_user') !== null;
  });

  // Cập nhật localStorage khi user thay đổi
  useEffect(() => {
    if (user) {
      localStorage.setItem('bicomex_user', JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('bicomex_user');
      // Đảm bảo xóa thông tin ghi nhớ email nếu người dùng đăng xuất
      localStorage.removeItem('bicomex_remember_email');
      setIsAuthenticated(false);
    }
  }, [user]);

  // Hàm đăng nhập
  const login = (userData) => {
    setUser(userData);
  };

  // Hàm đăng ký
  const register = (userData) => {
    // Thêm vào mảng users trong localStorage để lưu lại danh sách người dùng
    const users = JSON.parse(localStorage.getItem('bicomex_users') || '[]');
    users.push(userData);
    localStorage.setItem('bicomex_users', JSON.stringify(users));
    
    // Đăng nhập luôn sau khi đăng ký
    setUser(userData);
  };

  // Hàm đăng xuất
  const logout = () => {
    // Xóa thông tin người dùng từ state
    setUser(null);
    setIsAuthenticated(false);
    
    // Xóa trực tiếp từ localStorage để đảm bảo dữ liệu được xóa ngay lập tức
    localStorage.removeItem('bicomex_user');
    localStorage.removeItem('bicomex_remember_email');
    
    // Xóa các session storage liên quan nếu có
    sessionStorage.removeItem('bicomex_user');
    
    // Trả về true để xác nhận đăng xuất thành công
    return true;
  };

  // Hàm cập nhật thông tin người dùng
  const update = (userData) => {
    // Cập nhật thông tin người dùng trong state
    setUser(userData);
    
    // Cập nhật trực tiếp vào localStorage
    localStorage.setItem('bicomex_user', JSON.stringify(userData));
    
    return true;
  };

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    update
  };
};

export default useAuthStorage;