// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem 1.5rem", // Increased padding for better spacing
    backgroundColor: "#333", // A slightly lighter background for better contrast
    color: "white",
    position: "fixed",
    left: -1,
    top: 0,
    width: "98vw", // Ensure full width of the viewport
    height: "40px", // Fixed height for consistency
    zIndex: 1000,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)", // More pronounced shadow
    borderRadius: "0 0 10px 10px", // Rounded bottom corners
  };

  const linkStyle = {
    margin: "0 1.5rem",
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
    position: "relative",
    padding: "0.5rem 0", // Padding for better click area
  };

  const hoverEffect = {
    position: "absolute",
    left: "0",
    right: "0",
    bottom: "0",
    height: "3px",
    backgroundColor: "#ff884d", // Accent color for the hover effect
    transform: "scaleX(0)", // Initially hidden
    transition: "transform 0.3s ease-in-out",
  };

  const linkHoverStyle = {
    ...linkStyle,
    "&:hover": {
      color: "#ff884d", // Change text color on hover
    },
  };

  return (
    <nav style={navStyle}>
      <h1>
        <Link to="/" style={{ ...linkStyle, fontSize: "24px" }}>
          Online Store
        </Link>
      </h1>
    </nav>
  );
}
