import React from "react";
import { useCart } from "../contexts/CartContext";

export default function ProductItem({ product }) {
  const { addToCart } = useCart();

  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}