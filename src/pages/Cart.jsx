import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { db } from "../firebaseConfig"; // Import Firestore
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext"; // To get current user
import backgroundImage from "../images/back.jpg";
import CheckoutButton from "../components/CheckoutButton";
import Navbar from "../components/Navbar";

export default function Cart() {
  const { cart, updateCartQuantity, setCart } = useCart(); // Add setCart to update cart from Firestore
  const { currentUser } = useAuth(); // Get logged-in user
  const navigate = useNavigate();

  // Calculate total price based on product quantity
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Function to save the cart to Firestore
  const saveCartToFirestore = async () => {
    if (currentUser) {
      const userCartRef = doc(db, "carts", currentUser.uid); // User-specific cart document
      try {
        await setDoc(userCartRef, { cart }, { merge: true }); // Save cart in Firestore
        console.log("Cart saved to Firestore");
      } catch (error) {
        console.error("Error saving cart: ", error);
      }
    }
  };

  // Function to fetch cart from Firestore when the user logs in
  const fetchCartFromFirestore = async () => {
    if (currentUser) {
      const userCartRef = doc(db, "carts", currentUser.uid);
      try {
        const cartDoc = await getDoc(userCartRef);
        if (cartDoc.exists()) {
          setCart(cartDoc.data().cart); // Load cart from Firestore into local state
        }
      } catch (error) {
        console.error("Error fetching cart: ", error);
      }
    }
  };

  // Fetch the cart data when the component mounts or when the user logs in
  useEffect(() => {
    if (currentUser) {
      fetchCartFromFirestore();
    }
  }, [currentUser]);

  // Save cart to Firestore whenever the cart changes
  useEffect(() => {
    saveCartToFirestore();
  }, [cart]);

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#ff4747",
          textAlign: "center",
          width: "100vw",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          paddingTop: "50px",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "8rem", color: "transparent", WebkitTextStroke: "5px white", textTransform: "uppercase", fontFamily: "sans-serif" }}>
          Your
        </h1>
        <h1 style={{ fontSize: "8rem", margin: "10px 0", color: "transparent", WebkitTextStroke: "5px black", textTransform: "uppercase", fontFamily: "sans-serif" }}>
          Cart
        </h1>

        {cart.length === 0 ? (
          <p style={{ color: "white", fontSize: "1.5rem" }}>Your cart is empty</p>
        ) : (
          <div
            style={{
              width: "60%",
              textAlign: "left",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            {cart.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #ccc",
                  padding: "10px 0",
                  marginBottom: "10px",
                }}
              >
                <div>
                  <h3 style={{ color: "#000", margin: 0 }}>{item.name}</h3>
                  <p style={{ color: "#000", margin: 0 }}>{item.price} INR</p>
                  <p style={{ color: "#000", margin: 0 }}>Quantity: {item.quantity}</p>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "red",
                      fontSize: "1.5rem",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  >
                    &minus;
                  </button>
                  <span style={{ fontSize: "1.5rem", color: "#000" }}>x{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "green",
                      fontSize: "1.5rem",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  >
                    &#43;
                  </button>
                </div>
              </div>
            ))}

            <h2 style={{ color: "green" }}>Total: INR {total}</h2>
            <CheckoutButton />
            <button
              onClick={() => navigate("/")}
              style={{
                marginTop: "20px",
                fontSize: "1.5rem",
                backgroundColor: "black",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                textAlign: "center",
                width: "100%",
              }}
            >
              Return to Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
