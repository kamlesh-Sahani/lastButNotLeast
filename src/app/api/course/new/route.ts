import CourseModel from "@/src/models/Course.model";
import dbConnect from "@/src/app/lib/dbConnect";
import { NextResponse, NextRequest } from "next/server";
dbConnect();
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    console.log(reqBody);
    const { courseName, courseCode, departmentId, instructorId } = reqBody;
    if (!courseName || !courseCode || !departmentId || !instructorId) {
      return NextResponse.json(
        {
          success: false,
          message: "please fill the all fields",
        },
        { status: 400 }
      );
    }
    const isExist = await CourseModel.findOne({
      $or: [{ courseCode }, { courseName }],
    });
    if (isExist) {
      return NextResponse.json(
        {
          success: false,
          message: "course name or course code is already exist",
        },
        { status: 400 }
      );
    }
    const course = await CourseModel.create({
      courseName,
      courseCode,
      departmentId,
      instructorId,
    });
    if (!course) {
      return NextResponse.json(
        {
          success: false,
          message: "faild to store",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "course store successfuly",
        course,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: `failed to store course :${error.message}`,
      },
      { status: 500 }
    );
  }
}
