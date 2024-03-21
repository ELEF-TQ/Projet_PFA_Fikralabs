import React, { ChangeEvent, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { addDays } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../context/store";
import { createCoupon, fetchAllCoupons } from "../../../context/features/CouponSlice";

interface Props {
  show: boolean;
  handleClose: () => void;
}

const AddCoupon: React.FC<Props> = ({ show, handleClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialFormData = {
    reduction: 10,
    nbrDisponible: "",
    dateExpiration: null as Date | null,
    score: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (!show) {
      setFormData(initialFormData);
    }
  }, [show]);

  const handleSubmit = () => {
    console.log("Submit", formData);
    dispatch(createCoupon(formData)).then(() => {
      handleClose();
      dispatch(fetchAllCoupons());
    });
  };

  const handleSliderChange = (value: number | number[]) => {
    // Si la valeur est un tableau, prenez la première valeur
    const reductionValue = Array.isArray(value) ? value[0] : value;
    
    setFormData({
      ...formData,
      reduction: reductionValue,
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    // Parse the value as a float and handle NaN case
    const numericValue = parseFloat(value);
    const updatedValue = isNaN(numericValue) ? 0 : numericValue;

    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  const handleDateChange = (date: Date | null) => {
    setFormData({
      ...formData,
      dateExpiration: date,
    });
  };

  const isAnyFieldEmpty = Object.values(formData).some((value) => value === "");

  return (
    <>
      {show && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Ajouter un nouveau Coupon</h3>
            </div>
            <div className="modal-content">
              <div className="mb-4">
                <label htmlFor="reduction" className="block mb-2 text-sm font-medium Input_Label">
                  Reduction %
                </label>
                <Slider
                  min={10}
                  max={100}
                  step={5}
                  value={formData.reduction}
                  onChange={handleSliderChange}
                />
                <div className="text-center mt-2">{formData.reduction}%</div>
              </div>

              <div className="mb-4">
                <label htmlFor="nbrDisponible" className="block mb-2 text-sm font-medium Input_Label">
                  Nbr Disponible
                </label>
                <input
                  type="text"
                  name="nbrDisponible"
                  id="nbrDisponible"
                  className="Input__Style w-full"
                  placeholder="choisie le nbr de coupon"
                  value={formData.nbrDisponible}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="dateExpiration" className="block mb-2 text-sm font-medium Input_Label">
                  Date Expiration
                </label>
                <DatePicker
                    selected={formData.dateExpiration}
                    onChange={handleDateChange}
                    className="Input__Style w-full"
                    placeholderText="Selectionner une date"
                    minDate={addDays(new Date(), 1)} // Set the minimum date to tomorrow
                    isClearable // Ajoutez cette ligne pour ajouter un bouton de suppression à l'input
                />
              </div>

              <div className="mb-4">
                <label htmlFor="score" className="block mb-2 text-sm font-medium Input_Label">
                  Score
                </label>
                <input
                  type="text"
                  name="score"
                  id="score"
                  className="Input__Style w-full"
                  placeholder="Enter a score"
                  value={formData.score}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button
                className={`btn bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded ${
                  isAnyFieldEmpty ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleSubmit}
                disabled={isAnyFieldEmpty}
              >
                Ajouter
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

export default AddCoupon;
