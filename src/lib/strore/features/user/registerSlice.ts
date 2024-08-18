import { registerUser } from "./userThanks";
import {createSlice} from '@reduxjs/toolkit'
interface initialStateType {
    isLoading:boolean;
    employee:any;
    error:string | undefined
}
const initialState:initialStateType = {
    isLoading:false,
    employee:null,
    error:undefined
}
const registerSlice = createSlice({
    name:'register',
    reducers:{},
    initialState,
    extraReducers:(builder)=>{
        // profile user 
        builder
        .addCase(registerUser.pending,(state)=>{
            state.isLoading=true;
            state.error=undefined;
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.employee=action.payload;
            state.isLoading=false;

        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.employee = null;
            state.isLoading=false;
            state.error=action.error.message
        })

    }
})

export default registerSlice.reducer;