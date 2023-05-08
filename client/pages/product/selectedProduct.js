
import api from '@/pages/api/api.js'
import { useRouter } from 'next/router';
import { Container,Stack, Form, Row, Col, Card ,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/ProductCard.module.css';

function SelectedProduct({ product }) {
    const router=useRouter();
  const { id } = router.query;

  const handleClose=()=>{
    router.push('/product');
  }

  return (
    <Container>
        <Row>
        <Col key={product._id} className={styles.selectedProductCard}  xs={12} sm={9} md={9} >
            <Card >
              <div style={{display:'flex',justifyContent:"end"}}>
                <Button onClick={()=>handleClose()} >Close</Button>
              </div>
              
              <Card.Img variant="top" src={`http://localhost:8080/${product.image}`} className={styles.selectedCardImage}/>
              <hr/>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
               
                <h5>Price:{product.price}</h5>
                <h5>Brand:{product.brand}</h5>
                <hr/>
                <h7>Description:{product.description}</h7>
                <hr/>
                {product.features.map((feature) => (
  <div key={feature._id}>
    <p>{feature.name}: {feature.value}</p>
  </div>
))}
               
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
  
    return {
      props: {
        product: response.data,
        revalidate: 1
      }
    }
  }
  
  

export default SelectedProduct;

