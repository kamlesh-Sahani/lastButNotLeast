import mongoose,{Schema,Document, mongo} from "mongoose";

export  interface LeaveApprovalType extends Document{
    leaveApplicationId:mongoose.Schema.Types.ObjectId;
    approverId:mongoose.Schema.Types.ObjectId;
    approvalStatus:"APPROVED" |"REJECTED",
    comments:string;
    approvedAt:Date;
    createdAt:Date;
    updatedAt:Date;
}

const leaveApprovalSchema = new Schema<LeaveApprovalType>({
    leaveApplicationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"LeaveApplication"
    },
    approverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee"
    },
    approvalStatus:{
        type:String,
        enum:["APPROVED","REJECTED"],
        required:[true,"please enter the appval status"]
    },
    comments:{
        type:String,  // it is optional 
    },
    approvedAt:{
        type:Date,
        default:()=>Date.now(),
        required:[true,"approved date is not found"]
    }
},{timestamps:true});


const LeaveApprovalModel = (mongoose.models.LeaveApproval as mongoose.Model<LeaveApprovalType>) || mongoose.model("LeaveApproval",leaveApprovalSchema);

export default LeaveApprovalModel;