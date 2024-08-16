import { OneTimePassord } from "../otp/route";
import { NextRequest, NextResponse } from "next/server";
let storedOTP: string | null = null;
let otpExpiration: number | null = null;
export async function POST(req: NextRequest, res: NextResponse) {
  storedOTP = OneTimePassord();
  otpExpiration = Date.now() + 5 * 60 * 1000;
  console.log(storedOTP)
  const { otp } = await req.json();

  if (otp === "") {
    return Response.json({ message: "OTP is required" }, { status: 200 });
  }
 
  if (storedOTP === otp && otpExpiration && Date.now() <= otpExpiration) {
    return Response.json({ message: "OTP is valid" }, { status: 2002 });
    
  } else {
  return  Response.json({ message: "Invalid or expired OTP" }, { status: 300 });
  }
}
  