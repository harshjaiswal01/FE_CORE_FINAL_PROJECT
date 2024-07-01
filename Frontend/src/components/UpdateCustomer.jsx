import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

function UpdateCustomer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState({ customer_name: '', email: '', phone: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  const fetchCustomer = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/customers/${id}`);
      if (response.ok) {
        const data = await response.json();
        setCustomer(data);
      } else {
        setError('Failed to fetch customer details.');
      }
    } catch (error) {
      setError('An error occurred while fetching customer details.');
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const response = await fetch(`http://127.0.0.1:5000/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        navigate('/customers');
      } else {
        setError(data.message || 'Failed to update customer.');
      }
    } catch (error) {
      setError('An error occurred while updating the customer.');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Update Customer</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Customer updated successfully!</Alert>}
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="formCustomerName">
          <Form.Label>Customer Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter customer name"
            value={customer.customer_name}
            onChange={(e) => setCustomer({ ...customer, customer_name: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={customer.email}
            onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formPhone" className="mt-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            value={customer.phone}
            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Update Customer
        </Button>
      </Form>
    </Container>
  );
}

export default UpdateCustomer;
