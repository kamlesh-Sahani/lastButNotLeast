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
  
  // Define the structure of the course object
  interface CourseType {
    duration: number; // Duration of the course (e.g., in weeks or months)
    durationType:"SEMESTER" | "QUARTERLY" | "SESSIONAL"; // Type of duration (semester, quarterly, etc.)
    sections: number; // Number of sections or modules in the course
    subjects: SemesterSubjects | QuarterlySubjects | SessionalSubjects; // Subjects based on duration type
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
              startYear: {
                type: Number,
                required: true,
              },
              endYear: {
                type: Number,
                required: true,
              },
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

    }]
},{timestamps:true})


const DepartmentModel = (mongoose.models.Department as mongoose.Model<DepartmentSchemaType>) || mongoose.model<DepartmentSchemaType>("Department",departmentSchema);
export default DepartmentModel;