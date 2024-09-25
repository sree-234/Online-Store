import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useCart } from "../contexts/CartContext"; // Import CartContext
import backgroundImage from "../images/back.jpg";
import phone1 from "../images/phone1.jpg";
import phone2 from "../images/phone2.jpg";
import phone3 from "../images/phone3.jpg";
import Navbar from "../components/Navbar";

export default function Smartphones() {
  const { addToCart } = useCart(); // Use addToCart from context
  const navigate = useNavigate(); // For navigating to the cart page

  const products = [
    { id: 1, name: "Phone 1", price: 799, img: phone1, specs: "64GB, 5G, 12MP Camera" },
    { id: 2, name: "Phone 2", price: 899, img: phone2, specs: "128GB, 5G, 48MP Camera" },
    { id: 3, name: "Phone 3", price: 999, img: phone3, specs: "256GB, 5G, 108MP Camera" },
  ];

  const handleAddToCart = (product) => {
    addToCart(product); // Add the product to the cart
    navigate("/cart"); // Navigate to the cart page
  };

  return (
    <div>
      <Navbar />
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
          WebkitTextStroke: "5px white", // White outline for "Smart"
          textTransform: "uppercase",
          fontFamily: "sans-serif",
        }}
      >
        Smart
      </h1>
      <h1
        style={{
          fontSize: "8rem",
          margin: "10px 0",
          color: "transparent", 
          WebkitTextStroke: "5px black", // Purple outline for "Phone"
          textTransform: "uppercase",
          fontFamily: "sans-serif",
        }}
      >
        Phone
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
    </div>
  );
}
