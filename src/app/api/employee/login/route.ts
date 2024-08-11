import dbConnect from "@/src/app/lib/dbConnect";
import EmployeeModel from "@/src/models/Employee.model";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
dbConnect();
async function passwordCompare(plainPassword: string, hashedPassword: string) {
  return await bcryptjs.compare(plainPassword, hashedPassword);
}
const generateAccessAndRefreshToken = async (employeeId: any)=> {
  try {

    console.log(employeeId,"id")
    const employee = await EmployeeModel.findById(employeeId);
    if (!employee) {
      return NextResponse.json(
        {
          success: false,
          message:
            "something went to wrong while generating refresh token and access token",
        },
        { status: 400 }
      );
    }
    const accessToken = await employee.generateAccessToken();
    const refreshToken = await employee.generateRefreshToken();

    employee.refreshToken = refreshToken;
    await employee.save();
    return { accessToken, refreshToken };
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          "something went to wrong while generating refresh token and access token",
      },
      { status: 500 }
    );
  }
};

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    console.log(reqBody);
    const employee = await EmployeeModel.findOne({"personalInfo.email":email});
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
 const loggedEmployee = await EmployeeModel.findById(employee._id).select("-personalInfo.password");


    const option = {
      httpOnly: true,
      secure: true,
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
