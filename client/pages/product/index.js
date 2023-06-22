
import React,{useState,useEffect} from 'react'
import api from '@/pages/api/api.js'
import { useRouter } from 'next/router';
import { Container,Stack, Form, Row, Col, Card ,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/ProductCard.module.css';
import GoogleDialogBox from '@/component/diologuebox';
import { FaHome } from 'react-icons/fa';
import { RiCloseLine } from 'react-icons/ri';
import RatingStars from '@/component/ratedStar';
import { setProduct } from '@/features/slices/productSlice';
import { useDispatch ,useSelector} from 'react-redux';

function index() {
    const [products,setProducts]=useState(null);
    const [sortedProducts,setSortedProducts]=useState([])
    const [productsReview,setProductsReview]=useState([])
    const [minPrice,setMinPrice]=useState()
    const [maxPrice,setMaxPrice]=useState()
    const [name,setName]=useState();
    const [brand,setBrand]=useState();
    const [showDiaogue,setShowDialogue]=useState(false);
    const [selectedPid,setSelectedPid]=useState('');
    const [sortBy, setSortBy] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
  

    const dispatch=useDispatch();
 
    const product=useSelector((state)=>state.product.products);
    console.log('redux product:',product);

   const router=useRouter();

      const filterSearchData={
              name:name,
              brand:brand,
              priceMin:minPrice,
              priceMax:maxPrice
      }
      
      const ratingsByProductId = {};

      
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
        
        setProducts(response.data);
       dispatch(setProduct(response.data));
      } catch (error) {
        // Handle error
        console.log(error)
        router.push('/');
      }
    }

    const getProductsReview=async ()=>{
     
      try {
        const response = await api.post("review/get");
    
          setProductsReview(response.data);
         
        } catch (error) {
          // Handle error
          console.log(error)
          router.push('/');
        }
      }

    useEffect(()=>{
        getMyProducts(filterSearchData);
        getProductsReview(); 
      
    },[])
   
    const handleCardClick=(product)=>{
        router.push(`/product/selectedProduct?id=${product._id}`)
    }
    const buyNow=(product)=>{
       setSelectedPid(product._id);
       localStorage.setItem('slectedproductid', JSON.stringify(product._id));
      
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

    const gotoHome=()=>{
      router.push('/')
    }

// Function to calculate average rating
// const calculateAverageRating = (reviews) => {
//   console.log('review:'+reviews)
//   if (reviews.length === 0) {
//     return 0;
//   }

//   const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
//   const averageRating = totalRating /4;
//   return averageRating.toFixed(2);
// };


  return (
       <Container fluid >
        <Stack>
       <Row className={styles.filterBar} >
       
       <Form>
       <Row xs={1} sm={2} md={3} >
        <Col xs={1} sm={1} md={1} style={{marginRight:'20px'}} >
        <FaHome size={30} onClick={()=>gotoHome()} style={{color:'blue',cursor:'pointer'}}/>
        </Col>
        
       <Col style={{marginBottom:'5px'}} xs={8} sm={6} md={6} lg={3} >
         
          <Form.Control 
          value={name}
          onChange={(e)=>setName(e.target.value) }
          placeholder="get by name"
           />
        </Col>
        
        <Col style={{marginBottom:'5px',marginLeft:'50px'}} xs={11} sm={8} md={6} lg={4} >
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
        
        <Col style={{marginBottom:'5px'}} className={styles.sortbtn} xs={4} sm={3} md={3} lg={2}>
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
            {

              (products)?(

            <Row xs={1} sm={2} md={3}>
        {(sortedProducts.length>0)?(sortedProducts.map((product) => {

         
productsReview.forEach(review => {
  const { productId, review: reviewList } = review;

  if (productId === product._id) {
    let averageRating = 0;

    for (let i = 0; i < reviewList.length; i++) {
      const { rating } = reviewList[i];
      averageRating += rating;
    }

    averageRating /= reviewList.length;

    ratingsByProductId[productId] = averageRating;
  }
});
       
          
          return(
          <Col key={product._id} className={styles.productCard}>
            <Card  >
              <Card.Img 
              variant="top"
               src={`${process.env.BACKEND_API}/${product.image}`} 
               className={styles.cardImage}
               onClick={() => handleCardClick(product)}
               />
                 
              <Card.Body>
              {product._id && ratingsByProductId.hasOwnProperty(product._id) && (
                      <div style={{display:'flex' ,direction:'row'}}>
                        <RatingStars totalStars={Math.round(ratingsByProductId[product._id])} />
                    
                        
                      </div>
                    )}
                <Card.Title>{product.name}</Card.Title>
                <Card.Text style={{fontWeight:'bold'}}>Rs.{product.price}</Card.Text>
                <Button onClick={()=>buyNow(product)} >Buy Now</Button>
              </Card.Body>
              
            </Card>
          
          </Col>
          )}
        )
        ):(
          products.map((product) => {
        //     console.log('review of products');
        // console.log(productsReview)

        productsReview.forEach(review => {
          const { productId, review: reviewList } = review;
        
          if (productId === product._id) {
            let averageRating = 0;
        
            for (let i = 0; i < reviewList.length; i++) {
              const { rating } = reviewList[i];
              averageRating += rating;
            }
        
            averageRating /= reviewList.length;
        
            ratingsByProductId[productId] = averageRating;
          }
        });
        
        // console.log('Ratings by Product ID:', ratingsByProductId);
        

            return(
            <Col key={product._id} className={styles.productCard}>
              <Card  >
                <Card.Img 
                variant="top"
                 src={`${process.env.BACKEND_API}/${product.image}`} 
                 className={styles.cardImage}
                 onClick={() => handleCardClick(product)}
                 />
                <Card.Body>
                {product._id && ratingsByProductId.hasOwnProperty(product._id) && (
                      <div style={{display:'flex' ,direction:'row'}}>
                        <RatingStars totalStars={Math.round(ratingsByProductId[product._id])} />
                        {/* <Card.Text>
                           {ratingsByProductId[product._id]}
                        </Card.Text> */}
                        
                      </div>
                    )}
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text style={{fontWeight:'bold'}}>Rs.{product.price}</Card.Text>
                  <Button onClick={()=>buyNow(product)} >Buy Now</Button>
                </Card.Body>
                
              </Card>
              {/* <Button onClick={()=>buyNow(product)} >Buy Now</Button> */}
            </Col>
            )}
            )
        )
      }
      </Row>
        ):(
          <h3>Loading....</h3>
        )
      }

       </Row>
       </Stack>
       <GoogleDialogBox isOpen={showDiaogue} onClose={handleClose} />
    </Container>
  )}  

export default index
