import {createSlice} from '@reduxjs/toolkit';
import {loginUser,logoutUser,allUser,oneUser,editUser,profileUser,registerUser} from './userThanks';

interface initialStateType {
    isLoading:boolean;
    user:any;
    users:any;
    error:string | undefined
    message:string|undefined;
}
const initialState:initialStateType = {
    isLoading:false,
    user:null,
    users:[],
    error:undefined,
    message:undefined
}
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        // login
       


        // logout user 

        builder
        .addCase(logoutUser.pending,(state)=>{
            state.isLoading=true;
            state.error=undefined;
        })
        .addCase(logoutUser.fulfilled,(state,action)=>{
            state.user=action.payload;
            state.isLoading=false;

        })
        .addCase(logoutUser.rejected,(state,action)=>{
            state.user = null;
            state.isLoading=false;
            state.error=action.error.message
        })
         // register user 
         builder
         .addCase(registerUser.pending,(state)=>{
             state.isLoading=true;
             state.error=undefined;
         })
         .addCase(registerUser.fulfilled,(state,action)=>{
             state.user=action.payload;
             state.isLoading=false;
 
         })
         .addCase(registerUser.rejected,(state,action)=>{
             state.user = null;
             state.isLoading=false;
             state.error=action.error.message
         })

         // all user 
         builder
         .addCase(allUser.pending,(state)=>{
             state.isLoading=true;
             state.error=undefined;
         })
         .addCase(allUser.fulfilled,(state,action)=>{
             state.users=action.payload;
             state.isLoading=false;
 
         })
         .addCase(allUser.rejected,(state,action)=>{
             state.users = null;
             state.isLoading=false;
             state.error=action.error.message
         })



         // one user 
         builder
         .addCase(oneUser.pending,(state)=>{
             state.isLoading=true;
             state.error=undefined;
         })
         .addCase(oneUser.fulfilled,(state,action)=>{
             state.user=action.payload;
             state.isLoading=false;
 
         })
         .addCase(oneUser.rejected,(state,action)=>{
             state.user = null;
             state.isLoading=false;
             state.error=action.error.message
         })


          

            // edit user 
            builder
            .addCase(editUser.pending,(state)=>{
                state.isLoading=true;
                state.error=undefined;
            })
            .addCase(editUser.fulfilled,(state,action)=>{
                state.user=action.payload;
                state.isLoading=false;
    
            })
            .addCase(editUser.rejected,(state,action)=>{
                state.user = null;
                state.isLoading=false;
                state.error=action.error.message
            })



    }

})

export default userSlice.reducer;