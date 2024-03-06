import Coupon from '../../components/Coupon';
import { ReactElement, JSXElementConstructor, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../context/store';
import { fetchAllCoupons } from '../../context/features/CouponSlice';
const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { coupons } = useSelector((state:any)=>state.coupons)
    const currentSold = 500; 

    useEffect(()=>{
     dispatch(fetchAllCoupons());
     console.log(coupons)
    },[])

    const getCouponElements = (coupons: any[], title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined) => {
        if (coupons.length === 0) {
            return (
                <div className="text-center text-gray-600 mt-4">{`Aucun coupon disponible pour ${title}`}</div>
            );
        }

        return (
            <div className='flex flex-col justify-start items-start'>
                <h3 className="text-center text-xl font-semibold mb-2">{title}</h3>
                <div className='flex flex-wrap gap-7'>
                    {coupons.map((coupon, index) => (
                        <Coupon key={index} coupon={coupon} />
                           
                    ))}
                </div>
            </div>
        );
    };

    const couponsStandard = coupons.filter((coupon:any) => coupon.reduction < 20);
    const couponsPremium = coupons.filter((coupon :any)=> coupon.reduction >= 20 && coupon.reduction < 50);
    const couponsUltime = coupons.filter((coupon :any)=> coupon.reduction >= 50);

    return (
        <div className="flex flex-col">
            <h2 className="text-center text-2xl font-semibold mb-4">Solde actuel : {currentSold}</h2>
         
           <div className='flex flex-col gap-10'>
                {getCouponElements(couponsStandard, 'Coupons Standard :')}
                {getCouponElements(couponsPremium, 'Coupons Premium :')}
                {getCouponElements(couponsUltime, 'Coupons Ultime :')}
           </div>
           
        </div>
    );
}

export default Home;
