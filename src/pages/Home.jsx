import React, { useEffect, useState } from "react";
import phoneCoverLight from '../images/phone_cover_light.png';
import phoneCoverDark from '../images/phone_cover_dark.png';
import laptopCoverLight from '../images/lap_cover_light.png';
import laptopCoverDark from '../images/lap_cover_dark.png';
import headCoverLight from '../images/head_cover_light.png';
import headCoverDark from '../images/head_cover_dark.png';
import watchCoverDark from '../images/watch_cover_dark.png';
import watchCoverLight from '../images/watch_cover_light.png';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  return (
    <div className="grid-container">
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        <span className={isDarkMode ? "icon-moon" : "icon-sun"}></span>
      </button>

      {/* Left Div with tilted phone image */}
      <div className="grid-item outside-div left-div">
        <img
          src={isDarkMode ? phoneCoverDark : phoneCoverLight}
          alt="Phone Cover"
          className="leftimage"
        />
      </div>

      {/* Top Div with tilted head image */}
      <div className="grid-item outside-div top-div">
        <img
          src={isDarkMode ? headCoverDark : headCoverLight}
          alt="Head Cover"
          className="topimage"
        />
      </div>

      {/* Center div with sunken effect */}
      <div className="center-div neumorphic-sunken">
        <h2 className="slide-in-bottom welcome-to">Welcome to</h2>
        <h1 className="slide-in-bottom asterix">Asterix</h1>
      </div>

      {/* Bottom Div with tilted laptop image */}
      <div className="grid-item outside-div bottom-div">
        <img
          src={isDarkMode ? laptopCoverDark : laptopCoverLight}
          alt="Laptop Cover"
          className="bottomimage"
        />
      </div>

      {/* Right Div with sunken effect */}
      <div className="grid-item outside-div right-div">
        <img
          src={isDarkMode ? watchCoverDark : watchCoverLight}
          alt="Watch Cover"
          className="rightimage"
        />
      </div>
    </div>
  );
}
