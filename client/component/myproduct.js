import React,{useState,useEffect} from 'react'
import api from '@/pages/api/api.js'
import { useRouter } from 'next/router';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function myproduct() {
    const [products,setProducts]=useState([])

    const router=useRouter();
  
    const { userid } = router.query
    console.log(userid);

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
      }
    }

    useEffect(()=>{
        getMyProducts();
    },[userid])

  return (
       <Container>
      <Row xs={1} sm={2} md={3}>
        {products.map((product) => (
          <Col key={product._id}>
            <Card>
              <Card.Img variant="top" src={`http://localhost:8080/${product.image}`} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    
  )
}

export default myproduct
