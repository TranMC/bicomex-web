import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

/**
 * Custom hook để sử dụng CartContext
 * @returns {Object} Giá trị của CartContext
 */
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default useCart;