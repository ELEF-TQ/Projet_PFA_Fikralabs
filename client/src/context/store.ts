import { configureStore } from '@reduxjs/toolkit'

//Reducers :
import UserSlice from './features/UserSlice'
import AuthSlice from './features/AuthSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        userReducer :UserSlice ,
        auth :AuthSlice,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']