import { Link, useLocation } from 'react-router-dom';
import LogoWhite from '../../assets/icons/LogoWhite.png';
import { useEffect, useState } from 'react';
import {  retrieveUserSession } from '../../lib/Encryption';
import defaultUser from '../../assets/images/defaultUser.png';

const Header = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const user = retrieveUserSession();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mergedStyle = isMobile
    ? { ...headerContainerStyle, ...headerContainerStyleMobile }
    : headerContainerStyle;

  const isLinkActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="">
      <div style={mergedStyle}>
        <Link to={'/'}>
          <div className="logo hidden md:block">
            <img src={LogoWhite} alt="Logo" draggable="false"/>
          </div>
        </Link>
        <div className="flex md:space-x-10 space-x-6 items-center wrap">
          <Link
            to={'/'}
            className={`btn font-semibold text-white ${
              isLinkActive('/') ? 'active' : ''
            }`}
            style={isLinkActive('/') ? activeLinkStyle : {}}
          >
            Accueil
          </Link>
          <Link
            to={'/evaluation'}
            className={`btn font-semibold text-white ${
              isLinkActive('/evaluation') ? 'active' : ''
            }`}
            style={isLinkActive('/evaluation') ? activeLinkStyle : {}}
          >
            Évaluation
          </Link>
          {!user && (
            <>
              <Link
                to={'/login'}
                className={`btn font-semibold text-white ${
                  isLinkActive('/login') ? 'active' : ''
                }`}
                style={isLinkActive('/login') ? activeLinkStyle : {}}
              >
                Connexion
              </Link>
              <Link
                to={'/signup'}
                className={`btn font-semibold text-white ${
                  isLinkActive('/signup') ? 'active' : ''
                }`}
                style={isLinkActive('/signup') ? activeLinkStyle : {}}
              >
                Inscription
              </Link>
            </>
          )}

          {user && (
            <Link
              to={
                user.role === 'ADMIN'
                  ? '/admin'
                  : user.role === 'POMPISTE'
                  ? '/pompiste'
                  : '/client'
              }
            >
              <img
                width={80}
                height={80}
                className="sidebar__logo"
                src={
                  user?.image?.buffer
                    ? `data:image/png;base64,${user.image.buffer}`
                    : defaultUser
                }
                alt="logo"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};


const headerContainerStyle = {
  backgroundColor: 'var(--primary-color)',
  height: '80px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 20px',
};

const headerContainerStyleMobile = {
  justifyContent: 'center', // Center align for small screens
};

const activeLinkStyle = {
  color: 'darkgreen',
};

export default Header;
