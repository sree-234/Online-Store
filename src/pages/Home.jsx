// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Our Online Store</h1>
      <Link to="/products">Shop Now</Link>
    </div>
  );
}