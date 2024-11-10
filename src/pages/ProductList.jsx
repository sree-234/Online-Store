import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./product.css";
import { ThemeContext } from "../App";

export default function ProductList() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const [products, setProducts] = useState([]);
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { parameter } = location.state || {};

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let urls = [];
  
        // Check the parameter and set the appropriate URLs
        if (parameter === "top") {
          urls = ["https://dummyjson.com/products/category/mobile-accessories"];
        } else if (parameter === "bottom") {
          urls = [
            "https://dummyjson.com/products/category/laptops",
            "https://dummyjson.com/products/category/tablets",
          ];
        } else if (parameter === "right") {
          urls = [
            "https://dummyjson.com/products/category/mens-shirts",
            "https://dummyjson.com/products/category/mens-watches",
            "https://dummyjson.com/products/category/mens-shoes",
          ];
        } else if (parameter === "left") {
          urls = [
            "https://dummyjson.com/products/category/womens-dresses",
            "https://dummyjson.com/products/category/womens-bags",
            "https://dummyjson.com/products/category/womens-watches",
            "https://dummyjson.com/products/category/womens-shoes",
          ];
        }
  
        // Fetch data from all URLs and combine the results
        if (urls.length > 0) {
          const responses = await Promise.all(
            urls.map((url) => fetch(url).then((res) => res.json()))
          );
  
          // Combine all products from the fetched data
          const combinedProducts = responses.reduce((acc, data) => {
            return acc.concat(data.products || []);
          }, []);
  
          setProducts(combinedProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts();
  }, [parameter]);

  useEffect(() => {
    const expandTimer = setTimeout(() => {
      setIsExpanded(true);
      const productTimer = setTimeout(() => {
        setShowProducts(true);
      }, 500);
      return () => clearTimeout(productTimer);
    }, 100);

    return () => clearTimeout(expandTimer);
  }, []);

  const handleProductClick = (productId) => {
    setSlideOut(true); // Start the slide-out animation
    setTimeout(() => {
      setIsReversed(true);
      setIsExpanded(false);
      setShowProducts(false);
      setTimeout(() => {
        navigate(`/products/${productId}`); // Navigate to ProductDetails route with productId
      }, 800); // Delay to match the animation duration
    }, 500); // Initial delay for animation
  };

  const handleClick = (link) => {
    setSlideOut(true);
    setTimeout(() => {
      setIsReversed(true);
      setIsExpanded(false);
      setShowProducts(false);
      setTimeout(() => {
        if (link === -1) {
          navigate(-1); // Go back in history
        } else {
          navigate(link); // Navigate to the specified link
        }
      }, 800);
    }, 500);
  };

  const columns = [[], [], [], []];
  products.forEach((product, index) => {
    columns[index % 4].push(product);
  });

  return (
    <div className={`p-body ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        <span className={isDarkMode ? "icon-moon" : "icon-sun"}></span>
      </button>

      <div
        className={`p-div-i ${
          isReversed ? "p-div-f-reverse" : isExpanded ? "p-div-f" : ""
        }`}
        style={{ overflowY: "scroll" }}
      >
        {showProducts &&
          products.length > 0 &&
          columns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="product-column"
              style={{
                animation: `slideIn 0.5s ease forwards`,
                animationDelay: `${columnIndex * 0.3}s`,
              }}
            >
              {column.map((product) => (
                <div
                  key={product.id}
                  className={`product-div ${
                    slideOut ? "product-div-f" : "product-div-i"
                  }`}
                  onClick={() => handleProductClick(product.id)} // Pass product.id to the handler
                >
                  {product.thumbnail && (
                    <img
                      src={product.thumbnail}
                      alt={product.title || "Product"}
                      className="product-image"
                    />
                  )}
                  <div className="hover-overlay">
                    {product.title || "Unnamed Product"}
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>

      {(isExpanded || isReversed) && (
        <>
          <button
            className={isReversed ? "login-button-home-f" : "login-button-home-i"}
            onClick={() => handleClick("/")}
          >
            Home
          </button>
          <button
            className={isReversed ? "home-button-back-f" : "home-button-back-i"}
            onClick={() => handleClick(-1)}
          >
            Back
          </button>
          <button
            className={isReversed ? "cart-f" : "cart-i"}
            onClick={() => handleClick("/cart")}
          >
            Cart
          </button>
        </>
      )}
    </div>
  );
}
