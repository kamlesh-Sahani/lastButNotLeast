import dbConnect from "../../lib/dbConnect";
import EmployeeModel from "@/src/models/Employee.model";
import {NextResponse,NextRequest} from "next/server";

dbConnect();
export async function GET(req:NextRequest){
try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id")
    console.log(id,"pa")
    const employee  = await EmployeeModel.findById(id).select("-personalInfo.password");
    if(!employee){
        return NextResponse.json({
            success:false,
            message:"employee data is not found"
        },{status:400}) 
    }

    return NextResponse.json({
        success:true,
        message:"successfuly founded the employee",
        employee
    },{status:200})
} catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: `failed to fetching employee :${error.message}`,
      },
      { status: 500 }
    );
  }
}