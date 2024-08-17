import { sendEmail } from "@/utils/mail.utils";

export async function POST() {
  const sender = {
    name: "saad",
    address: "saad@gmail.com",
  };
  const receipients = [
    {
      name: "Kamlesh",
      address: "kamlesh@gmail.com",
    },
  ];
  try {
    const result = await sendEmail({
      sender,
      receipients,
      subject: "Welcome",
      message: "Welcome to our website",
    });

    return Response.json({
      accepted: result.accepted,
    });
  } catch (error) {
    return Response.json({ message: "Unable to send mail" }, { status: 500 });
  }
}
