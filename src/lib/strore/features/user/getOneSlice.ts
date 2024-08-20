import { oneUser } from "./userThanks";
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
const getOneSlice = createSlice({
    name:'oneUser',
    reducers:{},
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(oneUser.pending,(state)=>{
            state.isLoading=true;
            state.error=undefined;
        })
        .addCase(oneUser.fulfilled,(state,action)=>{
            state.employee=action.payload;
            state.isLoading=false;
        })
        .addCase(oneUser.rejected,(state,action)=>{
            state.employee = null;
            state.isLoading=false;
            state.error= action.error.message;
        })
    }
})

export default getOneSlice.reducer;