import React, { useEffect, useState } from 'react';
import { retrieveUserSession } from '../../lib/Encryption';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { emailRegex, passwordRegex, phoneRegex, usernameRegex } from '../../utils/Regex';
import { updateProfilePompiste } from '../../context/features/PompisteSlice';
import { AppDispatch } from '../../context/store';

const Profile: React.FC = () => {
  const [showPasswordpart, setShowPasswordpart] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    oldPassword: '',
    NewPassword: '',
    image: null as File | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmPassword, setConfirmPassword] = useState('');
  const passwordVerifyRef = React.useRef(null);
  const dispatch = useDispatch<AppDispatch>();

  const user = retrieveUserSession();

  useEffect(() => {
    setFormData({
      username: user.username,
      email: user.email,
      phone: user.phone,
      oldPassword: '',
      NewPassword: '',
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
    return value !== formData.NewPassword ? 'Les mots de passe ne correspondent pas.' : '';
  };

  const handleSubmit = async () => {
    const isEmptyField = Object.values(formData).some((value) => value === '');
    if (isEmptyField) {
      Swal.fire('Oops!', 'Veuillez remplir tous les champs.', 'error');
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

    await dispatch(updateProfilePompiste({ Id: user.id, formData }));
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
              <div className="flex flex-col sm:flex-row items-center space-y-5 sm:space-y-0 sm:space-x-4">
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
                      <img src={URL.createObjectURL(formData.image)} alt="profile" className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-green-300 dark:ring-green-500" />
                    ) : (
                      <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                       alt="default" className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-green-300 dark:ring-green-500" />
                    )}
                  </div>
                </label>
              </div>
              <div className="items-center mt-8 sm:mt-14 text-[#80BD0A]">
                <div className="flex flex-col w-full space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <div className="w-full">
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-green-900"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
                      placeholder="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                      name="username"
                    />
                    {errors.email && (
                    <div className="text-red-400">{errors.username}</div>
                  )}
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="last_name"
                      className="block mb-2 text-sm font-medium text-green-900"
                    >
                      Telephone
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
                      placeholder="Your last name"
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
                    className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
                    placeholder="your.email@mail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    name="email"
                  />
                  {errors.email && (
                    <div className="text-red-400">{errors.email}</div>
                  )}
                </div>
                {showPasswordpart && (
                  <>
                    <div className="mb-2 sm:mb-6">
                      <label
                        htmlFor="profession"
                        className="block mb-2 text-sm font-medium text-green-900"
                      >
                        Old password
                      </label>
                      <input
                        type="password"
                        id="profession"
                        className="mb-2 bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
                        placeholder="your profession"
                        required
                        name="password"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 mb-6 sm:mb-6">
                      <div className="w-full">
                        <label
                          htmlFor="message"
                          className="block mb-2 text-sm font-medium text-green-900"
                        >
                          New Password
                        </label>
                        <input
                          id="password"
                          className="mb-2 block p-2.5 w-full text-sm text-green-900 bg-green-50 rounded-lg border border-green-300 focus:ring-green-500 focus:border-green-500 "
                          placeholder="password..."
                          defaultValue={""}
                          onChange={handleInputChange}
                          name="newPassword"
                          value={formData.NewPassword}
                          minLength={6}
                          onCopy={(e) => {e.preventDefault();}}
                          onCut={(e) => {e.preventDefault();}}
                        />
                        <div className="password-strength-bar">
                          <div className={`strength strength-${getPasswordStrength(formData.NewPassword)}`} />
                        </div>
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor="message"
                          className="block mb-2 text-sm font-medium text-green-900"
                        >
                          Confirm Password
                        </label>
                        <input
                          id="confirmPassword"
                          type='password'
                          className="block p-2.5 w-full text-sm text-green-900 bg-green-50 rounded-lg border border-green-300 focus:ring-green-500 focus:border-green-500 "
                          placeholder="password confirmation..."
                          value={confirmPassword}
                          onBlur={handlePasswordVerifyChange}
                          onChange={handleConfirmPasswordChange}
                          name="confirmPassword"
                        />
                      </div>
                    </div>
                  </>
                )}
                <button onClick={() => setShowPasswordpart((prev) => !prev)}>{showPasswordpart? "hide" : "Change password"}</button>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
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

export default Profile;
