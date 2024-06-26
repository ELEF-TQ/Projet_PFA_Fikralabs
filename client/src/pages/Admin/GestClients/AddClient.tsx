import React, { useState } from "react";
import { createClient, fetchClients } from "../../../context/features/ClientSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../context/store";
import defaultIMG from '../../../assets/images/defaultUser.png';
import { emailRegex, phoneRegex, usernameRegex } from '../../../lib/Regex';
import Swal from 'sweetalert2';

interface Props {
  show: boolean;
  handleClose: () => void;
}

const AddClient: React.FC<Props> = ({ show, handleClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {isLoading} = useSelector((state:RootState)=>state.clients)

  interface FormData {
    username: string;
    email: string;
    phone: string;
    password: string;
    CIN: string;
    image: File | null;
  }
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    phone: '',
    password: '',
    CIN: '',
    image: null,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = () => {
    if (validateFormData()) {
      dispatch(createClient(formData))
        .then(() => {
          handleClose();
          dispatch(fetchClients());
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Échec de l\'ajout du client'
          });
        });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files.length > 0) {
      const selectedImage = files[0];
      setFormData(prevFormData => ({
        ...prevFormData,
        image: selectedImage
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  const validateFormData = () => {
    const { username, email, phone, password, CIN } = formData;
    if (!username  || !email || !phone || !password || !CIN) {
      setErrorMessage('Veuillez remplir tous les champs!');
      return false;
    }

    if (!emailRegex.test(email)) {
      setErrorMessage('Veuillez saisir une adresse e-mail valide.');
      return false;
    }

    if (!phoneRegex.test(phone)) {
      setErrorMessage('Veuillez saisir un numéro de téléphone valide.');
      return false;
    }

    if (!usernameRegex.test(username)) {
      setErrorMessage('Veuillez saisir un nom d\'utilisateur valide.');
      return false;
    }

    setErrorMessage(null);
    return true;
  };

  const isAnyFieldEmpty = Object.values(formData).some(value => value === '');

  return (
    <>
      {show && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Ajouter un nouveau Client</h3>
            </div>
            <div className="modal-content">

              <div className="flex items-center justify-center Margin__Input__Buttom">
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="image">
                  <div className="image-container">
                    {formData.image ? (
                      <img src={URL.createObjectURL(formData.image)} alt="profile" className="profile-image" />
                    ) : (
                      <img src={defaultIMG} alt="default" className="default-image" />
                    )}
                  </div>
                </label>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium Input_Label"
                >
                  Nom
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="Input__Style w-full"
                  placeholder="nom"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="CIN"
                  className="block mb-2 text-sm font-medium Input_Label"
                >
                  CIN
                </label>
                <input
                  type="text"
                  name="CIN"
                  id="CIN"
                  className="Input__Style w-full"
                  placeholder="JC785"
                  value={formData.CIN}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium Input_Label"
                >
                  Telephone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="Input__Style w-full"
                  placeholder="0666666"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium Input_Label"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="Input__Style w-full"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium Input_Label"
                >
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="Input__Style w-full"
                  placeholder="*******"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            {errorMessage && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{errorMessage}</span>
              </div>
            )}
            <div className="flex justify-between">
              <button
                className={`btn bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded ${isAnyFieldEmpty ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleSubmit}
                disabled={isAnyFieldEmpty}
              >
                {isLoading ? 'En cours...' : 'Ajouter'}
              </button>
              <button
                className="btn bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                onClick={handleClose}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddClient;
