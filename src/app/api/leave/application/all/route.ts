import dbConnect from "@/src/app/lib/dbConnect";
import LeaveApplicationModel from "@/src/models/LeaveApplication.model";
import { NextResponse } from "next/server";
dbConnect();
export async function GET(){
    try {
        const leaveApplications = await LeaveApplicationModel.find({});
        if(leaveApplications.length<=0){
            return NextResponse.json({
                success:false,
                message:"leave application is not found"
            },{status:404})
        }
        return NextResponse.json({
            success:true,
            message:"leave application founded",
            leaveApplications
        },{status:200})
    } catch (error:any) {
        return NextResponse.json({
            success:false,
            message:`faild to create leave application: ${error.message}`
        },{status:500})
    }
}
