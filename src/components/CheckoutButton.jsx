// src/components/CheckoutButton.jsx
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const CheckoutButton = () => {
  const { currentUser } = useAuth(); // Get the current user from AuthContext

  return (
    <div>
      {currentUser ? (
        // Check if the user's profile is complete
        <Link to="/checkout" style={buttonStyle}>
          Proceed to Checkout
        </Link>
      ) : (
        <Link to="/login" style={buttonStyle}>
          Login to Checkout
        </Link>
      )}
    </div>
  );
};

// Button style
const buttonStyle = {
  padding: "10px 20px",
  fontSize: "1.5rem",
  backgroundColor: "green", // Green background color
  color: "#000", // Black text color
  textDecoration: "none", // Remove underline from link
  borderRadius: "5px",
  cursor: "pointer", // Ensure the cursor is a pointer
  marginTop: "20px",
};

export default CheckoutButton;