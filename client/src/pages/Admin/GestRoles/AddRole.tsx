import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../context/store";


interface Props {
  show: boolean;
  handleClose: () => void;
}

const AddPompiste: React.FC<Props> = ({ show, handleClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.pompistes);


  interface FormData {
  
  }
  const [formData, setFormData] = useState<FormData>({
   
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = () => {
   
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

export default AddPompiste;
