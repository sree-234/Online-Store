import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../App"; // Import ThemeContext from App
import handCoverLight from "../images/hand_cover_light.png";
import handCoverDark from "../images/hand_cover_dark.png";
import laptopCoverLight from "../images/lap_cover_light.png";
import laptopCoverDark from "../images/lap_cover_dark.png";
import headCoverLight from "../images/head_cover_light.png";
import headCoverDark from "../images/head_cover_dark.png";
import watchCoverDark from "../images/watch_cover_dark.png";
import watchCoverLight from "../images/watch_cover_light.png";

export default function Home() {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();

  // Modified handleClick function to accept a navigation link and a parameter
  const handleClick = (link, parameter) => {
    setShowAnimation(true);
    setTimeout(() => {
      navigate(link, { state: { parameter } }); // Pass the parameter in the state
    }, 1000); // Adjust the delay as needed to match your animation duration
  };

  // Ensure the theme is set on the body element
  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  return (
    <div className="grid-container">
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        <span className={isDarkMode ? "icon-moon" : "icon-sun"}></span>
      </button>

      {/* Divs with click handlers, passing the link and parameter as arguments */}
      <div
        className={`grid-item outside-div ${showAnimation ? "left-div-f" : "left-div-i"}`}
        onClick={() => handleClick("/products", "left")}
      >
        <img
          src={isDarkMode ? handCoverDark : handCoverLight}
          alt="Phone Cover"
          className={isDarkMode ? "leftimage-f" : "leftimage-i"} // Corrected class names
        />
        <div className="hover-overlay">Women's</div>
      </div>

      <div
        className={`grid-item outside-div ${showAnimation ? "top-div-f" : "top-div-i"}`}
        onClick={() => handleClick("/products", "top")}
      >
        <img
          src={isDarkMode ? headCoverDark : headCoverLight}
          alt="Head Cover"
          className="topimage"
        />
        <div className="hover-overlay">Electronics</div> {/* mobile-accessories */}
      </div>

      <div
        className={`grid-item outside-div ${showAnimation ? "bottom-div-f" : "bottom-div-i"}`}
        onClick={() => handleClick("/products", "bottom")}
      >
        <img
          src={isDarkMode ? laptopCoverDark : laptopCoverLight}
          alt="Laptop Cover"
          className="bottomimage"
        />
        <div className="hover-overlay">Laptops & Tablets</div>
      </div>

      <div
        className={`grid-item outside-div ${showAnimation ? "right-div-f" : "right-div-i"}`}
        onClick={() => handleClick("/products", "right")}
      >
        <img
          src={isDarkMode ? watchCoverDark : watchCoverLight}
          alt="Watch Cover"
          className="rightimage"
        />
        <div className="hover-overlay">Men's</div> {/* watches, shoes, shirts */}
      </div>

      {/* Center div with conditional expansion and text animation */}
      <div className="center-div neumorphic-sunken">
        {!showAnimation ? (
          <>
            <h2 className="welcome-to welcome-to-i">Welcome to</h2>
            <h1 className="asterix-i">ASTERIX</h1>
          </>
        ) : (
          <>
            <h2 className="welcome-to welcome-to-f">Welcome to</h2>
            <h1 className="asterix-f">ASTERIX</h1>
          </>
        )}
      </div>

      {/* Login Button */}
      <button
        className={showAnimation ? "login-button-home-f" : "login-button-home-i"}
        onClick={() => handleClick("/login")}
      >
        Login
      </button>

      {/* Cart Button */}
      <button
        className={showAnimation ? "cart-f" : "cart-i"}
        onClick={() => handleClick("/cart")}
      >
        Cart
      </button>
    </div>
  );
}
