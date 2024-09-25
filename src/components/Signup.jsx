import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar2";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const navigate = useNavigate(); 
  
  // State to manage error messages and loading
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Password validation function
  function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/;
    if (!password.match(passwordRegex)) {
      return alert("Password must contain letters, digits, special symbols, and be 8-12 characters long.");
    }
    return null;
  }

  // Handle submit event with password validation
  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Reset error before attempting signup
    setLoading(true); // Show loading state

    const passwordError = validatePassword(passwordRef.current.value);
    if (passwordError) {
      alert(passwordError); // Show alert with the validation error
      setLoading(false); // Stop loading state
      return; // Prevent signup if validation fails
    }

    try {
      await signup(emailRef.current.value, passwordRef.current.value); // Proceed to signup
      alert("Signup successful! Please log in.");
      navigate("/login"); // Redirect to login page after successful signup
    } catch (error) {
      console.error(error);
      alert("Failed to sign up. The email may already be registered."); // Show error message
    }

    setLoading(false); // Stop loading state
  }

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
    <div>
      <Navbar />
      <div style={containerStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <h2 style={headingStyle}>Sign Up</h2>

          {/* Display error message if signup fails */}
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
            {loading ? "Signing up..." : "SIGN UP"} {/* Show loading state */}
          </button>
          <p style={{ textAlign: "center", color: "white" }}>
            Already a user?{" "}
            <Link to="/login" style={{ color: "#ff884d", textDecoration: "underline" }}>
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
