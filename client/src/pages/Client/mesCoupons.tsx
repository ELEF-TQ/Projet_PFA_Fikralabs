import Coupon from "../../components/Coupon";
import fakeCoupons from "../../utils/coupon";

const Coupons = () => {
  return (
    <div className=" flex flex-wrap  justify-center gap-5">
      {/* {fakeCoupons.map((coupon, index) => (
        <Coupon key={index} coupon={coupon} />
      ))} */}
    </div>
  );
};

export default Coupons;
