import dbConnect from "@/src/app/lib/dbConnect";
import LeaveApplicationModel from "@/src/models/LeaveApplication.model";
import { NextResponse,NextRequest } from "next/server";
dbConnect();
export async function POST(req:NextRequest){
    try {
        const reqBody = await req.json();
        const {employeeId,leaveTypeId,startDate,endDate,reason} = reqBody;
        if(!employeeId || !leaveTypeId || !startDate||!endDate || !reason){
            return NextResponse.json({
                success:false,
                message:"please fill the all fields "
            },{status:400})
        }
        const leaveApplication = await LeaveApplicationModel.create({
            employeeId,
            leaveTypeId,
            startDate,
            endDate,
            reason
        })
        if(!leaveApplication){
            return NextResponse.json({
                success:false,
                message:"failed to leave apply"
            },{status:400})
        }

        return NextResponse.json({
            success:true,
            message:"successfuly applied leave application",
            leaveApplication
        },{status:201})
    } catch (error:any) {
        return NextResponse.json({
            success:false,
            message:`faild to create leave application: ${error.message}`
        },{status:500})
    }
}