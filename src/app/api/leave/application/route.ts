import dbConnect from "@/src/app/lib/dbConnect";
import LeaveApplicationModel from "@/src/models/LeaveApplication.model";
import { NextRequest, NextResponse } from "next/server";
dbConnect();
export async function GET(req:NextRequest){
    try {
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        const leaveApplication = await LeaveApplicationModel.findById(id);
        if(!leaveApplication){
            return NextResponse.json({
                success:false,
                message:"leave application is not found"
            },{status:404})
        }

        return NextResponse.json({
            success:true,
            message:"leave application founded",
            leaveApplication
        },{status:200})
    } catch (error:any) {
        return NextResponse.json({
            success:false,
            message:`faild to find leave application: ${error.message}`
        },{status:500})
    }
}