import { useEffect } from "react";
import Coupon from "../../components/Coupon";
import { useDispatch, useSelector } from "react-redux";
import { retrieveUserSession } from "../../lib/Encryption";
import { AppDispatch } from "../../context/store";
import { fetchReservedCoupons } from "../../context/features/CouponSlice";

const Coupons = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = retrieveUserSession()?.user;
  const { reservedCoupons } = useSelector((state: any) => state.coupons);

  useEffect(() => {
    if (user) {
      dispatch(fetchReservedCoupons(user._id));
    }
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-5">
      {reservedCoupons.map((coupon: any, index: number) => (
        <Coupon key={index} coupon={coupon} />
      ))}
    </div>
  );
};

export default Coupons;
