import React from 'react';

interface CouponInfoProps {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
}

const CouponInfo: React.FC<CouponInfoProps> = ({ showModal, setShowModal }) => {
    return (
        <div>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal__delete  w-96">
                        <div className="modal-content">
                            <div className="relative bg-white rounded-lg shadow dark:bg-white-700">
                                <h2 className="text-2xl font-semibold mb-4">Confirm Reservation</h2>
                                <p>Are you sure you want to reserve this coupon?</p>
                                <div className="mt-4 flex justify-end">
                                    <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={() => setShowModal(false)}>Confirm</button>
                                    <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => setShowModal(false)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CouponInfo;
