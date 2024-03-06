import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch hook
import CouponInfo from '../components/modals/CouponInfo';
import Swal from 'sweetalert2';
import { AppDispatch } from '../context/store';
import { reserveCouponById } from '../context/features/CouponSlice';

interface CouponProps {
    coupon: Coupon;
}

interface Coupon {
    _id: string;
    reduction: number;
    code: string;
    nbrDisponible: number;
    dateExpidition: string;
    score: number;
}

const Coupon: React.FC<CouponProps> = ({ coupon }) => {
    const [showModal, setShowModal] = useState(false);
    const [codeShown, setCodeShown] = useState(false);
    const dispatch = useDispatch<AppDispatch>(); 

    const handleConfirmReservation = () => {Swal.fire({title: 'Confirm Reservation',text: 'Are you sure you want to reserve this coupon?',icon: 'question',showCancelButton: true,confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',confirmButtonText: 'Yes, reserve it!'}).then((result) => {
            if (result.isConfirmed) {
                setCodeShown(true);
                dispatch(reserveCouponById(coupon._id)); 
            }
        });
    };

    const getCouponColor = (reduction: number): string => {
        if (reduction >= 50) {
            return 'bg-red-600';
        } else if (reduction >= 20) {
            return 'bg-yellow-500';
        } else {
            return 'bg-blue-500';
        }
    };

    const couponColor = getCouponColor(coupon.reduction);

    return (
        <div className={`p-2 w-100 flex flex-col items-center justify-center text-white text-center rounded-lg shadow-md relative ${couponColor}`}>
            <h3 className="text-2xl font-semibold mb-4">Reduction sur tous les services</h3>
            <div className="flex items-center space-x-2 mb-6">
                <span className="border-dashed border text-white px-4 py-2 rounded-l">
                   {coupon.reduction} %
                </span>
                {!codeShown && (
                    <button className="border border-white bg-white text-purple-600 px-4 py-2 rounded-r cursor-pointer" onClick={handleConfirmReservation}>Reserve</button>
                )} 
            </div>
            <p className="text-sm">Valid Till: {new Date(coupon.dateExpidition).toLocaleDateString() }</p>
            <p className="text-sm">Available: {coupon.nbrDisponible}</p>
            <CouponInfo showModal={showModal} setShowModal={setShowModal} />
        </div>
    );
};

export default Coupon;
