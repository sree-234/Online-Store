import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p.id === product.id);
      if (existingProduct) {
        return prevCart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id));
  };

  const updateCartQuantity = (id, newQuantity) => {
    setCart((prevCart) => {
      if (newQuantity <= 0) {
        return prevCart.filter((product) => product.id !== id);
      } else {
        return prevCart.map((product) =>
          product.id === id ? { ...product, quantity: newQuantity } : product
        );
      }
    });
  };

  // Clear cart function
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateCartQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);