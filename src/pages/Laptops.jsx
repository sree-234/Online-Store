import React from 'react';
import { useCart } from '../contexts/CartContext';
import laptop1 from '../images/laptop1.jpg';
import laptop2 from '../images/laptop2.jpg';
import laptop3 from '../images/laptop3.jpg';

export default function Laptops() {
  const { addToCart } = useCart();

  const products = [
    { id: 1, name: 'Laptop 1', price: 1299, img: laptop1, specs: 'Intel i5, 8GB RAM, 256GB SSD' },
    { id: 2, name: 'Laptop 2', price: 1499, img: laptop2, specs: 'Intel i7, 16GB RAM, 512GB SSD' },
    { id: 3, name: 'Laptop 3', price: 1799, img: laptop3, specs: 'Intel i9, 32GB RAM, 1TB SSD' },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '20px' }}>
      {products.map((product) => (
        <div key={product.id} style={{ position: 'relative', textAlign: 'center', width: '30%' }}>
          <img
            src={product.img}
            alt={product.name}
            style={{ width: '100%', height: 'auto', transition: 'transform 0.3s ease' }}
            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: '#fff',
              padding: '10px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <h3>{product.price} USD</h3>
            <button
              style={{ backgroundColor: 'purple', color: '#fff', border: 'none', padding: '10px', cursor: 'pointer' }}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: '#fff',
              padding: '10px',
              display: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.display = 'block')}
            onMouseLeave={(e) => (e.currentTarget.style.display = 'none')}
          >
            <p>{product.specs}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
