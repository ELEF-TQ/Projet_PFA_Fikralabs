import { configureStore } from '@reduxjs/toolkit'

//Slices :
import AuthSlice from './features/AuthSlice'
import AdminSlice from './features/AdminSlice'
import PompisteSlice from './features/PompisteSlice'
import ReviewSlice from './features/ReviewSlice'
import ClientSlice from './features/ClientSlice'
import CouponSlice from './features/CouponSlice'
import StationSlice from './features/StationSlice'
import ResetPasswordSlice from './features/ResetPasswordSlice'
import RoleSlice from './features/RoleSlice'
import PermissionSlice from './features/PermissionSlice'
import ServiceSlice from './features/ServiceSlice'
import ConversionSlice from './features/conversionSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        auth:AuthSlice,
        admins: AdminSlice,
        pompistes: PompisteSlice,
        reviews: ReviewSlice,
        clients: ClientSlice,
        conversions: ConversionSlice,
        coupons: CouponSlice,
        stations: StationSlice,
        services:ServiceSlice,
        resetPassword: ResetPasswordSlice,
        roles: RoleSlice,
        permissions: PermissionSlice
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

