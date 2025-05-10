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

  // Hàm cập nhật thông tin hồ sơ người dùng
  const handleUpdateUserProfile = (profileData) => {
    try {
      if (!auth.user || !auth.user.id) {
        toast.error('Bạn chưa đăng nhập!');
        return false;
      }
      
      // Lấy danh sách người dùng từ localStorage
      const users = JSON.parse(localStorage.getItem('bicomex_users') || '[]');
      
      // Tìm người dùng hiện tại
      const userIndex = users.findIndex(u => u.id === auth.user.id);
      
      if (userIndex === -1) {
        toast.error('Không tìm thấy thông tin người dùng!');
        return false;
      }
      
      // Cập nhật thông tin người dùng
      const updatedUser = {
        ...users[userIndex],
        ...profileData,
        updatedAt: new Date().toISOString()
      };
      
      // Giữ lại mật khẩu hiện tại
      if (!updatedUser.password && users[userIndex].password) {
        updatedUser.password = users[userIndex].password;
      }
      
      // Cập nhật người dùng trong mảng
      users[userIndex] = updatedUser;
      
      // Lưu lại vào localStorage
      localStorage.setItem('bicomex_users', JSON.stringify(users));
      
      // Cập nhật state (không bao gồm password)
      const { password: _password, ...userWithoutPassword } = updatedUser;
      auth.update(userWithoutPassword);
      
      toast.success('Cập nhật thông tin thành công!');
      return true;
    } catch (error) {
      console.error("Lỗi cập nhật hồ sơ:", error);
      toast.error('Đã xảy ra lỗi khi cập nhật thông tin');
      return false;
    }
  };
  
  // Hàm cập nhật cài đặt người dùng
  const handleUpdateUserSettings = (settingsData) => {
    try {
      if (!auth.user || !auth.user.id) {
        toast.error('Bạn chưa đăng nhập!');
        return false;
      }
      
      // Lấy danh sách người dùng từ localStorage
      const users = JSON.parse(localStorage.getItem('bicomex_users') || '[]');
      
      // Tìm người dùng hiện tại
      const userIndex = users.findIndex(u => u.id === auth.user.id);
      
      if (userIndex === -1) {
        toast.error('Không tìm thấy thông tin người dùng!');
        return false;
      }
      
      // Cập nhật cài đặt người dùng
      const updatedUser = {
        ...users[userIndex],
        settings: {
          ...(users[userIndex].settings || {}),
          ...settingsData
        },
        updatedAt: new Date().toISOString()
      };
      
      // Cập nhật người dùng trong mảng
      users[userIndex] = updatedUser;
      
      // Lưu lại vào localStorage
      localStorage.setItem('bicomex_users', JSON.stringify(users));
      
      // Cập nhật state (không bao gồm password)
      const { password: _password, ...userWithoutPassword } = updatedUser;
      auth.update(userWithoutPassword);
      
      toast.success('Cập nhật cài đặt thành công!');
      return true;
    } catch (error) {
      console.error("Lỗi cập nhật cài đặt:", error);
      toast.error('Đã xảy ra lỗi khi cập nhật cài đặt');
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
        logout: handleLogout,
        updateUserProfile: handleUpdateUserProfile,
        updateUserSettings: handleUpdateUserSettings
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;