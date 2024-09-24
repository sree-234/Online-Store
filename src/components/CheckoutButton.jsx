// src/components/CheckoutButton.jsx (for example)
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const CheckoutButton = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      {currentUser ? (
        // Check if the profile is complete
        <Link to="/checkout">Proceed to Checkout</Link>
      ) : (
        <Link to="/login">Login Up to Checkout</Link>
      )}
    </div>
  );
};

export default CheckoutButton;
