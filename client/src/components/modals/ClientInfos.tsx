import React from 'react';
import Modal from 'react-modal';
<<<<<<< HEAD:client/src/components/ClientInfos.tsx
import '../pages/Pompiste/style.css'
import { InfoOutlined, InfoRounded, Star } from '@mui/icons-material';
=======
import '../../pages/Pompiste/style.css'
>>>>>>> 24f7561094e745d5675c2b1cb13485468b6f8d94:client/src/components/modals/ClientInfos.tsx

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
      {selectedReview && (
<<<<<<< HEAD:client/src/components/ClientInfos.tsx
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
=======
        <div>
          <h2 className="text-2xl font-bold mb-4">Customer Information</h2>
          <p className="mb-2">Name: {selectedReview.client.username}</p>
          <p>etoiles: {selectedReview.etoiles}</p>
          <p>Email: {selectedReview.client.email}</p>
          <button
            onClick={closeModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
>>>>>>> 24f7561094e745d5675c2b1cb13485468b6f8d94:client/src/components/modals/ClientInfos.tsx
        </div>
      )}
    </Modal>
  );
};

export default ClientInfosModal;
