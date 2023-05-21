import React, { useState,useEffect } from "react";
import {Modal, Form, Button ,Container,Row,Card} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../pages/api/api.js';
import dynamic from 'next/dynamic';
import { RiCloseLine } from 'react-icons/ri';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MarkersMap = dynamic(() => import('../../component/MyMap.js'), {
  ssr: false,
});


const MyOrder = () => {
  const [number, setNumber] = useState("");
  const [orders,setOrders]=useState(null);
  const [selectedOrder,setSelectedOrder]=useState(null);
  const [showLocation,setShowLocation]=useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [locationName,setLocationName]=useState();
  const [destinationCoordinates,setDestinationCoordinates] = useState([27.3256, 85.1245]);
  const [otp, setOtp] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [fieldMsg,setFieldMsg]=useState('');
  const [errMsg,setErrMsg]=useState('');
  const data={
    "customerNumber":number,
  }

  const getOrder=async()=>{
    try{
        const response=await api.post('/order/getorder',data);

        if(response.data){
          setOrders(response.data);
        }
        
        // console.log(response.data);
    }catch(err){
        console.log(err)
    }
  }

  useEffect(()=>{
    if(number.length==10){
      getOrder();
    }
    // console.log(orders); 
},[number])

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission   
    setNumber(number)
    // console.log('orders:');
    // console.log(orders);
  };

  const handleClick=(order)=>{
    setSelectedOrder(order);
    // console.log(selectedOrder);
    // console.log(order.shippingAddress.location)
    setShowLocation(true);

  }

  useEffect(() => {
    if (selectedOrder) {
      const { lat, lon } = selectedOrder.shippingAddress.location;
      setDestinationCoordinates([lat, lon]);
      setDestinationCoordinates([lat, lon]);
      
      // console.log('destinationCoordinates')
      // console.log(destinationCoordinates)
      setShowLocation(true);
    }

  }, [selectedOrder]);

 
  const handleMarkerPositionChange =  (position) => {
    setMarkerPosition(position); 
      axios
      .get(`https://nominatim.openstreetmap.org/reverse?lat=${position[0]}&lon=${position[1]}&format=json`)
      .then((response) => {
        const { display_name } = response.data;
        setLocationName(display_name);
       // set the location value 
 
        
      })
      .catch((error) => {
        console.log(error);
      });
    }

    const handleOtpChange = (event) => {
      const inputOtp = event.target.value;
      const otpRegex = /^\d{0,4}$/;


      if (otpRegex.test(inputOtp)) {
        setErrMsg('')
        setOtp(inputOtp);
      }else{
        setErrMsg('Invalid OTP')
      }
      // setOtp(event.target.value);
    };
  
    const handleCancelOrder = async() => {
      // Perform validation and cancel order logic here
      if (otp) {
        // Call the cancel order API with the OTP
        let orderDetail={
          "orderId":selectedOrder._id,
          "customerEmail":selectedOrder.customerEmail,
          "otp":otp
        }
        try{
          const response=await api.post('/order/cancel',orderDetail);       
          // console.log(response.data);
          if(response.data){
            setOtp('');
            setShowModal(false); 
          }
          if(response.status===200){
            toast.success('Your order has been cancelled', {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
          }
      }catch(err){
          console.log(err)
          console.log('status code:'+err.response.status);
          setOtp('')

          if(err.response.status===403){
          toast.error('Invalid OTP', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          }else if(err.response.status===429){
            toast.error('Too many request ', {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
              setTimeout(()=>{
                setShowModal(false)
              },3000)
            }
          
      }
        // console.log('Cancel order with OTP:', otp);
        // setShowModal(false); // Close the modal after processing
      }
    };
  
    const handleCloseModal = () => {
      setOtp('');
      setShowModal(false);
    };
  
    const handleShowModal =async (order) => {
      setSelectedOrder(order);

      const orderDetail={
        "orderId":order._id,
        "customerEmail":order.customerEmail,
      }
      
      try{
        const response=await api.post('/order/cancel',orderDetail );       
        // console.log(response.data);
    }catch(err){
        console.log(err)
    }
      setShowLocation(false);
      setShowModal(true);
    };

  return (
    <Container style={{marginTop:'10px'}}>
        <h4>Enter Customer Contact Number to track order</h4>
        <Row>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="numberField">
        <Form.Control
          type="number"
          placeholder="Enter a number"
          value={number}
          onChange={(e) => {
            const input = e.target.value;
          if (
              input.length <= 10 &&
              input.startsWith("9") &&
              (input.length < 2 || (input[1] === "8" || input[1] === "7"))
            )
            {
              setFieldMsg('')
              setNumber(e.target.value)
            }else if(input.length<=10){
              setFieldMsg('Invalid contact number')
             }
          }
            
            }
        />
      </Form.Group>
      <p style={{color:'red'}}>{fieldMsg}</p>
      {/* <Button variant="primary" type="submit">
        Submit
      </Button> */}
    </Form>
    </Row>
    <Row style={{marginTop:'10px'}}>
    {
          orders&&(
            <>
            {
             <div>
             {orders.map((order) => (

                    !order.isDelivered&&(
               <Card key={order._id} className="mb-3">   
                    <Card.Body>
                   <Card.Title>{order.customerName}</Card.Title>
                   <Card.Text>MyOrder Id:{order._id}</Card.Text>
                   <Card.Text>MyOrder: {order.orderItems.product.name}</Card.Text>
                   <Card.Text>Created At: {new Date(order.updatedAt).toLocaleDateString()}</Card.Text>
                   <div style={{display:'flex',justifyContent:'space-around'}}>
                    <Button onClick={()=>handleClick(order)}>Track Location</Button>

                   {/* <Button onClick={()=>cancelOrder(order)}>Cancel MyOrder</Button> */}
                   <Button variant="primary" onClick={()=>handleShowModal(order)}>
                  Cancel MyOrder
                       </Button>

                   </div>
                  
                 </Card.Body>
                 
                 
               </Card>
                )
                
             ))}
           </div>
            }
            </>
            
          )
    }
    </Row>
    <Row>

        {
            showLocation&&(
            <Card style={{marginBottom:'15px'}}>
            <div style={{display:'flex',justifyContent:'end'}}>
              <RiCloseLine onClick={()=>setShowLocation(false)} size={30}/>
            </div>
            
            <MarkersMap 
            onMarkerPositionChange={handleMarkerPositionChange} 
            destinationCoordinates={destinationCoordinates}
            />
{/* sourceCoordinates,destinationCoordinates */}
            {markerPosition && (
        <p>
          {/* Marker Position: {markerPosition[0]}, {markerPosition[1]} */}
          Your Address:{locationName}
        </p>
      )}

      <div style={{display:'flex',justifyContent:'end',margin:'10px'}}>
      <Button onClick={() => {
        // console.log('marker my position:')
        // console.log(markerPosition)
        // console.log('destination position:')
        // console.log(destinationCoordinates)
    const url = `https://www.google.com/maps/dir/${markerPosition[0]},${markerPosition[1]}/${destinationCoordinates[0]},+${destinationCoordinates[1]}`;
       window.open(url, "_blank");
  }}>
    Get path
  </Button>
      </div>
         
            </Card>
            )
        }
    
    </Row>
   {

    showModal&&(
    <Modal show={showModal} onHide={handleCloseModal}>
   
        <Modal.Header closeButton>
          <Modal.Title>OTP Validation</Modal.Title>
          
        </Modal.Header>
         
        <Modal.Body>
          <p>OTP sent to {selectedOrder.customerEmail}</p>
          <Form>
            <Form.Group controlId="otpInput">
              {/* <Form.Label>OTP</Form.Label> */}
              <Form.Control
               type="number"
                value={otp} 
                onChange={handleOtpChange} 
                placeholder="Enter OTP"
                maxLength={4}
                
                />
                <Form.Text style={{color:'red'}}>{errMsg}</Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCancelOrder}>
            Confirm
          </Button>

        </Modal.Footer>
      </Modal>
    )
}
<ToastContainer/>
    </Container>
  );
};

export default MyOrder;
