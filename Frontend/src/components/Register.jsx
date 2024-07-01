import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          role,
          customer_name: customerName,
          email,
          phone,
        }),
      });

      const data = await response.json();
      console.log('Register Response:', data);

      if (response.ok) {
        localStorage.setItem('username', username);
        localStorage.setItem('customer_id', data.customer_id); // Store customer_id
        navigate('/registration-success');
      } else {
        setError(data.Error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('An error occurred during registration. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Register</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formRole">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formCustomerName">
          <Form.Label>Customer Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
}

export default Register;
