import React, { useState } from 'react';
import styles from '../../styles/CreateStore.module.css'
import api from '../api/api.js';
import {Modal, Form, Button ,Container,Row,Card} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import Navbar from '../../component/navbar.js'
import Footer from '../../component/footer.js'
import { useDispatch } from 'react-redux';
import {setUser } from '../../features/slices/userSlice';

export default function SignUpForm() {
  const router = useRouter();
  const dispatch=useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showOTPForm, setShowModal] = useState(false);
  const [showChangeField,setShowChangeField]=useState(false);
  const [otp, setOtp] = useState('');
  const [useremail, setUserEmail] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [errMsg,setErrMsg]=useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleUserEmailChange = (event) => {
    setUserEmail(event.target.value);
  };
  const handlePassChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = async(event) => {
    
    event.preventDefault();
    // console.log(`Email: ${email}, Password: ${password}`);
    event.preventDefault();
    const data={
      "email":email,
      "password":password
    }
    // try{
    const res=await api.post('/user/login',data);

    // console.log(res);
    if(res.data){     
      toast.success('Successfully login', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        localStorage.setItem('token', JSON.stringify(res.data.token));
        // console.log(res.data);
        const data=res.data;
        dispatch(setUser(res.data));
        // const userid=res.data._id;
        router.push(`/mystore/profile`); 
      }
      
    setEmail('');
    setPassword('');
      // }catch(err){
      //   // console.log(err);
      //   toast.error("Invalid credentials", {
      //     position: "bottom-right",
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //     });
      //     setTimeout(() => {
      //       router.push('/mystore');
      //     }, 3000);
      // }

  };
  const handleCloseModal = () => {
    setOtp('');
    setUserEmail('');
    setNewPassword('');
    setShowModal(false);
    setShowChangeField(false);
  };
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


  const handleChangePass = async() => {
    // Perform validation and cancel order logic here
    if (otp!=='') {
      // Call the cancel order API with the OTP
      let userDetail={
        "email":useremail,
        "password":newpassword,
        "otp":otp
      }
      try{
        const response=await api.post('/user/forgotpass',userDetail);     
        console.log('got otp')  
        console.log(response.data);
        if(response.data){
          setOtp('');
          setUserEmail('');
          setNewPassword('');
          setShowModal(false); 
          setShowChangeField(false);
        }
        if(response.status===200){
          toast.success('Password Successfully Reset'), {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            };
        }
    }catch(err){
        console.log(err)
        console.log('status code:'+err.response.status);
        setOtp('')
        setShowModal(false);
        if(err.response.status===403){
        toast.error('Invalid OTP or bad credentials', {
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
    else{
       // Call the cancel order API with the OTP
       let userDetail={
        "email":useremail,
        "password":newpassword
      }
      try{
        const response=await api.post('/user/forgotpass',userDetail);       
        console.log(response.data);
        if(response.data){
          setShowModal(true);
          setShowChangeField(false)
        }
      }catch(err){
        console.log(err);
      }
    }
  };

  return (
    <>
    {/* <Navbar/> */}
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>Login</h2>
      <hr/>
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.formLabel}>Email</label>
        <input
          type="email"
          id="email"
          className={styles.formInput}
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.formLabel}>Password</label>
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            className={styles.formInput}
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button
            type="button"
            className={styles.showPasswordButton}
            onClick={handleShowPassword}
          >
            {showPassword ? <FaEyeSlash className={styles.showPasswordButton}/> : <FaEye className={styles.showPasswordButton}/>}
          </button>
        </div>
      </div>
      <div className={styles.formGroup}>
        <button type="submit" className={styles.submitButton}>Login</button>
      </div>
      <div className={styles.formGroup}>
        {/* <a href="#" className={styles.forgotPasswordLink}>Forgot password?</a> */}
        <Link href="#" className={styles.forgotPasswordLink} onClick={()=>{
          setShowChangeField(true)
          }}>Forgot password?</Link>
        <span className={styles.separator}>|</span>
        {/* <a href="/signup" className={styles.signUpLink}>Sign up</a> */}
        <Link href="/signup" className={styles.signUpLink}>Sign up</Link>
      </div>
          
      {

showOTPForm&&(
<Modal show={showOTPForm} onHide={handleCloseModal}>

    <Modal.Header closeButton>
      <Modal.Title>OTP Validation</Modal.Title>
      
    </Modal.Header>
     
    <Modal.Body>
      <p>OTP sent to {useremail}</p>
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
      <Button variant="primary" onClick={handleChangePass}>
        Confirm
      </Button>

    </Modal.Footer>
  </Modal>
)
}
{
showChangeField&&(
  <Modal show={showChangeField} onHide={handleCloseModal}>

    <Modal.Header closeButton>
      <Modal.Title>Change password</Modal.Title>
      
    </Modal.Header>
     
    <Modal.Body>
      <p>Enter your Register Email and New Password</p>
      <Form>
        <Form.Group controlId="otpInput">
          {/* <Form.Label>Email</Form.Label> */}
          <Form.Control
           type="text"
            value={useremail} 
            onChange={handleUserEmailChange} 
            placeholder="Email.."              
            />

            <br/>
              <Form.Control
           type="password"
            value={newpassword} 
            onChange={handlePassChange} 
            placeholder="Password.."
            
            
            />
            {/* <Form.Text style={{color:'red'}}>{errMsg}</Form.Text> */}
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseModal}>
        Close
      </Button>
      <Button variant="primary" onClick={()=>{
         handleChangePass();
        setShowChangeField(false);
        setShowModal(true);
      }}>
        Submit
      </Button>

    </Modal.Footer>
  </Modal>
)
}

    </form>
    <ToastContainer/>
    <Footer/>
    </>
  );
}