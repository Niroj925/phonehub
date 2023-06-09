import React from 'react';
import Navbar from './navbar.js'
import Link from 'next/link.js';
import styles from '../styles/Homepage.module.css';
import {Container,Row,Col }from 'react-bootstrap';
import { Image,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './footer.js';
import { useSelector } from 'react-redux';

function Homepage() {

  // const products=useSelector((state)=>state.productReducer.value);

  // if(products){
  //   console.log(products);
  // }

  return (
    <Container className={styles.home} fluid>
      <Row >
        <Row style={{marginTop:'10px',marginLeft:'3px'}}>
          <Navbar/>
        </Row>
        
      </Row>
       <Row>
        <div style={{ position: 'relative' }}>
        <h1 className={styles.title}>Buy the latest mobile phones</h1>
        <div style={{height:'auto'}}>
        <Image src="../image/bgmob.gif" alt="Image"  className={styles.bgImage} />
        </div>
          
        

        <div style={{ position: 'absolute', top: '30%', left: '10%' }}>
         {/*  */}
         <Button id={styles.btnid} className={styles.btn} onClick={() => {
            window.location.href = '/product';
          }}
          >Shop Now</Button>

          
         
        </div>
        <br/>
        <div className={styles.myorder}>
        <Button
             id={styles.btnid} className={styles.btn} onClick={() => {
              window.location.href = '/order';
            }}
             >My Order</Button>
         
         {/* <h3 style={{color:'black'}} >My orders</h3> 
            <Row >
            <Col style={{display:'flex'}}>
             <Button
             id={styles.btnid} className={styles.btn} onClick={() => {
              window.location.href = '/order';
            }}
             >My Order</Button>
            </Col>
           
            </Row>  */}
        </div>
      
      </div>
      </Row>
      <Row>
        <Row style={{marginBottom:'10px',marginLeft:'3px'}}>
           <Footer/>
        </Row>
      </Row>
      
    </Container>
  );
}

export default Homepage;
