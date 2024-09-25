import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom"; 

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem 1.5rem", 
    backgroundColor: "#333",
    color: "white",
    position: "fixed",
    left: 0,
    top: 0,
    width: "98vw",
    height: "40px",
    zIndex: 1000,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
    borderRadius: "0 0 10px 10px", 
  };

  const linkStyle = {
    margin: "0 1.5rem",
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
    position: "relative",
    padding: "0.5rem 0",
  };

  const hoverEffect = {
    position: "absolute",
    left: "0",
    right: "0",
    bottom: "0",
    height: "3px",
    backgroundColor: "#ff884d", 
    transform: "scaleX(0)", 
    transition: "transform 0.3s ease-in-out",
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Optionally redirect to login or homepage after logout
      navigate("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <nav style={navStyle}>
      <h1>
        <Link to="/" style={{ ...linkStyle, fontSize: "24px" }}>
          Online Store
        </Link>
      </h1>
      <div>
        {currentUser ? (
          <>
            <Link to="/profile" style={linkStyle}>
              Profile
            </Link>
            <Link to="/cart" style={linkStyle}>
              Cart
            </Link>
            <button onClick={handleLogout} style={{ ...linkStyle, background: "none", border: "none", cursor: "pointer" }}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>
              Login
            </Link>
            <Link to="/cart" style={linkStyle}>
              Cart
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
