import React, { ChangeEvent, useEffect, useState } from 'react';
import { updatePompiste } from '../../../context/features/PompisteSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../context/store';

interface Props {
  show: boolean;
  handleClose: () => void;
  Element: any;
}

const EditPompiste: React.FC<Props> = ({ show, handleClose, Element }) => {

  const dispatch = useDispatch<AppDispatch>()
  const [formData, setFormData] = useState({
    username: "",
    matriculeRH: "",
    CIN: "",
    phone: "",
    email: ""
  });

  useEffect(() => {
    if (Element && show) {
      setFormData(Element); 
    } else {
      setFormData({
        username: "",
        matriculeRH: "",
        CIN: "",
        phone: "",
        email: ""
      });
    }
  }, [show, Element]);

  const handleSubmit = () => {
    console.log("Submit", formData);
    dispatch(updatePompiste({ Id: Element._id, formData }));  };

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
              <h3 className="modal-title">Modifier Pompiste</h3>
            </div>
            <div className="modal-content">
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
                  placeholder="Nom"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="matriculeRH"
                  className="block mb-2 text-sm font-medium Input_Label"
                >
                  Matricule
                </label>
                <input
                  type="text"
                  name="matriculeRH"
                  id="matriculeRH"
                  className="Input__Style w-full"
                  placeholder="Matricule"
                  value={formData.matriculeRH}
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
                  placeholder="CIN"
                  value={formData.CIN}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium Input_Label"
                >
                  Téléphone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="Input__Style w-full"
                  placeholder="Téléphone"
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
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button
                className="btn bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                onClick={handleSubmit}
              >
                Modifier
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

export default EditPompiste;
