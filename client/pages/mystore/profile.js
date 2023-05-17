import React, { useState } from 'react';
import AddProduct from '../../component/addproduct.js';
import MyProduct from '../../component/myproduct.js';
import MyOrder from '../../component/myorder.js';
import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import div from 'next/link.js';
import styles from '../../styles/Navbar.module.css'
import { useRouter } from 'next/router.js';

function Profile() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showMyProduct,setShowMyProduct]=useState(true);
  const [showMyOrder,setShowMyOrder]=useState(false);

  const router=useRouter();

  const handleAddProductClick = () => {
    setShowAddProduct(true);
    setShowMyProduct(false);
    setShowMyOrder(false);
    // console.log(showAddProduct)
  };

  const handleMyProductClick = () => {
    setShowMyProduct(true);
    setShowAddProduct(false);
    setShowMyOrder(false);
    // console.log(showAddProduct)
  };
  const handleOrderClick = () => {
    setShowAddProduct(false);
    setShowMyProduct(false);
    setShowMyOrder(true);
    // console.log(showAddProduct)
  };

  const handleClose=()=>{
    setShowAddProduct(false);
    setShowMyProduct(true);
    setShowMyOrder(false);
  }
  
  
    const handleLogout = () => {
      const confirmed = window.confirm('Do you want to Logout your Account?');
      if(confirmed){
        localStorage.removeItem("token");
      router.push("/");
      }
     
    };
  
  return (
    <div>
      
     <nav className={styles.navbar}>
      <ul className={styles.navbarMenu}>
  <li className={styles.navbarItems}>
    <div  onClick={handleMyProductClick} className={styles.navLink}>
      My Products
    </div>
  </li>
  <li className={styles.navbarItem}>
    <div  onClick={handleAddProductClick} className={styles.navLink}>
      Add Product
    </div>
  </li>
  <li className={styles.navbarItem}>
    <div  onClick={handleOrderClick} className={styles.navLink}>
      Order
    </div>
  </li>
</ul>
<div>
<div  onClick={handleLogout} className={styles.navLink}>
      Logout
    </div>
</div>
</nav>
      {
        showAddProduct&&
        (
            <AddProduct isOpen={showAddProduct} onClose={handleClose} /> 
          
        )
         
      }
      {
         showMyProduct&&(
        <MyProduct isOpen={showMyProduct} onClose={handleClose}/>
        )   
      }
      {
         showMyOrder&&(
        <MyOrder isOpen={showMyOrder} onClose={handleClose}/>
        )   
      }


             
     
    </div>
  );
}

export default Profile;