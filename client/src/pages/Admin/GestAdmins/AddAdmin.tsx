import React, {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../context/store";
import defaultIMG from '../../../assets/images/defaultUser.png';
import { emailRegex, phoneRegex, usernameRegex } from '../../../lib/Regex';
import { createAdmin, fetchAdmins } from "../../../context/features/AdminSlice";
import { fetchRoles } from "../../../context/features/RoleSlice";
import { Role } from "../../../types/Role";

interface Props {
  show: boolean;
  handleClose: () => void;
}

const AddAdmin: React.FC<Props> = ({ show, handleClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.pompistes);
  const { roles }: { roles: Role[] } = useSelector((state: RootState) => state.roles);


  useEffect(()=> {
    dispatch(fetchRoles())
  },[])
  interface FormData {
    username: string;
    email: string;
    phone: string;
    password: string;
    CIN: string;
    adminRole: string ;
    image: File | null;
   
  }
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    phone: '',
    password: '',
    CIN: '',
    adminRole: '',
    image: null,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = () => {
    if (validateFormData()) {
      dispatch(createAdmin(formData)).then(() => {
        handleClose();
        dispatch(fetchAdmins());
      });
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (e.target.nodeName === 'INPUT' && e.target.type === 'file') {
      const files = (e.target as HTMLInputElement).files;
      if (name === 'image' && files && files.length > 0) {
        const selectedImage = files[0];
        setFormData(prevFormData => ({
          ...prevFormData,
          image: selectedImage
        }));
      }
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };
  
  
  

  const validateFormData = () => {
    const { username, email, phone, password, CIN ,adminRole} = formData;
    if (!username || !adminRole || !email || !phone || !password || !CIN) {
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
              <h3 className="modal-title">Ajouter un nouveau Pompiste</h3>
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
                  <div className="image-container ring-2 ring-green-300 dark:ring-green-500 relative group">
                    {formData.image ? (
                      <img src={URL.createObjectURL(formData.image)} alt="profile" className="object-cover w-30 h-30 p-1 rounded-full" />
                    ) : (
                        <img src={defaultIMG} alt="default" className="object-cover w-30 h-30 p-1 rounded-full" />
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
                <label htmlFor="adminRole" className="block mb-2 text-sm font-medium Input_Label">
                    Rôle
                </label>
                <select
                    name="adminRole"
                    id="adminRole"
                    className="Input__Style w-full"
                    value={formData.adminRole}
                    onChange={handleChange}
                >
                    <option value="">Sélectionner un rôle</option>
                    {roles.map(role => (
                    <option key={role._id} value={role._id}>
                        {role.name}
                    </option>
                    ))}
                </select>
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

export default AddAdmin;
