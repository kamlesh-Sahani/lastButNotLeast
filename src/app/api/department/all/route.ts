import dbConnect from "@/src/app/lib/dbConnect";
import DepartmentModel from "@/src/models/Department.model";
import {NextResponse } from "next/server";

dbConnect();

export async function GET(){
    try {
        const departments = await DepartmentModel.find({});
        if(departments.length<=0){
            return NextResponse.json({
                success:false,
                message:"departments is not found"
            },{status:400})
        }
        return NextResponse.json({
            success:true,
            message:"department founded",
            departments
        },{status:200})
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