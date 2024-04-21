import React, { useRef, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../context/store';
import { MuiOtpInput } from 'mui-one-time-password-input';
import Header from '../../../components/shared/Header';
import Logo from '../../../assets/icons/LogoBlack.png';
import Swal from 'sweetalert2';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { emailRegex, passwordRegex, valdationCodeRegex } from '../../../utils/Regex';
import { forgotPassword, resetPassword } from '../../../context/features/ResetPasswordSlice';
import Spinner from '../../../components/status/Spinner';

interface FormData {
  email: string;
  code: string;
  password: string;
}

const Index: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    code: '',
    password: '',
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [validationCodeError, setValidationCodeError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const passwordVerifyRef = useRef(null);
  const result = useSelector((state: RootState) => state.resetPassword.result);
  const isLoading = useSelector((state: RootState) => state.resetPassword.isLoading);

  const getPasswordStrength = (password: any) => {
    if (!password) return 0; // Handle empty password case
    if (password.length <= 4) return 1; // Very weak
    if (password.length <= 6) return 2; // Weak
    if (password.length <= 8 && /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) return 3; // Moderate
    if (password.length <= 12 && /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/.test(password)) return 4; // Strong
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) return 4; // Very strong
    return 0;  
  };


  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const validatePasswordConfirmation = (value: string) => {
    if (value !== formData.password) {
      return 'Les mots de passe ne correspondent pas.';
    }
  };

  const handlePasswordVerifyChange = (e:any) => {
    passwordVerifyRef.current = e.target.value;
  };


  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    let error = '';
    switch(name){
      case 'email':
        if (!emailRegex.test(value)) {
          error = 'Adresse e-mail invalide';
        } else {
            error = ''; 
        }
        break;
      case 'password':
        if (!passwordRegex.test(value)) {
          error = 'Le mot de passe doit contenir au moins 8 caractères, une lettre et un chiffre';
        } else {
            error = ''; 
        }
        break;
    }
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const handleChange = (otp: string) => {
    if(valdationCodeRegex.test(otp)){
      setValidationCodeError(false);
      setFormData(prevState => ({
        ...prevState,
        code: otp,
      }));
    }else{
      setValidationCodeError(true);
    }
  };

  console.log(formData)
  console.log(result)
  const handleSubmit = async () => {
    if (currentStep === 1) {
      const hasErrors = Object.values(errors).some(error => error !== '');
      if (hasErrors) {
          Swal.fire('Oops!', 'Veuillez vérifier le formulaire.', 'error');
          return;
      }
      dispatch(forgotPassword({email: formData.email}));
      handleNextStep();
    } else if (currentStep === 2) {
      const isEmptyField = Object.entries(formData).some(([key, value]) => key && value === '');
      if (isEmptyField) {
          Swal.fire('Oops!', 'Veuillez remplir tous les champs.', 'error');
          return;
      }
      const hasErrors = Object.values(errors).some(error => error !== '');
      if (hasErrors) {
          Swal.fire('Oops!', 'Veuillez vérifier le formulaire.', 'error');
          return;
      }
      const passwordError = validatePasswordConfirmation(confirmPassword);
      if (passwordError) {
          Swal.fire('Oops!', 'Veuillez vérifier le Mot de passe.', 'error');
          return;
      }
      try {
        dispatch(resetPassword(
          {
            code: formData.code,
            password: formData.password
          }
        ));
      } catch (error) {
        console.log('Error submitting form:', error);
      }
    }
  };


  return (
  <>
    <Header />
    <div className=" h-full">
      {isLoading && <Spinner/>}
      <div className="md:px-60 p-14">
        <div className="space-y-4 sm:w-full ">
          <img src={Logo} alt="Logo" />
          <div>
            <h1 className=" mt-2 text-xl font-bold leading-tight tracking-tight md:text-2xl">Réinitialisation Mot de passe</h1>
          </div>
        {currentStep === 1 && (
          <>
            <p>Pour réinitialiser votre mot de passe, veuillez entrer l'adresse e-mail associée à votre compte.</p>
            <Formik initialValues={formData} onSubmit={handleSubmit}>
              <Form className="Sign__form">
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
                </div>
                <button type="submit" className="btn px-2 Confirm__Button ">
                  Suivant
                </button>
              </Form>
            </Formik>
          </>
        )}
        {currentStep === 2 && (
          <>
            <p>Enter the code sent to your email and set a new password.</p>
            <Formik initialValues={formData} onSubmit={handleSubmit}>
              <Form className="Sign__form ">
                {/* Code Input */}
                <MuiOtpInput value={formData.code} onChange={handleChange} className="flex justify-center items-center" />
                {validationCodeError && <div className="text-red-400 my-2">Only digits are allowed.</div>}
                {/* Password Input */}
                <div className="Margin__Input__Buttom relative">
                  <label htmlFor="password" className="Input_Label">
                    Mot de passe
                  </label>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="form-control Input__Style"
                    minLength={6}
                    value={formData.password}
                    onChange={handleInputChange}
                    onCopy={(e: { preventDefault: () => void; }) => {
                      e.preventDefault();
                    }}
                    onCut={(e: { preventDefault: () => void; }) => {
                      e.preventDefault();
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-2 text-green-900"
                    style={{ top: '50%', transform: 'translateY(-32%)' }}
                  >
                    {showPassword ? <FiEyeOff/> : <FiEye />}
                  </button>
                  {/* Password Strength Bar */}
                  <div className="password-strength-bar">
                    <div className={`strength strength-${getPasswordStrength(formData.password)}`} />
                  </div>
                </div>
                {/* Confirm Password Input */}
                <div className={`Margin__Input__Buttom relative ${formData.password && passwordVerifyRef.current && formData.password !== passwordVerifyRef.current ? 'has-error' : ''}`}>
                  <label htmlFor="confirmPassword" className="Input_Label">
                    Confirm Mot de passe
                  </label>
                  <Field
                    type='password'
                    name="confirmPassword"
                    className={`form-control Input__Style ${
                      formData.password && passwordVerifyRef.current && formData.password !== passwordVerifyRef.current
                        ? 'is-invalid'
                        : ''
                    }`}
                    onChange={handleConfirmPasswordChange}
                    onBlur={handlePasswordVerifyChange}
                    value={confirmPassword}
                    required
                  />
                  {formData.password && passwordVerifyRef.current && formData.password !== passwordVerifyRef.current && (
                    <div className="text-red-400">Les mots de passe ne correspondent pas.</div>
                  )}
                </div>
                {/* Form Navigation Buttons */}
                <div className="flex justify-between mt-4">
                  <button type="button" className="btn mr-20 px-2 Confirm__Button2" onClick={() => setCurrentStep((prevStep) => prevStep - 1)}>
                    Précédent
                  </button>
                  <button type="submit" className="btn px-2 Confirm__Button" onClick={handleSubmit}>
                    Suivant
                  </button>
                </div>
              </Form>
            </Formik>
          </>
        )}
      </div>
    </div>
    </div>
  </>
  );
};

export default Index;

interface FormikStepperProps {
  children: React.ReactNode;
  currentStep: number;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleSubmit: () => void;
  isValid: boolean;
}

export function FormikStepper({
  children,
  currentStep,
  handleNextStep,
  handlePreviousStep,
  handleSubmit,
  isValid,
}: FormikStepperProps) {
  const stepsCount = React.Children.count(children);

  return (
    <div>
      <div className="progress mb-4">
        <div className="progress-bar" role="progressbar" style={{ width: `${(currentStep / stepsCount) * 100}%` }} aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={stepsCount} />
      </div>
      {React.Children.map(children, (child, index) => {
        if (index === currentStep - 1) {
          return child;
        }
        return null;
      })}
      <div className="flex justify-between mt-4">
        {currentStep > 1 && (
          <button type="button" className="btn mr-20 px-2 Confirm__Button2" onClick={handlePreviousStep}>
            Précédent
          </button>
        )}
        {currentStep < stepsCount && (
          <button type="button" className="btn px-2 Confirm__Button " onClick={handleNextStep}>
            Suivant
          </button>
        )}
        {currentStep === stepsCount && (
          <button type="button" className="px-2 Confirm__Button" onClick={handleSubmit} disabled={!isValid}>
            {'Ajouter'}
          </button>
        )}
      </div>
    </div>
  );
}
