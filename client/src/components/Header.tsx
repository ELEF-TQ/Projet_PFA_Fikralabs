import { Link } from 'react-router-dom';
import LogoWhite from '../assets/icons/LogoWhite.png';

const Header = () => {
  return (
    <div className='hidden md:block'>
      <div className="header-container" style={headerContainerStyle}>
       <Link to={'/'}>
       <div className="logo">
          <img src={LogoWhite} alt="Logo" />
        </div>
       </Link>
      
      </div>
    </div>
  );
};

// Define your CSS styles using JavaScript objects
const headerContainerStyle = {
  backgroundColor: 'var(--primary-color)',
  height: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 20px',
};



export default Header;
