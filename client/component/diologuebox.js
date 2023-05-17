import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {FaGoogle} from 'react-icons/fa';
import styles from '../styles/Navbar.module.css';

function GoogleDialog(props) {
 
  const handleClose = () => {
    props.onClose();
    }

    const googleAuth=async()=>{
    
        window.open(
            `https://ecommerceback-mklr.onrender.com/user/auth/google`,
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
          <Button    onClick={googleAuth} 
            className={styles.button}
          >
            <FaGoogle style={{marginRight:'5px'}}/> 
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
