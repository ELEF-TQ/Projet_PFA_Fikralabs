import { Link } from 'react-router-dom';
import LogoWhite from '../assets/icons/LogoWhite.png';

const Header = () => {
  return (
    <div className=''>
      <div className="" style={headerContainerStyle}>
        <Link to={'/'}>
          <div className="logo">
            <img src={LogoWhite} alt="Logo" />
          </div>
        </Link>
        <div className="flex gap-10 items-center">
          <Link to={'/login'} className="btn font-semibold text-white hover:text-black hover:bg-white transition duration-300 px-4 py-2 rounded-lg">Login</Link>
          <Link to={'/signup'} className="btn font-semibold text-white hover:text-black hover:bg-white transition duration-300 px-4 py-2 rounded-lg">Signup</Link>
          <Link to={'/review'} className="btn font-semibold text-white hover:text-black hover:bg-white transition duration-300 px-4 py-2 rounded-lg">Review</Link>
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

export default Header;
