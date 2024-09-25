// src/pages/Checkout.jsx
import React from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; 

export default function Checkout() {
  const { cart, clearCart } = useCart(); // Get both cart and clearCart from useCart
  const navigate = useNavigate(); // Initialize useNavigate for routing

  // Calculate the total amount
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0); // Total price based on quantity

  const handlePayment = () => {
    // Simulate payment process
    alert("Payment successful!");

    // Clear the cart after successful payment
    clearCart(); // Clear the cart

    // Navigate to the Order Confirmation page
    navigate("/order-confirmation");
  };

  // Styles
  const containerStyle = {
    padding: "2rem",
    maxWidth: "600px",
    width: "100%",
    backgroundColor: "#f8f8f8",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto", // Ensures centering on all screen sizes
    position: "relative",
  };

  const outerContainerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    height: "100vh",
    width: "100vw", // Full height of the viewport
  };

  const titleStyle = {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#333",
    fontSize: "2rem",
  };

  const listStyle = {
    listStyleType: "none",
    padding: "0",
    width: "100%", // Full width
  };

  const itemStyle = {
    padding: "1rem",
    borderBottom: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#555",
  };

  const totalStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginTop: "1.5rem",
    textAlign: "center",
    color: "#ff884d",
  };

  const buttonStyle = {
    display: "block",
    width: "100%",
    padding: "1rem",
    marginTop: "1.5rem",
    backgroundColor: "#ff884d",
    color: "white",
    fontWeight: "bold",
    fontSize: "1.2rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#e67939",
  };

  return (
    <div style={outerContainerStyle}>
      <Navbar />
      <div style={containerStyle}>
        <h1 style={titleStyle}>Checkout</h1>
        {cart.length === 0 ? ( // Check if the cart is empty
          <p style={{ textAlign: "center", color: "#666" }}>Your cart is empty.</p>
        ) : (
          <div style={{ width: "100%" }}>
            <ul style={listStyle}>
              {cart.map((item, index) => (
                <li key={index} style={itemStyle}>
                  <span><strong>Product Name:</strong> {item.name}</span>
                  <span><strong>Price:</strong> {item.price} USD</span>
                </li>
              ))}
            </ul>
            <div style={totalStyle}>Total Amount: {totalAmount} USD</div>
            <button
              style={buttonStyle}
              onClick={handlePayment}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ff884d")}
            >
              Pay Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
