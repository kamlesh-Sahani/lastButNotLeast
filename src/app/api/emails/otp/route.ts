import { sendEmail } from "@/utils/mail.utils";
import { generateOTP } from "@/utils/otp.utils";
import { NextRequest } from "next/server";
// let storedOTP: string | null = null;
// let otpExpiration: number | null = null
const otp = generateOTP();
export async function POST(req: NextRequest) {
  // storedOTP = otp;
  // otpExpiration = Date.now() + 5 * 60 * 1000;
  console.log(otp);
  const { email } = await req.json();

  const sender = {
    name: "LMS",
    address: "saad@gmail.com",
  };
  const receipients = [
    {
      name: "Faculty",
      address: email,
    },
  ];
  try {
    const result = await sendEmail({
      sender,
      receipients,
      subject: "Your OTP code",
      message: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    });

    return Response.json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    return Response.json({ message: "Failed to send OTP" }, { status: 500 });
  }
}

export const OneTimePassord = () => {
  return otp;
};
