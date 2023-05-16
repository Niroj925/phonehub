import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../api/api.js';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import styles from '../../styles/ProductCard.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Success() {
  const [order, setOrder] = useState({});
  const router = useRouter();
  const { oid } = router.query;

  const getOrder = async () => {
    try {
      const response = await api.post('/order/myorder', { orderId: oid });
      setOrder(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrder();
  }, [oid]);

  const handleConfirmOrder = async() => {
    // Handle confirm order logic
    console.log('Confirm order clicked');
    try{
      const response=await api.post('/order/makepayment',{"orderId":oid});
      console.log(response.data);

      if(response.data){
        console.log(response.data);
      
        toast.success(`Payment success `, {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });

            setTimeout(() => {
              router.push('/');
            }, 4000)
      }
      
    }catch(err){
   console.log(err);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Col xs={12} sm={9} md={9} lg={6}>
          <Card>
          <div style={{display:'flex', justifyContent:'center',alignItems:'center' }}>
            <Card.Img
              variant="top"
              src={`https://ecommerceback-mklr.onrender.com/${order.orderItems?.product.image}`}
              className={styles.selectedCardImage}
              style={{
                height: '200px',
                width: '200px'
              }}
            />
            </div>
            <hr />
            <div style={{display:'flex', justifyContent:'center',alignItems:'center' }}>
              <h3 >Order Details</h3>
            </div>
            
            <hr/>
            <Card.Body>
              <Card.Title>{order.orderItems?.product.name}</Card.Title>
              <h6>Order ID: {order._id}</h6>
              <h6>Price: {order.itemsPrice}</h6>
              <h6>Customer Name: {order.customerName}</h6>
              <h6>Address:{order.shippingAddress?.address.split(", ").slice(0,5).join(", ")}</h6>
              <Button variant="primary" onClick={handleConfirmOrder} style={{ marginTop: '20px' }}>
                Confirm Order
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer/>
    </Container>
  );
}

export default Success;
