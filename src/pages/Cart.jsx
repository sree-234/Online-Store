import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ThemeContext } from "../App"; // Import ThemeContext
import CheckoutButton from "../components/CheckoutButton"; // Import the CheckoutButton component
// import { db } from "../firebaseConfig"; // Uncomment when using Firebase
// import { doc, setDoc, getDoc } from "firebase/firestore"; // Uncomment when using Firestore functions
import "./cart.css"; // Import the CSS file for styling

export default function Cart() {
  // Temporary local cart
  const [cart, setCart] = useState([
    { id: 1, name: "Product 1", price: 100, quantity: 2 },
    { id: 2, name: "Product 2", price: 200, quantity: 1 },
    { id: 3, name: "Product 3", price: 200, quantity: 1 },
  ]);

  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const [isExpanded, setIsExpanded] = useState(false);

  // New state to handle Home and Back button animations
  const [showHomeButton, setShowHomeButton] = useState(false);
  const [homeButtonClicked, setHomeButtonClicked] = useState(false);
  const [backButtonClicked, setBackButtonClicked] = useState(false);

  // Trigger the animation with a delay on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 100); // 100 ms
    return () => clearTimeout(timer);
  }, []);

  // Apply the correct theme class to the body
  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  // Introduce a delay to show the Home and Back buttons
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHomeButton(true); // Show Home and Back buttons after delay
    }, 1500); // 1.5-second delay
    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  // Redirect to login if no user is logged in
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  // Calculate total price based on product quantity
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Function to update cart quantity
  const updateCartQuantity = (id, newQuantity) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(newQuantity, 0) } : item
        )
        .filter((item) => item.quantity > 0) // Remove items with quantity 0
    );
  };

  // Commented-out Firebase functions for later use
  // const saveCartToFirestore = async () => {
  //   if (currentUser) {
  //     const userCartRef = doc(db, "carts", currentUser.uid);
  //     try {
  //       await setDoc(userCartRef, { cart }, { merge: true });
  //       console.log("Cart saved to Firestore");
  //     } catch (error) {
  //       console.error("Error saving cart: ", error);
  //     }
  //   }
  // };

  // const fetchCartFromFirestore = async () => {
  //   if (currentUser) {
  //     const userCartRef = doc(db, "carts", currentUser.uid);
  //     try {
  //       const cartDoc = await getDoc(userCartRef);
  //       if (cartDoc.exists()) {
  //         setCart(cartDoc.data().cart);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching cart: ", error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (currentUser) {
  //     fetchCartFromFirestore();
  //   }
  // }, [currentUser]);

  // useEffect(() => {
  //   saveCartToFirestore();
  // }, [cart]);

  // Function to calculate the dynamic height
  const calculateHeight = () => {
    const baseHeight = 300;
    const additionalHeightPerProduct = 50;
    return baseHeight + cart.length * additionalHeightPerProduct;
  };

  // Handle Home button click
  const handleHomeClick = () => {
    setBackButtonClicked(true);
    setHomeButtonClicked(true); // Trigger the animation
    setTimeout(() => navigate("/"), 2000); // Delay navigation for the animation
  };

  // Handle Back button click
  const handleBackClick = () => {
    setBackButtonClicked(true);
    setHomeButtonClicked(true); // Trigger the animation
    setTimeout(() => navigate(-1), 2000); // Delay navigation for the animation
  };

  return (
    <div className="grid-container">
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        <span className={isDarkMode ? "icon-moon" : "icon-sun"}></span>
      </button>

      <div
        className={`list-div-i ${
          homeButtonClicked || backButtonClicked
            ? "list-div-f-reverse"
            : isExpanded
            ? "list-div-f"
            : ""
        }`}
        style={{
          height:
            homeButtonClicked || backButtonClicked
              ? "300px"
              : isExpanded
              ? `${calculateHeight() + 10}px`
              : "300px",
        }}
      >
        <h1 className={`your-cart-i ${homeButtonClicked || backButtonClicked ? "your-cart-f" : ""}`}>
          CART
        </h1>
        {cart.length === 0 ? (
          <p className={`empty-i ${homeButtonClicked || backButtonClicked ? "empty-f" : ""}`}>
            Your cart is empty
          </p>
        ) : (
          <div className="list-container-expanded">
            {cart.map((item, index) => (
              <div className="cart-item" key={index}>
                <div
                  className={`item-row ${homeButtonClicked || backButtonClicked ? "item-row-f" : ""}`}
                >
                  <h3
                    className={`item-name ${
                      homeButtonClicked || backButtonClicked ? "item-name-f" : ""
                    }`}
                  >
                    {item.name}
                  </h3>
                  <p
                    className={`item-price ${
                      homeButtonClicked || backButtonClicked ? "item-price-f" : ""
                    }`}
                  >
                    ₹{item.price} 
                  </p>
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className={`quantity-button quantity-minus ${
                        homeButtonClicked || backButtonClicked ? "quantity-button-f" : ""
                      }`}
                    >
                      &minus;
                    </button>
                    <span
                      className={`quantity-display ${
                        homeButtonClicked || backButtonClicked ? "quantity-display-f" : ""
                      }`}
                    >
                      x{item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className={`quantity-button quantity-plus ${
                        homeButtonClicked || backButtonClicked ? "quantity-button-f" : ""
                      }`}
                    >
                      &#43;
                    </button>
                  </div>
                </div>
                <hr
                  className={`separator-line ${
                    homeButtonClicked || backButtonClicked ? "separator-line-f" : ""
                  }`}
                />
              </div>
            ))}
            {/* Checkout Button */}
            <div>
              {currentUser ? (
                <Link to="/checkout">
                  <button
                    className={`checkout-button-i ${
                      homeButtonClicked || backButtonClicked ? "checkout-button-f" : ""
                    }`}
                  >
                    ₹{total} 
                  </button>
                </Link>
              ) : (
                <Link to="/login">
                  <button
                    className={`checkout-button-i ${
                      homeButtonClicked || backButtonClicked ? "checkout-button-f" : ""
                    }`}
                  >
                    ₹{total} 
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Home and Back Buttons with Animation */}
      {showHomeButton && (
        <>
          <button
            className={`${
              homeButtonClicked ? "login-button-home-f" : "login-button-home-i"
            }`}
            onClick={handleHomeClick}
          >
            Home
          </button>
          <button
            className={`${
              backButtonClicked ? "home-button-back-f" : "home-button-back-i"
            }`}
            onClick={handleBackClick}
          >
            Back
          </button>
        </>
      )}
    </div>
  );
}
