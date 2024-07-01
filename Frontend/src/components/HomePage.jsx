import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';

function HomePage({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProducts();
  }, [searchTerm]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/products?search=${searchTerm}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        {products.map((product) => (
          <Col key={product.id} xs={12} md={4} lg={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={product.photo_url || 'placeholder.jpg'} />
              <Card.Body>
                <Card.Title>{product.product_name}</Card.Title>
                <Card.Text>Description: {product.description}</Card.Text>
                <Card.Text>Price: ${product.price.toFixed(2)}</Card.Text>
                <div className="d-flex justify-content-between">
                  <Button as={Link} to={`/products/${product.id}`} variant="info">
                    Details
                  </Button>
                  <Button variant="primary" onClick={() => addToCart(product)}>
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HomePage;
