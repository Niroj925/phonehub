import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button,Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const MyMap = ({ onMarkerPositionChange }) => {
  const position = [27.700769,85.300140]; // specify latitude and longitude coordinates
  const [markerPosition, setMarkerPosition] = useState([27.700769,85.300140]);

  // create a custom marker icon
  const customMarkerIcon = new L.Icon({
    iconUrl:'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    // iconUrl:markerImg,
    iconSize: [30, 45],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
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
      zoom={13}
      style={{ height: "70vh",width:"80vh" }}
      // onClick={handleClick}
      // pass clickable option and set it to true
      // clickable={true}
    >
      <TileLayer
       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
       />
       <MapClickHandler/>
      {markerPosition && (
        <Marker position={markerPosition} icon={customMarkerIcon}>
          <Popup>
            A pretty CSS3 popup.
            <br />
            Easily customizable.
          </Popup>
        </Marker>
        )}      
    </MapContainer>
    <Button onClick={handleGetLocation} style={{marginTop:'10px'}}>Get My Location</Button>
    </Container>
  );
};

export default MyMap;
