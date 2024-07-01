import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  const fetchCustomer = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/customers/${id}`);
      const data = await response.json();
      setCustomer(data);
    } catch (error) {
      console.error('Error fetching customer:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/customers/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        navigate('/customers');
      } else {
        console.error('Error deleting customer');
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  if (!customer) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>{customer.customer_name}</Card.Title>
          <Card.Text>Email: {customer.email}</Card.Text>
          <Card.Text>Phone: {customer.phone}</Card.Text>
          <>
            <Button as={Link} to={`/update-customer/${customer.id}`} variant="warning" className="me-2">
              Edit
            </Button>
            <Button variant="danger" onClick={() => handleDelete(customer.id)}>
              Delete
            </Button>
          </>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CustomerDetails;
