import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Alert, Row, Col } from 'react-bootstrap';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('An error occurred while fetching products');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('An error occurred while deleting the product');
    }
  };

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h2>Products</h2>
        </Col>
        <Col className="text-right">
          <Button variant="primary" onClick={() => navigate('/create-product')}>
            Create Product
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.product_name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.active ? 'Yes' : 'No'}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="mr-2"
                >
                  View Details
                </Button>
                <Button
                  variant="warning"
                  onClick={() => navigate(`/update-product/${product.id}`)}
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product.id)}
                >
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

export default ProductList;
