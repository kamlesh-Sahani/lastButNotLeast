import dbConnect from "@/src/app/lib/dbConnect";
import EmployeeModel from "@/src/models/Employee.model";
import { NextResponse, NextRequest } from "next/server";

dbConnect();

export async function PUT(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Employee ID is required" },
        { status: 400 }
      );
    }

    const employee = await EmployeeModel.findById(id);
    if (!employee) {
      return NextResponse.json(
        { success: false, message: "Employee not found" },
        { status: 404 }
      );
    }

    const reqBody = await req.json();

    const {
      personalInfo = {},
      professionalInfo = {},
      experienceInfo = {},
      educationInfo = {},
      role,
      isActive,
    } = reqBody;

    // Update personalInfo fields
    if (personalInfo.fullName !== undefined) employee.personalInfo.fullName = personalInfo.fullName;
    if (personalInfo.dob !== undefined) employee.personalInfo.dob = personalInfo.dob;
    if (personalInfo.gender !== undefined) employee.personalInfo.gender = personalInfo.gender;
    if (personalInfo.contactNumber !== undefined) employee.personalInfo.contactNumber = personalInfo.contactNumber;
    if (personalInfo.email !== undefined) employee.personalInfo.email = personalInfo.email;
    if (personalInfo.address !== undefined) employee.personalInfo.address = personalInfo.address;

    // Update professionalInfo fields
    if (professionalInfo.departmentId !== undefined) employee.professionalInfo.departmentId = professionalInfo.departmentId;
    if (professionalInfo.designation !== undefined) employee.professionalInfo.designation = professionalInfo.designation;
    if (professionalInfo.dateOfJoining !== undefined) employee.professionalInfo.dateOfJoining = professionalInfo.dateOfJoining;
    if (professionalInfo.employmentType !== undefined) employee.professionalInfo.employmentType = professionalInfo.employmentType;

    // Update experienceInfo fields
    if (experienceInfo.company !== undefined) employee.experienceInfo.company = experienceInfo.company;
    if (experienceInfo.jobTitle !== undefined) employee.experienceInfo.jobTitle = experienceInfo.jobTitle;
    if (experienceInfo.duration !== undefined) employee.experienceInfo.duration = experienceInfo.duration;
    if (experienceInfo.responsibilities !== undefined) employee.experienceInfo.responsibilities = experienceInfo.responsibilities;

    // Update educationInfo fields
    if (educationInfo.highestQualification !== undefined) employee.educationInfo.highestQualification = educationInfo.highestQualification;
    if (educationInfo.university !== undefined) employee.educationInfo.university = educationInfo.university;
    if (educationInfo.yearOfPassing !== undefined) employee.educationInfo.yearOfPassing = educationInfo.yearOfPassing;
    if (educationInfo.specialization !== undefined) employee.educationInfo.specialization = educationInfo.specialization;

    // Update role and isActive fields
    if (role !== undefined) employee.role = role;
    if (isActive !== undefined) employee.isActive = isActive;

    const updatedEmployee = await employee.save({validateBeforeSave:false});

    return NextResponse.json(
      {
        success: true,
        message: "Successfully updated",
        employee: updatedEmployee,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: `Failed to update employee: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
