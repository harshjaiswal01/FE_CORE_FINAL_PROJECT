import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/orders');
      const data = await response.json();
      console.log('Orders Response:', data);
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>All Orders</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Order Date</th>
            <th>Expected Delivery Date</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.order_date}</td>
              <td>{order.expected_delivery_date}</td>
              <td>
                <Link to={`/orders/${order.id}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default OrderList;
