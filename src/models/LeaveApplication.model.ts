import mongoose,{Schema,Document} from "mongoose";
export interface LeaveApplicationType extends Document {
    employeeId:mongoose.Schema.Types.ObjectId;
    leaveTypeId:mongoose.Schema.Types.ObjectId;
    startDate:Date;
    endDate:Date;
    reason:string;
    status:"PENDING" |"APPROVED" |"REJECTED";
    appliedDate:Date;
    createdAt:Date;
    updatedAt:Date;
}

const leaveApplicationSchema:Schema<LeaveApplicationType>= new Schema({
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
      ref:"Employee"
    },
    leaveTypeId:{
        type:mongoose.Schema.Types.ObjectId,
     ref:"LeaveType"
    },
    startDate:{
        type:Date,
        required:[true,"please enter the start date"]
    },
    endDate:{
        type:Date,
        required:[true,"please enter the end date"]
    },
    reason:{
        type:String,
        required:[true,"please enter the reason of leave"]
    },
    status:{
        type:String,
        enum:["PENDING","APPROVED","REJECTED"],
        default:"PENDING"
    },
    appliedDate:{
        type:Date,
        default:()=>Date.now(),
        required:[true,"applied date is not found"]
    },
},{timestamps:true})

const LeaveApplicationModel =(mongoose.models.LeaveApplication as mongoose.Model<LeaveApplicationType>) || mongoose.model("LeaveApplication",leaveApplicationSchema);

export default LeaveApplicationModel;