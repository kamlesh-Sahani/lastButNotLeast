import LeaveBalanceModel from "@/src/models/LeaveBalance.model";
import { NextResponse,NextRequest } from "next/server";
import LeaveTypesModel from "@/src/models/LeaveType.model";
import dbConnect from "@/src/app/lib/dbConnect";
import LeaveApplicationModel from "@/src/models/LeaveApplication.model";
import LeaveApprovalModel from "@/src/models/LeaveApproval.model";
dbConnect();

export async function POST(req:NextRequest){
    try {
        const searchParams =  req.nextUrl.searchParams;
        const id = searchParams.get("id");

        const leaveApplication = await LeaveApplicationModel.find({employeeId:id,status:"APPROVED"});

        
        //leave types 
        const LeaveTypes = await LeaveTypesModel.find({});

        const reqBody = await req.json();
        const {} = reqBody;
        const leaveBalance = await LeaveBalanceModel.create({})
    } catch (error:any) {
       return NextResponse.json({
        success:false,
        message:`something went error : ${error.message}`
       }) 
    }
}