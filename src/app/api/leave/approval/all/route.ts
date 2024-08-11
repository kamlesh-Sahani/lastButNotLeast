import dbConnect from "@/src/app/lib/dbConnect";
import LeaveApprovalModel from "@/src/models/LeaveApproval.model";
import { NextResponse } from "next/server";
dbConnect();
export async function GET(){
    try {
        const LeaveApprovals = await LeaveApprovalModel.find({});
        if(LeaveApprovals.length<=0){
            return NextResponse.json({
                success:false,
                message:"leave approvals is not found"
            },{status:404})
        }

        return NextResponse.json({
            success:true,
            message:"leave approvals founded",
            LeaveApprovals
        },{status:200})
    } catch (error:any) {
        return NextResponse.json({
            success:false,
            message:`faild to create leave approvals: ${error.message}`
        },{status:500})
    }
}