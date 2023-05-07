import React, { useState,useEffect } from "react";
import { Form, Button ,Container,Row,Card} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../pages/api/api.js';
import dynamic from 'next/dynamic';
import { RiCloseLine } from 'react-icons/ri';
import axios from "axios";

const MarkersMap = dynamic(() => import('../../component/MyMap.js'), {
  ssr: false,
});


const Order = () => {
  const [number, setNumber] = useState("");
  const [orders,setOrders]=useState(null);
  const [selectedOrder,setSelectedOrder]=useState(null);
  const [showLocation,setShowLocation]=useState(false);
  const[showPath,setShowPath]=useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [locationName,setLocationName]=useState('');
  const [destinationCoordinates,setDestinationCoordinates] = useState([27.3256, 85.1245]);
  const [myLocation,setMyLocation]=useState([27.3256, 85.1245])

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
    //  destinationLatitude = order.shippingAddress.location.lat; // Replace with the actual destination latitude
    //  destinationLongitude = order.shippingAddress.location.lon;
    setShowLocation(true);

  }

  useEffect(() => {
    if (selectedOrder) {
      const { lat, lon } = selectedOrder.shippingAddress.location;
      (lat==!null)?setDestinationCoordinates([lat, lon]):setDestinationCoordinates([0,0]);
      setDestinationCoordinates([lat, lon]);
      
      console.log('destinationCoordinates')
      console.log(destinationCoordinates)
      setShowLocation(true);
    }

  }, [selectedOrder]);

  const cancelOrder=(order)=>{
    setSelectedOrder(order);
    console.log(selectedOrder);

  }

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
            <Card>
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

      <div>
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
    </Container>
  );
};

export default Order;
