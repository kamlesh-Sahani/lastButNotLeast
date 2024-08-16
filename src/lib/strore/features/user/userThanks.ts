import { EmployeeSchemaType } from '@/models/Employee.model';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
// employee login 
const employeeBaseUrl=`${process.env.NEXT_PUBLIC_DOMAIN}/api/employee`;
export const loginUser = createAsyncThunk<EmployeeSchemaType,{email:string,password:string}>("user/login",async(userData)=>{
    const {data} = await axios.post(`${employeeBaseUrl}/login`,userData);
    console.log(data,"thank data");
    return data;
})

// employee register 
export const registerUser = createAsyncThunk("user/register",async(userData)=>{
    const {data} = await axios.post(`${employeeBaseUrl}/new`,userData);
    return data;
})

// logout user
export const logoutUser = createAsyncThunk("user/logout",async()=>{
    const {data}= await axios.get(`${employeeBaseUrl}/logout`);
    return data;
})

// user profile(me)
export const profileUser = createAsyncThunk("user/me",async()=>{
    const {data} = await axios.get(`${employeeBaseUrl}/me`);
    return data;

})

// get all employee data
export const allUser = createAsyncThunk("user/all",async()=>{
    const {data} = await axios.get(`${employeeBaseUrl}/all`);
    return data;

})

// edit employee data 
export const editUser = createAsyncThunk("user/edit",async(userData)=>{
    const {data} = await axios.put(`${employeeBaseUrl}/edit`,userData);
    return data;
})

// get specific employee data 

export const oneUser = createAsyncThunk("user/one",async(userId)=>{
const {data} = await axios.post(`${employeeBaseUrl}?id=${userId}`);
return data;
})