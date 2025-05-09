// import { useEffect } from 'react';
import AuthContext from './AuthContext';
import useAuthStorage from '../hooks/useAuthStorage';
import useToast from '../hooks/useToast';

export const AuthProvider = ({ children }) => {
  const auth = useAuthStorage();
  const toast = useToast(); // Lấy đối tượng toast

  // Hàm đăng nhập đã được điều chỉnh để kiểm tra thông tin đăng nhập
  const handleLogin = (email, password) => {
    try {
      // Lấy danh sách người dùng từ localStorage
      const users = JSON.parse(localStorage.getItem('bicomex_users') || '[]');
      
      // Tìm người dùng có email và password khớp
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Xóa password trước khi lưu vào trạng thái
        const { password: _password, ...userWithoutPassword } = user;
        auth.login(userWithoutPassword);
        
        // Đảm bảo hiển thị thông báo trước khi chuyển hướng
        toast.success('Đăng nhập thành công!');
        
        // Trả về true để cho biết đăng nhập thành công
        return true;
      } else {
        toast.error('Email hoặc mật khẩu không đúng!');
        return false;
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      toast.error('Đã xảy ra lỗi khi đăng nhập');
      return false;
    }
  };

  // Hàm đăng ký đã được điều chỉnh để kiểm tra email đã tồn tại chưa
  const handleRegister = (userData) => {
    try {
      // Lấy danh sách người dùng từ localStorage
      const users = JSON.parse(localStorage.getItem('bicomex_users') || '[]');
      
      // Kiểm tra email đã tồn tại chưa
      const existingUser = users.find(u => u.email === userData.email);
      
      if (existingUser) {
        toast.error('Email đã được sử dụng!');
        return false;
      } else {
        // Thêm thời gian đăng ký
        const newUser = {
          ...userData,
          id: Date.now(), // Tạo ID đơn giản
          createdAt: new Date().toISOString()
        };
        
        // Lưu người dùng vào danh sách
        users.push(newUser);
        localStorage.setItem('bicomex_users', JSON.stringify(users));
        
        // Đăng nhập sau khi đăng ký (lưu vào state nhưng không lưu password)
        const { password: _password, ...userWithoutPassword } = newUser;
        auth.login(userWithoutPassword);
        
        // Đảm bảo hiển thị thông báo trước khi chuyển hướng
        toast.success('Đăng ký thành công!');
        
        return true;
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      toast.error('Đã xảy ra lỗi khi đăng ký');
      return false;
    }
  };

  // Hàm đăng xuất
  const handleLogout = () => {
    try {
      // Gọi hàm logout từ useAuthStorage
      const success = auth.logout();
      
      if (success) {
        toast.info('Đã đăng xuất!');
        
        // Đảm bảo trang được cập nhật sau khi đăng xuất
        // Sử dụng 500ms để đảm bảo thông báo được hiển thị trước khi chuyển hướng
        setTimeout(() => {
          window.location.href = '/';
        }, 500);
        
        return true;
      } else {
        toast.error('Có lỗi xảy ra khi đăng xuất!');
        return false;
      }
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
      toast.error('Đã xảy ra lỗi khi đăng xuất');
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: auth.user,
        isAuthenticated: auth.isAuthenticated,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;