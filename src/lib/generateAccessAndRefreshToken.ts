import { NextResponse } from "next/server";
import EmployeeModel from "@/models/Employee.model";
export const generateAccessAndRefreshToken = async (employeeId: any) => {
  try {
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
    console.log("func2")
    await employee.save({validateBeforeSave:false});
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
