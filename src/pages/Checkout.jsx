// src/pages/Checkout.jsx
import React from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; 

export default function Checkout() {
  const { cart } = useCart();
  const navigate = useNavigate(); // Initialize useHistory

  // Calculate the total amount
  const totalAmount = cart.reduce((total, item) => total + item.price, 0);

  const handlePayment = () => {
    // Navigate to the Order Confirmation page
    alert("Payment successful!");
    navigate.push("/order-confirmation"); // Navigate to the Order Confirmation page
  };

  return (
    <div>
      <Navbar />
    <div>
      <h1>Checkout</h1>
      {cart.length === 0 ? ( // Check if the cart is empty
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <strong>Product Name:</strong> {item.name} - 
                <strong> Price:</strong> {item.price} USD
              </li>
            ))}
          </ul>
          <h2>Total Amount: {totalAmount} USD</h2> {/* Display total amount */}
          <button onClick={handlePayment}>Pay Now</button>
        </div>
      )}
    </div>
   </div> 
  );
}
