import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useCart } from "../contexts/CartContext"; // Import CartContext
import backgroundImage from "../images/back.jpg"; // Ensure the same background
import CheckoutButton from "../components/CheckoutButton";

export default function Cart() {
  const { cart, updateCartQuantity } = useCart(); // Use updateCartQuantity for quantity management
  const navigate = useNavigate(); // For navigation

  // Calculate total price based on product quantity
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
      {/* Cart Heading */}
      <h1
        style={{
          margin: 0,
          fontSize: "8rem",
          color: "transparent",
          WebkitTextStroke: "5px white", // White outline for "Your"
          textTransform: "uppercase",
          fontFamily: "sans-serif",
        }}
      >
        Your
      </h1>
      <h1
        style={{
          fontSize: "8rem",
          margin: "10px 0",
          color: "transparent",
          WebkitTextStroke: "5px black", // Black outline for "Cart"
          textTransform: "uppercase",
          fontFamily: "sans-serif",
        }}
      >
        Cart
      </h1>

      {cart.length === 0 ? (
        <p style={{ color: "white", fontSize: "1.5rem" }}>Your cart is empty</p>
      ) : (
        <div
          style={{
            width: "60%", // Slightly wider for better layout
            textAlign: "left",
            backgroundColor: "rgba(255, 255, 255, 0.9)", // Mild-colored white box
            padding: "20px",
            borderRadius: "10px", // Rounded corners for the box
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between", // Keep name and price on opposite sides
                alignItems: "center",
                borderBottom: "1px solid #ccc",
                padding: "10px 0",
                marginBottom: "10px",
              }}
            >
              {/* Product Name and Price */}
              <div>
                <h3 style={{ color: "#000", margin: 0 }}>{item.name}</h3>
                <p style={{ color: "#000", margin: 0 }}>{item.price} INR</p>
                <p style={{ color: "#000", margin: 0 }}>Quantity: {item.quantity}</p> {/* Display quantity */}
              </div>

              {/* Quantity Buttons */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <button
                  onClick={() => updateCartQuantity(item.id, item.quantity - 1)} // Decrement quantity
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "red",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  &minus;
                </button>
                <span style={{ fontSize: "1.5rem", color: "#000" }}>x{item.quantity}</span> {/* Quantity display */}
                <button
                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)} // Increment quantity
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "green",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                >
                  &#43;
                </button>
              </div>
            </div>
          ))}
  {/* Total Price */}
          <h2 style={{ color: "green", textAlign: "right" }}>Total: {total} INR</h2>

          {/* Return to Shopping Button */}
        
          <h2 style={{ color: "#000" }}>Total: ${total} USD</h2> {/* Ensure text color is black */}
          <CheckoutButton />
           <p>   
          <button
            onClick={() => navigate("/")} // Return to shopping
            style={{
              marginTop: "20px",
              fontSize: "1.5rem",
              backgroundColor: "black",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              textAlign: "center",
              width: "100%", // Make the button full width
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
