import React from 'react';
import { format } from 'date-fns'; // Import date-fns for formatting dates

interface ViewCouponProps {
  show: boolean;
  handleClose: () => void;
  Element: any;
}

const ViewCoupon: React.FC<ViewCouponProps> = ({ show, handleClose, Element }) => {
  if (!show || !Element) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">Voir le Coupon</h3>
        </div>
        <div className="modal-content p-4 bg-white rounded-md">
          <div className="mb-4">
            <label htmlFor="reduction" className="block mb-2 text-sm font-medium text-gray-600">
              Réduction %
            </label>
            <div className="text-center mt-2 text-2xl font-semibold text-green-500">{Element.reduction}%</div>
          </div>

          <div className="mb-4">
            <label htmlFor="nbrDisponible" className="block mb-2 text-sm font-medium text-gray-600">
              Nombre Disponible
            </label>
            <div className="text-center mt-2 text-lg font-semibold">{Element.nbrDisponible}</div>
          </div>

          <div className="mb-4">
            <label htmlFor="dateExpiration" className="block mb-2 text-sm font-medium text-gray-600">
              Date d'Expiration
            </label>
            <div className="text-center mt-2 text-lg">{format(new Date(Element.dateExpiration), 'dd/MM/yyyy')}</div>
          </div>

          <div className="mb-4">
            <label htmlFor="score" className="block mb-2 text-sm font-medium text-gray-600">
              Score
            </label>
            <div className="text-center mt-2 text-lg font-semibold">{Element.score}</div>
          </div>
        </div>
        <div className="flex justify-end p-4">
          <button
            className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            onClick={handleClose}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCoupon;
