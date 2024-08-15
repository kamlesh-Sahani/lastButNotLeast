import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const courseBasrUrl = `api/course`;
// new cousrse
const newCourse = createAsyncThunk("course/new",async(courseData)=>{
    const {data} = await axios.post(`${courseBasrUrl}/new`,courseData);
    return data;
});

// edit course 
