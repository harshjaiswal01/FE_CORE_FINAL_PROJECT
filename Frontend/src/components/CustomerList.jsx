import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/customers');
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/customers/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setCustomers(customers.filter(customer => customer.id !== id));
      } else {
        console.error('Error deleting customer');
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Customers</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.customer_name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>
                <Button as={Link} to={`/customers/${customer.id}`} variant="info" className="me-2">
                  View
                </Button>
                <Button as={Link} to={`/update-customer/${customer.id}`} variant="warning" className="me-2">
                  Edit
                </Button>
                <Button onClick={() => handleDelete(customer.id)} variant="danger">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default CustomerList;
