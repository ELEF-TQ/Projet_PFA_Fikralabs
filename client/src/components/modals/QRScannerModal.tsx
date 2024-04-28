import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Scanner } from '@yudiel/react-qr-scanner';
import Swal from 'sweetalert2';
import debounce from 'lodash/debounce';

interface QRScannerModalProps {
  open: boolean;
  onClose: () => void;
  onScan: (data: string | null) => void;
}

const QRScannerModal: React.FC<QRScannerModalProps> = ({ open, onClose, onScan }) => {
  const [scanned, setScanned] = useState<boolean>(false);

  const debouncedHandleScanResult = debounce((data: string | null) => {
    if (data) { 
      setScanned(true);
      onScan(data);
      onClose();
      Swal.fire({
        icon: 'success',
        title: 'QR Code Scanner!',
        text: `Code de Pompiste: ${data}`,
      });
    }
  }, 1000); 

  const handleScanResult = (data: string | null, _result: any) => {
    if (!scanned && data) { 
      debouncedHandleScanResult(data);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="modal-QR"
    >
      <div className='modal-container-QR'>
        <div className='modal-content-QR'>
          <Scanner
            onResult={handleScanResult}
            onError={(error: { message: any }) => console.log(error?.message)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default QRScannerModal;
