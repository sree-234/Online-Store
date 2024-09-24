// src/pages/Cart.jsx
import React from "react";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index}>
              <h3>{item.name}</h3>
              <p>{item.price} USD</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h2>Total: {total} USD</h2>
          <Link to="/checkout">Proceed to Checkout</Link>
        </div>
      )}
    </div>
  );
}