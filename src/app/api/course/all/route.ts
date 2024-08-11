import CourseModel from "@/src/models/Course.model";
import dbConnect from "@/src/app/lib/dbConnect";
import {NextResponse} from 'next/server'

dbConnect();
export async function GET(){
    try {
        const courses = await CourseModel.find({});
        if(courses.length<=0){
            return NextResponse.json({
                success:false,
                message:"course is not found in database"
            },{status:400})
        }
        return NextResponse.json({
            success:true,
            message:"successfuly finded courses",
            courses
        },{status:200})
    } catch (error:any) {
        return NextResponse.json({
            success:false,
            message:`faild to fetching courses: ${error.message}`
        },{status:500})
    }
}