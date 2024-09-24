import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from '../images/back.jpg';  // Correct relative path
import phone from '../images/phone.jpg';
import lap from '../images/lap.jpg';
import watch from '../images/watch.jpg';
import head from '../images/head.jpg';
import ear from '../images/ear.jpg';

export default function Home() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#ff4747',
        textAlign: 'center',
        width: '100vw',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* "Welcome to" Section */}
      <h1
        style={{
          margin: 0,
          fontSize: '8rem',
          color: 'transparent', // Transparent fill
          WebkitTextStroke: '5px white', // White outline
          textTransform: 'uppercase',
          fontFamily: 'sans-serif', // Clean bold sans-serif font
        }}
      >
        Welcome to
      </h1>

      {/* "Asterix" Section */}
      <h1
        style={{
          fontSize: '10rem',
          margin: '10px 0',
          color: 'transparent', // Transparent fill like "Welcome to"
          WebkitTextStroke: '5px purple', // Purple outline
          textTransform: 'uppercase',
          fontFamily: 'sans-serif', // Same bold font for consistency
        }}
      >
        Asterix
      </h1>

      {/* Buttons Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '40px', // Space between buttons
          marginTop: '50px',
        }}
      >
        {/* Button with Hover Effect */}
        <Link
          to="/smartphones"
          style={{
            width: '250px',
            height: '250px',
            backgroundImage: `url(${phone})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'transparent',
            WebkitTextStroke: '1px white', // White outline for the button text
            fontSize: '1.8rem',
            fontFamily: 'sans-serif',
            textDecoration: 'none',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            transition: 'transform 0.3s ease, filter 0.3s ease', // Smooth hover effect
          }}
          onMouseEnter={(e) => {
            e.target.style.WebkitTextStroke = '1px white'; // Change text outline on hover
            e.target.style.filter = 'brightness(1.2)'; // Brighten background on hover
            e.target.style.transform = 'scale(1.05)'; // Slightly scale up the button
          }}
          onMouseLeave={(e) => {
            e.target.style.WebkitTextStroke = '1px white'; // Revert text outline
            e.target.style.filter = 'brightness(1)'; // Reset brightness
            e.target.style.transform = 'scale(1)'; // Reset scale
          }}
        >
          Smartphones
        </Link>

        <Link
          to="/laptops"
          style={{
            width: '250px',
            height: '250px',
            backgroundImage: `url(${lap})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'transparent',
            WebkitTextStroke: '1px white', // White outline for the button text
            fontSize: '1.8rem',
            fontFamily: 'sans-serif',
            textDecoration: 'none',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            transition: 'transform 0.3s ease, filter 0.3s ease', // Smooth hover effect
          }}
          onMouseEnter={(e) => {
            e.target.style.WebkitTextStroke = '1px white'; // Change text outline on hover
            e.target.style.filter = 'brightness(1.2)'; // Brighten background on hover
            e.target.style.transform = 'scale(1.05)'; // Slightly scale up the button
          }}
          onMouseLeave={(e) => {
            e.target.style.WebkitTextStroke = '1px white'; // Revert text outline
            e.target.style.filter = 'brightness(1)'; // Reset brightness
            e.target.style.transform = 'scale(1)'; // Reset scale
          }}
        >
          Laptops
        </Link>


        <Link
          to="/headphones"
          style={{
            width: '250px',
            height: '250px',
            backgroundImage: `url(${head})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'transparent',
            WebkitTextStroke: '1px white', // White outline for the button text
            fontSize: '1.8rem',
            fontFamily: 'sans-serif',
            textDecoration: 'none',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            transition: 'transform 0.3s ease, filter 0.3s ease', // Smooth hover effect
          }}
          onMouseEnter={(e) => {
            e.target.style.WebkitTextStroke = '1px white'; // Change text outline on hover
            e.target.style.filter = 'brightness(1.2)'; // Brighten background on hover
            e.target.style.transform = 'scale(1.05)'; // Slightly scale up the button
          }}
          onMouseLeave={(e) => {
            e.target.style.WebkitTextStroke = '1px white'; // Revert text outline
            e.target.style.filter = 'brightness(1)'; // Reset brightness
            e.target.style.transform = 'scale(1)'; // Reset scale
          }}
        >
          Headphones
        </Link>
      </div>
    </div>
  );
}
