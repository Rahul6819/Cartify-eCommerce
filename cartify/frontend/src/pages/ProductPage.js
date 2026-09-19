import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { CartContext } from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, Number(qty));
    navigate('/cart');
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: '1rem', display: 'flex', gap: '2rem' }}>
      <img src={product.image} alt={product.name} style={{ width: 300 }} />
      <div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <h3>${product.price}</h3>
        <p>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>
        {product.countInStock > 0 && (
          <>
            <input
              type="number"
              min="1"
              max={product.countInStock}
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
            <button onClick={handleAddToCart}>Add to Cart</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
