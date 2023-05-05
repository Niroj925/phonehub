import React, { useState } from 'react';
import { Form, Button,Container,Row,Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/AddProduct.module.css'
import axios from 'axios';
import api from '../pages/api/api.js'
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProductForm = (props) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [image, setImage] = useState(null);
  const [features, setFeatures] = useState([]);
  const [featureName,setFeatureName]=useState('');
  const [featureValue,setFeatureValue]=useState('');

  const router=useRouter();
  
    const { userid } = router.query
    console.log(userid);

  const handleAddFeature = () => {
    setFeatures([...features, { name: featureName, value:featureValue }]);
    console.log(features);
    setFeatureName('');
    setFeatureValue('');
  };


  const handleNameChange=(event)=>{
 
    setFeatureName(event.target.value);
    console.log(featureName);
  }

  const handleValueChange=(event)=>{
 
    setFeatureValue(event.target.value);
  }
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   console.log(props.isOpen)
  //  console.log(props.onClose)
    const formData = new FormData();
    formData.append('name', name);
    formData.append('brand', brand);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('countInStock', countInStock);
    // formData.append('features', features);
    features.forEach((feature, index) => {
      formData.append(`features[${index}][name]`, feature.name);
      formData.append(`features[${index}][value]`, feature.value);
    });
    formData.append('image', image);
    formData.append('user',userid)
  
    try {
      const response = await api.post('/product/addproduct', formData, {
        headers: {
         token: JSON.parse(localStorage.getItem("token")),               
        },
      });
      console.log(response.data);
      // Handle response
      props.onClose();
      if(response.data){
        // router.push(`/mystore/profile?userid=${userid}`);
        toast.success('Product added successfully', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });

        props.onClose();
      }

    } catch (error) {
      // Handle error
      console.log(error)
      toast.error('Image file too large', {
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
  };
  

  return (
    <>
    {props.isOpen&&(
   <Container className={styles.addProduct}>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="brand">
        <Form.Label>Brand</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter product brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter product description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter product category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter product price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="countInStock">
        <Form.Label>Count In Stock</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter product count in stock"
          value={countInStock}
          onChange={(e) => setCountInStock(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="image">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" onChange={handleImageChange} required/>
      </Form.Group>

      <Form.Group controlId="features">
        <Form.Label>Features</Form.Label>
        {
            features.map((item)=>{
                return(
                    <div style={{display:'flex' }} key={item.name}>
                        <p>{item.name}:{item.value}</p>
                    </div>
                )
            })
        }

          {/* <div key={index}> */}
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter feature name"
            //   value={feature.name}
             value={featureName}
              onChange={handleNameChange}
            />
            <Form.Control
              type="text"
              name="value"
              placeholder="Enter feature value"
            //   value={feature.value}
              value={featureValue}
              onChange={handleValueChange}
              style={{marginTop:'5px'}}
            />
          {/* </div> */}

        <Button variant="primary" onClick={handleAddFeature} style={{marginTop:'10px'}} >
          Add Feature
        </Button>
      </Form.Group>
      <div style={{display:'flex',justifyContent:'end'}}>
         <Button variant="primary" type="submit"style={{marginBottom:'15px'}} >
        Add Product
      </Button>
      {/* <Button variant="primary" onClick={()=>setShowForm(false)}>
          Close
      </Button> */}

      </div>
     
        </Form>
        </Container>
    )
}
  <ToastContainer/>
        </>

        )}
export default AddProductForm