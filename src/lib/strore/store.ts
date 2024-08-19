import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import leaveApplicationReducer from './features/leave/application/leaveApplicationSlice'
import loginReducer from './features/user/loginSlice'
import profileReducer from './features/user/profileSlice'
import registerReducer from './features/user/registerSlice';
import getAllReducer from './features/user/getAllSlice';
import getAllLeaveTypeReducer  from './features/leave/types/getAllType';
export const makeStore = () => {
  return configureStore({
    reducer: {
      login:loginReducer,
      profile:profileReducer,
      register:registerReducer,
      allEmployee:getAllReducer,
      getAllLeaveType:getAllLeaveTypeReducer
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
