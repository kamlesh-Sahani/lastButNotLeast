import mongoose,{Schema,Document} from "mongoose";

// types of schema 

interface SemesterSubjects {
    [semester: string]: string[]; // e.g., sem1: ["subject1", "subject2"]
  }
  
  interface QuarterlySubjects {
    [quarter: string]: string[]; // e.g., qtr1: ["subject1", "subject2"]
  }
  
  interface SessionalSubjects {
    [session: string]: string[]; // e.g., summer: ["subject1", "subject2"]
  }

  interface CourseType {
    courseName:string;
    duration: number;
    durationType:"SEMESTER" | "QUARTERLY" | "SESSIONAL";
    sections: number;
    subjects: SemesterSubjects | QuarterlySubjects | SessionalSubjects; 
  }
export interface DepartmentSchemaType extends Document{
    departmentName:string;
    departmentHead:mongoose.Schema.Types.ObjectId;
    courses:CourseType[];
    employees:mongoose.Schema.Types.ObjectId[];
    createdAt:Date;
    updatedAt:Date;
}
const departmentSchema = new Schema<DepartmentSchemaType>({
    departmentHead:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee"
    },
    // emplooyes which is inculde this department 
    employees:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee"
    }],
    departmentName:{
        type:String,
        required:[true,"please enter the department name"]
    },
    courses:[
        {
            duration: {
              type: Number,
              required: true
            },
            durationType: {
              type: String,
              enum: ["SEMESTER", "QUARTERLY", "SESSIONAL"], // Enum for duration types
             default:"SEMESTER"
            },
            sections: {
              type: Number,
              default:1
            },
            subjects: {
              type: Map,
              of: [String], 
          
            }

    }]
},{timestamps:true})
const DepartmentModel = (mongoose.models.Department as mongoose.Model<DepartmentSchemaType>) || mongoose.model<DepartmentSchemaType>("Department",departmentSchema);
export default DepartmentModel;