import React, { useState } from 'react';
import AddProduct from '../../component/addproduct.js';
import MyProduct from '../../component/myproduct.js';
import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link.js';
import styles from '../../styles/Navbar.module.css'
import { useRouter } from 'next/router.js';

function Profile() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showMyProduct,setShowMyProduct]=useState(false);
  const [showOrder,setShowOrder]=useState(false);

  const router=useRouter();

  const handleAddProductClick = () => {
    setShowAddProduct(true);
    setShowMyProduct(false);
    setShowOrder(false);
    // console.log(showAddProduct)
  };

  const handleMyProductClick = () => {
    setShowMyProduct(true);
    setShowAddProduct(false);
    setShowOrder(false);
    // console.log(showAddProduct)
  };
  const handleOrderClick = () => {
    setShowAddProduct(false);
    setShowMyProduct(false);
    setShowOrder(true);
    // console.log(showAddProduct)
  };

  const handleClose=()=>{
    setShowAddProduct(false);
  }
  
  
    const handleLogout = () => {
      localStorage.removeItem("token");
      router.push("/");
    };
  
  return (
    <div>
      
     <nav className={styles.navbar}>
      <ul className={styles.navbarMenu}>
  <li className={styles.navbarItems}>
    <Link href="#" onClick={handleMyProductClick} className={styles.navLink}>
      My Products
    </Link>
  </li>
  <li className={styles.navbarItem}>
    <Link href="#" onClick={handleAddProductClick} className={styles.navLink}>
      Add Product
    </Link>
  </li>
  <li className={styles.navbarItem}>
    <Link href="#" onClick={handleOrderClick} className={styles.navLink}>
      Order
    </Link>
  </li>
</ul>
<div>
<Link href="#" onClick={handleLogout} className={styles.navLink}>
      Logout
    </Link>
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
        <MyProduct />
        )   
      }


             
     
    </div>
  );
}

export default Profile;