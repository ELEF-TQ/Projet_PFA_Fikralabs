import React from 'react';
import Modal from 'react-modal';
import { InfoOutlined } from '@mui/icons-material';

interface ClientInfosModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  selectedReview: any;
}

const ClientInfosModal: React.FC<ClientInfosModalProps> = ({ isModalOpen, closeModal, selectedReview }) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Customer Information"
      className="custom-modal animated-modal"
      overlayClassName="modal-overlay"
    >
      {selectedReview ? (
        <div className="custom-modal-content p-4 bg-white rounded-lg">
          <button
            onClick={closeModal}
            type="button"
            className="absolute top-2 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="modal-header">
            <InfoOutlined style={{ fontSize: '2rem', color: 'green', marginBottom: '8px'}}/>
            <h2 className="text-2xl font-bold mb-2 ml-1">Client Information</h2>
          </div>
          <div className="modal-body">
            <p className="mb-2"><strong>Name:</strong> {selectedReview.client?.username || 'N/A'}</p>
            <p className="mb-2"><strong>Etoiles:</strong> {selectedReview.etoiles || 'N/A'}</p>
            <p className="mb-2 truncate"><strong>Commentaire:</strong> {selectedReview.commentaire || 'N/A'}</p>
            {/* Add more customer information as needed */}
          </div>
        </div>
      ) : (
        // Handle the case when selectedReview is not available
        <div className="custom-modal-content p-4 bg-white rounded-lg">
          <p>Error: Client information not available.</p>
        </div>
      )}
    </Modal>
  );
};

export default ClientInfosModal;
