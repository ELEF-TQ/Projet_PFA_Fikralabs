import React, {  useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../context/store';
import { fetchServices, updateService } from '../../../context/features/ServiceSlice';
import { Service } from '../../../types/Service';
import defaultIMG from '../../../assets/images/defaultUser.png';

interface Props {
  show: boolean;
  handleClose: () => void;
  Element: any; 
}

const EditService: React.FC<Props> = ({ show, handleClose, Element }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.services);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<Service>({ ...Element });

  useEffect(() => {
    setFormData({ ...Element });
  }, [show, Element]);

  const handleSubmit = () => {
    dispatch(updateService({ Id: Element._id, formData })).then(() => {
      handleClose();
      setErrorMessage(null);
      dispatch(fetchServices());
    });
  };

  const handleChange = (e: any) => {
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

  return (
    <>
      {show && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Modifier Service</h3>
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
                  <div className="Service__image__Container ring-2 ring-green-300 dark:ring-green-500 relative group">
                    {formData.image ? (
                      <img
                        src={formData.image} 
                        alt="profile"
                        className="object-cover p-1 "
                      />
                    ) : (
                      <img src={defaultIMG} alt="default" className="object-cover w-30 h-30 p-1 rounded-full" />
                    )}
                  </div>
                </label>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="nom"
                  className="block mb-2 text-sm font-medium Input_Label"
                >
                  Nom
                </label>
                <input
                  type="text"
                  name="nom"
                  id="nom"
                  className="Input__Style w-full"
                  placeholder="Nom"
                  value={formData.nom}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="prix"
                  className="block mb-2 text-sm font-medium Input_Label"
                >
                  Prix
                </label>
                <input
                  type="number"
                  name="prix"
                  id="prix"
                  className="Input__Style w-full"
                  placeholder="Prix"
                  value={formData.prix}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium Input_Label"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  className="Input__Style w-full"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              {errorMessage && (
                <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <span className="block sm:inline">{errorMessage}</span>
                </div>
              )}

              <div className="flex justify-between">
                <button
                  className="btn bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                  onClick={handleSubmit}
                >
                  {isLoading ? 'En cours...' : 'Modifier'}
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
        </div>
      )}
    </>
  );
};

export default EditService;
