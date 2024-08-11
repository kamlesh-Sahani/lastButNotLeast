import mongoose,{Schema,Document} from "mongoose";

// types of schema 
export interface DepartmentSchemaType extends Document{
    departmentName:string;
    departmentHead:mongoose.Schema.Types.ObjectId;
    courses:mongoose.Schema.Types.ObjectId[];
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
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }]
},{timestamps:true})


const DepartmentModel = (mongoose.models.Department as mongoose.Model<DepartmentSchemaType>) || mongoose.model<DepartmentSchemaType>("Department",departmentSchema);
export default DepartmentModel;