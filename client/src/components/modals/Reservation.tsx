import React, { ChangeEvent, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "rc-slider/assets/index.css";
import { addDays } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../context/store";
import { retrieveUserSession, updateUserSession } from "../../lib/Encryption";
import { fetchReservedCoupons } from "../../context/features/CouponSlice";
import GetUserGeolocation, { Coordinates } from "../../lib/GetUserGeolocation";
import { fetchNearestStations } from "../../context/features/StationSlice";
import { FiCalendar } from "react-icons/fi";
import { reserverService } from "../../context/features/ServiceSlice";
import { Service } from "../../types/Service";

interface Props {
  show: boolean;
  handleClose: () => void
  Service: any;
}

const Reservation: React.FC<Props> = ({ show, handleClose, Service }) => {
    const dispatch = useDispatch<AppDispatch>();
    const reservedCoupons = useSelector((state: RootState) => state.coupons.reservedCoupons);
    const [userCoordinates, setUserCoordinates] = useState<Coordinates | null>(null);
    const nearestStations = useSelector((state: RootState) => state.stations.nearestStations);
    const user = retrieveUserSession();

  const initialFormData = {
    clientId: user?._id,
    serviceId: Service?._id,
    dateReservation: null as Date | null,
    heureReservation: "",
    ville: "",
    adresse: "",
    couponCode:"" 
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    console.log(user);
    if (Service && show) {
      dispatch(fetchReservedCoupons(user._id));
      console.log(reservedCoupons)
      GetUserGeolocation()
      .then(coords => {
        setUserCoordinates(coords);
      })
      .catch(error => {
        console.error('Error getting user geolocation:', error);
        setUserCoordinates({ latitude: 30.427755, longitude: -9.598107 });
      });
    }else{
      setFormData(initialFormData);
    }
  }, [show, Service]);

  useEffect(() => {
    if (userCoordinates) {
      dispatch(fetchNearestStations(userCoordinates));
    }
    console.log(nearestStations)
  }, [userCoordinates, dispatch]);

  const handleSubmit = () => {
    console.log("Submit", formData);
    dispatch(reserverService(formData)).then(() => {
      updateUserSession("clients", user._id);
      dispatch(fetchReservedCoupons(user._id))
      handleClose();
    });
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = event.target;
    if(name === "ville"){
        setFormData({
            ...formData,
            [name]: value,
            adresse: ""
        });
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  

  const handleDateChange = (date: Date | null) => {
    setFormData({
      ...formData,
      dateReservation: date,
    });
  };

  const handleTimeChange = (time: string) => {
    setFormData({
      ...formData,
      heureReservation: time,
    });
  };

  const isAnyFieldEmpty = Object.entries(formData).some(([key, value]) => key !== 'couponCode' && value === '');

  return (
    <>
      {show && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Reserver le service "{Service.nom}"</h3>
            </div>
            <div className="modal-content">

                <div className="mb-4 relative">
                    <label htmlFor="dateReservation" className="block mb-2 text-sm font-medium Input_Label">
                        Date Reservation
                    </label>
                    <div className="relative">
                        <DatePicker
                        selected={formData.dateReservation}
                        onChange={handleDateChange}
                        className="Input__Style"
                        placeholderText="choisir une date"
                        minDate={addDays(new Date(), 0)}
                        isClearable
                        />
                        <FiCalendar className={`absolute ${formData.dateReservation? "left-40" : "left-44"} top-0 bottom-0 m-auto text-gray-500`} /> 
                    </div>
                </div>

                <div className="mb-4 relative">
                    <label htmlFor="heureReservation" className="block mb-2 text-sm font-medium Input_Label">
                        Heure de réservation
                    </label>
                    <div className="flex items-center">
                        <input
                        type="time"
                        name="heureReservation"
                        value={formData.heureReservation}
                        onChange={(e) => handleTimeChange(e.target.value)}
                        className="Input__Style w-full"
                        />
                        {formData.heureReservation && (
                        <span style={{left: "70px"}} className="absolute mr-2 text-gray-500">
                            {parseInt(formData.heureReservation.split(':')[0]) >= 12 ? 'PM' : 'AM'}
                        </span>
                        )}
                    </div>
                </div>


              <div className="mb-4">
                <label htmlFor="ville" className="block mb-2 text-sm font-medium Input_Label">
                  Ville
                </label>
                <select
                  name="ville"
                  value={formData.ville}
                  onChange={handleSelectChange}
                  className="Input__Style w-full"
                >
                  <option disabled value="">Choisir une ville</option>
                  {[...new Set(nearestStations.map((station) => station.city))].map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {formData.ville && (
                <div className="mb-4">
                  <label htmlFor="adresse" className="block mb-2 text-sm font-medium Input_Label">
                    Adresse
                  </label>
                  <select
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleSelectChange}
                    className="Input__Style w-full"
                  >
                    <option disabled value="">Choisir une adresse</option>
                    {nearestStations
                      .filter((station) => station.city === formData.ville)
                      .map((station) => (
                        <option key={station.address} value={station.address}>
                          {station.address} ({station.name})
                        </option>
                      ))}
                  </select>
                </div>
              )}

              {reservedCoupons.length > 0 && (
                <div className="mb-4">
                  <label htmlFor="couponCode" className="block mb-2 text-sm font-medium Input_Label">
                    Code coupon (optional)
                  </label>
                  <select
                    name="couponCode"
                    value={formData.couponCode}
                    onChange={handleSelectChange}
                    className="Input__Style w-full"
                  >
                    <option disabled value="">Choisir un coupon</option>
                    {reservedCoupons.map((coupon: any) => (
                      <option key={coupon.code} value={coupon.code}>
                        {coupon.code} (réduction: {coupon.reduction}%)
                      </option>
                    ))}
                  </select>
                </div>
              )}

            </div>
            <div className="flex justify-between">
              <button
                className="btn bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                onClick={handleClose}
              >
                Annuler
              </button>
              <button
                className={`btn bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded ${
                  isAnyFieldEmpty ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleSubmit}
                disabled={isAnyFieldEmpty}
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Reservation;
