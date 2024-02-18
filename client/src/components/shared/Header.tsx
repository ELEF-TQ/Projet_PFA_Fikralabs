'use client'

import React from 'react';
import LogoWhite from '../../../public/icons/LogoWhite.png';
import Image from 'next/image';

const Header = () => {
  return (
    <div className='hidden md:block '>
    <div className="header-container ">
      <style jsx>{`
        .header-container {
          background-color: var(--primary-color);
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
        }
        @media (max-width: 768px) {
          .header-container .logo {
            display: none;
          }
        }
      `}</style>
      <div className="logo">
        {/* Logo displayed only on desktop */}
        <Image src={LogoWhite} alt="Logo" />
      </div>
    </div>
    </div>
  );
};

export default Header;
