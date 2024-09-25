import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar2";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/;
    if (!password.match(passwordRegex)) {
      return "Password must contain letters, digits, special symbols, and be 8-12 characters long.";
    }
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const passwordError = validatePassword(passwordRef.current.value);
    if (passwordError) {
      alert(passwordError);
      setLoading(false);
      return;
    }

    try {
      await signup(emailRef.current.value, passwordRef.current.value);
      alert("Signup successful! Please log in.");
      navigate("/login"); // Redirect to login page after successful signup
    } catch (error) {
      // Handle Firebase errors more specifically
      console.error(error); // Log the actual error for debugging

      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered. Please try logging in.");
      } else if (error.code === "auth/invalid-email") {
        alert("The email address is not valid.");
      } else if (error.code === "auth/weak-password") {
        alert("The password is too weak. It should be at least 6 characters.");
      } else {
        alert("Failed to sign up. Please try again later.");
      }
    } finally {
      setLoading(false); // Stop loading state after signup or failure
    }
  }

  // Styles remain the same as before
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
    <div>
      <Navbar />
      <div style={containerStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <h2 style={headingStyle}>Sign Up</h2>
          
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
            disabled={loading}
            onMouseOver={(e) => (e.currentTarget.style.transform = buttonHoverStyle.transform)}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {loading ? "Signing up..." : "SIGN UP"}
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
