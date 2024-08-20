import { sendEmail } from "@/utils/mail.utils";
import { compileOtpTemplate } from "@/utils/compileTemplate/compileOtp";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { email, name, otp } = await req.json();

  try {
    await sendEmail({
      to: email,
      name: name,
      subject: "Your OTP Code",
      body: compileOtpTemplate(otp, name),
    });
    return Response.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Failed to send email", error },
      { status: 400 }
    );
  }
}