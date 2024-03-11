import React from 'react';

interface ConversionInfosModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  conversion: any;
}

const ConversionInfosModal: React.FC<ConversionInfosModalProps> = ({ isModalOpen, closeModal, conversion }) => {
 
    const textColor = conversion.status === 'PENDING' ? 'rgba(255, 180, 0, 1)' : 'rgba(128, 189, 10, 1)';

 
return (
    <>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal__delete  w-96">
            <div className="modal-content">
              <div className="relative bg-white rounded-lg shadow dark:bg-white-700">
                <button
                  onClick={closeModal}
                  type="button"
                  className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="popup-modal"
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-4 md:p-5  ">
                  <h2 className="mb-2 text-lg font-semibold">Demande #{conversion.Num_Demande}</h2>
                  <div className="mb-2">
                    <p className="font-semibold">Date de la demande:</p>
                    <p>{conversion.date || '25/12/2023'}  </p>
                  </div>
                  <div className="mb-2">
                    <p className="font-semibold">Nombre des Points:</p>
                    <p>{conversion.score}</p>
                  </div>
                  <div className="mb-2">
                    <p className="font-semibold">Montant Demande (en MAD):</p>
                    <p>{conversion.montant}</p>
                  </div>
                  <div className="mb-2">
                    <p className="font-semibold">État de la Demande:</p>
                    <p style={{ color: textColor }}>{conversion.status === 'PENDING' ? 'En cours de traitement' : 'Demande Accepter'}</p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConversionInfosModal;
