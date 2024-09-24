import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderConfirmation() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // Redirect to home after 5 seconds
    }, 3000);
    
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigate]);

  const confirmationStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "180vh",
    backgroundColor: "black",
    color: "white",
    paddingTop: "6rem", // Space for navbar
    textAlign: "center",
  };

  return (
      <div style={confirmationStyle}>
        <h1>Thank You for Your Order!</h1>
        <p>Your order has been placed successfully.</p>
        <p>You will be redirected to the home page shortly...</p>
      </div>
  );
}
