import React from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function RegistrationSuccess() {
  const location = useLocation();
  const { username, role, customer_name, email, phone } = location.state || {};

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>Registration Successful</Card.Title>
          <Card.Text>
            <strong>Username:</strong> {username}<br />
            <strong>Role:</strong> {role}<br />
            <strong>Customer Name:</strong> {customer_name}<br />
            <strong>Email:</strong> {email}<br />
            <strong>Phone:</strong> {phone}
          </Card.Text>
          <Button variant="primary" href="/login">Go to Login</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RegistrationSuccess;
