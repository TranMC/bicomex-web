import { CartContext } from './CartContext';
import useCartStorage from '../hooks/useCartStorage';

export const CartProvider = ({ children }) => {
  const cartState = useCartStorage();

  return (
    <CartContext.Provider value={cartState}>
      {children}
    </CartContext.Provider>
  );
};