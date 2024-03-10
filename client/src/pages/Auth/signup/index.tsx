import React, { useState, useRef } from 'react';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'
import { AppDispatch } from '../../../context/store';
import { handleSignup } from '../../../context/features/AuthSlice';
import { Link } from 'react-router-dom';
import defaultIMG from '../../../assets/images/defaultUser.png'
import Header from '../../../components/Header';
import Logo from '../../../assets/icons/LogoBlack.png';
const index :React.FC= () => {

  interface FormData {
    username: string;
    email: string;
    phone: string;
    password: string;
    CNI: string;
    image:  File | null;
  }
 
  
  const dispatch = useDispatch<AppDispatch>()
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    phone: '',
    password: '',
    CNI: '',
    image: null,
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [confirmPassword, setConfirmPassword] = useState('');
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




  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: files[0], 
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

 

  const handleConfirmPasswordChange = (e:any) => {
    setConfirmPassword(e.target.value);
  };

  const validatePasswordConfirmation = (value:any) => {
    if (value !== formData.password) {
      return 'Les mots de passe ne correspondent pas.';
    }
  };

  const handleSubmit = async () => {
    const passwordError = validatePasswordConfirmation(confirmPassword);
    const emailError = validateEmail(formData.email);
    if (passwordError || emailError || !isPasswordValid(formData.password)) {
       Swal.fire('Oops!', 'Veuillez vérifier les champs.', 'error');
      return;
    }
    try {
      console.log(formData);
      dispatch(handleSignup(formData));
    } catch (error) {
      console.log('Error submitting form:', error);
    
  } 
};
 
  return (
    <>
    <Header />
    <Formik initialValues={formData} onSubmit={handleSubmit}>
      {({ isValid  }) => (
        
        <div className="md:px-60 p-14">
        <div className="space-y-4 sm:w-full ">
          <img src={Logo} alt="Logo" />
         </div>
         <div className='mt-5'>
         <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">S'inscrire</h1>
         </div>
       
           
          <div className="Sign__content">
            <p className="text-center">
              Avez-vous déjà un Compte?
             
              <Link to="/">- Connectez-vous ici</Link>
            </p>
            <h1 className="text-center  mx-auto mb-5 Sign__Title">Créer votre compte </h1>


            <FormikStepper
              currentStep={currentStep}
              handleNextStep={handleNextStep}
              handlePreviousStep={handlePreviousStep}
              handleSubmit={handleSubmit}
              isValid={isValid}
              
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
              <div className="flex items-center justify-center Margin__Input__Buttom">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="image">
                <div className="image-container">
                  {formData.image ? (
                    <img src={URL.createObjectURL(formData.image)} alt="profile" className="profile-image" />
                  ) : (
                    <img src={defaultIMG} alt="default" className="default-image" />
                  )}
                  {/* <FiUpload className="upload-icon" /> */}
                </div>
              </label>
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
             </div>                
              </Form>
            </FormikStepper>

            <hr />
          
          </div>
        </div>
      )}
    </Formik>
    </>
    
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

      <div className="flex justify-between mt-4">
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
            disabled={!isValid }
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

