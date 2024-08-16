import dbConnect from "@/lib/dbConnect";
import EmployeeModel from "@/models/Employee.model";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { generateAccessAndRefreshToken } from "@/lib/generateAccessAndRefreshToken";
dbConnect();

export async function GET(req: NextRequest) {
  try {
    const incomingRefreshToken = req.cookies.get("refreshToken")?.value;
    if (!incomingRefreshToken) {
      return NextResponse.json(
        {
          success: false,
          messaeg: "unauthorized employee",
        },
        { status: 401 }
      );
    }

    const decodedToken: any = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRECT!
    );

    const employee = await EmployeeModel.findById(decodedToken?._id);
    if (!employee) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid refresh Token",
        },
        { status: 400 }
      );
    }

    if (incomingRefreshToken !== employee?.refreshToken) {
      return NextResponse.json(
        {
          success: false,
          message: "refresh token is expired or used",
        },
        { status: 400 }
      );
    }

    const { refreshToken, accessToken }: any =
      await generateAccessAndRefreshToken(employee?._id);

    const response = NextResponse.json(
      {
        success: true,
        message: "accessToken is refreshed successfuly",
      },
      { status: 200 }
    );

    const option = { httpOnly: true, secure: true };
    response.cookies.set("accessToken", accessToken, option);
    response.cookies.set("refreshToken", refreshToken.option);
    return response;
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
