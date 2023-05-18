import React, { useState, useEffect } from 'react';
import api from '../../pages/api/api.js';
import { useRouter } from 'next/router';
import { Container,Row,Col,Card,Button,Form } from 'react-bootstrap';
import styles from '../../styles/ProductCard.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RatingStars from '@/component/rating.js';

export default function Index() {
  const [product, setProduct] = useState(null);
  const [comment,setComment]=useState('');
  const [star,setStar]=useState(0);
  const router = useRouter();
  const { query } = router;

  const productId = query.productid; // Corrected query parameter key to lowercase
  const customerId=query.customerid;

useEffect(() => {
    if (productId) {
        console.log(productId)
        console.log(customerId)

      const getProduct = async () => {
        try {
          const response = await api.post('/product/getproductbyid', { productId });
          console.log(response.data)
          if (response.data) {
            setProduct(response.data);
          }
        } catch (err) {
          console.log(err);
        }
      };

      getProduct();
    }
  }, [productId]);

  const handleRatingSelect = (rating) => {
    // console.log('Selected Rating:', rating);
    // Do something with the selected rating value
    setStar(rating)
  
  };

  const handleSubmit=async()=>{
    console.log(star);
    console.log(comment);

    let data={
        "customerId":customerId,
        "productId": productId,
         "rating": star,
         "comment": comment
    }

    try{
        const response=await api.post('/review/add',data);
        console.log(response.data);
        if(response){
            router.push('/')
        }
    }catch(err){
        console.log(err);
    }

  }

  return (
    <Container style={{margin:'10px'}}>
        
        {
            product&&(
                <Row key={product._id} 
                className="justify-content-center"  >
                    <Col xs={12} sm={10} md={9} lg={6}>

            <Card style={{marginTop:'10px'}}>
                <div className="d-flex flex-column align-items-center">
                      <h3 className="product-reviews-heading" >Rating and Reviews</h3>
                    
                </div>
               
          <hr/>
               <Card.Body>
              <Row>
                <Col>
                  <Card.Body></Card.Body>
                  <Card.Img 
                  variant="top" src={`${process.env.BACKEND_API}/${product.image}`}
                   className={styles.selectedCardImage}
                   style={{ width: '200px', height: '200px' }}
                   />
              
                </Col>
                <Col>
                <div style={{marginTop:'25px'}}>
                <Card.Title>{product.name}</Card.Title>
                <h5>Price:{product.price}</h5>
                <h5>Brand:{product.brand}</h5>
                <h6>Rate this</h6>
                <RatingStars totalStars={5} onSelect={handleRatingSelect} />
                </div>
               
                </Col>
              </Row>
               <hr/>
               <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Comment</Form.Label>
        {/* <Form.Control
          type="text"
          placeholder="Leave a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        /> */}
        <br/>
          <textarea
        id="message"
        name="message"
        rows={3} // Specify the number of rows
        cols={20} // Specify the number of columns
        style={{ width: '80%', height: '70px' }} // Apply custom width and height
        type="text"
        placeholder="Leave a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      </Form.Group>

      </Form>
              <Button onClick={()=>handleSubmit()} style={{margin:'10px'}} >Submit</Button>
              </Card.Body>
            </Card>
            </Col>
          </Row>
            )
        }
      
    </Container>
  );
}
