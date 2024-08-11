import mongoose,{Schema,Document} from 'mongoose';

export interface CourseType extends Document{
    courseName:string;
    courseCode:string;
    departmentId:mongoose.Schema.Types.ObjectId;
    instructorId:mongoose.Schema.Types.ObjectId; //optional
    createdAt:Date;
    updatedAt:Date;
}


const courseSchema = new Schema<CourseType>({
    courseName:{
        type:String,
        required:[true,"please enter the course name"],
        unique:true,
    },
    courseCode:{
        type:String,
        required:[true,"please enter the course code"]
    },
    departmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Department"
    },
    instructorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee"
    }
},{timestamps:true});


const CourseModel =(mongoose.models.Course as mongoose.Model<CourseType>) || mongoose.model("Course",courseSchema);

export default CourseModel;