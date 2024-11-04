import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom"; 

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const navStyle = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0.5rem 1.5rem",
    backgroundColor: "black", // Black navbar background
    color: "white",
    position: "fixed",
    left: 0,
    top: 0,
    width: "98vw",
    height: "40px",
    zIndex: 1000,
  };

  const linkStyle = {
    margin: "0 1.5rem",
    color: "#f72323", // White text color
    //backgroundColor: "#", // Background color for buttons
    padding: "0.5rem 1rem",
    textDecoration: "none",
    fontSize: "18px",
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontWeight: "bold",
    borderRadius: "5px", // Optional small radius for buttons
    transition: "background-color 0.3s ease",
  };

  const buttonStyle = {
    ...linkStyle,
    border: "none",
    cursor: "pointer",
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <nav style={navStyle}>
      <div>
        {currentUser ? (
          <>
            <Link to="/profile" style={linkStyle}>
              Profile
            </Link>
            <Link to="/cart" style={linkStyle}>
              Cart
            </Link>
            <button onClick={handleLogout} style={buttonStyle}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>
              LOGIN
            </Link>
            <Link to="/cart" style={linkStyle}>
              CART
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
