import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Header = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
      <Link to="/"><h2>Cartify</h2></Link>
      <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/cart">Cart ({cartItems.reduce((a, c) => a + c.qty, 0)})</Link>
        {userInfo ? (
          <>
            <span>Hi, {userInfo.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
