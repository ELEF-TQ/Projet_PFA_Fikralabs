import Coupon from '../../components/others/Coupon';
import { ReactElement, JSXElementConstructor, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../context/store';
import { fetchAllCoupons } from '../../context/features/CouponSlice';
import { getClient } from '../../context/features/ClientSlice';
import { retrieveUserSession } from '../../lib/Encryption';
import Spinner from '../../components/Status/Spinner';

const mapCouponsWithReserved = (couponsList: any[], reservedList: string[] | null) => {
    if (!reservedList) return []; 
    return couponsList.map((coupon: any) => {
        const isReserved = reservedList.includes(coupon._id); 
        return {
            ...coupon,
            reservedHome: isReserved
        };
    });
};


const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = retrieveUserSession();
    const { coupons, isLoading } = useSelector((state:any) => state.coupons);
    const { client } = useSelector((state:any) => state.clients);
    const reservedCoupons = client?.coupons
    useEffect(() => {
        dispatch(getClient(user._id));
        dispatch(fetchAllCoupons());
    }, []);

    const getCouponElements = (coupons: any[], title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined) => {
        return (
            <div className='flex flex-col justify-start items-start'>
                <h3 className="text-center text-xl font-semibold mb-2">{title}</h3>
                <div className='flex flex-wrap gap-7'>
                    {mapCouponsWithReserved(coupons, reservedCoupons).map((coupon, index) => (
                        <Coupon key={index} coupon={coupon} reserved={false} reservedHome={coupon.reservedHome} /> 
                    ))}
                </div>
            </div>
        );
    };
    

    const currentDate = new Date();

    const filterCouponsByStatus = (couponList: any[]) => {
        return couponList.filter((coupon: any) => {
            const expirationDate = new Date(coupon.dateExpiration);
            return expirationDate >= currentDate;
        });
    };

    const couponsStandard = filterCouponsByStatus(coupons.filter((coupon:any) => coupon.reduction < 20));
    const couponsPremium = filterCouponsByStatus(coupons.filter((coupon :any) => coupon.reduction >= 20 && coupon.reduction < 50));
    const couponsUltime = filterCouponsByStatus(coupons.filter((coupon :any) => coupon.reduction >= 50));

    return (
        <div className="flex flex-col">
            <h1 className="text-4xl font-bold mb-8">Points et Coupons</h1>
            <p className='mb-4 text-gray-700'>
                Consultez votre solde de points pour suivre le nombre total de points accumulés lors de vos achats et promotions.
            </p>
            <div className="mb-4 flex justify-center items-center mt-3.5">
                <div className="text-black px-8 py-6 rounded-3xl border-primary-color-2 text-center bg-white">
                    {client && (
                    <div className="w-full max-w-md mx-auto">
                        <span className="text-lg font-semibold">Solde actuel (Global)</span>
                        <span className="my-3 block text-primary-color text-3xl">{client?.score || 0} pts</span>
                    </div>
                    )}
                </div>
            </div>
            <p className='mb-4 text-gray-700'>
                Découvrez une variété de coupons classés en trois catégories : Standard, Premium et Ultime, pour bénéficier de réductions et d'offres spéciales.
            </p>
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
};

export default Home;
