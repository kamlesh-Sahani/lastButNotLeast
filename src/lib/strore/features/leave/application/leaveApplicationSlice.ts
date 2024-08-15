import { createSlice } from "@reduxjs/toolkit";
import {oneApplication,allApplication,newApplication} from './leaveApplicationThanks';

interface initialStateType {
    application:null; // TODO: changes it type
    applications:[],
    isLoading:boolean,
    error:string |undefined
}
const initialState:initialStateType={
    application:null,
    applications:[],
    isLoading:false,
    error:undefined
}
const leaveApplicationSlice = createSlice({
    name:"leaveApplication",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        // new application
        builder
        .addCase(newApplication.pending,(state)=>{
            state.isLoading=true;
            state.error=undefined;
        })
        .addCase(newApplication.fulfilled,(state,action)=>{
            state.application = action.payload;
            state.isLoading=false;
            state.error=undefined;
        })
        .addCase(newApplication.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.error.message;
            state.application=null;
        })


        // all application
        builder
        .addCase(allApplication.pending,(state)=>{
            state.isLoading=true;
            state.error=undefined;
        })
        .addCase(allApplication.fulfilled,(state,action)=>{
            state.applications = action.payload;
            state.isLoading=false;
            state.error=undefined;
        })
        .addCase(allApplication.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.error.message;
        })

         // one application
         builder
         .addCase(oneApplication.pending,(state)=>{
             state.isLoading=true;
             state.error=undefined;
         })
         .addCase(oneApplication.fulfilled,(state,action)=>{
             state.applications = action.payload;
             state.isLoading=false;
             state.error=undefined;
         })
         .addCase(oneApplication.rejected,(state,action)=>{
             state.isLoading=false;
             state.error=action.error.message;
         })
    }
})

export default leaveApplicationSlice.reducer;