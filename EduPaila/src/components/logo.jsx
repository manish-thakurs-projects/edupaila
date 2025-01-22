import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css'; // Assuming you save the styles in Logo.css

const Logo = () => {
  return (
   <div className='logo'>
            <Link to="/" className='logo-faded'>
              Edu
              <span className='highlighted-logo'>Paila</span>
            </Link>
          </div>
  );
};

export default Logo;
