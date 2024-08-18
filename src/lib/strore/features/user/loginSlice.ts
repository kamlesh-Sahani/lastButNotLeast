import { loginUser } from "./userThanks";
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
const loginSlice = createSlice({
    name:'login',
    reducers:{},
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.pending,(state)=>{
            state.isLoading=true;
            state.error=undefined;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.employee=action.payload;
            state.isLoading=false;
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.employee = null;
            state.isLoading=false;
            state.error= action.error.message;
        })
    }
})

export default loginSlice.reducer;