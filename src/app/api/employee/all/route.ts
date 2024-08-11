
import dbConnect from "@/src/app/lib/dbConnect";
import EmployeeModel from "@/src/models/Employee.model";
import {NextResponse } from "next/server";
dbConnect();
export async function GET(){
try {
    const employees  = await EmployeeModel.find({}).select("-personalInfo.password");
    if(employees.length<=0){
        return NextResponse.json({
            success:false,
            message:"employees data is not found"
        },{status:400}) 
    }

    return NextResponse.json({
        success:true,
        message:"successfuly founded the employees data",
        employees
    },{status:200})
} catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: `failed to fetching employees :${error.message}`,
      },
      { status: 500 }
    );
  }
}