import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useLocation for previous page

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Get location to capture the previous URL

  // State to handle error messages
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Get the path the user came from, or default to "/cart"
  const from = location.state?.from?.pathname || "/cart"; 

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Reset error before attempting login
    setLoading(true); // Set loading state

    try {
      await login(emailRef.current.value, passwordRef.current.value);
      setLoading(false); // Stop loading
      alert("Login successful!");
      navigate(from); // Redirect to the previous page after successful login
    } catch (error) {
      console.error(error);
      setError("Failed to log in. Please check your credentials."); // Set error message
      setLoading(false); // Stop loading
    }
  }

  // Inline Styles
  const containerStyle = {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "url('https://imgs.search.brave.com/YdTrZl8rNTnykCTr5LoXLkc2k-3zxbfmb7NIjPRU4dI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA4LzI4LzE4LzQ0/LzM2MF9GXzgyODE4/NDQ5Ml9yNGYxb29C/Vm5MOE1wSjBUSUVw/bHB0Y3dVVmxaaXJ0/Uy5qcGc')",
    backgroundSize: "cover",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    padding: "3rem 2rem",
    background: "rgba(0, 0, 0, 0.607)",
    backdropFilter: "blur(3px)",
    borderRadius: "1rem",
    textAlign: "center",
  };

  const headingStyle = {
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: "5px",
    fontSize: "45px",
    fontWeight: "bold",
    color: "white",
  };

  const inputStyle = {
    all: "unset",
    fontSize: "17px",
    height: "50px",
    width: "300px",
    marginTop: ".2rem",
    borderBottom: "1px solid white",
    textAlign: "center",
    color: "white",
  };

  const buttonStyle = {
    height: "50px",
    width: "300px",
    marginTop: ".2rem",
    backgroundColor: "#ff884d",
    color: "white",
    fontWeight: "bold",
    fontSize: "20px",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    transition: ".1s ease-in",
    textAlign: "center",
  };

  const buttonHoverStyle = {
    transform: "scale(1.05)",
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={headingStyle}>Login</h2>
        
        {/* Display error message if login fails */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        
        <input
          type="email"
          ref={emailRef}
          placeholder="Email"
          required
          style={inputStyle}
        />
        <input
          type="password"
          ref={passwordRef}
          placeholder="Password"
          required
          style={inputStyle}
        />
        <button
          type="submit"
          style={buttonStyle}
          disabled={loading} // Disable button when loading
          onMouseOver={(e) => (e.currentTarget.style.transform = buttonHoverStyle.transform)}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {loading ? "Logging in..." : "LOGIN"} {/* Show loading state */}
        </button>
        <p style={{ textAlign: "center", color: "white" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#ff884d", textDecoration: "underline" }}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
