import mongoose,{Schema,Document} from "mongoose";
// types of schema 
interface SemesterSubjects {
    [semester: string]: string[];
  }
  interface QuarterlySubjects {
    [quarter: string]: string[];
  }
  interface SessionalSubjects {
    [session: string]: string[];
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
        required:[true,"please enter the department name"],
        unique:true
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

departmentSchema.pre("save",function (next){
  if(this.isModified(this.departmentName)){
    this.departmentName = this.departmentName.toLowerCase().trim();
  }
  next();
})
const DepartmentModel = (mongoose.models.Department as mongoose.Model<DepartmentSchemaType>) || mongoose.model<DepartmentSchemaType>("Department",departmentSchema);

export default DepartmentModel;