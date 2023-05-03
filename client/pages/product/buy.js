import React ,{useState,useEffect} from 'react'
import api from '@/pages/api/api.js'
import { useRouter } from 'next/router';
import { Container,Stack, Form, Row, Col, Card ,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/ProductCard.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function SelectedProduct({ product,customer }) {
    console.log(product)
    console.log(customer)
    
    const [formData, setFormData] = useState({
        user:product.user,
        customerName: '',
        customerContact: '',
        orderItems: {
          product:product._id,
          quantity: '1',
          price: product.price
        },
        shippingAddress: {
          address: '',
          location: {
            lon: '',
            lat: ''
          },
          city: 'kathmandu',
          postalCode: '1010',
          country: 'Nepal'
        },
        paymentMethod: 'Cash on Delivery',
        itemsPrice: product.price,
        taxPrice: 0,
        shippingPrice: 50,
        totalPrice:product.price+50
      });
      

  const router = useRouter();
  // const userId = router.query.userid;
  // const productId = router.query.productid;
  const { userid, productid } = router.query;
  console.log('userId:')
  console.log(userid)
  console.log('productid:')
  console.log(productid)

  const handleClose=()=>{
    router.push('/product');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API request with formData

    try {
        const response = await api.post(
          "order/add",
          formData,
        );
        //   console.log(response.data);
          if(response.data){
            toast.success('Your order has been placed', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                router.push('/');
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

  <Form.Group controlId="customerName">
    <Form.Label>Customer Name</Form.Label>
    <Form.Control
      type="text"
      value={formData.customerName}
      onChange={(e) =>
        setFormData({ ...formData, customerName: e.target.value })
      }
    />
  </Form.Group>


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


  <Form.Group controlId="shippingAddress.address">
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
 </Form.Group>
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
    const productId = query.productid;
   const userId=query.userid;
   console.log('userId:')
   console.log(userId)
   console.log('productid:')
   console.log(productId);

    const productResponse = await api.post(`product/getproductbyid`, {
      productId:productId
    });

    const customerResponse = await axios.post(`http://localhost:8080/user/customer`, {
      customerId:userId
    });
  
    return {
      props: {
        product: productResponse.data,
        customer:customerResponse.data,
        revalidate: 1
      }
    }
  }
  
  

export default SelectedProduct;

