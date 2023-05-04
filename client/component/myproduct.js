import React,{useState,useEffect} from 'react'
import api from '@/pages/api/api.js'
import { useRouter } from 'next/router';
import { Container, Row, Col, Card ,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/ProductCard.module.css';
import {SelectedProduct} from '../store/slices/productslice.js';
// import { SelectProduct } from '../store/slices/productslice.js';

import { useDispatch } from 'react-redux'

function myproduct() {
    const [products,setProducts]=useState([])
    const[slectedProduct,setSelectedProduct]=useState(null);
    const[showSelectedProduct,setShowSelectedProduct]=useState(false);
    const router=useRouter();
    const dispatch=useDispatch();
    const { userid } = router.query
    console.log(userid);

    useEffect(()=>{
    const getMyProducts=async ()=>{
    try {
      const response = await api.get(`user/getproduct/${userid}`, {
        headers: {
         token: JSON.parse(localStorage.getItem("token")),               
        },
      });
        console.log(response.data);
        setProducts(response.data);
        console.log(products);
      } catch (error) {
        // Handle error
        console.log(error)
        router.push('/');
      }
    }
        getMyProducts();
    },[userid])
   
    const handleCardClick=(product)=>{
       setSelectedProduct(product);
       dispatch(SelectedProduct(product))
        console.log(slectedProduct);
        setShowSelectedProduct(true);
    }
  return (
       <Container>
     {
       (!showSelectedProduct)?(
            <Row xs={1} sm={2} md={3}>
        {products.map((product) => (
          <Col key={product._id} className={styles.productCard}>
            <Card onClick={() => handleCardClick(product)} >
              <Card.Img variant="top" src={`http://localhost:8080/${product.image}`} className={styles.cardImage} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text style={{fontWeight:'bold'}}>Price:{product.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
       ):(
        
          <Col key={slectedProduct._id} className={styles.selectedProductCard}  xs={12} sm={9} md={9} >
            <Card >
              <div style={{display:'flex',justifyContent:"end"}}>
                <Button onClick={()=>{setShowSelectedProduct(false)}} >Close</Button>
              </div>
              
              <Card.Img variant="top" src={`http://localhost:8080/${slectedProduct.image}`} className={styles.selectedCardImage}/>
              <hr/>
              <Card.Body>
                <Card.Title>{slectedProduct.name}</Card.Title>
               
                <h5>Price:{slectedProduct.price}</h5>
                <h5>Brand:{slectedProduct.brand}</h5>
                <hr/>
                <h6>Description:{slectedProduct.description}</h6>
                <hr/>
                {slectedProduct.features.map((feature) => (
  <div key={feature._id}>
    <p>{feature.name}: {feature.value}</p>
  </div>
))}
               
              </Card.Body>
            </Card>
          </Col>
         
        )
       }
    </Container>
  )}

export default myproduct
