import React, { useEffect, useState } from "react";
import pendingImage from '../../assets/icons/conversion_pending.png';
import acceptedImage from '../../assets/icons/conversoin_Accepted.png';
import ConversionInfosModal from '../modals/ConversionInfos'; 
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const pendingColor = 'rgba(255, 180, 0, 1)';
const acceptedColor = 'rgba(128, 189, 10, 1)';

interface Conversion {
  dateConversion: string | number | Date;
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
    <div className="flex justify-between items-center bg-gray-100 rounded-lg p-2 mb-2 w-100">
      <div className="flex items-center">
        <img src={image} alt={conversion.status} className="w-10 h-10 mr-4" />
        <div className="flex flex-col">
          <span className="text-lg font-semibold"> <span className=" font-light">#{conversion.Num_Demande}</span> - {conversion.montant} DH</span>
          <span className="text-lg font-light">{new Date(conversion.dateConversion).toLocaleDateString()}</span>
        </div>
      </div>
      <button onClick={handleOpenModal}>
        <div style={{ backgroundColor: color }} className="w-8 h-8 rounded-full flex items-center justify-center">
          <KeyboardArrowDownIcon style={{ fontSize: 25, color: 'white' }} />
        </div>
      </button>
      <ConversionInfosModal isModalOpen={isModalOpen} closeModal={handleCloseModal} conversion={conversion} />
    </div>
  );
};

export default ConversionCard;








