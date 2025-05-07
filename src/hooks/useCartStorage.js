import useLocalStorage from './useLocalStorage';

/**
 * Custom hook để quản lý giỏ hàng và lưu trữ trong localStorage
 * @returns {Object} Các phương thức và dữ liệu giỏ hàng
 */
const useCartStorage = () => {
  const [cartItems, setCartItems] = useLocalStorage('cart', []);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const cartTotal = cartItems.reduce((total, item) => {
    const price = item.salePrice || item.price;
    return total + (price * item.quantity);
  }, 0);

  const clearCart = () => {
    setCartItems([]);
  };

  return {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
};

export default useCartStorage;