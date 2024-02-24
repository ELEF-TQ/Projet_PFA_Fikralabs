import React, { ChangeEvent, useEffect, useState } from "react";

interface Props {
  show: boolean;
  handleClose: () => void;
  Element:any;
}

const ViewPompiste: React.FC<Props> = ({ show, handleClose ,Element }) => {
 
  const initialFormData = {
    username: "",
    matriculeRH: "",
    CIN: "",
    phone: "",
    email: ""
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (!show) {
      setFormData(initialFormData);
    }
  }, [show]);

  const handleSubmit = () => {
    console.log("Submit", formData);
   
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <>
      {show && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Voir plus</h3>
            </div>
            <div className="modal-content">
              not confirmed yet
             </div>
            <div className="flex justify-between">
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

export default ViewPompiste;
