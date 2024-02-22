import { configureStore } from '@reduxjs/toolkit'

//Slices :
import AuthSlice from './features/AuthSlice'
import ReclamationSlice from './features/ReclamationSlice'
import AdminSlice from './features/AdminSlice'
import ClientSlice from './features/ClientSlice'
import PompisteSlice from './features/PompisteSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        auth :AuthSlice,
        admins : AdminSlice,
        clients : ClientSlice,
        pompistes : PompisteSlice,
        reclamations : ReclamationSlice,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']