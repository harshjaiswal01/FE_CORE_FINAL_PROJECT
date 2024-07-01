import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function CreateCustomer() {
  const [customer, setCustomer] = useState({ customer_name: '', email: '', phone: '' });
  const navigate = useNavigate();

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
      });
      if (response.ok) {
        navigate('/customers');
      } else {
        console.error('Error creating customer');
      }
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Create Customer</h2>
      <Form onSubmit={handleCreate}>
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
          Create Customer
        </Button>
      </Form>
    </Container>
  );
}

export default CreateCustomer;
