import React ,{useState,useEffect} from 'react'
import api from '@/pages/api/api.js'
import { useRouter } from 'next/router';
import { Container,Stack, Form, Row, Col, Card ,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/ProductCard.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
// import Map from '../../component/map.js';
import dynamic from 'next/dynamic';

const Map=dynamic(()=>import('../../component/map'))

function SelectedProduct({customer }) {
   
    // console.log(customer)
    const [product, setProduct] = useState({});
const [formData, setFormData] = useState({});

const router = useRouter();
const { userid } = router.query;

useEffect(() => {
  async function getProduct() {
    const productId = JSON.parse(localStorage.getItem('slectedproductid'));
    console.log("productid:", productId);
    const productResponse = await api.post(`product/getproductbyid`, {
      productId: productId
    });
    setProduct(productResponse.data);

    setFormData({
      user: productResponse.data.user,
      customerId: userid,
      customerEmail: customer.email,
      customerName: customer.name,
      customerContact: '',
      orderItems: {
        product: productResponse.data._id,
        quantity: '1',
        price: productResponse.data.price
      },
      shippingAddress: {
        address: 'ktm',
        location: {
          lon: '',
          lat: ''
        },
        city: 'kathmandu',
        postalCode: '1010',
        country: 'Nepal'
      },
      paymentMethod: 'Cash on Delivery',
      itemsPrice: productResponse.data.price,
      taxPrice: 0,
      shippingPrice: 50,
      totalPrice: productResponse.data.price + 50
    });
  }
  getProduct();
}, [])

useEffect(() => {
  console.log(product);

}, [product]);

 

  const handleClose=()=>{
    router.push('/product');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API request with formData
    console.log(formData);

    try {
        const response = await api.post(
          "order/add",
          formData,
        );
          console.log(response.data);
          if(response.data){
            toast.success(`Thank You ${customer.name}, for Purchasing this item `, {
                position: "bottom-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });

                setTimeout(() => {
                  router.push('/');
                }, 4000)
          }
        } catch (error) {
          // Handle error
          console.log(error)
          toast.error('Your order can not  placed', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            
          router.push('/product');
        }

  };

  return (
   
    <Container>
       
        <Row>
        <Col key={product._id} className={styles.customerCard}  xs={12} sm={9} md={9} >
             <h3>Fill Your Details</h3>
            <Card >
              
              <Form onSubmit={handleSubmit} style={{padding:"10px"}}>

  <Form.Group controlId="customerContact">
    <Form.Label>Customer Contact</Form.Label>
    <Form.Control
      type="number"
      value={formData.customerContact}
      onChange={(e) =>
        setFormData({ ...formData, customerContact: e.target.value })
      }
    />
  </Form.Group>
  
  {/* <Map/> */}

  {/* <Form.Group controlId="shippingAddress.address">
    <Form.Label>Address</Form.Label>
    <Form.Control
      type="text"
      value={formData.shippingAddress.address}
      onChange={(e) =>
        setFormData({
          ...formData,
          shippingAddress: {
            ...formData.shippingAddress,
            address: e.target.value
          }
        })
    }/>
 </Form.Group> */}
 <div style={{display:'flex',justifyContent:"space-between"}}>
            <Button type='submit' style={{margin:"10px"}}>Submit</Button>
             <Button onClick={()=>handleClose()} style={{margin:"10px"}} >Cancel</Button>
              </div>

 </Form>
             
            </Card>
          </Col>
         </Row>
         <ToastContainer/>
        </Container>
  )
}

export async function getServerSideProps({ query }) {
   const userId=query.userid;
   console.log('userId:')
   console.log(userId)

    const customerResponse = await axios.post(`http://localhost:8080/user/customer`, {
      customerId:userId
    });
  
    return {
      props: {
        customer:customerResponse.data,
        revalidate: 1
      }
    }
  }
  
  

export default SelectedProduct;
