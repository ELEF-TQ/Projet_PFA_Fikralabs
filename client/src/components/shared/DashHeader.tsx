import { Link, useLocation } from 'react-router-dom';
import LogoWhite from '../../assets/icons/LogoWhite.png';
import { useEffect, useState } from 'react';
import { retrieveUserSession } from '../../lib/Encryption';
import defaultUser from '../../assets/images/defaultUser.png';
const DashHeader = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);

  const userData = retrieveUserSession();

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

  
  return (
    <div className="">
      <div style={mergedStyle}>
        <Link to={'/'}>
          <div className="logo hidden md:block">
            <img src={LogoWhite} alt="Logo" />
          </div>
        </Link>
        <div className="flex md:space-x-10 space-x-6 items-center">
        <p className="sidebar__logo-name">{userData?.username}</p>
        <div className="">
            <img
                width={80}
                height={80}
                className="sidebar__logo"
                src={userData?.image?.buffer ? `data:image/png;base64,${userData.image.buffer}` : defaultUser}
                alt="logo"
            />
                
            </div>
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
  justifyContent: 'center', 
};



export default DashHeader;
