import React, { useEffect, useState } from 'react';
import { retrieveUserSession, updateUserSession } from '../../lib/Encryption';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import "./style.css"
import defaultIMG from '../../assets/images/defaultUser.png'
import { emailRegex, passwordRegex, phoneRegex, usernameRegex } from '../../utils/Regex';
import { AppDispatch } from '../../context/store';
import { AddAPhotoOutlined } from '@mui/icons-material';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { updateProfileAdmin } from '../../context/features/AdminSlice';

const AdminProfile: React.FC = () => {
  const [showPasswordpart, setShowPasswordpart] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    oldPassword: '',
    newPassword: '',
    image: null as File | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmPassword, setConfirmPassword] = useState('');
  const passwordVerifyRef = React.useRef(null);
  const dispatch = useDispatch<AppDispatch>();
  const user = retrieveUserSession();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setFormData({
      username: user.username,
      email: user.email,
      phone: user.phone,
      oldPassword: '',
      newPassword: '',
      image: null,
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    let error = '';

    if (name === 'image' && files && files.length > 0) {
      const selectedImage = files[0];
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: selectedImage,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));

      switch (name) {
        case 'phone':
          error = phoneRegex.test(value) ? '' : 'Le numéro de téléphone n\'est pas valide';
          break;
        case 'password':
          error = passwordRegex.test(value)
            ? ''
            : 'Le mot de passe doit contenir au moins 8 caractères, une lettre et un chiffre';
          break;
        case 'email':
          error = emailRegex.test(value) ? '' : 'Adresse e-mail invalide';
          break;
        case 'username':
          error = usernameRegex.test(value) ? '' : 'Le nom d\'utilisateur ne doit contenir que des lettres.';
          break;
        default:
          break;
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    }
  };

  const togglePasswordVisibility = (tag: string) => {
    switch(tag){
      case 'old':
        setShowOldPassword((prevShowPassword) => !prevShowPassword);
        break;
      case 'new': 
        setShowNewPassword((prevShowPassword) => !prevShowPassword);
        break;
      case 'confirm':
        setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
        break;
      default:
        break;
    }
  };

  const getPasswordStrength = (password: any) => {
    if (!password) return 0; 
    if (password.length <= 4) return 1; 
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
    return value !== formData.newPassword ? 'Les mots de passe ne correspondent pas.' : '';
  };

  const handleSubmit = async () => {

    const updatingPassword = formData.oldPassword || formData.newPassword || confirmPassword;
  
    // If user is updating password, ensure all three fields are filled
    if (updatingPassword && (!formData.oldPassword || !formData.newPassword || !confirmPassword)) {
      Swal.fire('Oops!', 'Please fill in all password fields.', 'error');
      return;
    }

    const hasErrors = Object.values(errors).some((error) => error !== '');
    if (hasErrors) {
      Swal.fire('Oops!', 'Veuillez vérifier le formulaire.', 'error');
      return;
    }

    const passwordError = validatePasswordConfirmation(confirmPassword);
    if (passwordError) {
      Swal.fire('Oops!', 'Veuillez vérifier le Mot de passe.', 'error');
      return;
    }

    await dispatch(updateProfileAdmin({ Id: user._id, formData })).then(() => {
      updateUserSession("/admins", user._id);
    });
  };

  const handlePasswordVerifyChange = (e:any) => {
    passwordVerifyRef.current = e.target.value;
  };

  return (
    <div className="container my-8">
      <main className="w-full min-h-screen">
        <div className="p-2 md:p-4">
          <div className="w-full sm:rounded-lg">
            <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>
            <div className="grid max-w-2xl mx-auto mt-8">
              <div className=" relative flex flex-col  justify-center items-center sm:flex-row space-y-5 sm:space-y-0 sm:space-x-4">
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="image">
                  <div className="image-container ring-2 ring-green-300 dark:ring-green-500 relative group">
                    {formData.image ? (
                      <img src={URL.createObjectURL(formData.image)} alt="profile" className="object-cover w-40 h-40 p-1 rounded-full" />
                    ) : (
                      <img src={user.image?.buffer? `data:image/png;base64,${user.image.buffer}`: defaultIMG}
                       alt="default" className="object-cover w-40 h-40 p-1 rounded-full" />
                    )}
                    <div className="overlay opacity-0 group-hover:opacity-100 absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50 text-white transition-opacity">
                      <AddAPhotoOutlined sx={{ fontSize: 32, mb: 2 }} />
                      <span className='w-24'>Update profile picture</span>
                    </div>
                  </div>
                </label>
              </div>
              <div className="items-center mt-8 sm:mt-14 text-[#80BD0A]">
                <div className="flex flex-col w-full space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <div className="w-full">
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-green-900"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="bg-green-50 outline-none border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
                      placeholder="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      name="username"
                    />
                    {errors.email && (
                    <div className="text-red-400">{errors.username}</div>
                  )}
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-green-900"
                    >
                      Telephone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="bg-green-50 outline-none border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
                      placeholder="Telephone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      name="phone"
                    />
                    {errors.phone && (
                      <div className="text-red-400">{errors.phone}</div>
                    )}
                  </div>
                </div>
                <div className="mb-2 sm:mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-green-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-green-50 outline-none border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
                    placeholder="your.email@mail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    name="email"
                  />
                  {errors.email && (
                    <div className="text-red-400">{errors.email}</div>
                  )}
                </div>
                {showPasswordpart && (
                  <>
                    <div className="mb-2 relative sm:mb-6">
                      <label
                        htmlFor="oldPassword"
                        className="block mb-2 text-sm font-medium text-green-900"
                      >
                        Old password
                      </label>
                      <input
                        type={showOldPassword ? 'text' : 'password'}
                        id="oldPassword"
                        className="mb-2 outline-none bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
                        placeholder="your old password..."
                        required
                        name="oldPassword"
                        onChange={handleInputChange}
                      />
                      <div className="absolute h-24 inset-y-0 right-0 flex items-center pr-2">
                        <button type="button" onClick={() => togglePasswordVisibility('old')} className="focus:outline-none">
                          {showOldPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col w-full space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 mb-6 sm:mb-6">
                      <div className="w-full relative">
                        <label
                          htmlFor="newPassword"
                          className="block mb-2 text-sm font-medium text-green-900"
                        >
                          New Password
                        </label>
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          id="newPassword" 
                          className="mb-2 outline-none block p-2.5 w-full text-sm text-green-900 bg-green-50 rounded-lg border border-green-300 focus:ring-green-500 focus:border-green-500 "
                          placeholder="your new password..."
                          onChange={handleInputChange}
                          name="newPassword"
                          value={formData.newPassword}
                          minLength={6}
                          onCopy={(e) => {e.preventDefault();}}
                          onCut={(e) => {e.preventDefault();}}
                        />
                        <div className="absolute h-24 inset-y-0 right-0 flex items-center pr-2">
                          <button type="button" onClick={() => togglePasswordVisibility('new')} className="focus:outline-none">
                            {showNewPassword ? <FiEyeOff /> : <FiEye />}
                          </button>
                        </div>
                        <div className="password-strength-bar">
                          <div className={`strength strength-${getPasswordStrength(formData.newPassword)}`} />
                        </div>
                      </div>
                      <div className={`w-full relative ${formData.newPassword && passwordVerifyRef.current && formData.newPassword !== passwordVerifyRef.current ? 'has-error' : ''}`}>
                        <label
                          htmlFor="confirmPassword"
                          className="block mb-2 text-sm font-medium text-green-900"
                        >
                          Confirm Password
                        </label>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          id="confirmPassword"
                          className={`block p-2.5 w-full text-sm text-green-900 bg-green-50 rounded-lg border border-green-300 focus:ring-green-500 focus:border-green-500 outline-none 
                                    ${formData.newPassword && passwordVerifyRef.current && formData.newPassword !== passwordVerifyRef.current ? 'is-invalid' : ''}
                          `}
                          placeholder="password confirmation..."
                          value={confirmPassword}
                          onBlur={handlePasswordVerifyChange}
                          onChange={handleConfirmPasswordChange}
                          name="confirmPassword"
                        />
                        <div className="absolute h-24 inset-y-0 right-0 flex items-center pr-2">
                          <button type="button" onClick={() => togglePasswordVisibility('confirm')} className="focus:outline-none">
                            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <button className="mb-2" onClick={() => setShowPasswordpart((prev) => !prev)}>{showPasswordpart? "hide" : "Change password"}</button>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="text-white bg-primary-color hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminProfile;
