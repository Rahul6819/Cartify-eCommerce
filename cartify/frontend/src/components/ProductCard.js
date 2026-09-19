import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div style={{ border: '1px solid #eee', borderRadius: 8, padding: '1rem', width: 220 }}>
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 6 }} />
        <h4>{product.name}</h4>
      </Link>
      <p>${product.price}</p>
    </div>
  );
};

export default ProductCard;
