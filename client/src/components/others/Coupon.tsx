import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import CouponInfo from '../modals/CouponInfo';
import Swal from 'sweetalert2';
import { AppDispatch } from '../../context/store';
import { fetchAllCoupons, reserveCoupon } from '../../context/features/CouponSlice';
import { retrieveUserSession, updateUserSession } from '../../utils/Encryption';
import { getClient } from '../../context/features/ClientSlice';

interface CouponProps {
    coupon: Coupon;
    reserved: boolean;
    reservedHome:boolean ;
}

interface Coupon {
    _id: string;
    reduction: number;
    code: string;
    nbrDisponible: number;
    dateExpiration: string;
    score: number;
}

const Coupon: React.FC<CouponProps> = ({ coupon, reserved ,reservedHome }) => {
    const user = retrieveUserSession();
    const [showModal, setShowModal] = useState(false);
    const formData = {
        couponId: coupon._id, 
        clientId: user._id
    };
    const dispatch = useDispatch<AppDispatch>(); 

    //calcul de date expiration :
    const { dateExpiration } = coupon;
    const differenceEnJours = Math.ceil((new Date(dateExpiration).getTime() - Date.now()) / (1000 * 3600 * 24));
    

    const handleConfirmReservation = () => {
        Swal.fire({title:'Confirmer la réservation',text:'Êtes-vous sûr de vouloir réserver ce coupon ?',icon: 'question',showCancelButton: true,cancelButtonColor: '#d33',confirmButtonText: 'Oui, réserver !',cancelButtonText:'Anuller'}).then((result) => {
            if (result.isConfirmed) {
                dispatch(reserveCoupon(formData)).then(() => {
                    dispatch(fetchAllCoupons()).then(()=>{
                        dispatch(getClient(user._id))
                        updateUserSession('/clients',user._id)
                    })
                  
                });
            }
        });
    };

    const getCouponColor = (reduction: number): string => {
        if (reduction >= 50) {
            return 'bg-red-500';
        } else if (reduction >= 20) {
            return 'bg-yellow-500';
        } else {
            return 'bg-blue-500';
        }
    };

    const couponColor = getCouponColor(coupon.reduction);

    return (
        <div className={`p-2 w-100 flex flex-col items-center justify-center text-white text-center rounded-lg shadow-md relative ${couponColor}`}>
            <h3 className="text-xl font-semibold mb-4">Reduction sur tous les services</h3>
            <div className="flex items-center space-x-2 mb-6">
                <span className="border-dashed border text-white px-4 py-2 rounded-l">
                    dispo : <b>{coupon.nbrDisponible} </b> 
                </span>
                <span className="border-dashed border text-white px-4 py-2 rounded-l">
                    {coupon.reduction} %
                </span>
                {reserved ? (
                    <p className="border-dashed border text-white px-4 py-2 rounded-r">{coupon.code}</p>
                ) : (
                    <button 
                        className={`border border-white bg-white text-purple-600 px-4 py-2 rounded-r cursor-pointer ${reservedHome ? 'opacity-50 cursor-not-allowed' : ''}`} 
                        onClick={handleConfirmReservation} 
                        disabled={reservedHome}
                    >
                        {reservedHome ? 'déjà réservé' : 'réserver'}
                    </button>
                )}
            </div>
            <p className="text-sm">Valable jusqu'au : {new Date(dateExpiration).toLocaleDateString()}</p>
            <p className="text-md font-semibold">Il reste : {differenceEnJours} jours avant expiration</p>
            <CouponInfo showModal={showModal} setShowModal={setShowModal} />
        </div>
    );
    
};

export default Coupon;
