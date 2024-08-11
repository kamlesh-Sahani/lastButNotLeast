import dbConnect from "@/src/app/lib/dbConnect";
import DepartmentModel from "@/src/models/Department.model"
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function POST(req: NextRequest) {
  try {
    const reqBody  =await req.json();

    const {departmentHead,employees,departmentName,courses} = reqBody;
    if(!departmentHead || !departmentName){
      return NextResponse.json({
        success:false,
        message:"department head or department name is not found"
      },{status:401});

    }

    const isExist = await DepartmentModel.findOne({departmentName});
    if(isExist){
      return NextResponse.json({
        success:false,
        message:"department is already exist"
      },{status:400});
      
    }

    const department = await DepartmentModel.create({
      departmentHead,
      departmentName,
      employees,
      courses
    })
    
    if(!department){
      return NextResponse.json({
        success:false,
        message:"department failed to creating try again"
      },{status:400})
    }

    return NextResponse.json({
      success:true,
      message:"successfuly created",
      department
    },{status:201})
  } catch (error:any) {
    return NextResponse.json(
      {
        success: false,
        message: `failed to store department :${error.message}`,
      },
      { status: 500 }
    );
  }
}
