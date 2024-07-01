import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Alert, Row, Col } from 'react-bootstrap';
import { CartContext } from './CartContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product details:', error);
      setError('An error occurred while fetching product details');
    }
  };

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={() => navigate('/products')}>
          Go Back
        </Button>
      </Container>
    );
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="mt-5">
      <Card>
        <Card.Img variant="top" src={product.photo_url} />
        <Card.Body>
          <Card.Title>{product.product_name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>Price: ${product.price.toFixed(2)}</Card.Text>
          <Row>
            <Col>
              <Button
                variant="primary"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
            </Col>
            <Col className="text-right">
              <Button
                variant="secondary"
                onClick={() => navigate('/products')}
              >
                Go Back
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductDetail;
