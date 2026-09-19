import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
  );

  const addToCart = (product, qty = 1) => {
    const existItem = cartItems.find((item) => item._id === product._id);
    let updatedCart;

    if (existItem) {
      updatedCart = cartItems.map((item) =>
        item._id === product._id ? { ...item, qty: item.qty + qty } : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, qty }];
    }

    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
