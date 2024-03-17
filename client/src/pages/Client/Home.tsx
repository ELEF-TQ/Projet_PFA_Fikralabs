import Coupon from '../../components/Coupon';
import { ReactElement, JSXElementConstructor, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../context/store';
import { fetchAllCoupons } from '../../context/features/CouponSlice';
import { getClient } from '../../context/features/ClientSlice';
import { retrieveUserSession } from '../../lib/Encryption';
import Spinner from '../../components/Status/Spinner';

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = retrieveUserSession();
    const { coupons, isLoading } = useSelector((state:any)=>state.coupons);
    const { client } = useSelector((state:any)=>state.clients);

    useEffect(() => {
        dispatch(getClient(user._id));
        dispatch(fetchAllCoupons());
    }, []);

    const getCouponElements = (coupons: any[], title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined) => {
        const currentDate = new Date();
        return (
            <div className='flex flex-col justify-start items-start'>
                <h3 className="text-center text-xl font-semibold mb-2">{title}</h3>
                <div className='flex flex-wrap gap-7'>
                    {coupons.map((coupon, index) => {
                        // Check if the expiration date of the coupon is after the current date
                        const expirationDate = new Date(coupon.expirationDate);
                        if (expirationDate > currentDate) {
                            return <Coupon key={index} coupon={coupon}  reserved={false}/>;
                        }
                        return null;
                    })}
                </div>
            </div>
        );
    };

    const couponsStandard = coupons.filter((coupon:any) => coupon.reduction < 20);
    const couponsPremium = coupons.filter((coupon :any)=> coupon.reduction >= 20 && coupon.reduction < 50);
    const couponsUltime = coupons.filter((coupon :any)=> coupon.reduction >= 50);

    return (
        <div className="flex flex-col">
            <h2 className="text-center text-2xl font-semibold mb-4">Solde actuel : {client?.score || 0}</h2>
            {isLoading ? ( 
                <Spinner />
            ) : (
                <div className='flex flex-col gap-10'>
                    {couponsStandard.length === 0 && couponsPremium.length === 0 && couponsUltime.length === 0 ? (
                        <div className="text-center text-gray-600 mt-4">Aucun coupon disponible</div>
                    ) : (
                        <>
                            {couponsStandard.length > 0 && getCouponElements(couponsStandard, 'Coupons Standard :')}
                            {couponsPremium.length > 0 && getCouponElements(couponsPremium, 'Coupons Premium :')}
                            {couponsUltime.length > 0 && getCouponElements(couponsUltime, 'Coupons Ultime :')}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;
