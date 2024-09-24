// src/pages/Profile.jsx
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function Profile() {
  const { currentUser } = useAuth();
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDoc = doc(db, "users", currentUser.uid);
    await updateDoc(userDoc, { username });
  };

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Update username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}