import React,{useState,useEffect} from 'react'
import api from '@/pages/api/api.js'
import { useRouter } from 'next/router';
import { Container,Stack, Form, Row, Col, Card ,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/ProductCard.module.css';
import GoogleDialogBox from '@/component/diologuebox';

function index() {
    const [products,setProducts]=useState([])
    const [sortedProducts,setSortedProducts]=useState([])
    const [minPrice,setMinPrice]=useState()
    const [maxPrice,setMaxPrice]=useState()
    const [name,setName]=useState();
    const [brand,setBrand]=useState();
    const [showDiaogue,setShowDialogue]=useState(false);
    const [selectedPid,setSelectedPid]=useState('');
    const [sortBy, setSortBy] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
   const router=useRouter();

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
        router.push(`/product/selectedProduct?id=${product._id}`)
    }
    const buyNow=(product)=>{
       setSelectedPid(product._id);
       localStorage.setItem('slectedproductid', JSON.stringify(product._id));
      //  console.log(selectedPid);
      // router.push(`/product/buy?id=${product._id}`)
      setShowDialogue(true);

  }

  const handleClose=()=>{
    setShowDialogue(false);
  }
    const Search=()=>{

      getMyProducts(filterSearchData)
    }

    const handleSortChange = (event) => {
      setSortBy(event.target.value);
     
      if(event.target.value==='priceHighToLow'){
        const sortedProducts = [...products].sort((a, b) => b.price - a.price);
        console.log(sortedProducts);
        setSortedProducts(sortedProducts);
      }
      else if(event.target.value==='priceLowToHigh'){
        const sortedProducts = [...products].sort((a, b) => a.price - b.price);
        // setProducts(sortedProducts);
        setSortedProducts(sortedProducts)
      }
      else if(event.target.value==='ramHTL'){
        const sortedProducts = [...products].sort((a, b) => {
          const featureA = a.features.find(feature => feature.name.toLowerCase() === 'ram');
          const featureB = b.features.find(feature => feature.name.toLowerCase() === 'ram');
          
          if (featureA && featureB) {
            const storageA = parseInt(featureA.value.slice(0, -2));
            const storageB = parseInt(featureB.value.slice(0, -2));
            return storageB - storageA;
          }
          
          // Handle case where feature doesn't exist in one or both products
          
          return 0;
        });
        // setProducts(sortedProducts);
        setSortedProducts(sortedProducts);
      }
      
      else if(event.target.value==='cameraHTL'){
        const sortedProducts = [...products].sort((a, b) => {
          const featureA = a.features.find(feature => feature.name.toLowerCase() === 'camera');
          const featureB = b.features.find(feature => feature.name.toLowerCase() === 'camera');
          
          if (featureA && featureB) {
            const storageA = parseInt(featureA.value.slice(0, -2));
            const storageB = parseInt(featureB.value.slice(0, -2));
            return storageB - storageA;
          }
          
          // Handle case where feature doesn't exist in one or both products
          
          return 0;
        });
        // setProducts(sortedProducts);
        setSortedProducts(sortedProducts);
      }
      else if(event.target.value==='batteryHTL'){
        const sortedProducts = [...products].sort((a, b) => {
          const featureA = a.features.find(feature => feature.name.toLowerCase() === 'battery');
          const featureB = b.features.find(feature => feature.name.toLowerCase() === 'battery');
          
          if (featureA && featureB) {
            const storageA = parseInt(featureA.value.slice(0, -3));
            const storageB = parseInt(featureB.value.slice(0, -3));
            return storageB - storageA;
          }
          
          // Handle case where feature doesn't exist in one or both products
          
          return 0;
        });
        // setProducts(sortedProducts);
        setSortedProducts(sortedProducts);
      }
      else if(event.target.value==='storageHTL')  {
        const sortedProducts = [...products].sort((a, b) => {
          const featureA = a.features.find(feature => feature.name.toLowerCase() === 'storage');
          const featureB = b.features.find(feature => feature.name.toLowerCase() === 'storage');
          
          if (featureA && featureB) {
            const storageA = parseInt(featureA.value.slice(0, -2));
            const storageB = parseInt(featureB.value.slice(0, -2));
            return storageB - storageA;
          }
          
          // Handle case where feature doesn't exist in one or both products
          
          return 0;
        });
        // setProducts(sortedProducts);
        setSortedProducts(sortedProducts);
      }
    };
  
    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };

  return (
       <Container fluid >
        <Stack>
       <Row className={styles.filterBar}>
       <Form>
       <Row xs={1} sm={2} md={3} >
       <Col style={{marginBottom:'5px'}}>
          <Form.Control 
          value={name}
          onChange={(e)=>setName(e.target.value) }
          placeholder="get by name"
           />
        </Col>
        
        <Col style={{marginBottom:'5px'}}>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <Form.Control 
          value={minPrice}
          onChange={(e)=>setMinPrice(e.target.value) }
          placeholder="price from"
          
           />
          
           <Form.Control
          value={maxPrice}
          onChange={(e)=>setMaxPrice(e.target.value)}
          placeholder="price to "
          style={{marginLeft:'5px'}}
          />
          <Button onClick={Search} style={{marginLeft:'5px'}}>Search</Button>
          </div>
        </Col>
        
        <Col>
        <div style={{ position: 'relative' }}>
      <Button onClick={toggleDropdown}>Sort By</Button>
      {showDropdown && (
        <div
          style={{
            position: 'absolute',
            top: '2%',
            left: 90,
            zIndex: 1,
            backgroundColor: '#fff',
            padding: '10px',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* <label htmlFor="sort-select">Sort By:</label> */}
          <select id="sort-select" value={sortBy} onChange={handleSortChange}>
            <option value="">Select an option</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="ramHTL">RAM</option>
            <option value="cameraHTL">Camera</option>
            <option value="batteryHTL">Battery</option>
            <option value="storageHTL">Storage</option>
          </select>
        </div>
      )}
      {/* Display the product list */}
    </div>

        </Col>
         

      </Row>
    </Form>
   

       </Row>
       <Row>
         <h2>Available products</h2>
         <hr/>
            <Row xs={1} sm={2} md={3}>
        {(sortedProducts.length>0)?(sortedProducts.map((product) => (
          <Col key={product._id} className={styles.productCard}>
            <Card  >
              <Card.Img 
              variant="top"
               src={`http://localhost:8080/${product.image}`} 
               className={styles.cardImage}
               onClick={() => handleCardClick(product)}
               />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text style={{fontWeight:'bold'}}>Rs.{product.price}</Card.Text>
                <Button onClick={()=>buyNow(product)} >Buy Now</Button>
              </Card.Body>
              
            </Card>
            {/* <Button onClick={()=>buyNow(product)} >Buy Now</Button> */}
          </Col>
        ))):(
          products.map((product) => (
            <Col key={product._id} className={styles.productCard}>
              <Card  >
                <Card.Img 
                variant="top"
                 src={`http://localhost:8080/${product.image}`} 
                 className={styles.cardImage}
                 onClick={() => handleCardClick(product)}
                 />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text style={{fontWeight:'bold'}}>Rs.{product.price}</Card.Text>
                  <Button onClick={()=>buyNow(product)} >Buy Now</Button>
                </Card.Body>
                
              </Card>
              {/* <Button onClick={()=>buyNow(product)} >Buy Now</Button> */}
            </Col>
          ))
        )
      }
      </Row>
       </Row>
       </Stack>
       <GoogleDialogBox isOpen={showDiaogue} onClose={handleClose} />
    </Container>
  )}

export default index
