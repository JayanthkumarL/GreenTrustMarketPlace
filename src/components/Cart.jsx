import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data);
    };
    fetchCart();
  }, []);

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.post('http://localhost:5000/api/cart/checkout', {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert(`Checkout complete! Total: $${res.data.total}`);
    setCartItems([]);
  };

  const total = cartItems.reduce((sum, item) => sum + item.Product.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <div className="cart-content">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="empty-cart">Cart is empty</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <h3>{item.Product.title}</h3>
                  <p>Price: ${item.Product.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <p className="subtotal">${(item.Product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="cart-footer">
              <p className="total">Total: ${total.toFixed(2)}</p>
              <button onClick={handleCheckout}>Pay Now (Simulated)</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;