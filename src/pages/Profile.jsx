// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Navbar from "../components/Navbar"; 

export default function Profile() {
  const { currentUser } = useAuth();
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode

  // Fetch user data when the component mounts
  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username || "");
      setAddress(currentUser.address || "");
      setPhoneNumber(currentUser.phoneNumber || "");
      setEmail(currentUser.email || ""); // Allow for email to be editable if not set
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDoc = doc(db, "users", currentUser.uid);
    await updateDoc(userDoc, {
      username,
      address,
      phoneNumber,
      email,
    });
    alert("Profile updated successfully!");
    setIsEditing(false); // Exit edit mode after update
  };

  // Styles
  const containerStyle = {
    height: "100vh", // Full height of the viewport
    width: "100vw", // Full width of the viewport
    display: "flex",
    justifyContent: "center", // Centers content horizontally
    alignItems: "center", // Centers content vertically
    background: "url('https://imgs.search.brave.com/YdTrZl8rNTnykCTr5LoXLkc2k-3zxbfmb7NIjPRU4dI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA4LzI4LzE4LzQ0/LzM2MF9GXzgyODE4/NDQ5Ml9yNGYxb29C/Vm5MOE1wSjBUSUVw/bHB0Y3dVVmxaaXJ0/Uy5qcGc')",
    backgroundSize: "cover",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem", // Adjusted gap for better spacing
    padding: "3rem 2rem",
    background: "rgba(0, 0, 0, 0.607)",
    backdropFilter: "blur(3px)",
    borderRadius: "1rem",
    textAlign: "center", // Center the form content
    width: "400px", // Fixed width for the form
  };

  const headingStyle = {
    textTransform: "uppercase",
    letterSpacing: "5px",
    fontSize: "35px", // Slightly smaller font size
    fontWeight: "bold",
    color: "white", // Heading color
  };

  const inputStyle = {
    all: "unset",
    fontSize: "17px",
    height: "50px",
    width: "100%", // Full width of the form
    borderBottom: "1px solid white",
    textAlign: "center", // Center the text in input
    padding: "0 0.5rem", // Padding for better spacing
  };

  const buttonStyle = {
    height: "50px",
    width: "100%", // Full width of the button
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

  return (
    <div>
      <Navbar />
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h1 style={headingStyle}>Profile</h1>
        <div>
          <p style={{ color: "white" }}>Username: {username || "Not set"}</p>
          {isEditing && (
            <input
              type="text"
              placeholder="Update username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
            />
          )}
        </div>
        <div>
          <p style={{ color: "white" }}>Address: {address || "Not set"}</p>
          {isEditing && (
            <input
              type="text"
              placeholder="Update address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={inputStyle}
            />
          )}
        </div>
        <div>
          <p style={{ color: "white" }}>Phone Number: {phoneNumber || "Not set"}</p>
          {isEditing && (
            <input
              type="text"
              placeholder="Update phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={inputStyle}
            />
          )}
        </div>
        <div>
          <p style={{ color: "white" }}>Email: {email || "Not set"}</p>
          {isEditing && (
            <input
              type="email"
              placeholder="Update email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          )}
        </div>
        <button type="button" onClick={() => setIsEditing(!isEditing)} style={buttonStyle}>
          {isEditing ? "Update" : "Edit Profile"}
        </button>
      </form>
    </div>
    </div>
  );
}
