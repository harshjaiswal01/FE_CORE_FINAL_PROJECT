import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Table, Button, Alert } from 'react-bootstrap';

function OrderDetails() {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/orderdetails/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch order details');
      }
      const data = await response.json();
      console.log('Order Details Response:', data);
      setOrderDetails(data.items || data); // Ensure that we're setting items correctly
    } catch (error) {
      console.error('Error fetching order details:', error);
      setError('An error occurred while fetching order details');
    }
  };

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={() => navigate('/')}>
          Go to Home
        </Button>
      </Container>
    );
  }

  if (!orderDetails || orderDetails.length === 0) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">No items found for this order.</Alert>
        <Button variant="primary" onClick={() => navigate('/')}>
          Go to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2>Order Details</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.product_name}</td>
              <td>${item.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3>Total Amount: ${orderDetails.reduce((total, item) => total + item.price, 0).toFixed(2)}</h3>
      <Button variant="primary" onClick={() => navigate('/')}>
        Go to Home
      </Button>
    </Container>
  );
}

export default OrderDetails;
