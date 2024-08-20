import EmployeeModel from "@/models/Employee.model";
import { getDataFromCookie } from "@/lib/getDataFromCookie";
import dbConnect from "@/lib/dbConnect";
import { NextResponse,NextRequest } from "next/server";
dbConnect();
export async function GET(req:NextRequest){
    try {
        const employeeId = await getDataFromCookie(req);
        const employee = await EmployeeModel.findById(employeeId).select("-personalInfo.password");
        if(!employee){
            return NextResponse.json({
                success:false,
                message:"employee is not found"
            },{status:400})
        }
        return NextResponse.json({
            success:true,
            message:"successfuly get employee data",
            employee
        },{status:200})
    } catch (error:any) {
        return NextResponse.json({
            success:false,
            message:`error while fetching employee: ${error.message}`
        })
    }
}