'use client'
import React, { useState, useRef } from 'react';
import Previous from '../../../../assets/icons/Previous.png';
import Illustration from '../../../public/images/illustration.png';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { axiosNoAuth } from '@/lib/Constants';
const index = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    CNI: '',
    image: '', 
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setErrors] = useState({});
  const passwordVerifyRef = useRef(null);

  const getPasswordStrength = (password:any) => {
    if (password.length <= 4) return 0;
    if (password.length <= 6) return 1;
    if (password.length <= 8) return 2;
    if (password.length <= 12) return 3;
    return 4;
  };

  const isPasswordValid = (password:any) => {
    return /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/.test(password);
  };

  const validateEmail = (value:any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Adresse e-mail invalide.';
    }
  };

  const handlePasswordVerifyChange = (e:any) => {
    passwordVerifyRef.current = e.target.value;
  };


  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };



  const handleSubmit = async () => {
      const passwordError = validatePasswordConfirmation(confirmPassword);
      const emailError = validateEmail(formData.email);
  
      if (passwordError || emailError || !termsAccepted || !isPasswordValid(formData.password)) {
        setErrors({
          email: emailError || null,
          confirmPassword: passwordError || null,
          Password: !isPasswordValid(formData.password) ? 'Le mot de passe doit contenir au moins 8 caractères, y compris des chiffres.' : null,
          ...getRequiredErrors(),
        });
        // Swal.fire('Oops!', 'Veuillez vérifier les champs.', 'error');
        return;
      }
      try {
        console.log(formData);
      const res =  await axiosNoAuth.post("/auth/signup", formData);
       console.log(res);
       
      } catch (error) {
        console.log('Error submitting form:', error);
      
    } 
  };
  

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

 

  const handleConfirmPasswordChange = (e:any) => {
    setConfirmPassword(e.target.value);
  };

  const validatePasswordConfirmation = (value:any) => {
    if (value !== formData.password) {
      return 'Les mots de passe ne correspondent pas.';
    }
  };

 
  return (
    <Formik initialValues={formData} onSubmit={handleSubmit}>
      {({ isValid }) => (
        <div className="flex flex-row items-center justify-around gap-0 h-full">
          <div className="Sign__overlay d-none d-md-block">
            <Image src={Illustration} alt="illustration" className="w-100" />
          </div>
          <div className="Sign__content">
            <p className="text-center">
              Avez-vous déjà un Compte?
              <br />
              <Link href="/auth/login">- Connectez-vous ici</Link>
            </p>
            <h1 className="text-center  mx-auto mb-5 Sign__Title">Créer votre compte </h1>


            <FormikStepper
              currentStep={currentStep}
              handleNextStep={handleNextStep}
              handlePreviousStep={handlePreviousStep}
              handleSubmit={handleSubmit}
              isValid={isValid}
              termsAccepted={termsAccepted}
            >
              {/* Step 1 */}
              <Form className="Sign__form">
                <div className={`Margin__Input__Buttom `}>
                  <label htmlFor="name" className='Input_Label'>Nom & Prénom</label>
                  <input
                    type="text"
                    className={`form-control Input__Style `}
                    id="username"
                    name="username"
                    placeholder="Nom et prénom"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="invalid-feedback"></div>
                </div>

                <div className={`Margin__Input__Buttom `}>
                  <label htmlFor="name" className='Input_Label'>Email</label>
                  <input
                    type="text"
                    className={`form-control Input__Style `}
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="invalid-feedback"></div>
                </div>

                <div className={`Margin__Input__Buttom`}>
                  <label htmlFor="phone" className='Input_Label'>Numéro de téléphone</label>
                  <input
                    type="tel"
                    className={`form-control Input__Style `}
                    id="phone"
                    name="phone"
                    placeholder="N° de l’administration..."
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="invalid-feedback"></div>
                </div>
              </Form>

              {/* Step 2 */}

              
              <Form className="Sign__form">

              <div className={`Margin__Input__Buttom `}>
                  <label htmlFor="password" className='Input_Label'>Mot de passe</label>
                  <input
                    type="password"
                    className={`form-control Input__Style `}
                    id="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    minLength={6}
                    onCopy={(e) => {e.preventDefault();}}
                    onCut={(e) => {e.preventDefault();}}
                  />
                  <div className="password-strength-bar">
                    <div className={`strength strength-${getPasswordStrength(formData.password)}`} />
                  </div>
                </div>

                <div className={`Margin__Input__Buttom ${formData.password && passwordVerifyRef.current && formData.password !== passwordVerifyRef.current ? 'has-error' : ''}`}>
                  <label htmlFor="confirmPassword" className='Input_Label'>Confirm Mot de passe </label>
                  <input
                    type="password"
                    className={`form-control Input__Style ${
                      formData.password && passwordVerifyRef.current && formData.password !== passwordVerifyRef.current
                        ? 'is-invalid'
                        : ''
                    }`}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Mot de passe "
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    onBlur={handlePasswordVerifyChange}
                    required
                  />
                  {formData.password && passwordVerifyRef.current && formData.password !== passwordVerifyRef.current && (
                    <div className="invalid-feedback">Les mots de passe ne correspondent pas.</div>
                  )}
                </div>
               
              </Form>

              {/* Step 3 */}
              <Form className="Sign__form">
              <div className={`d-flex flex-column Margin__Input__Buttom`}>
                <label htmlFor="image" className='Input_Label'>Image</label>
                <input type="file" id="region" name="region" accept="image/*" onChange={handleInputChange} />
              </div>



                <div className={`Margin__Input__Buttom `}>
                  <label htmlFor="CNI" className='Input_Label'>Numéro de CNI</label>
                  <input
                    type="text"
                    className={`form-control Input__Style`}
                    id="CNI"
                    name="CNI"
                    placeholder="Numéro de CNI"
                    value={formData.CNI}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="invalid-feedback"></div>
                </div>
                
              </Form>
            </FormikStepper>

            <hr />
          
          </div>
        </div>
      )}
    </Formik>
  );
};

export default index;
interface FormikStepperProps {
  children: React.ReactNode;
  currentStep: number;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleSubmit: () => void;
  isValid: boolean;
  termsAccepted: boolean;
}

export function FormikStepper({
  children,
  currentStep,
  handleNextStep,
  handlePreviousStep,
  handleSubmit,
  isValid,
  termsAccepted,
}: FormikStepperProps) {
  const stepsCount = React.Children.count(children);

  return (
    <div>
      <div className="progress mb-4">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${(currentStep / stepsCount) * 100}%` }}
          aria-valuenow={currentStep}
          aria-valuemin={1}
          aria-valuemax={stepsCount}
        />
      </div>

      {React.Children.map(children, (child, index) => {
        if (index === currentStep - 1) {
          return child;
        }
        return null;
      })}

      <div className="d-flex justify-content-between mt-4">
        {currentStep > 1 && (
          <button type="button" className="btn mr-20 px-2 Confirm__Button2 " onClick={handlePreviousStep}>
            Précédent
          </button>
        )}
        {currentStep < stepsCount && (
          <button type="button" className="btn px-2 Confirm__Button " onClick={handleNextStep}>
            Suivant
          </button>
        )}
        {currentStep === stepsCount && (
          <button
            type="button"
            className="px-2 Confirm__Button"
            onClick={handleSubmit}
            disabled={!isValid || !termsAccepted}
          >
            {'Ajouter'}
          </button>
        )}
      </div>
    </div>
  );
}
function getRequiredErrors(): React.SetStateAction<{}> {
  throw new Error('Function not implemented.');
}

