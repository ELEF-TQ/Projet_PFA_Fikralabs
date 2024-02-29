import { configureStore } from '@reduxjs/toolkit'

//Slices :
import AuthSlice from './features/AuthSlice'
import AdminSlice from './features/AdminSlice'
import PompisteSlice from './features/PompisteSlice'
import ReviewSlice from './features/ReviewSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        auth :AuthSlice,
        admins : AdminSlice,
        pompistes : PompisteSlice,
        reviews : ReviewSlice
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']