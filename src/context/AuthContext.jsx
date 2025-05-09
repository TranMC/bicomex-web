import { createContext } from 'react';

// Tạo context cho xác thực
const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
  register: () => {},
  logout: () => {},
});

export default AuthContext;