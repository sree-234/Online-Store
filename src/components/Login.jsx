import React, { useRef, useState, useEffect, useContext } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../App"; // Import ThemeContext
import "./user.css";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Access global dark mode state and toggle function
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHomeButton, setShowHomeButton] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false); // State to track form expansion

  // New state to track if Sign Up link is clicked
  const [signUpClicked, setSignUpClicked] = useState(false);

  // Redirect path after successful login
  const from = location.state?.from?.pathname || "/cart";

  // Set form to expand after a short delay on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 100); // Adjust delay as needed (e.g., 1 second)

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(emailRef.current.value, passwordRef.current.value);
      setIsExpanded(false); // Collapse form before redirect
      setShowLoginForm(false);
      setShowHomeButton(true); // Make the Home button slide out
      setTimeout(() => navigate(from), 1500); // Delay for animation
    } catch (error) {
      console.error(error);
      setError("Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  // Handle Home button click
  const handleHomeClick = () => {
    setShowLoginForm(false); // Trigger slide-out animation for form
    setShowHomeButton(true); // Trigger slide-out animation for Home button
    setTimeout(() => navigate("/"), 1800); // Navigate home after animation
  };

   const handleSignUpClick = () => {
    setSignUpClicked(true); 
    setShowLoginForm(false);
    setShowHomeButton(true); // Make the Home button slide out
    setTimeout(() => navigate("/signup"), 1600); // Delay for animation and navigate to Sign Up
  };

  return (
    <div className="login-container">
      {/* Dark Mode Toggle Button */}
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        <span className={isDarkMode ? "icon-moon" : "icon-sun"}></span>
      </button>

      <form 
        onSubmit={handleSubmit} 
        className={`${showLoginForm ? "login-form-i" : "login-form-f"} ${isExpanded ? "expanded" : ""}`} // Adjust class based on state
      >
        <h2 className={showLoginForm && !signUpClicked ? "login-heading-i" : "login-heading-f"}>LOGIN</h2>

        {error && <p className="login-error">{error}</p>}

        <input
          type="email"
          ref={emailRef}
          placeholder="Email"
          required
          className={showLoginForm && !signUpClicked ? "login-email-i" : "login-email-f"}
        />
        <input
          type="password"
          ref={passwordRef}
          placeholder="Password"
          required
          className={showLoginForm && !signUpClicked ? "login-pass-i" : "login-pass-f"}
        />
        <button
          type="submit"
          className={showLoginForm && !signUpClicked ? "login-button-i" : "login-button-f"} // Adjust class based on state
          disabled={loading}
        >
          {loading ? "..." : "SIGN IN"}
        </button>

        <p>
          <Link 
            to="#" 
            className={showLoginForm && !signUpClicked ? "signup-link-i" : "signup-link-f"} // Adjust class based on state
            onClick={handleSignUpClick} // Handle Sign Up click
          >
            Create
          </Link>
        </p>
      </form>

      {/* Home Button */}
      <button 
        className={showHomeButton || signUpClicked ? "home-button-login-f" : "home-button-login-i"} // Animated Home button
        onClick={handleHomeClick}
      >
        Home
      </button>
    </div>
  );
}
