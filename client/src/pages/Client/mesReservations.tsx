import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../context/store';
import { deleteReservationById, fetchClientReservations } from '../../context/features/ServiceSlice';
import { retrieveUserSession } from '../../lib/Encryption';
import DefaultService from "../../assets/images/DefaultService.png"
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { RxCross2 } from 'react-icons/rx';
import { IoDownloadOutline } from 'react-icons/io5';
import LogoBlack from "../../assets/icons/LogoBlack.png"

const MesReservations = () => {
  const dispatch = useDispatch<AppDispatch>();
  const reservations = useSelector((state: RootState) => state.services.reservations);
  const user = retrieveUserSession();

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchClientReservations(user._id));
    }
  }, [dispatch, user?._id]);

  const getTimePeriod = (timeString: string) => (parseInt(timeString.split(':')[0], 10) >= 12 ? ' PM' : ' AM');

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

  // const handleGenerateDocument = (reservation: any) => {
  //   // Create a new PDF document
  //   const doc = new jsPDF();
    
  //   // Add reservation information to the PDF
  //   doc.text(`Nom du service: ${reservation.service.nom}`, 10, 10);
  //   doc.text(`Code Reservation: ${reservation.code}`, 10, 20);
  //   doc.text(`Date: ${reservation.dateReservation}`, 10, 30);
  //   doc.text(`Heure: ${reservation.heureReservation}${getTimePeriod(reservation.heureReservation)}`, 10, 40);
  //   doc.text(`Ville: ${reservation.ville}`, 10, 50);
  //   doc.text(`Adresse: ${reservation.adresse}`, 10, 60);
  //   if (reservation.couponCode && reservation.priceAfterDiscount) {
  //     doc.text(`Coupon: ${reservation.couponCode}`, 10, 70);
  //     doc.text(`Prix Aprés Réduction: ${reservation.priceAfterDiscount} DHS`, 10, 80);
  //   }

  //   // Save the PDF as a blob
  //   doc.save('reservation.pdf');
  // };

// const handleGenerateDocument = (reservation: any) => {
//   // Create a new PDF document
//   const doc = new jsPDF();

//   // Add logo
//   const logo = new Image();
//   logo.src = LogoBlack;
//   doc.addImage(logo, 'PNG', 10, 10, 50, 20);

//   // Add paragraph
//   const paragraph = `
//     Ce document est obligatoire lors du rendez-vous pour bénéficier du service
//     réservé.Veuillez le présenter au responsable de la station-service
//     pour vérification.
//   `;
//   doc.text(paragraph, 10, 40);

//   const reservationInfo = `
//   Nom du service: ${reservation.service.nom}
//   Code Reservation: ${reservation.code}
//   Date: ${reservation.dateReservation}
//   Heure: ${reservation.heureReservation}${getTimePeriod(reservation.heureReservation)}
//   Ville: ${reservation.ville}
//   Adresse: ${reservation.adresse}
//   ${(reservation.couponCode && reservation.priceAfterDiscount) ? `
//     Coupon: ${reservation.couponCode}
//     Prix Aprés Réduction: ${reservation.priceAfterDiscount} DHS
//   ` : ''}
// `;

// // Split the reservation info into an array of lines
// const reservationInfoLines = reservationInfo.split('\n');

// // Add reservation information as a table
// const startX = 10;
// const startY = 70;
// const lineHeight = 10;
// reservationInfoLines.forEach((line, index) => {
//   doc.text(line, startX, startY + index * lineHeight);
// });
//   // Styling
//   doc.setFontSize(14);
//   doc.setTextColor(30, 30, 30);

//   // Save the PDF as a blob
//   doc.save('reservation.pdf');
// };

const handleGenerateDocument = (reservation: any) => {
  // Create a new PDF document
  const doc = new jsPDF({
    orientation: 'l', // landscape orientation
    unit: 'mm',
    format: 'a4', // A4 format
  });

  // Add logo
  const logo = new Image();
  logo.src = LogoBlack;
  doc.addImage(logo, 'PNG', 10, 10, 50, 20);

  // Add attention message
  doc.setFontSize(12);
  doc.text('Attention: Ce document est obligatoire lors du rendez-vous pour bénéficier du service réservé. Veuillez le présenter au responsable de la station-service\n pour vérification.', 10, 40);

  // Add reservation information
  doc.setFontSize(14);
  doc.text('Nom du service', 10, 70);
  doc.text('Code Reservation', 10, 80);
  doc.text('Date', 10, 90);
  doc.text('Heure', 10, 100);
  doc.text('Ville', 10, 110);
  doc.text('Adresse', 10, 120);
  if (reservation.couponCode && reservation.priceAfterDiscount) {
    doc.text('Coupon', 10, 130);
    doc.text('Prix Aprés Réduction', 10, 140);
  }

  // Add reservation data
  doc.text(reservation.service.nom, 110, 70);
  doc.text(reservation.code, 110, 80);
  doc.text(reservation.dateReservation, 110, 90);
  doc.text(`${reservation.heureReservation} ${getTimePeriod(reservation.heureReservation)}`, 110, 100);
  doc.text(reservation.ville, 110, 110);
  doc.text(reservation.adresse, 110, 120);
  if (reservation.couponCode && reservation.priceAfterDiscount) {
    doc.text(reservation.couponCode, 110, 130);
    doc.text(`${reservation.priceAfterDiscount} DHS`, 110, 140);
  }

  // Save the PDF as a blob
  doc.save('reservation.pdf');
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
              <img src={reservation.service.image ? `data:image/png;base64,${reservation.service.image.buffer}` : DefaultService} alt={reservation.nom} className="w-full h-56 object-cover" draggable="false" />
              <div className="px-4 py-4 flex-grow">
                <h2 className="text-xl font-semibold text-gray-800">{reservation.service.nom}</h2>
                <p className="text-gray-600 mt-2"><span className="font-bold">Code Reservation:</span> #{reservation.code}</p>
                <p className="text-gray-600"><span className="font-bold">Date:</span> {reservation.dateReservation}</p>
                <p className="text-gray-600"><span className="font-bold">Heure:</span> {reservation.heureReservation}{getTimePeriod(reservation.heureReservation)}</p>
                <p className="text-gray-600"><span className="font-bold">Ville:</span> {reservation.ville}</p>
                <p className="text-gray-600"><span className="font-bold">Adresse:</span> {reservation.adresse}</p>
                {(reservation.couponCode && reservation.priceAfterDiscount) && (
                  <>
                    <p className="text-gray-600"><span className="font-bold">Coupon:</span> #{reservation.couponCode}</p>
                    <p className="text-gray-600"><span className="font-bold">Prix Aprés Réduction:</span> {reservation.priceAfterDiscount} DHS</p>
                  </>
                )}
              </div>
              <div className="flex justify-between mt-4">
                <button onClick={() => handleCancelReservation(reservation._id)} className=" text-sm w-1/2 flex items-center justify-center px-4 py-2 bg-red-600 text-white hover:bg-red-700">
                  <RxCross2 className="w-5 h-5 mr-2" /> Annuler
                </button>
                <button onClick={() => handleGenerateDocument(reservation)} className=" text-sm w-1/2 flex items-center justify-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">
                  <IoDownloadOutline className="w-5 h-5 mr-2" /> Télécharger
                </button>
              </div>
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
