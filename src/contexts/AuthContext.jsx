import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig"; // Import Firestore
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Firestore functions

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [cart, setCart] = useState([]); // Cart state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);

        // Retrieve user profile and cart data from Firestore
        const userProfileDoc = await getDoc(doc(db, "users", user.uid));
        if (userProfileDoc.exists()) {
          const userData = userProfileDoc.data();
          setProfile(userData.profile || {});
          setCart(userData.cart || []);
        }
      } else {
        setCurrentUser(null);
        setProfile(null);
        setCart([]);
      }
    });

    return unsubscribe;
  }, []);

  // Signup function and store profile in Firestore
  async function signup(email, password, profileData) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save profile and cart information in Firestore
    await setDoc(doc(db, "users", user.uid), {
      profile: profileData,
      cart: [],
    });
  }

  // Login function
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Logout function
  function logout() {
    return signOut(auth);
  }

  const value = {
    currentUser,
    profile,
    cart,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
