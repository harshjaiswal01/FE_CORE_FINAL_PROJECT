import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function CreateProduct() {
  const [product, setProduct] = useState({ product_name: '', price: '', description: '', photo_url: '' });
  const navigate = useNavigate();

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
      if (response.ok) {
        navigate('/products');
      } else {
        console.error('Error creating product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Create Product</h2>
      <Form onSubmit={handleCreate}>
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

        <Form.Group controlId="formDescription" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
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

        <Button variant="primary" type="submit" className="mt-3">
          Create Product
        </Button>
      </Form>
    </Container>
  );
}

export default CreateProduct;
