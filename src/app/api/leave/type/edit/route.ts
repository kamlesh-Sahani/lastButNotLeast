import dbConnect from "@/src/app/lib/dbConnect";
import LeaveTypesModel from "@/src/models/LeaveType.model";
import { NextRequest, NextResponse } from "next/server";
dbConnect();

export async function PUT(req:NextRequest){
    try {
        const searchParams  = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        const reqBody = await req.json();
        const {name,description,daysPerYear} = reqBody;
        const leaveType = await LeaveTypesModel.findById(id);
        if(!leaveType){
            return NextResponse.json({
                success:false,
                message:"leave type is not found"
            },{status:404})
        }

        if(name){
            leaveType.name = name
        }
        if(description){
            leaveType.description= description;
        }
        if(daysPerYear){
            leaveType.daysPerYear = daysPerYear;
        }

        const updatedLeaveType =await leaveType.save({validateBeforeSave:false});

        return NextResponse.json({
            success:true,
            message:"successfuly updated",
            updatedLeaveType
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