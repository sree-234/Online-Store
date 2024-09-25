import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from '../images/back.jpg';  // Correct relative path
import phone from '../images/phone.jpg'; // Replace with actual image for smartphones
import lap from '../images/lap.jpg'; // Replace with actual image for laptops
import head from '../images/head.jpg'; // Replace with actual image for headphones
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
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
        backgroundImage: `url(${backgroundImage})`, // Reference background image
        backgroundSize: 'cover', // Cover the whole area
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
          WebkitTextStroke: '5px black', // White outline
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
        {/* Smartphones Button */}
        <Link
          to="/smartphones"
          style={{
            width: '250px',
            height: '250px',
            backgroundImage: `url(${phone})`, // Smartphone image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: "50px",
            alignItems: 'center',
            color: 'transparent', // Transparent text
            WebkitTextStroke: '1px white', // White outline for the button text
            fontSize: '1.8rem',
            fontFamily: 'sans-serif', // Bold sans-serif for buttons
            textDecoration: 'none',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            transition: 'transform 0.3s ease, background-color 0.3s ease', // Smooth transition effect
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)'; // Scale button on hover
            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'; // Optional background color change on hover
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)'; // Reset scale
            e.target.style.backgroundColor = ''; // Reset background color
          }}
        >
          Smartphones
        </Link>

        {/* Laptops Button */}
        <Link
          to="/laptops"
          style={{
            width: '250px',
            height: '250px',
            backgroundImage: `url(${lap})`, // Laptop image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: "50px",
            alignItems: 'center',
            color: 'transparent', // Transparent text
            WebkitTextStroke: '1px white', // White outline for the button text
            fontSize: '1.8rem',
            fontFamily: 'sans-serif',
            textDecoration: 'none',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            transition: 'transform 0.3s ease, background-color 0.3s ease', // Smooth transition effect
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)'; // Scale button on hover
            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'; // Optional background color change on hover
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)'; // Reset scale
            e.target.style.backgroundColor = ''; // Reset background color
          }}
        >
          Laptops
        </Link>

        {/* Headphones Button */}
        <Link
          to="/headphones"
          style={{
            width: '250px',
            height: '250px',
            backgroundImage: `url(${head})`, // Headphones image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: "50px",
            color: 'transparent', // Transparent text
            WebkitTextStroke: '1px white', // White outline for the button text
            fontSize: '1.8rem',
            fontFamily: 'sans-serif',
            textDecoration: 'none',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            transition: 'transform 0.3s ease, background-color 0.3s ease', // Smooth transition effect
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)'; // Scale button on hover
            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'; // Optional background color change on hover
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)'; // Reset scale
            e.target.style.backgroundColor = ''; // Reset background color
          }}
        >
          Headphones
        </Link>
      </div>
    </div>
    </div>
  );
}
