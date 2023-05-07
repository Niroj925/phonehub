import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import 'leaflet-routing-machine.css'

const MyMap = ({ onMarkerPositionChange, destinationCoordinates }) => {
  console.log('destinaion on map')
  console.log(destinationCoordinates);
  const position = destinationCoordinates?destinationCoordinates:[27.6785, 85.4232]; // specify latitude and longitude coordinates
  const [markerPosition, setMarkerPosition] = useState(position);

  // create a custom marker icon
  const customMarkerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [30, 45],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
  });

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        console.log(e.latlng);
        const { lat, lng } = e.latlng;
        setMarkerPosition([lat, lng]);
        onMarkerPositionChange([lat, lng]);
      },
    });
    return null;
  };

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMarkerPosition([latitude, longitude]);
        onMarkerPositionChange([latitude, longitude]);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  };



  return (
    <Container fluid>
      <MapContainer 
      center={position}
       zoom={11} 
       style={{ height: "70vh", width: "80vh" }} 
    
       >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler />
        {markerPosition && (
          <Marker position={markerPosition} icon={customMarkerIcon}>
            <Popup>
              Your location or mark location
          </Popup>
        </Marker>
        )}    
           {destinationCoordinates && (
          <Marker position={destinationCoordinates} icon={customMarkerIcon} style={{color:'red'}}>
            <Popup>
              <p>Customer destination Location</p>
          </Popup>
        </Marker>
        )}  
   
    </MapContainer>
    <Button onClick={handleGetLocation} style={{marginTop:'10px'}}>Get My Location</Button>
    </Container>
    
  );
};

export default MyMap;
