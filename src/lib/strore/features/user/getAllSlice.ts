import { allUser } from "./userThanks";
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
const getAllSlice = createSlice({
    name:'allUser',
    reducers:{},
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(allUser.pending,(state)=>{
            state.isLoading=true;
            state.error=undefined;
        })
        .addCase(allUser.fulfilled,(state,action)=>{
            state.employee=action.payload;
            state.isLoading=false;
        })
        .addCase(allUser.rejected,(state,action)=>{
            state.employee = null;
            state.isLoading=false;
            state.error= action.error.message;
        })
    }
})

export default getAllSlice.reducer;