import dbConnect from "@/src/app/lib/dbConnect";
import LeaveTypesModel from "@/src/models/LeaveType.model";
import { NextResponse, NextRequest } from "next/server";
dbConnect();

export async function DELETE(req:NextRequest){
    try {
        const searchParams =  req.nextUrl.searchParams;
        const id = searchParams.get("id");

        const deletedLeave = await LeaveTypesModel.findByIdAndDelete(id);
        if(!deletedLeave){
            return NextResponse.json({
                success:false,
                message:"leave type is not found"
            },{status:404})
        }
        return NextResponse.json({
            success:true,
            message:"deleted successfuly"
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