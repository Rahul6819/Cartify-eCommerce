import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Go shopping</Link></p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
              <img src={item.image} alt={item.name} width={50} />
              <span>{item.name}</span>
              <span>Qty: {item.qty}</span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
