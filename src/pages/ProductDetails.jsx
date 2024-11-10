import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./pd.css";
import { ThemeContext } from "../App";

const formatIndianPrice = (price) => {
  return price.toLocaleString("en-IN");
};

export default function ProductList() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [imageAnimation, setImageAnimation] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSlidingOut, setIsSlidingOut] = useState(false);
  const [activeTab, setActiveTab] = useState("Description");
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const [isAdded, setIsAdded] = useState(false); 
  const [tabAnimation, setTabAnimation] = useState(""); // New state for tab animation
  const navigate = useNavigate();
  const nameRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        const data = await response.json();
        setProduct(data);

        const initialImage = data.images?.[0] || "";
        setSelectedImage(initialImage);
        setSelectedThumbnail(initialImage);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };

    fetchProduct();

    const expandTimer = setTimeout(() => {
      setIsExpanded(true);
    }, 100);
    return () => clearTimeout(expandTimer);
  }, [productId]);

  useEffect(() => {
    const adjustFontSize = () => {
      const nameElement = nameRef.current;
      if (nameElement) {
        const parentWidth = nameElement.parentElement.offsetWidth;
        let fontSize = 5.5;
        nameElement.style.fontSize = `${fontSize}rem`;
        nameElement.style.whiteSpace = "nowrap";

        while (nameElement.scrollWidth > parentWidth && fontSize > 1) {
          fontSize -= 0.1;
          nameElement.style.fontSize = `${fontSize}rem`;
        }
      }
    };

    adjustFontSize();
    window.addEventListener("resize", adjustFontSize);

    return () => window.removeEventListener("resize", adjustFontSize);
  }, [product?.title]);

  const handleClick = (link) => {
    setIsSlidingOut(true);

    setTimeout(() => {
      setIsExpanded(false);
    }, 1700);

    setTimeout(() => {
      if (link === -1) {
        navigate(-1);
      } else {
        navigate(link);
      }
    }, 2400);
  };

  const handleThumbnailClick = (image) => {
    setImageAnimation("slideOutFromRight");

    setTimeout(() => {
      setSelectedImage(image);
      setSelectedThumbnail(image);
      setImageAnimation("slideInFromLeft");
    }, 300);
  };

  const handleTabClick = (tab) => {
    setTabAnimation("slideOutFromLeft");
    setTimeout(() => {
      setActiveTab(tab);
      setTabAnimation("slideInFromRight");
    }, 300);
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
    };
    console.log("Added to cart:", cartItem);
    setIsAdded(true); 
  };

  const renderTabContent = () => {
    if (!product) return null;

    switch (activeTab) {
      case "Description":
        return (
          <div className={`tab-content ${tabAnimation}`}>
            <div className="tags">
              {product.tags?.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <hr className="separator" />
            <p>{product.description}</p>
          </div>
        );
      case "Details":
        return (
          <div className={`tab-content ${tabAnimation}`}>
            <ul className="details-list">
              <li><strong>Brand</strong><br></br> {product.brand}</li>
              <hr className="separator" />
              <li><strong>SKU</strong> <br></br>{product.sku}</li>
              <hr className="separator" />
              <li><strong>Weight</strong> <br></br>{product.weight} kg</li>
              <hr className="separator" />
              <li>
                <strong>Dimensions</strong> <br></br>{`${product.dimensions?.width} x ${product.dimensions?.height} x ${product.dimensions?.depth}`} cm
              </li>
            </ul>
          </div>
        );
      case "Information":
        return (
          <div className={`tab-content ${tabAnimation}`}>
            <ul className="information-list">
              <li><strong>Warranty</strong> <br></br>{product.warrantyInformation}</li>
              <hr className="separator" />
              <li><strong>Shipping</strong><br></br> {product.shippingInformation}</li>
              <hr className="separator" />
              <li><strong>Availability</strong><br></br> {product.availabilityStatus}</li>
              <hr className="separator" />
              <li><strong>Return Policy</strong><br></br> {product.returnPolicy}</li>
            </ul>
          </div>
        );
      case "Reviews":
        return (
          <div className={`tab-content ${tabAnimation}`}>
            {product.reviews.length ? (
              product.reviews.map((review, index) => (
                <div key={index} className="review">
                  <div className="stars">
                    {"★".repeat(review.rating)}
                    <span className="empty-stars">
                      {"".repeat(5 - review.rating)}
                    </span>
                  </div>
                  <p className="comment"><strong>{review.comment}</strong></p>
                  <p className="reviewer-name">- {review.reviewerName}</p>
                  <hr className="separator" />
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`desc-body ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        <span className={isDarkMode ? "icon-moon" : "icon-sun"}></span>
      </button>

      <div className={`desc-div-i ${isExpanded ? "desc-div-f" : ""}`}>
        {product ? (
          <>
            <div className="maroon-box">
              <h1
                ref={nameRef}
                className={`${isSlidingOut ? "name-heading-f" : "name-heading-i"}`}
              >
                {product.title}
              </h1>
              <h2 className={`${isSlidingOut ? "price-heading-f" : "price-heading-i"}`}>
                ₹{formatIndianPrice(Math.round(product.price * 80))}
              </h2>
            </div>

            <div className={`${isSlidingOut ? "image-div-f" : "image-div-i"}`}>
              <img
                src={selectedImage}
                alt={product.title}
                className={`product-image ${imageAnimation}`}
                onAnimationEnd={() => setImageAnimation("")}
              />
              <div className="thumbnail-container">
                {product.images
                  ?.filter((image) => image !== product.thumbnail)
                  .map((image, index) => (
                    <div
                      key={index}
                      className={`thumbnail ${
                        selectedThumbnail === image ? "selected-thumbnail" : ""
                      }`}
                      onClick={() => handleThumbnailClick(image)}
                    >
                      <img src={image} alt={`Thumbnail ${index + 1}`} />
                    </div>
                  ))}
              </div>
            </div>

            <div className={`tab-div ${isSlidingOut ? "tab-div-f" : ""}`}>
              <div className={`tab-switches ${isSlidingOut ? "tab-switches-f" : ""}`}>
                {["Description", "Details", "Information", "Reviews"].map((tab) => (
                  <button
                    key={tab}
                    className={`tab-button ${activeTab === tab ? "active" : ""}`}
                    onClick={() => handleTabClick(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className={`tab-text ${tabAnimation}`}>
                {renderTabContent()}
              </div>

              {/* Add to Cart Button at the bottom */}
              <button
                className={`add-to-cart-button ${
                  isSlidingOut ? "login-button-f" : "login-button-i"
                }`}
                onClick={handleAddToCart}
              >
                {isAdded ? "Added" : "Add to Cart"}
              </button>
            </div>
          </>
        ) : (
          <p></p>
        )}
      </div>

      {isExpanded && (
        <>
          <button
            className={`login-button-home-i ${isSlidingOut ? "login-button-home-f" : ""}`}
            onClick={() => handleClick("/")}
          >
            Home
          </button>
          <button
            className={`home-button-back-i ${isSlidingOut ? "home-button-back-f" : ""}`}
            onClick={() => handleClick(-1)}
          >
            Back
          </button>
          <button
            className={`cart-i ${isSlidingOut ? "cart-f" : ""}`}
            onClick={() => handleClick("/cart")}
          >
            Cart
          </button>
        </>
      )}
    </div>
  );
}
