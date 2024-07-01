import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';

function Alternate({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10; // Default number of products per page

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, currentPage]);

  const fetchProducts = async () => {
    try {
      const url = searchTerm 
        ? `http://127.0.0.1:5000/products_paginated?search=${searchTerm}&page=${currentPage}&per_page=${perPage}`
        : `http://127.0.0.1:5000/products_paginated?page=${currentPage}&per_page=${perPage}`;
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col sm={12} md={10} lg={12}>
          <Row className="justify-content-center">
            {products.map(product => (
              <Col key={product.id} sm={12} md={6} lg={4} className="d-flex justify-content-center mb-4">
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={product.photo_url || 'placeholder.jpg'} />
                  <Card.Body>
                    <Card.Title>{product.product_name}</Card.Title>
                    <Card.Text>
                      Price: ${product.price}
                    </Card.Text>
                    <Button as={Link} to={`/products/${product.id}`} variant="primary">
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </Container>
  );
}

export default Alternate;
