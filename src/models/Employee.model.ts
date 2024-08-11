import mongoose, { Schema, Document } from "mongoose";
import jwt from "jsonwebtoken";
// types of employee
interface EducationType {
  highestQualification: string; //ug,pg,phd others
  university: string;
  yearOfPassing: Date;
  specialization?: string;
}
interface PersonalType {
  fullName: string;
  dob: Date;
  gender: "male" | "female";
  contactNumber: string;
  email: string;
  address: string;
  password: string;
}
interface ProfessionalType {
  departmentId: mongoose.Schema.Types.ObjectId;
  designation: string;
  dateOfJoining: Date;
  employmentType:
    | "FULL_TIME"
    | "PART_TIME"
    | "INTERNSHIP"
    | "CONTRACT"
    | "OTHER";
}
interface ExperienceType {
  company: string;
  jobTitle: string;
  duration: {
    startDate: Date;
    endDate: Date;
  };
  responsibilities: string;
}
export interface EmployeeSchemaType extends Document {
  personalInfo: PersonalType;
  professionalInfo: ProfessionalType;
  educationInfo: EducationType;
  experienceInfo: ExperienceType;
  isActive: boolean; // is working currently or leave the organisation
  role: "REGULAR" | "HOD" | "VICE_PRINCIPLE" | "DIRECTOR";
  accessToken: string;
  refreshToken: string;
  generateAccessToken():Promise<string>;
  generateRefreshToken():Promise<string>;
  createdAt: Date;
  updatedAt: Date;
}

const employeeSchema: Schema<EmployeeSchemaType> = new Schema(
  {
    personalInfo: {
      fullName: {
        type: String,
        required: [true, "please enter the full name"],
      },
      dob: {
        type: String,
        required: [true, "please enter the dob of the employee"],
      },
      gender: {
        type: String,
        required: [true, "please enter the gender"],
        enum: ["male", "female"],
      },
      contactNumber: {
        type: String,
        required: [true, "enter the contact number"],
      },
      email: {
        type: String,
        unique: true,
        required: [true, "please enter the email"],
        match: [
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          "Please enter a valid email address",
        ],
      },
      address: {
        type: String,
        required: [true, "please enter the address of employee"],
      },
      password: {
        type: String,
        min: [6, "password must be atleast 6 characters"],
      },
    },
    professionalInfo: {
      departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
      },
      designation: {
        type: String,
        required: [true, "please enter the designation"],
      },
      dateOfJoining: {
        type: Date,
        required: [true, "please enter the date of joining"],
      },
      employmentType: {
        type: String,
        enum: ["FULL_TIME", "PART_TIME", "INTERNSHIP", "CONTRACT", "OTHER"],
        default: "FULL_TIME",
      },
    },
    experienceInfo: {
      company: String,
      jobTitle: String,
      duration: {
        startDate: Date,
        endDate: Date,
      },
      responsibilities: String,
    },
    educationInfo: {
      highestQualification: {
        type: String,
        required: [true, "please enter the highest education"],
      },
      university: {
        type: String,
        required: [true, "please enter the highest education"],
      },
      yearOfPassing: {
        type: String,
        required: [true, "please enter the highest education"],
      },
      specialization: {
        type: String,
        required: [true, "please enter the highest education"],
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["REGULAR", "HOD", "VICE_PRINCIPLE", "DIRECTOR"], // TODO non acad adn acadmic add staff
      default: "REGULAR",
    },
    refreshToken: {
      type: String,
    },
    // remove
    accessToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// genearting accessToken
employeeSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    { _id: this._id, email: this.personalInfo.email },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
  );
};
//geneate the refresh token
employeeSchema.methods.generateRefreshToken = async function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRECT!, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
  });
};
const EmployeeModel =
  (mongoose.models.Employee as mongoose.Model<EmployeeSchemaType>) ||
  mongoose.model("Employee", employeeSchema);

export default EmployeeModel;
