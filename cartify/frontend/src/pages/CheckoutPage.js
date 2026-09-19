import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { CartContext } from '../context/CartContext';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [error, setError] = useState('');

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const placeOrder = async (e) => {
    e.preventDefault();
    try {
      const orderItems = cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        qty: item.qty,
        price: item.price,
      }));

      const { data } = await API.post('/orders', {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      clearCart();
      navigate(`/order/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Order failed');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Checkout</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={placeOrder} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: 400 }}>
        <input placeholder="Address" required
          value={shippingAddress.address}
          onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })} />
        <input placeholder="City" required
          value={shippingAddress.city}
          onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} />
        <input placeholder="Postal Code" required
          value={shippingAddress.postalCode}
          onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })} />
        <input placeholder="Country" required
          value={shippingAddress.country}
          onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })} />

        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="Card">Credit/Debit Card</option>
          <option value="PayPal">PayPal</option>
        </select>

        <p>Items: ${itemsPrice.toFixed(2)}</p>
        <p>Tax: ${taxPrice.toFixed(2)}</p>
        <p>Shipping: ${shippingPrice.toFixed(2)}</p>
        <h3>Total: ${totalPrice.toFixed(2)}</h3>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
