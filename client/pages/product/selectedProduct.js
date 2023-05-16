
import api from '@/pages/api/api.js'
import { useRouter } from 'next/router';
import { Container,Stack, Form, Row, Col, Card ,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/ProductCard.module.css';
import { RiCloseLine } from 'react-icons/ri';
import {FaUserCircle} from 'react-icons/fa'
import { useState } from 'react';

function SelectedProduct({ product,productReview }) {
    // console.log(productReview)
    const reviews=productReview=!null?productReview:null;
    // console.log('revi');
    // console.log(reviews)
    const router=useRouter();
  const { id } = router.query;
  
  const [showReview,setShowReview]=useState(false);
  const [review,setReview]=useState(reviews);

  const handleClose=()=>{
    router.push('/product');
  }

  return (
    <Container >
        <Row style={{justifyItems:'center',justifyContent:'center',alignItems:'center'}}>
        <Col key={product._id} className={styles.selectedProductCard}  xs={12} sm={9} md={9} >
            <Card >
              <div style={{display:'flex',justifyContent:"end"}}>
                {/* <Button onClick={()=>handleClose()} >Close</Button> */}
                <RiCloseLine onClick={()=>handleClose()} size={30}/>
              </div>
              
              <Card.Img variant="top" src={`http://localhost:8080/${product.image}`} className={styles.selectedCardImage}/>
              <hr/>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
               
                <h5>Price:{product.price}</h5>
                <h5>Brand:{product.brand}</h5>
                <hr/>
                <h6>Description:{product.description}</h6>
                <hr/>
                {product.features.map((feature) => (
  <div key={feature._id}>
    <p>{feature.name}: {feature.value}</p>
  </div>
))}
             <hr/>
             <p className={styles.reviewbtn} onClick={()=>setShowReview(true)}>Show Review</p> 
             {
              showReview&&(
              <Container>
                 <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <RiCloseLine size={25} onClick={()=>setShowReview(false)} />
                 </div>
                 <h5>Customer's Review</h5>
             <Card style={{ overflowY: 'scroll', maxHeight: '250px' }}>
              <Card.Body>
                {
                  
                  review?(
                    review.map((review)=>{
                      return(
                      <div key={review._id}
                       style={{
                        border:'2px solid grey',
                        borderRadius:'10px',
                        marginTop:'10px',
                        padding:'10px'
                        }}>
                       <div style={{display:'flex'}}>
                          <FaUserCircle size={25}/>
                          <p style={{color:'blue',marginLeft:'10px'}}>{review.customerId.name}</p>
                        </div>
                        <p>{review.comment}</p>
                        
                      </div>
                       
                      )
                    })
                  ):(
                    <p>No reviews found for this item</p>
                  )
                }
              </Card.Body>
             </Card>
             </Container>
               )
              } 
              </Card.Body>
            </Card>
          </Col>
         </Row>
        </Container>
  )
}

export async function getServerSideProps({ query }) {
    const id = query.id;
  
    const response = await api.post(`product/getproductbyid`, {
      productId: id
    });
  
    const respo = await api.post(`review/getreview`, {
      productId: id
    });
    // console.log('respo')
    // console.log(respo.data.length)
    // console.log(respo.data[0].review.length)
    return {
      props: {
        product: response.data,
        productReview:respo.data.length>0?respo.data[0].review:null,
        revalidate: 1
      }
    }
  }
  
  

export default SelectedProduct;

