import dbConnect from "@/src/app/lib/dbConnect";
import LeaveTypesModel from "@/src/models/LeaveType.model";
import { NextResponse } from "next/server";
dbConnect();

export async function GET() {
  try {
    const leaveTypes  = await LeaveTypesModel.find({});
    if(leaveTypes.length<=0){
        return NextResponse.json({
            success:false,
            message:"leave types is not found"
        },{status:404})
    }

    return NextResponse.json({
        success:true,
        message:"successfuly founded",
        leaveTypes
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
