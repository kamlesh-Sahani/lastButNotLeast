import dbConnect from "@/lib/dbConnect";
import EmployeeModel from "@/models/Employee.model";
import { NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/mail.utils";
import { compilePasswordTemplate } from "@/utils/compileTemplate/compilePasswordTemplate";
import { NextRequest } from "next/server";
dbConnect();
async function passwordGenerateAndHashing(
  fullName: string,
  contactNumber: string
) {
  const password = fullName.slice(0, 4).toUpperCase() + contactNumber.slice(-4);
  const hashPassword = await bcryptjs.hash(password, 10);
  return { password, hashPassword }; 
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const {
      personalInfo,
      professionalInfo,
      experienceInfo,
      educationInfo,
      role,
      isActive,
    } = reqBody;
    const { fullName, dob, gender, contactNumber, email, address } =
      personalInfo;

    const { departmentId, designation, dateOfJoining, employmentType } =
      professionalInfo;

    const { company, jobTitle, duration, responsibilities } = experienceInfo;

    const { highestQualification, university, yearOfPassing, specialization } =
      educationInfo;

    const isExist = await EmployeeModel.findOne({
      $or: [
        { "personalInfo.contactNumber": contactNumber },
        { "personalInfo.email": email },
      ],
    });

    if (isExist) {
      return NextResponse.json(
        {
          success: true,
          message: "Employee already exists",
        },
        { status: 400 }
      );
    }

    if (
      !fullName ||
      !dob ||
      !gender ||
      !contactNumber ||
      !email ||
      !address ||
      !departmentId ||
      !designation ||
      !dateOfJoining ||
      !employmentType ||
      !company ||
      !jobTitle ||
      !duration ||
      !responsibilities ||
      !highestQualification ||
      !university ||
      !yearOfPassing ||
      !specialization
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all fields",
        },
        { status: 400 }
      );
    }

    const { password, hashPassword } = await passwordGenerateAndHashing(fullName, contactNumber);

    const employee = await EmployeeModel.create({
      personalInfo: {
        fullName,
        dob,
        gender,
        contactNumber,
        email,
        address,
        password: hashPassword,
      },
      experienceInfo: { company, jobTitle, duration, responsibilities },
      educationInfo: {
        highestQualification,
        university,
        yearOfPassing,
        specialization,
      },
      professionalInfo: { departmentId, designation, dateOfJoining, employmentType },
      role,
      isActive,
    });

    if (!employee) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to register employee",
        },
        { status: 400 }
      );
    }

    try {
      await sendEmail({
        to: email,
        name: fullName,
        subject: "Your Account Password",
        body: compilePasswordTemplate( fullName,password),
      });
    } catch (emailError:any) {
      return NextResponse.json(
        {
          success: false,
          message: "Employee registered, but failed to send email",
          error: emailError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Employee successfully registered and email sent",
        employee,
      },
      { status: 201 }
    );

  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: `Failed to register employee: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
