import { sendEmail } from "@/utils/mail.utils";
import { compileArrangementTemplate } from "@/utils/compileTemplate/compileArrangement";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const {
    email,
    name,
    faculty,
    course,
    subject,
    department,
    semester,
    timing,
    link,
  } = await req.json();

  try {
    await sendEmail({
      to: email,
      name: name,
      subject: "Subsitute Arrangement",
      body: compileArrangementTemplate(
        faculty,
        course,
        subject,
        department,
        semester,
        timing,
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
