import { Link, useLocation } from 'react-router-dom';
import LogoWhite from '../../assets/icons/LogoWhite.png';
import { useEffect, useState } from 'react';

const Header = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);

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
        <div className="flex md:space-x-10 space-x-6 items-center">
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
          <Link
            to={'/evaluation'}
            className={`btn font-semibold text-white ${
              isLinkActive('/evaluation') ? 'active' : ''
            }`}
            style={isLinkActive('/evaluation') ? activeLinkStyle : {}}
          >
            Évaluation
          </Link>
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
