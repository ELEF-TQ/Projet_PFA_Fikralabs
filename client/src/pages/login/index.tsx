'use client'
import React, { useEffect, useState } from 'react';
import illustration from '../../../public/images/illustration.png'; 
import Logo from '../../../public/icons/LogoBlack.png'
import Link from 'next/link';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { handleLogin } from '@/context/features/AuthSlice';
import { AppDispatch } from '@/context/store';
import { retrieveUserSession } from '@/lib/Encryption';

const index = () => {


  const dispatch = useDispatch<AppDispatch>();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
     email: '',
    password: '' });

  const handleChange = (e:any) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      dispatch(handleLogin(formData));
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
      <div className="flex flex-row items-center justify-around gap-0 h-full">
        <div className="hidden md:block " >
          <Image src={illustration} alt="illustration" className="" />
        </div>
        <div className="w-5/12 xl:p-2 ">
          <div className="space-y-4 md:space-y-6 md:p-5 sm:w-full ">
          <Image src={Logo} alt='Logo'/>
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Se connecter
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium Input_Label" >
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
                <Link href="/ForgotPassword" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                Mot de passe oublié ?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full text-white Confirm__Button hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleSubmit}
              >
               Log In
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Vous n’avez pas un compte ?  {' '}
                <Link href="/auth/signup" className=" font-medium text-primary-600 hover:underline dark:text-primary-500 ">
                S’inscrire
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
  );
};

export default index;
