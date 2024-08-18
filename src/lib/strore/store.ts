import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import leaveApplicationReducer from './features/leave/application/leaveApplicationSlice'
import loginReducer from './features/user/loginSlice'
import profileReducer from './features/user/profileSlice'
export const makeStore = () => {
  return configureStore({
    reducer: {
      user:userReducer,
      leaveApplication:leaveApplicationReducer,
      login:loginReducer,
      profile:profileReducer
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
