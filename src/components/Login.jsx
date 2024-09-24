// src/components/Login.jsx
import React, { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/cart"); // Redirect to cart after successful login
    } catch (error) {
      console.error(error);
      // Optionally handle error feedback to user
    }
  }

  // Inline Styles
  const containerStyle = {
    height: "100vh", // Full height of the viewport
    width: "100vw",  // Full width of the viewport
    display: "flex",
    justifyContent: "center", // Centers content horizontally
    alignItems: "center", // Centers content vertically
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
    textAlign: "center", // to center the form content
  };

  const headingStyle = {
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: "5px",
    fontSize: "45px",
    fontWeight: "bold",
    color: "white", // Set heading color to white
  };

  const inputStyle = {
    all: "unset",
    fontSize: "17px",
    height: "50px",
    width: "300px",
    marginTop: ".2rem",
    borderBottom: "1px solid white",
    textAlign: "center", // centers the text in input
    color: "white", // Set input text color to white
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
          onMouseOver={(e) => (e.currentTarget.style.transform = buttonHoverStyle.transform)}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          LOGIN
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
