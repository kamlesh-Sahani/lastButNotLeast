import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './features/user/profileSlice'
import registerReducer from './features/user/registerSlice';
import getAllReducer from './features/user/getAllSlice';
import getAllLeaveTypeReducer  from './features/leave/types/getAllType';
import userSlice from './features/user/userSlice';
import getOneReducer from './features/user/getOneSlice'
export const makeStore = () => {
  return configureStore({
    reducer: {
      [userSlice.name]:userSlice.reducer,
      profile:profileReducer,
      register:registerReducer,
      allEmployee:getAllReducer,
      getAllLeaveType:getAllLeaveTypeReducer,
      getOneEmployee:getOneReducer
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
