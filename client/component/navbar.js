import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {

  return (
    // <nav className={styles.navbar}>
   
      <div className={styles.navbarButtons} style={{display:'flex',justifyContent:'flex-end'}}>
        <Link href='/mystore' className={styles.loginButton}>
            My Store
          </Link>
          <Link href='/createstore' className={styles.signupButton}>
            Create Store
          </Link>
      </div>
    // </nav>
  );
}