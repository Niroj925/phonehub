import React, { useState,useEffect } from "react";
import { Form, Button ,Container,Row,Card} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../pages/api/api.js';
// import TrackLocation from '../../component/trackLocation.js';
// import dynamic from 'next/dynamic';
// const TrackLocation = dynamic(() => import('../../component/trackLocation.js'), {
//   ssr: false,
// });

const Order = () => {
  const [number, setNumber] = useState("");
  const [orders,setOrders]=useState(null);
  const [selectedOrder,setSelectedOrder]=useState(null);
  const [showLocation,setShowLocation]=useState(false)
  
  const sourceLatitude = 27.68762; // Replace with the actual source latitude
  const sourceLongitude = 85.33738; // Replace with the actual source longitude
  let destinationLatitude = 27.123; // Replace with the actual destination latitude
  let destinationLongitude = 85.654;

  const data={
    "customerNumber":number,
  }

  const getOrder=async()=>{
    try{
        const response=await api.post('/order/getorder',data);
        setOrders(response.data);
        // console.log(response.data);
    }catch(err){
        console.log(err)
    }
  }

  useEffect(()=>{
    getOrder();
    console.log(orders);
  },[number.length==10])

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission   
    setNumber(number)
    console.log('orders:');
    console.log(orders);
  };

  const handleClick=(order)=>{
    setSelectedOrder(order);
    console.log(selectedOrder);
    console.log(order.shippingAddress.location)
     destinationLatitude = order.shippingAddress.location.lat; // Replace with the actual destination latitude
     destinationLongitude = order.shippingAddress.location.lon;
    setShowLocation(true);

  }
  const cancelOrder=(order)=>{
    setSelectedOrder(order);
    console.log(selectedOrder);

  }
  return (
    <Container>
        <h4>Enter Customer Contact Number to track order</h4>
        <Row>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="numberField">
        <Form.Control
          type="number"
          placeholder="Enter a number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </Form.Group>
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
                   <Card.Text>Order Id:{order._id}</Card.Text>
                   <Card.Text>Order: {order.orderItems.product.name}</Card.Text>
                   <Card.Text>Created At: {new Date(order.updatedAt).toLocaleDateString()}</Card.Text>
                   <div style={{display:'flex',justifyContent:'space-around'}}>
                    <Button onClick={()=>handleClick(order)}>Track Location</Button>
                   <Button onClick={()=>cancelOrder(order)}>Cancel Order</Button>
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
            //     <TrackLocation
            //     sourceLatitude={sourceLatitude}
            //     sourceLongitude={sourceLongitude}
            //     destinationLatitude={destinationLatitude}
            //     destinationLongitude={destinationLongitude}
            //   />
            <>
               <Card>
      <Card.Body>
        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            className="embed-responsive-item"
            src="https://www.google.com/maps/dir/'27.68762,85.33738'/'27.68556,85.36653'/@27.6786893,85.3344461,14z/data=!3m1!4b1!4m9!4m8!1m3!2m2!1d85.33738!2d27.68762!1m3!2m2!1d85.36653!2d27.68556"
            title="Embedded Site"
            allowFullScreen
          ></iframe>
        </div>
      </Card.Body>
    </Card>
            </>
            )
        }
    
    </Row>
    </Container>
  );
};

export default Order;
