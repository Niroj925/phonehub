import React from 'react';
import style from '../styles/Footer.module.css';
import { Container } from 'react-bootstrap';
const Footer = () => {

  return (
    <Container className={style.footerBox} fluid>
      <footer className={style.footer}>
        <div >
          <p className={style.center}>
            {'© '}
            {new Date().getFullYear()}
            {' All rights reserved by FoneHub.'}
          </p>
        </div>
      </footer>
    </Container>
  );
};

export default Footer;
