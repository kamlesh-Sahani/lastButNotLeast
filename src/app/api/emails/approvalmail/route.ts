import { sendEmail } from "@/utils/mail.utils";
import { compileApprovalTemplate } from "@/utils/compileTemplate/compileApproval";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const {
    email,
    name,
    role,
    faculty,
    department,
    leaveType,
    startDate,
    endDate,
    reason,
    link,
  } = await req.json();

  try {
    await sendEmail({
      to: email,
      name: name,
      subject: "Leave Application",
      body: compileApprovalTemplate(
        role,
        faculty,
        department,
        leaveType,
        startDate,
        endDate,
        reason,
        link
      ),
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
