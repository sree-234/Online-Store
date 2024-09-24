import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useCart } from "../contexts/CartContext"; // Import CartContext
import backgroundImage from "../images/back.jpg";
import headphones1 from "../images/headphone1.jpg";
import headphones2 from "../images/headphone2.jpg";
import headphones3 from "../images/headphone3.jpg";

export default function Headphones() {
  const { addToCart } = useCart(); // Use addToCart from context
  const navigate = useNavigate(); // For navigating to the cart page

  const products = [
    { id: 7, name: "Headphones 1", price: 299, img: headphones1, specs: "Wireless, Noise Cancelling, Over-Ear" },
    { id: 8, name: "Headphones 2", price: 399, img: headphones2, specs: "Bluetooth, 20 hours battery" },
    { id: 9, name: "Headphones 3", price: 199, img: headphones3, specs: "Wired, Hi-Fi, Over-Ear" },
  ];

  const handleAddToCart = (product) => {
    addToCart(product); // Add the product to the cart
    navigate("/cart"); // Navigate to the cart page
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#ff4747",
        textAlign: "center",
        width: "100vw",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "50px",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: "8rem",
          color: "transparent", 
          WebkitTextStroke: "5px white", // White outline for "Headphones"
          textTransform: "uppercase",
          fontFamily: "sans-serif",
        }}
      >
        Headphones
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          marginTop: "30px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              position: "relative",
              textAlign: "center",
              width: "300px",
              height: "400px",
              backgroundColor: "#fff",
              padding: "10px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              overflow: "hidden",
            }}
          >
            <img
              src={product.img}
              alt={product.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "contain",
                borderRadius: "5px",
              }}
            />
            <div style={{ marginTop: "10px", color: "black" }}>
              <h3 style={{ margin: "5px 0" }}>{product.name}</h3>
              <p style={{ margin: "5px 0" }}>{product.specs}</p>
              <p style={{ margin: "5px 0", color: "green" }}>INR {product.price}</p>
            </div>

            {/* Add to Cart Button */}
            <button
              style={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                padding: "10px 20px",
                backgroundColor: "purple",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => handleAddToCart(product)} // Handle add to cart and navigation
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
