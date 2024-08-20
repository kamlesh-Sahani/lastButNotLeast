import { sendEmail } from "@/utils/mail.utils";
import { compileOtpTemplate } from "@/utils/compileTemplate/compileOtp";
import EmployeeModel from '../../../../models/Employee.model';
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const { email, name, otp } = await req.json();

  try {
    const user = await EmployeeModel.findOne({ email });
    
    if (!user) {
      return NextResponse.json(
        { message: "Incorrect Email Address" },
        { status: 400 }
      );
    }
    await sendEmail({
      to: email,
      name: name,
      subject: "Your OTP Code",
      body: compileOtpTemplate(otp, name),
    });
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to send email", error },
      { status: 400 }
    );
  }
}
