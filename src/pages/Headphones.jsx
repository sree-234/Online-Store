import React from 'react';
import { useCart } from '../contexts/CartContext';
import headphone1 from '../images/headphone1.jpg';
import headphone2 from '../images/headphone2.jpg';
import headphone3 from '../images/headphone3.jpg';

export default function Headphones() {
  const { addToCart } = useCart();

  const products = [
    { id: 1, name: 'Headphone 1', price: 199, img: headphone1, specs: 'Wireless, Noise Cancelling, 20H Battery' },
    { id: 2, name: 'Headphone 2', price: 249, img: headphone2, specs: 'Wired, 50mm Drivers, Hi-Res Audio' },
    { id: 3, name: 'Headphone 3', price: 299, img: headphone3, specs: 'Wireless, 30H Battery, Surround Sound' },
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
