import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';

const OrderPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await API.get(`/orders/${id}`);
      setOrder(data);
    };
    fetchOrder();
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Order #{order._id}</h2>
      <p>Status: {order.isPaid ? 'Paid' : 'Not Paid'}</p>
      <h4>Shipping</h4>
      <p>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
      <h4>Order Items</h4>
      {order.orderItems.map((item) => (
        <div key={item.product}>
          {item.name} x {item.qty} = ${(item.price * item.qty).toFixed(2)}
        </div>
      ))}
      <h3>Total: ${order.totalPrice.toFixed(2)}</h3>
    </div>
  );
};

export default OrderPage;
