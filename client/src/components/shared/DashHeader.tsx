import { Link } from 'react-router-dom';
import LogoWhite from '../../assets/icons/LogoWhite.png';
import { useEffect, useState } from 'react';
import { retrieveUserSession } from '../../utils/Encryption';
import defaultUser from '../../assets/images/defaultUser.png';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

const DashHeader = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const [showDropdown, setShowDropdown] = useState(false);

  const user = retrieveUserSession();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    setShowDropdown(false); 
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      text: "Vous serez redirigé vers la page de connexion.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, me déconnecter'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('user');
        Cookies.remove('token');
        window.location.href = '/login';
      }
    });
  };

  const mergedStyle = isMobile
    ? { ...headerContainerStyle, ...headerContainerStyleMobile }
    : headerContainerStyle;

  return (
    <div className="">
      <div style={mergedStyle}>
        <Link to={'/'}>
          <div className="logo">
            <img src={LogoWhite} alt="Logo" />
          </div>
        </Link>
        <div 
          className="flex md:space-x-10 space-x-6 items-center relative"
        
        >
          <p className="sidebar__logo-name">{user?.username}</p>
          <div className="relative">
            <div>
              <img
                width={80}
                height={80}
                className="sidebar__logo cursor-pointer"
                src={user?.image?.buffer ? `data:image/png;base64,${user?.image.buffer}` : defaultUser}
                alt="logo"
                
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              />
              <div className={`absolute top-0 left-auto right-0 mt-12 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 w-32 transition-opacity z-50 ${showDropdown ? 'visible' : 'invisible'}`}
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <Link to={`/`} onClick={() => setShowDropdown(false)}>
                  <button className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full mb-2 border-b border-gray-200">
                    Home
                  </button>
                </Link>
                <Link to={`/${user?.role.toLowerCase()}/profile`} onClick={() => setShowDropdown(false)}>
                  <button className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full mb-2 border-b border-gray-200">
                    Profile
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full  border-gray-200"
                >
                  Logout
                </button>
              </div>
            </div>
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
  justifyContent: 'space-between', 
};

export default DashHeader;
