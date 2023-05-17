import React from 'react';
import Navbar from './navbar.js'
import Link from 'next/link.js';
import styles from '../styles/Homepage.module.css';
import {Container,Row,Col }from 'react-bootstrap';
import { Image,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './footer.js';
function Homepage() {
  return (
    <Container className={styles.home} fluid>
    <Navbar/>
      {/* <Row >
        <Navbar/>
         <Image src='../image/m1.jpg'>
          
          
          </Image>  
      </Row> */}
        <div style={{ position: 'relative' }}>
       
        <Image src="../image/bg.png" alt="Image" style={{ width: '100%' }} />
     
      
        <div style={{ position: 'absolute', top: '40%', left: '10%' }}>
         <h3 style={{color:'white'}}>Buy the latest mobile phones</h3>
         <Button id={styles.btnid} className={styles.btn} onClick={() => {
            window.location.href = '/product';
          }}
          >Shop Now</Button>

          
         
        </div>
        <div style={{ position: 'absolute', top: '60%', left: '10%' }}>
         {/* <h3 style={{color:'white'}} >My orders</h3> */}
           <Row >
            <Col style={{display:'flex'}}>
             <Button
             id={styles.btnid} className={styles.btn} onClick={() => {
              window.location.href = '/order';
            }}
             >My Order</Button>
            </Col>
           
            </Row> 
        </div>
      
      </div>
      <Footer/>
    </Container>
  );
}

export default Homepage;
