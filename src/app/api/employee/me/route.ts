import dbConnect from "@/src/app/lib/dbConnect";
import { getDataFromCookie } from "@/src/app/lib/getDataFromCookie";
import EmployeeModel from "@/src/models/Employee.model";
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