import dbConnect from "@/src/app/lib/dbConnect";
import LeaveApprovalModel from "@/src/models/LeaveApproval.model";
import { NextRequest, NextResponse } from "next/server";
dbConnect();
export async function GET(req:NextRequest){
    try {
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        const leaveApproval = await LeaveApprovalModel.findById(id);
        if(!leaveApproval){
            return NextResponse.json({
                success:false,
                message:"leave approval is not found"
            },{status:404})
        }

        return NextResponse.json({
            success:true,
            message:"leave approval founded",
            leaveApproval
        },{status:200})
    } catch (error:any) {
        return NextResponse.json({
            success:false,
            message:`faild to find leave approval: ${error.message}`
        },{status:500})
    }
}