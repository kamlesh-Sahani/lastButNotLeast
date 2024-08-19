import { LeavesType } from '@/models/LeaveType.model';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const leaveTypeBasedUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/api/leave/type`;
// get all leave types
interface leaveTypeReturn extends LeavesType {
    message:string,
    success:boolean;
}
export const getAllLeaveType = createAsyncThunk<leaveTypeReturn>('leave/type/all',async()=>{
    const {data} = await axios.get(`${leaveTypeBasedUrl}/all`);
    return data;
 })