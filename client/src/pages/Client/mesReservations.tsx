import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../context/store';
import { deleteReservationById, fetchClientReservations } from '../../context/features/ServiceSlice';
import { retrieveUserSession } from '../../lib/Encryption';
import DefaultService from "../../assets/images/DefaultService.png"
import { FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MesReservations = () => {
  const dispatch = useDispatch<AppDispatch>();
  const reservations = useSelector((state: RootState) => state.services.reservations);
  const user = retrieveUserSession();

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchClientReservations(user._id));
    }
  }, [dispatch, user?._id]);

  const handleCancelReservation = (reservationId: string) => {
    // Show confirmation dialog
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Voulez-vous vraiment annuler cette réservation?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, annuler!',
      cancelButtonText: 'Non!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteReservationById(reservationId)).then(() => {
            dispatch(fetchClientReservations(user?._id))
        })
      }
    });
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">Mes Réservations</h1>
      {reservations.length === 0 ? (
        <p className="text-gray-900 text-center">Aucune réservation trouvée</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reservations.map((reservation: any) => (
            <div key={reservation._id} className="bg-white overflow-hidden shadow-lg rounded-lg flex flex-col">
              <img src={reservation.service.image ? `data:image/png;base64,${reservation.service.image.buffer}` : DefaultService} alt={reservation.nom} className="w-full h-56 object-cover" />
              <div className="px-4 py-4 flex-grow">
                <h2 className="text-xl font-semibold text-gray-800">{reservation.service.nom}</h2>
                <p className="text-gray-600 mt-2">{reservation.code}</p>
                <p className="text-gray-600">Date: {reservation.dateReservation}</p>
                <p className="text-gray-600">Heure: {reservation.heureReservation}</p>
                <p className="text-gray-600">Ville: {reservation.ville}</p>
                <p className="text-gray-600">Adresse: {reservation.adresse}</p>
                {(reservation.couponCode && reservation.priceAfterDiscount) && (
                  <>
                    <p className="text-gray-600">Coupon: {reservation.couponCode}</p>
                    <p className="text-gray-600">Prix Aprés Réduction: {reservation.priceAfterDiscount}</p>
                  </>
                )}
              </div>
              <button onClick={() => handleCancelReservation(reservation._id)} className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                <FaTimes className="mr-2" /> Annuler Reservation
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MesReservations;












































// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../../context/store';
// import { useEffect } from 'react';
// import { fetchClientReservations } from '../../context/features/ServiceSlice';
// import { retrieveUserSession } from '../../lib/Encryption';
// import illustration from "../../assets/images/Ellipse 69.png";

// const MesReservations = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const reservations = useSelector((state: RootState) => state.services.reservations);
//   const user = retrieveUserSession();

//   useEffect(() => {
//     if (user?._id) {
//       dispatch(fetchClientReservations(user._id));
//     }
//   }, [dispatch, user?._id]);

//   return (
//     <>
//       <h1 className="text-4xl font-bold mb-8">Mes Réservations</h1>
//       <div className="grid grid-cols-1 gap-4">
//         {reservations.map((reservation: any) => (
//           <div key={reservation._id} className="bg-white overflow-hidden shadow-lg rounded-lg flex">
//             <img src={illustration} alt={reservation.nom} className="w-1/4 h-auto object-cover" />
//             <div className="w-3/4 px-2 py-2">
//               <h2 className="text-lg font-semibold text-gray-800">{reservation.service.nom}</h2>
//               <p className="text-sm text-gray-600 mt-1">{reservation.code}</p>
//               <div className="text-sm text-gray-600">
//                 <p>Date: {reservation.dateReservation}</p>
//                 <p>Heure: {reservation.heureReservation}</p>
//                 <p>Ville: {reservation.ville}</p>
//                 <p>Adresse: {reservation.adresse}</p>
//                 <p>Coupon: {reservation.couponCode}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default MesReservations;
