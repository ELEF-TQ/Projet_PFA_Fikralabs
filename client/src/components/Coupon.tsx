import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import CouponInfo from '../components/modals/CouponInfo';
import Swal from 'sweetalert2';
import { AppDispatch } from '../context/store';
import { fetchAllCoupons, reserveCoupon } from '../context/features/CouponSlice';
import { retrieveUserSession } from '../lib/Encryption';
import { getClient } from '../context/features/ClientSlice';

interface CouponProps {
    coupon: Coupon;
    reserved: boolean;
}

interface Coupon {
    _id: string;
    reduction: number;
    code: string;
    nbrDisponible: number;
    dateExpiration: string;
    score: number;
}

const Coupon: React.FC<CouponProps> = ({ coupon, reserved }) => {
    const user = retrieveUserSession().user;
    const [showModal, setShowModal] = useState(false);
    const formData = {
        couponId: coupon._id, 
        clientId: user._id
    };
    const dispatch = useDispatch<AppDispatch>(); 

    const handleConfirmReservation = () => {
        Swal.fire({title: 'Confirm Reservation',text: 'Are you sure you want to reserve this coupon?',icon: 'question',showCancelButton: true,confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',confirmButtonText: 'Yes, reserve it!'}).then((result) => {
            if (result.isConfirmed) {
                dispatch(reserveCoupon(formData)).then(() => {
                    dispatch(fetchAllCoupons()) ;
                    dispatch(getClient(retrieveUserSession().user._id))
                });
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
    console.log(coupon)

    return (
        <div className={`p-2 w-100 flex flex-col items-center justify-center text-white text-center rounded-lg shadow-md relative ${couponColor}`}>
            <h3 className="text-2xl font-semibold mb-4">Reduction sur tous les services</h3>
            <div className="flex items-center space-x-2 mb-6">
                <span className="border-dashed border text-white px-4 py-2 rounded-l">
                   {coupon.reduction} %
                </span>
                {reserved ? (
                    <p className="border-dashed border text-white px-4 py-2 rounded-r">{coupon.code}</p>
                ) : (
                    <button className="border border-white bg-white text-purple-600 px-4 py-2 rounded-r cursor-pointer" onClick={handleConfirmReservation}>Reserve</button>
                )}
            </div>
            <p className="text-sm">Valid Till: {new Date(coupon.dateExpiration).toLocaleDateString()}</p>
            <CouponInfo showModal={showModal} setShowModal={setShowModal} />
        </div>
    );
};

export default Coupon;
