// import React, { useRef, useState } from 'react';
// import { Formik, Form, Field } from 'formik';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../../../context/store';
// import { MuiOtpInput } from 'mui-one-time-password-input';
// import Header from '../../../components/Header';
// import Logo from '../../../assets/icons/LogoBlack.png';
// const Index: React.FC = () => {

 

//   interface FormData {
//     email: string;
//     code: string;
//     password: string;
//   }

//   const dispatch = useDispatch<AppDispatch>();
//   const [formData, setFormData] = useState<FormData>({
//     email: '',
//     code: '',
//     password: '',
//   });
//   const [currentStep, setCurrentStep] = useState(1);

  
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const passwordVerifyRef = useRef(null);

//   const getPasswordStrength = (password: any) => {
//     if (!password) return 0; // Handle empty password case
//     if (password.length <= 4) return 1; // Very weak
//     if (password.length <= 6) return 2; // Weak
//     if (password.length <= 8 && /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) return 3; // Moderate
//     if (password.length <= 12 && /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/.test(password)) return 4; // Strong
//     if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) return 4; // Very strong
//     return 0;  };


//   const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setConfirmPassword(e.target.value);
//   };

//   const validatePasswordConfirmation = (value: string) => {
//     if (value !== formData.password) {
//       return 'Les mots de passe ne correspondent pas.';
//     }
//   };

//   const handleNextStep = () => {
//     setCurrentStep((prevStep) => prevStep + 1);
//   };

  

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleChange = (otp: string) => {
//     setFormData(prevState => ({
//       ...prevState,
//       code: otp
//     }));
//   };

  

//   const handleSubmit = async () => {
//     if (currentStep === 1) {
//       // Handle email submission
//       // Add validation if necessary
//       // For simplicity, I'm assuming the email is valid here
//       handleNextStep(); 
//     } else if (currentStep === 2) {
//       // Handle code and password submission
//       // You can perform validation and dispatch actions here
//       try {
//         validatePasswordConfirmation(confirmPassword);
//         console.log(formData);
//         // dispatch(handleSignup(formData));
//         // Handle success or error response
//       } catch (error) {
//         console.log('Error submitting form:', error);
//       }
//     }
//   };


//   return (
//   <>
// <Header />
// <div className=" h-full">
    
//       <div className="md:px-60 p-14">
//         <div className="space-y-4 sm:w-full ">
//           <img src={Logo} alt="Logo" />
//           <div>
//             <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">réinitialisation Mot de passe</h1>
//           </div>
//         {currentStep === 1 && (
//           <>
//             <p>Pour réinitialiser votre mot de passe, veuillez entrer l'adresse e-mail associée à votre compte.</p>
//             <Formik initialValues={formData} onSubmit={handleSubmit}>
//               <Form className="Sign__form">
//               <div className={`Margin__Input__Buttom `}>
//                   <label htmlFor="name" className='Input_Label'>Email</label>
//                   <input
//                     type="text"
//                     className={`form-control Input__Style `}
//                     id="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 <button type="submit" className="btn px-2 Confirm__Button ">
//                   Suivant
//                 </button>
//               </Form>
//             </Formik>
//           </>
//         )}
//         {currentStep === 2 && (
//           <>
//             <p>Enter the code sent to your email and set a new password.</p>
//             <Formik initialValues={formData} onSubmit={handleSubmit}>
//               <Form className="Sign__form ">
//                 {/* Code Input */}
//                 <MuiOtpInput value={formData.code} onChange={handleChange} className="flex justify-center items-center" />
//                 {/* Password Input */}
//                 <div className="Margin__Input__Buttom">
//                   <label htmlFor="password" className="Input_Label">
//                     Mot de passe
//                   </label>
//                   <Field
//                     type="password"
//                     name="password"
//                     className="form-control Input__Style"
//                     minLength={6}
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     onCopy={(e: { preventDefault: () => void; }) => {
//                       e.preventDefault();
//                     }}
//                     onCut={(e: { preventDefault: () => void; }) => {
//                       e.preventDefault();
//                     }}
//                   />
//                   {/* Password Strength Bar */}
//                   <div className="password-strength-bar">
//                     <div className={`strength strength-${getPasswordStrength(formData.password)}`} />
//                   </div>
//                 </div>
//                 {/* Confirm Password Input */}
//                 <div className={`Margin__Input__Buttom ${formData.password && passwordVerifyRef.current && formData.password !== passwordVerifyRef.current ? 'has-error' : ''}`}>
//                   <label htmlFor="confirmPassword" className="Input_Label">
//                     Confirm Mot de passe
//                   </label>
//                   <Field
//                     type="password"
//                     name="confirmPassword"
//                     className={`form-control Input__Style ${
//                       formData.password && passwordVerifyRef.current && formData.password !== passwordVerifyRef.current
//                         ? 'is-invalid'
//                         : ''
//                     }`}
//                     onChange={handleConfirmPasswordChange}
//                     value={confirmPassword}
//                     required
//                   />
//                   {formData.password && passwordVerifyRef.current && formData.password !== passwordVerifyRef.current && (
//                     <div className="invalid-feedback">Les mots de passe ne correspondent pas.</div>
//                   )}
//                 </div>
//                 {/* Form Navigation Buttons */}
//                 <div className="flex justify-between mt-4">
//                   <button type="button" className="btn mr-20 px-2 Confirm__Button2" onClick={() => setCurrentStep((prevStep) => prevStep - 1)}>
//                     Précédent
//                   </button>
//                   <button type="submit" className="btn px-2 Confirm__Button">
//                     Suivant
//                   </button>
//                 </div>
//               </Form>
//             </Formik>
//           </>
//         )}
//       </div>
//     </div>
//     </div>
//     </>
//   );
// };

// export default Index;

// interface FormikStepperProps {
//   children: React.ReactNode;
//   currentStep: number;
//   handleNextStep: () => void;
//   handlePreviousStep: () => void;
//   handleSubmit: () => void;
//   isValid: boolean;
// }

// export function FormikStepper({
//   children,
//   currentStep,
//   handleNextStep,
//   handlePreviousStep,
//   handleSubmit,
//   isValid,
// }: FormikStepperProps) {
//   const stepsCount = React.Children.count(children);

//   return (
//     <div>
//       <div className="progress mb-4">
//         <div className="progress-bar" role="progressbar" style={{ width: `${(currentStep / stepsCount) * 100}%` }} aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={stepsCount} />
//       </div>
//       {React.Children.map(children, (child, index) => {
//         if (index === currentStep - 1) {
//           return child;
//         }
//         return null;
//       })}
//       <div className="flex justify-between mt-4">
//         {currentStep > 1 && (
//           <button type="button" className="btn mr-20 px-2 Confirm__Button2" onClick={handlePreviousStep}>
//             Précédent
//           </button>
//         )}
//         {currentStep < stepsCount && (
//           <button type="button" className="btn px-2 Confirm__Button " onClick={handleNextStep}>
//             Suivant
//           </button>
//         )}
//         {currentStep === stepsCount && (
//           <button type="button" className="px-2 Confirm__Button" onClick={handleSubmit} disabled={!isValid}>
//             {'Ajouter'}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }
