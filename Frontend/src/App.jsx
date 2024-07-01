import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import Alternate from './components/Alternate';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';
import UpdateCustomer from './components/UpdateCustomer';
import CreateCustomer from './components/CreateCustomer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import UpdateProduct from './components/UpdateProduct';
import CreateProduct from './components/CreateProduct';
import OrderList from './components/OrderList';
import OrderDetails from './components/OrderDetails';
import CreateOrder from './components/CreateOrder';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import Login from './components/Login';
import Register from './components/Register';
import RegistrationSuccess from './components/RegistrationSuccess';
import Container from 'react-bootstrap/Container';
import { CartProvider } from './components/CartContext';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <CartProvider>
      <NavBar onSearch={handleSearch} />
      <div className="mt-5">
        <Container>
          <Routes>
            <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
            <Route path="/alternate" element={<Alternate searchTerm={searchTerm} />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/:id" element={<CustomerDetails />} />
            <Route path="/update-customer/:id" element={<UpdateCustomer />} />
            <Route path="/create-customer" element={<CreateCustomer />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/update-product/:id" element={<UpdateProduct />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/orders" element={<OrderList />} /> {/* Order List Route */}
            <Route path="/orders/:id" element={<OrderDetails />} /> {/* Order Details Route */}
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} /> {/* Ensure this route is correct */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registration-success" element={<RegistrationSuccess />} />
          </Routes>
        </Container>
      </div>
    </CartProvider>
  );
}

export default App;
