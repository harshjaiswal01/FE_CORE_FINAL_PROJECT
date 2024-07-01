import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function CreateOrder() {
  const [order, setOrder] = useState({ customer_id: '', items: [] });
  const navigate = useNavigate();

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      });
      if (response.ok) {
        navigate('/orders');
      } else {
        console.error('Error creating order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...order.items];
    newItems[index][field] = value;
    setOrder({ ...order, items: newItems });
  };

  const addItem = () => {
    setOrder({ ...order, items: [...order.items, { product_id: '', quantity: '' }] });
  };

  return (
    <Container className="mt-5">
      <h2>Place Order</h2>
      <Form onSubmit={handleCreate}>
        <Form.Group controlId="formCustomerId">
          <Form.Label>Customer ID</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter customer ID"
            value={order.customer_id}
            onChange={(e) => setOrder({ ...order, customer_id: parseInt(e.target.value) })}
          />
        </Form.Group>

        {order.items.map((item, index) => (
          <div key={index} className="mt-3">
            <Form.Group controlId={`formProductId${index}`}>
              <Form.Label>Product ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product ID"
                value={item.product_id}
                onChange={(e) => handleItemChange(index, 'product_id', parseInt(e.target.value))}
              />
            </Form.Group>

            <Form.Group controlId={`formQuantity${index}`} className="mt-2">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
              />
            </Form.Group>
          </div>
        ))}

        <Button variant="secondary" onClick={addItem} className="mt-3">
          Add Item
        </Button>

        <Button variant="primary" type="submit" className="mt-3">
          Place Order
        </Button>
      </Form>
    </Container>
  );
}

export default CreateOrder;
