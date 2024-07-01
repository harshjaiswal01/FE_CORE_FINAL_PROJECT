import React, { useContext, useEffect, useState } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) {
      alert('You need to be logged in to access the checkout page.');
      navigate('/login');
    }
  }, [navigate]);

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  const handleCheckout = async () => {
    try {
      const customerId = localStorage.getItem('customer_id');
      if (!customerId) {
        console.error('Customer ID not found');
        setError('Customer ID not found. Please log in again.');
        return;
      }

      console.log('Customer ID:', customerId);
      console.log('Cart Items:', cartItems);

      const response = await fetch('http://127.0.0.1:5000/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customer_id: parseInt(customerId),
          items: cartItems.map((item) => item.id)
        })
      });

      const responseData = await response.json();
      console.log('Server Response:', responseData);

      if (response.ok) {
        clearCart();
        navigate(`/order-confirmation/${responseData['Order ID']}`);
      } else {
        setError(responseData.Error || 'Error placing order. Please try again.');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      setError('Error placing order. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Checkout</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.product_name}</td>
                  <td>${item.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
          <Button variant="primary" onClick={handleCheckout} className="mt-3">
            Confirm Checkout
          </Button>
        </>
      )}
    </Container>
  );
}

export default Checkout;
