import React, { createContext, useState, useContext } from "react";

// Create the CartContext
const CartContext = createContext();

// Provide the CartContext to components
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]); // Add product to cart
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id)); // Remove product by id
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Use CartContext in components
export const useCart = () => {
  return useContext(CartContext);
};
