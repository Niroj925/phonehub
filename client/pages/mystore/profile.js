import React, { useState } from 'react';
import AddProduct from '../../component/addproduct.js';
import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link.js';

function Profile() {
  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleAddProductClick = () => {
    setShowAddProduct(true);
    console.log(showAddProduct)
  };

  const handleCloseAddProduct = () => {
    setShowAddProduct(false);
    console.log(showAddProduct)
  };

  return (
    <div>
         <Navbar bg="light" expand="lg">
      <Navbar.Brand to="/">My Store</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link to="/myproducts">My Products</Nav.Link>
          <Nav.Link to="/addproduct">Add Product</Nav.Link>
          <Nav.Link  to="/orders">Orders</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Button variant="outline-primary">Log Out</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

      <Button onClick={handleAddProductClick}>Add Product</Button>
      {
        showAddProduct&&
        (
            <>
              <Button onClick={handleCloseAddProduct}>close</Button>
            <AddProduct isOpen={showAddProduct} /> 
            </>
          
        )
        
      }
             
     
    </div>
  );
}

export default Profile;