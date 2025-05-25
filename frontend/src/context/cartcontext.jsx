import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        console.log('Loading cart from localStorage:', savedCart); // Debug log
        
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          if (Array.isArray(parsedCart)) {
            setCart(parsedCart);
          } else {
            console.warn('Invalid cart data in localStorage, resetting...');
            localStorage.removeItem('cart');
          }
        }
      } catch (error) {
        console.error('Failed to load cart:', error);
        localStorage.removeItem('cart');
      } finally {
        setIsInitialized(true);
      }
    };

    loadCart();
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (isInitialized) {
      console.log('Saving cart to localStorage:', cart); // Debug log
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isInitialized]);
const addToCart = (product) => {
  setCart((prevCart) => {
    const existingItem = prevCart.find((item) => item._id === product._id);
    
    if (existingItem) {
      return prevCart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    }
    
    return [...prevCart, { ...product, quantity: 1 }];
  });
};

const removeFromCart = (productId) => {
  setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
};

const updateQuantity = (productId, newQuantity) => {
  if (newQuantity < 1) {
    removeFromCart(productId);
    return;
  }

  setCart((prevCart) =>
    prevCart.map((item) =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    )
  );
};
  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const cartCount = cart.reduce(
    (count, item) => count + (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isInitialized, // Useful for components to check if cart is loaded
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};