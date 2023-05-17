import React,{useState,useEffect} from 'react'
import api from '@/pages/api/api.js'
import { useRouter } from 'next/router';
import { Container, Row, Col, Card ,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/ProductCard.module.css';
import {SelectedProduct} from '../store/slices/productslice.js';
import { RiCloseLine } from 'react-icons/ri';
import {FaTrash} from 'react-icons/fa'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

    useEffect(()=>{
        getMyProducts();
    },[userid])
   
    const handleCardClick=(product)=>{
       setSelectedProduct(product);
       dispatch(SelectedProduct(product))
        console.log(slectedProduct);
        setShowSelectedProduct(true);
    }
    const renderTooltip = (text) => (
      <Tooltip id="tooltip">
        {text}
      </Tooltip>
    );

    const deleteProduct=async(id)=>{
      console.log('item has been deleted');
      try{
        const response=await api.post('/product/remove',{"productId":id})
        if (response.data){
          console.log(response.data)
          toast.error(' Product deleted successfully', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });

            getMyProducts();
        }
      }catch(err){
        console.log(err)
      }
    }
    const handleDelete = (id) => {
      const confirmed = window.confirm('Do you want to remove this Item?');
      if(confirmed){
        deleteProduct(id);
      }
     
    };
  return (
       <Container>
   
     {
       (!showSelectedProduct)?(
            <Row xs={1} sm={2} md={3}>
        {products.map((product) => (
          <Col key={product._id} className={styles.productCard}>
            <Card  >
              <Card.Img variant="top" src={`https://ecommerceback-mklr.onrender.com/${product.image}`} className={styles.cardImage} 
              onClick={() => handleCardClick(product)}
              />
              <Card.Body>

                <Card.Title>{product.name}</Card.Title>
                
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <Card.Text style={{fontWeight:'bold'}}>Price:{product.price}</Card.Text>              
                
                    <OverlayTrigger placement="top" overlay={renderTooltip('Remove this Item')}>
                        <span className="icon-wrapper">
                          <FaTrash size={30} className={styles.deleteItem} onClick={()=>handleDelete(product._id)} />
                        </span>
                      </OverlayTrigger>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
       ):(
        
          <Col key={slectedProduct._id} className={styles.selectedProductCard}  xs={12} sm={9} md={9} >
            <Card >
              <div style={{display:'flex',justifyContent:"end"}}>
                <RiCloseLine onClick={()=>{setShowSelectedProduct(false)}} size={30}/>
              </div>
              
              <Card.Img variant="top" src={`https://ecommerceback-mklr.onrender.com/${slectedProduct.image}`} className={styles.selectedCardImage}/>
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
       <ToastContainer/>
    </Container>
  )}

export default myproduct
