import { getAllLeaveType } from './typesThank';
import {createSlice} from '@reduxjs/toolkit'


interface initialStateType {
    isLoading:boolean;
    allLeave:any;
    error:string | undefined
}
const initialState:initialStateType = {
    isLoading:false,
    allLeave:null,
    error:undefined
}
const getAllLeaveTypeSlice = createSlice({
    name:'getAllLeaveType',
    reducers:{},
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(getAllLeaveType.pending,(state)=>{
            state.isLoading=true;
            state.error=undefined;
        })
        .addCase(getAllLeaveType.fulfilled,(state,action)=>{
            state.allLeave=action.payload;
            state.isLoading=false;
        })
        .addCase(getAllLeaveType.rejected,(state,action)=>{
            state.allLeave = null;
            state.isLoading=false;
            state.error= action.error.message;
        })
    }
})

export default getAllLeaveTypeSlice.reducer;