import { profileUser } from "./userThanks";
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
const profileSlice = createSlice({
    name:'profile',
    reducers:{},
    initialState,
    extraReducers:(builder)=>{
        // profile user 
        builder
        .addCase(profileUser.pending,(state)=>{
            state.isLoading=true;
            state.error=undefined;
        })
        .addCase(profileUser.fulfilled,(state,action)=>{
            state.employee=action.payload;
            state.isLoading=false;

        })
        .addCase(profileUser.rejected,(state,action)=>{
            state.employee = null;
            state.isLoading=false;
            state.error=action.error.message
        })

    }
})

export default profileSlice.reducer;