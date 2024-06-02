import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../context/store';
import { deleteReservationById, fetchClientReservations } from '../../context/features/ServiceSlice';
import { retrieveUserSession } from '../../utils/Encryption';
import DefaultService from "../../assets/images/DefaultService.png"
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { RxCross2 } from 'react-icons/rx';
import { IoDownloadOutline } from 'react-icons/io5';
import LogoBlack from "../../assets/icons/LogoBlack.png"
import { InfoOutlined } from '@mui/icons-material';

const MesReservations = () => {
  const dispatch = useDispatch<AppDispatch>();
  const reservations = useSelector((state: RootState) => state.services.reservations);
  const user = retrieveUserSession();

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchClientReservations(user._id));
    }
  }, []);

  const getTimePeriod = (timeString: string) => (parseInt(timeString.split(':')[0], 10) >= 12 ? ' PM' : ' AM');

  const handleCancelReservation = (reservationId: string) => {
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
    doc.setFont('normal')
    doc.setFontSize(12);
    doc.setTextColor("red")
    doc.text('Important : Ce document est requis lors de votre rendez-vous pour bénéficier du service réservé. Assurez-vous de le présenter au responsable de la station-service\npour validation.', 10, 45);

    const avatar = new Image();
    avatar.src = `data:image/png;base64,${user.image.buffer}`;
    doc.addImage(avatar, 'PNG', 100, 60, 30, 30);

    // client infos
    doc.setFont('normal')
    doc.setFontSize(12);
    doc.setTextColor("black")
    doc.text(`Nom:`,150, 60);
    doc.text(`CIN:`,150, 70);
    doc.text(`Email:`,150, 80);
    doc.text(`Télephone:`,150, 90);

    // client Data
    doc.text(user.username,180, 60);
    doc.text(user.CIN,180, 70);
    doc.text(user.email,180, 80);
    doc.text(user.phone,180, 90);

    // Add reservation information
    doc.setFont('normal')
    doc.setFontSize(14);
    doc.setTextColor("black")
    doc.text('Nom du service', 30, 110);
    doc.text('Code Reservation', 30, 120);
    doc.text('Date', 30, 130);
    doc.text('Heure', 30, 140);
    doc.text('Ville', 30, 150);
    doc.text('Adresse', 30, 160);
    if (reservation.couponCode && reservation.priceAfterDiscount) {
      doc.text('Coupon', 30, 170);
      doc.text('Prix Aprés Réduction', 30, 180);
    }

    // Add reservation data
    doc.text(reservation.service.nom, 140, 110);
    doc.text(`#${reservation.code}`, 140, 120);
    doc.text(reservation.dateReservation, 140, 130);
    doc.text(`${reservation.heureReservation} ${getTimePeriod(reservation.heureReservation)}`, 140, 140);
    doc.text(reservation.ville, 140, 150);
    doc.text(reservation.adresse, 140, 160);
    if (reservation.couponCode && reservation.priceAfterDiscount) {
      doc.text(`#${reservation.couponCode}`, 140, 170);
      doc.text(`${reservation.priceAfterDiscount.toFixed(2)} DHS`, 140, 180);
    }

    // Save the PDF as a blob
    doc.save('reservation.pdf');
  };



  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Mes Réservations</h1>
      <p className='mb-8 text-gray-700'>
        Consultez vos réservations passées : Accédez à une liste complète de toutes vos réservations de services effectuées auprès de nous.
      </p>
      {reservations.length === 0 ? (
        <div className="flex justify-center items-center">
          <div className="bg-yellow-100 text-yellow-800 p-6 rounded border border-yellow-400 max-w-2xl text-xl flex items-center">
          <InfoOutlined className="mr-2" />
            Aucun réservation pour le moment
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reservations.map((reservation: any) => (
            <div key={reservation._id} className="bg-white overflow-hidden shadow-lg rounded-lg mb-2 flex flex-col">
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
                    <p className="text-gray-600"><span className="font-bold">Prix Aprés Réduction:</span> {reservation.priceAfterDiscount.toFixed(2)} DHS</p>
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
