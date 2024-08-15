import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const leaveApplicationBaseUrl = "api/leave/application";

// new application
const newApplication = createAsyncThunk("leaveApplication/new",async(leaveApplicationData)=>{
    const {data} = await axios.post(`${leaveApplicationBaseUrl}/new`,leaveApplicationData);
    return data;
}) 

// get all leave applicatios
const allApplication = createAsyncThunk("leaveApplication/all",async()=>{
    const {data} = await axios.get(`${leaveApplicationBaseUrl}/all`);
    return data;
})

// get one application

const oneApplication = createAsyncThunk("leaveApplication/one",async(applicationId)=>{
    const {data} = await axios.get(`${leaveApplicationBaseUrl}?id=${applicationId}`);
    return data;
})


export {oneApplication,newApplication,allApplication}
