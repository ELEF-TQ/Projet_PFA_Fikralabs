import { configureStore } from '@reduxjs/toolkit'

//Slices :
import AuthSlice from './features/AuthSlice'
import AdminSlice from './features/AdminSlice'
import PompisteSlice from './features/PompisteSlice'
import ReviewSlice from './features/ReviewSlice'
import ClientSlice from './features/ClientSlice'
import ConversionSlice from './features/conversionSlice'
import CouponSlice from './features/CouponSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        auth :AuthSlice,
        admins : AdminSlice,
        pompistes : PompisteSlice,
        reviews : ReviewSlice,
        clients :ClientSlice,
        conversions :ConversionSlice,
        coupons : CouponSlice,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

