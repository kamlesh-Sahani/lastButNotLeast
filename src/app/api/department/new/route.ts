import dbConnect from "@/lib/dbConnect";
import DepartmentModel from "@/models/Department.model";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { departmentHead, departmentName, courses } = reqBody;
    // Validate request body
    if (!departmentName) {
      return NextResponse.json(
        {
          success: false,
          message: "Department head and department name are required.",
        },
        { status: 400 }
      );
    }

    // Check if the department already exists
    const isExist = await DepartmentModel.findOne({ departmentName });
    if (isExist) {
      return NextResponse.json(
        {
          success: false,
          message: "Department already exists.",
        },
        { status: 400 }
      );
    }

    // Create the new department
    const department = await DepartmentModel.create({
      departmentHead,
      departmentName,
      courses,
    });

    if (!department) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create department. Please try again.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Department successfully created.",
        department,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: `Failed to store department: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
