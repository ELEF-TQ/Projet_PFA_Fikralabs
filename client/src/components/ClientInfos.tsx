import React from 'react';
import Modal from 'react-modal';
import '../pages/Pompiste/style.css'
import { InfoOutlined, InfoRounded, Star } from '@mui/icons-material';

// Interface for defining the type of props
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
      className="custom-modal animated-modal" // Add your custom modal class for styling
      overlayClassName="modal-overlay"
    >
      {selectedReview && (
        <div className="custom-modal-content">
          <div className="modal-header">
            <InfoOutlined style={{ fontSize: '2rem', color: 'green', marginBottom: '8px'}}/>
            <h2 className="text-2xl font-bold mb-2 ml-1">Client Information</h2>
          </div>
          <div className="modal-body">
            <p className="mb-2"><strong>Name:</strong> {selectedReview.client.username}</p>
            <p className="mb-2"><strong>Etoiles:</strong> {selectedReview.etoiles}</p>
            <p className="mb-2"><strong>Commentaire:</strong> {selectedReview.commentaire}</p>
            {/* Add more customer information as needed */}
          </div>
          <div className="modal-footer">
            <button
              onClick={closeModal}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-0 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ClientInfosModal;
