import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../context/store";
import { createService, fetchServices } from "../../../context/features/ServiceSlice";
import vivo from '../../../assets/images/services/Plein .jpg';

interface Props {
  show: boolean;
  handleClose: () => void;
}

const AddService: React.FC<Props> = ({ show, handleClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.services);

  const [formData, setFormData] = useState({
    nom: '',
    prix: 0,
    description: '',
    image: null,
  });

  const handleSubmit = () => {
    dispatch(createService(formData)).then(() => {
      setFormData({
        nom: '',
        prix: 0,
        description: '',
        image: null,
      });
      handleClose();
      dispatch(fetchServices());

    });
  };

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (name !== 'image') {
      if (name === 'prix') {
        const prix = parseFloat(value);
        if (!isNaN(prix)) {
          setFormData(prevFormData => ({
            ...prevFormData,
            [name]: prix
          }));
        }
      } else {
        setFormData(prevFormData => ({
          ...prevFormData,
          [name]: value
        }));
      }
    } else {
      if (files && files.length > 0) {
        const selectedImage = files[0];
        setFormData(prevFormData => ({
          ...prevFormData,
          image: selectedImage
        }));
      }
    }
  };
 

  return (
    <div>
      {show && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Ajouter un nouveau Service</h3>
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
                        src={URL.createObjectURL(formData.image)}
                        alt="profile"
                        className="object-cover p-1 "
                      />
                    ) : (
                      <img src={vivo} alt="default" className="object-cover w-30 h-30 p-1" />
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
                  required
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
                  required
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
                  required
                />
              </div>
            </div>

            <div className="flex justify-between">
              <button
                className="btn bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded "
                onClick={handleSubmit}
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
    </div>
  );
}


export default AddService;
