import React,{useState,useEffect} from 'react'
import api from '@/pages/api/api.js'
import { useRouter } from 'next/router';
import { Container,Stack, Form, Row, Col, Card ,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/ProductCard.module.css';

function index() {
    const [products,setProducts]=useState([])
    const[slectedProduct,setSelectedProduct]=useState(null);
    const[showSelectedProduct,setShowSelectedProduct]=useState(false);
    const [minPrice,setMinPrice]=useState()
    const [maxPrice,setMaxPrice]=useState()
    const [name,setName]=useState();
    const [brand,setBrand]=useState();
  
    // const { userid } = router.query
    // console.log(userid);
   const router=useRouter();
 // {name, brand, priceMin, priceMax, features } 
      const filterSearchData={
              name:name,
              brand:brand,
              priceMin:minPrice,
              priceMax:maxPrice
      }
    const getMyProducts=async (filterSearchData)=>{
     
    try {
      const response = await api.post(
        "product/getfilterproduct",
        filterSearchData,
        {
          headers: {
            token: JSON.parse(localStorage.getItem("token"))
          }
        }
      );
        console.log(response.data);
        setProducts(response.data);
        console.log(products);
      } catch (error) {
        // Handle error
        console.log(error)
        router.push('/');
      }
    }

    useEffect(()=>{
        getMyProducts(filterSearchData);
    },[])
   
    const handleCardClick=(product)=>{
       setSelectedProduct(product);
        console.log(slectedProduct);
        setShowSelectedProduct(true);
    }

    const Search=()=>{

      getMyProducts(filterSearchData)
    }

    const LowToHigh=()=>{
      // getMyProducts(filterSearchData)
      const sortedProducts = [...products].sort((a, b) => a.price - b.price);
      setProducts(sortedProducts);
    }

    const HighToLow=()=>{
      // getMyProducts(filterSearchData)
      const sortedProducts = [...products].sort((a, b) => b.price - a.price);
      setProducts(sortedProducts);
    }
  return (
       <Container fluid >
        <Stack>
       <Row className={styles.filterBar}>
       <Form>
       <Row xs={1} sm={2} md={3}>
       <Col style={{marginBottom:'5px'}}>
          <Form.Control 
          value={name}
          onChange={(e)=>setName(e.target.value) }
          placeholder="get by name"
           />
        </Col>
        
        <Col>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <Form.Control 
          value={minPrice}
          onChange={(e)=>setMinPrice(e.target.value) }
          placeholder="price from"
           />
          
           <Form.Control
          value={maxPrice}
          onChange={(e)=>setMaxPrice(e.target.value)}
          placeholder="price to " />
          <Button onClick={Search}>Submit</Button>
          </div>
        </Col>
        {/* <Col>
          <Form.Control
          value={maxPrice}
          onChange={(e)=>setMaxPrice(e.target.value)}
          placeholder="price to " />
        </Col> */}
        {/* <Col>
        <Button onClick={Search}>Submit</Button>
        </Col> */}
        <Col>
        <Button onClick={LowToHigh}>Lower To Higher</Button>
        </Col>
        <Col>
        <Button onClick={HighToLow}> Higher To Lower</Button>
        </Col>
      </Row>
    </Form>
   

       </Row>
       <Row>
         <h2>Available products</h2>
         <hr/>
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
                <Button >Buy Now</Button>
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
                <h7>Description:{slectedProduct.description}</h7>
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
       </Row>
       </Stack>
    </Container>
  )}

export default index
