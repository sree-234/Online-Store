import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { currentUser } = useAuth();
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState("login-form-i expanded"); // Initial state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUsername(data.username || "");
          setAddress(data.address || "");
          setPhoneNumber(data.phoneNumber || "");
          setEmail(data.email || currentUser.email || "");
        }
      }
    };
    fetchUserData();
  }, [currentUser]);

  const handleSaveProfile = async () => {
    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        await updateDoc(userDocRef, {
          username,
          address,
          phoneNumber,
          email,
        });
        console.log("Profile updated successfully!");
      } else {
        await setDoc(userDocRef, {
          username,
          address,
          phoneNumber,
          email,
        });
        console.log("Profile created successfully!");
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile: ", error);
      console.log("Failed to update profile. Please try again.");
    }
  };

  const toggleEditMode = () => setIsEditing((prev) => !prev);

  const handleNavigation = (path) => {
    // Transition to "form-f" before navigating
    setFormState("login-form-f");
    setTimeout(() => navigate(path), 800); // Delay to allow the animation
  };

  return (
    <div className="login-container light-mode">
      <div className={formState}>
        <h1 className="login-heading-i">PROFILE</h1>

        {/* Username */}
        <div className="profile-text slideInFromBottom">
          <p>{username || "Username: Not set"}</p>
          {isEditing && (
            <input
              type="text"
              placeholder="Update username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-email-i"
            />
          )}
        </div>

        {/* Address */}
        <div className="profile-text slideInFromBottom">
          <p>{address || "Address: Not set"}</p>
          {isEditing && (
            <input
              type="text"
              placeholder="Update address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="login-email-i"
            />
          )}
        </div>

        {/* Phone Number */}
        <div className="profile-text slideInFromBottom">
          <p>{phoneNumber || "Phone Number: Not set"}</p>
          {isEditing && (
            <input
              type="text"
              placeholder="Update phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="login-pass-i"
            />
          )}
        </div>

        {/* Email */}
        <div className="profile-text slideInFromBottom">
          <p>{email || "Email: Not set"}</p>
          {isEditing && (
            <input
              type="email"
              placeholder="Update email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-pass-i"
            />
          )}
        </div>

        {/* Edit / Save Button */}
        {isEditing ? (
          <button onClick={handleSaveProfile} className="login-button-i">
            Save Profile
          </button>
        ) : (
          <button onClick={toggleEditMode} className="login-button-i">
            Edit Profile
          </button>
        )}

        {/* Navigation Buttons */}
        <button
          className="login-button-home-i"
          onClick={() => handleNavigation("/")}
        >
          Home
        </button>
        <button
          className="home-button-back-i"
          onClick={() => handleNavigation(-1)}
        >
          Back
        </button>
        <button
          className="cart-i"
          onClick={() => handleNavigation("/cart")}
        >
          Cart
        </button>
      </div>
    </div>
  );
}
