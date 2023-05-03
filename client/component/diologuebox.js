import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function GoogleDialog(props) {
    console.log('productid:');
    console.log(props.productId)
 
  const handleClose = () => {
    props.onClose();
    }

    const googleAuth=async()=>{
    
        window.open(
            // `http://localhost:8080/user/auth/google`,
            `http://localhost:8080/user/auth/google?productId=${props.productId}`,
            "_self"
        )
    }
  return (
    <>
   
      <Modal show={props.isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Continue with Google</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Button variant="primary"   onClick={googleAuth}>
            Continue with Google
          </Button>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GoogleDialog;
