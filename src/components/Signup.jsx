import React, { useRef, useState, useEffect, useContext } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../App"; // Import ThemeContext
import "./user.css";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Access global dark mode state and toggle function
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHomeButton, setShowHomeButton] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false); // State to track form expansion

  // New state to track if Log In link is clicked
  const [logInClicked, setLogInClicked] = useState(false);

  // Redirect path
  const from = location.state?.from?.pathname || "/";

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
      await signup(emailRef.current.value, passwordRef.current.value);
      setShowHomeButton(true);
      setShowSignupForm(false); // Trigger animation before redirect
      setIsExpanded(false); // Collapse form before redirect
      setTimeout(() => navigate("/login"), 1500); // Delay for animation
    } catch (error) {
      console.error(error);
      setError("Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Handle Home button click
  const handleHomeClick = () => {
    setShowSignupForm(false); // Trigger slide-out animation for form
    setShowHomeButton(true); // Trigger slide-out animation for Home button
    setTimeout(() => navigate("/"), 1800); // Navigate home after animation
  };

  // Handle Log In link click
  const handleLogInClick = () => {
    setShowHomeButton(true);
    setShowSignupForm(false)
    setLogInClicked(true); // Set logInClicked to true to trigger animations
    setTimeout(() => navigate("/login"), 1600); // Delay for animation and navigate to Log In
  };

  return (
    <div className="login-container">
      {/* Dark Mode Toggle Button */}
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        <span className={isDarkMode ? "icon-moon" : "icon-sun"}></span>
      </button>

      <form
        onSubmit={handleSubmit}
        className={`${showSignupForm ? "login-form-i" : "login-form-f"} ${isExpanded ? "expanded" : ""}`} // Adjust class based on state
      >
        <h2 className={showSignupForm && !logInClicked ? "login-heading-i" : "login-heading-f"}>SIGNUP</h2>

        {error && <p className="login-error">{error}</p>}

        <input
          type="email"
          ref={emailRef}
          placeholder="Email"
          required
          className={showSignupForm && !logInClicked ? "login-email-i" : "login-email-f"}
        />
        <input
          type="password"
          ref={passwordRef}
          placeholder="Password"
          required
          className={showSignupForm && !logInClicked ? "login-pass-i" : "login-pass-f"}
        />
        <button
          type="submit"
          className={showSignupForm && !logInClicked ? "login-button-i" : "login-button-f"} // Adjust class based on state
          disabled={loading}
        >
          {loading ? "..." : "CREATE"}
        </button>

        <p>
          <Link
            to="#"
            className={showSignupForm && !logInClicked ? "signup-link-i" : "signup-link-f"} // Adjust class based on state
            onClick={handleLogInClick} // Handle Log In click
          >
            Login
          </Link>
        </p>
      </form>

      {/* Home Button with Animations */}
      <button
        className={showHomeButton || logInClicked ? "home-button-login-f" : "home-button-login-i"} // Adjust class based on state
        onClick={handleHomeClick}
      >
        Home
      </button>
    </div>
  );
}
