// src/pages/Checkout.jsx
import React from "react";
import { useCart } from "../contexts/CartContext";

export default function Checkout() {
  const { cart } = useCart();

  const handlePayment = () => {
    // Implement Stripe or another payment gateway
    alert("Payment successful!");
  };

  return (
    <div>
      <h1>Checkout</h1>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - {item.price} USD
          </li>
        ))}
      </ul>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}