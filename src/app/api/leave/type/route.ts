import dbConnect from "@/src/app/lib/dbConnect";
import LeaveTypesModel from "@/src/models/LeaveType.model";
import { NextRequest, NextResponse } from "next/server";
dbConnect();

export async function GET(req:NextRequest){
    try {
        const searchParams  = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        const leaveType = await LeaveTypesModel.findById(id);
        if(!leaveType){
            return NextResponse.json({
                success:false,
                message:"leave type is not found"
            },{status:404})
        }

        return NextResponse.json({
            success:true,
            message:"successfuly founded",
            leaveType
        },{status:200})
    } catch (error: any) {
        return NextResponse.json(
          {
            success: false,
            message: `faild to create leave type: ${error.message}`,
          },
          { status: 500 }
        );
      }
}