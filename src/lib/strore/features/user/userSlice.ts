import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null,
        role:null
    },
    reducers:{
        setUser:(state,action)=>{
            console.log(action.payload,"user payload");
            state.user=action.payload.user;
            state.role=action.payload.role;
        },
        removeUser:(state)=>{
            state.user=null;
            state.role=null;
        }
    }

})

export default userSlice;
export const  {setUser,removeUser} = userSlice.actions;