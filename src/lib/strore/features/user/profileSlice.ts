import { profileUser } from "./userThanks";
import {createSlice} from '@reduxjs/toolkit'


interface initialStateType {
    isLoading:boolean;
    user:any;
    error:string | undefined
}
const initialState:initialStateType = {
    isLoading:false,
    user:null,
    error:undefined
}
const profileSlice = createSlice({
    name:'me',
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
            state.user=action.payload;
            state.isLoading=false;

        })
        .addCase(profileUser.rejected,(state,action)=>{
            state.user = null;
            state.isLoading=false;
            state.error=action.error.message
        })

    }
})

export default profileSlice;