import React, { useState } from 'react';
import Logo from '../../../assets/icons/LogoBlack.png';
import { useDispatch } from 'react-redux';
import { handleLogin } from '../../../context/features/AuthSlice';
import { AppDispatch } from '../../../context/store';
import { Link } from 'react-router-dom';
import Header from '../../../components/Header';

const Index: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(handleLogin(formData));
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed. Please try again.');
    }
  };

  // Determine if the Connecter button should be disabled
  const isDisabled = !formData.email || !formData.password;

  return (
    <>
<Header />
<div className=" h-full">
    
      <div className="md:px-60 p-14">
        <div className="space-y-4 sm:w-full ">
          <img src={Logo} alt="Logo" />
          <div>
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">Se connecter</h1>
          </div>

          <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium Input_Label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className=" Input__Style w-full "
                placeholder="name@company.com"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium Input_Label">
                Mot de passe
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="••••••••"
                className="Input__Style w-full"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end ">
              <Link
                to="/reset"
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Mot de passe oublié ?
              </Link>
            </div>
            <div className="flex gap-3">
              
            <button
              type="submit"
              className={`w-full text-white ${isDisabled ? 'Cancel__Button' : 'Confirm__Button'} hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
              disabled={isDisabled}
            >
              Connecter
            </button>
            
            <Link to={'/evaluation'}  
                 className=" text-white Confirm__Button  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
                Evaluer
            </Link>

            
            </div>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Vous n’avez pas un compte ?{' '}
              <Link to="/signup" className=" font-medium text-primary-600 hover:underline dark:text-primary-500 ">
                S’inscrire
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
    </>
   
  );
};

export default Index;
