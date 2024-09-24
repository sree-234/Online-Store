// src/pages/OrderConfirmation.jsx
import React from "react";
import Navbar from "../components/Navbar"; // Import the Navbar component

export default function OrderConfirmation() {
  const confirmationStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "black",
    color: "white",
    paddingTop: "6rem", // Increased padding to make space for the fixed navbar
  };

  return (
    <div>
      <Navbar /> {/* Navbar is fixed at the top */}
      <div style={confirmationStyle}>
        <h1>Thank You for Your Order!</h1>
        <p>Your order has been placed successfully.</p>
      </div>
    </div>
  );
}
