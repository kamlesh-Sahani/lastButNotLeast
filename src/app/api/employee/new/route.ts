import dbConnect from "@/src/app/lib/dbConnect";
import EmployeeModel from "@/src/models/Employee.model";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
dbConnect();
async function passwordGenerateAndHashing(
  fullName: string,
  contactNumner: string
) {
  //  example contactNumber = "9667760692" , name - "kamlesh s"
  const password = fullName.slice(0, 4).toUpperCase() + contactNumner.slice(-4);
  const hashPassword = await bcryptjs.hash(password, 10);
  console.log(password,"pass");
  return hashPassword;
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

      const isExist = await EmployeeModel.findOne({$or:[{"personalInfo.contactNumber":contactNumber},{"personalInfo.email":email}]});
      if(isExist){
        return NextResponse.json({
          success:true,
          message:"employee is already is exist "
        },{status:400})
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
          message: "please fill the all fields",
        },
        { status: 400 }
      );
    }
    // password generate and hasing
    const hashPassword = await passwordGenerateAndHashing(fullName, contactNumber);

    const employee = await EmployeeModel.create({
      personalInfo: {
        fullName,
        dob,
        gender,
        contactNumber,
        email,
        address,
        password:hashPassword
      },
      experienceInfo: { company, jobTitle, duration, responsibilities },
      educationInfo: {
        highestQualification,
        university,
        yearOfPassing,
        specialization,
      },
      professionalInfo:{ departmentId, designation, dateOfJoining, employmentType },
      role,
      isActive,
   
    });

    if(!employee){
      return NextResponse.json({
        success:false,
        message:"failed to employee register"
      },{status:400})
    }


    return NextResponse.json({
      success:true,
      message:"employee successfuly register",
      employee
    },{status:201});

  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: `failed to register Employee :${error.message}`,
      },
      { status: 500 }
    );
  }
}
