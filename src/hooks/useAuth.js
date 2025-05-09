import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

// Hook để sử dụng AuthContext dễ dàng
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth phải được sử dụng trong AuthProvider');
  }
  
  return context;
};

export default useAuth;