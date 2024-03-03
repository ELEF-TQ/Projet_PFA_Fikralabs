import React from 'react';
import Modal from 'react-modal';
import '../../pages/Pompiste/style.css'

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
        </div>
      )}
    </Modal>
  );
};

export default ClientInfosModal;
