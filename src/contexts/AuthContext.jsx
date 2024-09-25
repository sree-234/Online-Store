import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig"; // Firebase auth and Firestore
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Firestore functions

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state for initialization

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          // Retrieve user profile and cart data from Firestore
          const userProfileDoc = await getDoc(doc(db, "users", user.uid));
          if (userProfileDoc.exists()) {
            const userData = userProfileDoc.data();
            setProfile(userData.profile || {});
            setCart(userData.cart || []);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        // Reset state when user is not authenticated
        setCurrentUser(null);
        setProfile(null);
        setCart([]);
      }
      setLoading(false); // Set loading to false after the auth state is determined
    });

    return unsubscribe;
  }, []);

  // Signup function with Firestore integration
  async function signup(email, password, profileData) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user profile and empty cart in Firestore
      await setDoc(doc(db, "users", user.uid), {
        profile: profileData || {},
        cart: [],
      });

      // Set the local state for the new user
      setProfile(profileData || {});
      setCart([]);
    } catch (error) {
      console.error("Error during signup:", error);
      throw error; // Propagate error to the calling function
    }
  }

  // Login function
  async function login(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error during login:", error);
      throw error; // Propagate error to the calling function
    }
  }

  // Logout function
  async function logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  // Function to update user profile in Firestore
  async function updateProfile(newProfileData) {
    if (!currentUser) return;

    try {
      // Update Firestore with the new profile data
      await setDoc(doc(db, "users", currentUser.uid), { profile: newProfileData }, { merge: true });
      setProfile(newProfileData); // Update local state
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  // Function to update cart in Firestore and local state
  async function updateCart(newCart) {
    if (!currentUser) return;

    try {
      // Update Firestore with the new cart data
      await setDoc(doc(db, "users", currentUser.uid), { cart: newCart }, { merge: true });
      setCart(newCart); // Update local state
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  }

  const value = {
    currentUser,
    profile,
    cart,
    signup,
    login,
    logout,
    updateProfile, // Expose profile update function
    updateCart, // Expose cart update function
    loading, // Expose loading state
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>; // Render children only after loading is complete
}
