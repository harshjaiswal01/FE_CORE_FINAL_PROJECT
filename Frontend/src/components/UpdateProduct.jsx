import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

function UpdateProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    product_name: '',
    price: '',
    active: false,
    photo_url: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/products/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        setError('Failed to fetch product details.');
      }
    } catch (error) {
      setError('An error occurred while fetching product details.');
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const response = await fetch(`http://127.0.0.1:5000/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        navigate('/products');
      } else {
        setError(data.message || 'Failed to update product.');
      }
    } catch (error) {
      setError('An error occurred while updating the product.');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Update Product</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Product updated successfully!</Alert>}
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="formProductName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            value={product.product_name}
            onChange={(e) => setProduct({ ...product, product_name: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formPrice" className="mt-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
          />
        </Form.Group>

        <Form.Group controlId="formActive" className="mt-3">
          <Form.Check
            type="checkbox"
            label="Active"
            checked={product.active}
            onChange={(e) => setProduct({ ...product, active: e.target.checked })}
          />
        </Form.Group>

        <Form.Group controlId="formPhotoUrl" className="mt-3">
          <Form.Label>Photo URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter photo URL"
            value={product.photo_url}
            onChange={(e) => setProduct({ ...product, photo_url: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formDescription" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Update Product
        </Button>
      </Form>
    </Container>
  );
}

export default UpdateProduct;
