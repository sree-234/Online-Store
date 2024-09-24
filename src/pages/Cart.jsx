import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useCart } from "../contexts/CartContext"; // Import CartContext
import backgroundImage from "../images/back.jpg"; // Ensure the same background
import CheckoutButton from "../components/CheckoutButton";

export default function Cart() {
  const { cart, removeFromCart } = useCart(); // Get cart items and remove function
  const navigate = useNavigate(); // For navigation

  const total = cart.reduce((sum, item) => sum + item.price, 0); // Calculate total price

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#ff4747", // Red background as on other pages
        textAlign: "center",
        width: "100vw",
        backgroundImage: `url(${backgroundImage})`, // Same background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "50px",
      }}
    >
      <h1 style={{ fontSize: "4rem", color: "#000" }}>Your Cart</h1>
      {cart.length === 0 ? (
        <p style={{ color: "#000" }}>Your cart is empty</p> // Ensure the text is visible
      ) : (
        <div style={{ width: "50%", textAlign: "center", color: "#000" }}> {/* Center align content */}
          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                borderBottom: "1px solid #ccc",
                padding: "10px 0",
                marginBottom: "10px",
              }}
            >
              <h3 style={{ color: "#000" }}>{item.name}</h3> {/* Ensure text color is black */}
              <p style={{ color: "#000" }}>{item.price} INR</p> {/* Ensure price text is black */}
              <button
                onClick={() => removeFromCart(item.id)} // Remove item from cart
                style={{
                  backgroundColor: "red",
                  color: "#fff",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Remove from Cart
              </button>
            </div>
          ))}
          
          <h2 style={{ color: "#000" }}>Total: ${total} USD</h2> {/* Ensure text color is black */}
          <CheckoutButton />
           <p>   
          <button
            onClick={() => navigate("/")} // Return to shopping (or "/home" depending on route)
            style={{
              marginTop: "20px",
              fontSize: "1.5rem",
              backgroundColor: "black",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Return to Shopping
          </button>
          </p>
        </div>
      )}
    </div>
  );
}
