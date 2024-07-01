import React, { useEffect, useState, useContext } from 'react';
import { Navbar, Nav, Container, Form, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import cartIcon from './shopping-cart-icon.png'; // Make sure to download and save the icon in the src/components/ folder

function NavBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [username, setUsername] = useState('');
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('customer_id');
    setUsername('');
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/alternate">Alternate</Nav.Link>
            <NavDropdown title="Links" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/customers">Customers</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/products">Products</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/orders">Orders</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>
          {username ? (
            <NavDropdown title={username} id="userDropdown" className="ms-auto">
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <div className="d-flex ms-auto">
              <Nav.Link as={Link} to="/login" className="me-3">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </div>
          )}
          <Nav.Link as={Link} to="/cart" className="ms-auto d-flex align-items-center">
            <img src={cartIcon} alt="Cart" width="20" height="20" className="me-1" />
            <span>Cart ({cartItems.length})</span>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
