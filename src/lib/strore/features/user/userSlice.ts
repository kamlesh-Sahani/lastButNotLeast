import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null
    },
    reducers:{
        setUser:(state,action)=>{
            console.log(action.payload,"user payload");
            state.user=action.payload;
        },
        removeUser:(state)=>{
            state.user=null;
        }
    }

})

export default userSlice;
export const  {setUser,removeUser} = userSlice.actions;