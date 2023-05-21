import React,{useState,useEffect} from 'react'
import api from '@/pages/api/api.js'
import { useRouter } from 'next/router';
import { Container,Table, Row, Col, Card ,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/ProductCard.module.css';
import {SelectedProduct} from '../store/slices/productslice.js';
import jsPDF from 'jspdf';

import { useDispatch } from 'react-redux'

function myproduct() {
    const [orders,setOrders]=useState([])
    const[selectedOrder,setSelectedOrder]=useState(null);
    const[showSelectedOrder,setShowSelectedOrder]=useState(false);
    const router=useRouter();
    const dispatch=useDispatch();
    const { userid } = router.query
    console.log(userid);

    const getMyOrders=async ()=>{
    try {
      const response = await api.post(`order/get`,
      {
        userId:userid
      },
      {
        headers: {
         token: JSON.parse(localStorage.getItem("token")),               
        },
      });
        // console.log(response.data);
        setOrders(response.data);
        // console.log(orders);
      } catch (error) {
        // Handle error
        console.log(error)
        router.push('/');
      }
    }

    useEffect(()=>{
        getMyOrders();
    },[showSelectedOrder])
   
    const selectOrder=(order)=>{
       setSelectedOrder(order);  
        // console.log(selectedOrder);
        setShowSelectedOrder(true);
    }


function downloadPDF(selectedOrder) {
  // create a new jsPDF instance
  const doc = new jsPDF();

  doc.setFontSize(12);
  // add content to the document
  doc.text(`Order ID: ${selectedOrder._id}`, 15, 5);
  doc.text(`Customer Name: ${selectedOrder.customerName}`, 15, 10);
  doc.text(`Customer Contact: ${selectedOrder.customerContact}`, 15, 15);
  doc.text(`Address:${selectedOrder.shippingAddress.address.split(", ").slice(0,5).join(", ")}`,15,20)
  doc.text(`Order Name: ${selectedOrder.orderItems.product.name}`, 15, 25);
  doc.text(`Brand: ${selectedOrder.orderItems.product.brand}`, 15, 30);
  doc.text(`Price: ${selectedOrder.orderItems.price}`, 15, 35);
  doc.text(`Shipping Fee: ${selectedOrder.shippingPrice}`, 15, 40); 
  doc.text(`Total payment: ${selectedOrder.totalPrice}`, 15, 45);
  doc.text(`Payment Method: ${selectedOrder.paymentMethod}`, 15, 50);
  doc.text(`Ordered Date: ${new Date(selectedOrder.updatedAt).toLocaleDateString()}`, 15, 55);

  // save the document
  doc.save(`${selectedOrder.customerName}_order.pdf`);
  setShowSelectedOrder(false);
}


    const handleDeliver = async() => {
      const confirmed = window.confirm('Are you sure you want to mark this order as delivered?');
      if (confirmed) {
        // Call the API endpoint to update the order status
        try {
            const response = await api.put(`order/mkdelivertrue`,
            {
              orderId:selectedOrder._id
            },
            {
              headers: {
               token: JSON.parse(localStorage.getItem("token")),               
              },
            });
              // console.log(response.data);
              if(response){
             setShowSelectedOrder(false);
              }
            } catch (error) {
              // Handle error
              console.log(error)
            }
      }
    }

  return (
    <Container fluid >
      <h3>Your Items to Deliver </h3>
        <p>Please deliver your order as soon as possible</p>
    <div style={{ overflowX: 'scroll', maxHeight: '400px' }}>
        
    <Table bordered hover sticky="top">  
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Brand</th>
          <th>Price</th>
          <th>Customer Name</th>
          <th>Contact</th>
          <th>Address</th>
          {/* <th>Date</th> */}
        </tr>
      </thead>
      <tbody style={{ overflowY: 'scroll', maxHeight: '400px' }}>
        {orders.map((order) => (
            
            !order.isDelivered&&(
          <tr key={order._id}>
            <td onClick={()=>selectOrder(order)} style={{cursor:'pointer'}}>{order._id}</td>
            <td>{order.orderItems.product.name}</td>
            <td>{order.orderItems.product.brand}</td>
            <td>{order.orderItems.price}</td>
            <td>{order.customerName}</td>
            <td>{order.customerContact}</td>
            <td>{order.shippingAddress.address.split(", ").slice(0, 3).join(", ")}</td>      
          </tr>
            )
        ))}
      </tbody>
    </Table>
  </div>
  {
    showSelectedOrder&&(
       <Container style={{marginTop:'10px',marginBottom:'15px'}}>
        <Row>
        <Table bordered>
      <tbody>
        
          <tr>
            <td>OrderId</td>
            <td>{selectedOrder._id}</td>
          </tr>
          <tr>
            <td>Customer Name</td>
            <td>{selectedOrder.customerName}</td>
          </tr>
          <tr>
            <td>Customer Contact</td>
            <td>{selectedOrder.customerContact}</td>
          </tr> 
          <tr>
            <td>Customer Address</td>
            <td>{selectedOrder.shippingAddress.address}</td>
          </tr> 
          <tr>
            <td>Order Name</td>
            <td>{selectedOrder.orderItems.product.name}</td>
          </tr>
          <tr>
            <td>Brand</td>
            <td>{selectedOrder.orderItems.product.brand}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>{selectedOrder.orderItems.price}</td>
          </tr>
          <tr>
            <td>Shipping Fee</td>
            <td>{selectedOrder.shippingPrice}</td>
          </tr>
          <tr>
            <td>Total Payment</td>
            <td>{selectedOrder.totalPrice}</td>
          </tr>
          <tr>
            <td>Payment Method</td>
            <td>{selectedOrder.paymentMethod}</td>
          </tr>
          <tr>
            <td>Order Date</td>
            <td>{new Date(selectedOrder.updatedAt).toLocaleDateString()}</td>

          </tr>
          {/* <tr>
            <td>Customer Address</td>
            <td>{selectOrder.shippingAddress.address}</td>
          </tr> */}
      
      </tbody>
    </Table>

    <div style={{display:'flex',justifyContent:'space-between'}}>
    <Button onClick={() => downloadPDF(selectedOrder)}>Download PDF</Button>
    <Button onClick={handleDeliver}>Deliver</Button>
    <Button onClick={()=>setShowSelectedOrder(false)}>Close</Button>
    </div>

        </Row>
        </Container>
    )
  }
  </Container>
  )}

export default myproduct
