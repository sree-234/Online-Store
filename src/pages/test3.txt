// src/pages/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useCart } from "../contexts/CartContext";
import Navbar from "../components/Navbar";

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const productDoc = await getDoc(doc(db, "products", productId));
      setProduct(productDoc.data());
    };
    fetchProduct();
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-black text-white ">
    <Navbar />
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price} USD</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
    </div>
  );
}