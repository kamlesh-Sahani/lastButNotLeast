import dbConnect from "@/lib/dbConnect";
import EmployeeModel from "@/models/Employee.model";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { generateAccessAndRefreshToken } from "@/lib/generateAccessAndRefreshToken";
dbConnect();
async function passwordCompare(plainPassword: string, hashedPassword: string) {
  return await bcryptjs.compare(plainPassword, hashedPassword);
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
        // Validate request body
        if (!email || !password) {
          return NextResponse.json(
            {
              success: false,
              message: "Email and password are required.",
            },
            { status: 400 }
          );
        }
        
    const employee = await EmployeeModel.findOne({"personalInfo.email":email}).select("personalInfo.password");
    if (!employee) {
      return NextResponse.json(
        {
          success: false,
          message: "employee is not register",
        },
        { status: 400 }
      );
    }

    const isMatch = await passwordCompare(
      password,
      employee?.personalInfo.password
    );
    if (!isMatch) {
      return NextResponse.json({
        success:false,
        message: "password or email is wrong",
      },{status:400});
    }
 
    // password and email is right

 const {accessToken,refreshToken}:any = await generateAccessAndRefreshToken(employee._id)
 const loggedEmployee = await EmployeeModel.findById(employee._id)
    const option = {
      httpOnly: true,
      secure: true,
      maxAge: 10 * 24 * 60 * 60 * 1000 // Set a more reasonable cookie expiration time (10 days)
    };

    const response = NextResponse.json(
      { success: true, message: "loging successfuly",employee:loggedEmployee,accessToken,refreshToken },
      { status: 200 }
    )
    
    response.cookies.set("accessToken",accessToken,option);
    response.cookies.set("refreshToken",refreshToken,option);
    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: `failed to login Employee :${error.message}`,
      },
      { status: 500 }
    );
  }
}
