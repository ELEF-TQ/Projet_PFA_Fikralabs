import React, { useEffect, useState } from "react";
import pendingImage from '../assets/icons/conversion_pending.png';
import acceptedImage from '../assets/icons/conversoin_Accepted.png';
import ConversionInfosModal from './modals/ConversionInfos'; 

const pendingColor = 'rgba(255, 180, 0, 1)';
const acceptedColor = 'rgba(128, 189, 10, 1)';

interface Conversion {
  Num_Demande: number;
  status: string;
  montant: number;
  date: Date;
}

interface Props {
  conversion: Conversion;
}

const ConversionCard: React.FC<Props> = ({ conversion }) => {
  const [image, setImage] = useState<string | undefined>();
  const [color, setColor] = useState<string | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false); // State for managing modal visibility

  useEffect(() => {
    if (conversion.status === "PENDING") {
      setImage(pendingImage);
      setColor(pendingColor);
    } else if (conversion.status === "ACCEPTED") {
      setImage(acceptedImage);
      setColor(acceptedColor);
    }
  }, [conversion.status]);

  const handleOpenModal = () => {
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <div className="flex justify-between items-center bg-gray-100 rounded-lg p-2 mb-2 w-4/5">
      <div className="flex items-center">
        <img src={image} alt={conversion.status} className="w-12 h-12 mr-4" />
        <div className="flex flex-col">
          <span className="text-lg font-semibold"> <span className=" font-light">#{conversion.Num_Demande}</span> - {conversion.montant} DH</span>
          <span className="text-lg font-light">12/20/2024</span>
        </div>
      </div>
      <button onClick={handleOpenModal}> {/* Attach the click event handler */}
        <div style={{ backgroundColor: color }} className="w-8 h-8 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 transform rotate-90 text-white">
            <path fillRule="evenodd" d="M9.707 4.293a1 1 0 011.414 1.414L8.414 10l2.707 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </button>
      <ConversionInfosModal isModalOpen={isModalOpen} closeModal={handleCloseModal} conversion={conversion} /> {/* Render the modal */}
    </div>
  );
};

export default ConversionCard;
