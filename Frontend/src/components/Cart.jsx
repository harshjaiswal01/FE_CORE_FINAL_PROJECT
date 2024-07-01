import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { CartContext } from './CartContext';

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Container className="mt-5">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ListGroup>
          {cartItems.map((item, index) => (
            <ListGroup.Item key={index}>
              <div className="d-flex justify-content-between">
                <span>{item.product_name} - ${item.price}</span>
                <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                  Remove
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      {cartItems.length > 0 && (
        <Button className="mt-3" onClick={handleCheckout}>
          Proceed to Checkout
        </Button>
      )}
    </Container>
  );
}

export default Cart;
