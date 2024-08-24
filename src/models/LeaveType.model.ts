import mongoose, { Schema, Document } from "mongoose";

export interface LeavesType extends Document {
  name: string;
  description: string;
  rules:string;
  allowances:{
    monthly:number;
    yearly:number;
    weekly:number;
  }
  createdAt: Date;
  updatedAt: Date;
}

const leavesTypesSchema = new Schema<LeavesType>(
  {
    name: {
      type: String,
      required: [true, "please enter the leave name"],
      unique:true
    },
    description: {
      type: String,
      required: [true, "please enter the description"],
    },
    allowances:{
      monthly:{
        type:Number,
        required:[true,"please eneter the monthly allowance"]
      },
      yearly:{
        type:Number,
        required:[true,"please eneter the yearly allowance"]
      },
      weekly:{
        type:Number,
        required:[true,"please eneter the weekly allowance"]
      }

    }
  },
  { timestamps: true }
);

const LeaveTypesModel =
  (mongoose.models.LeaveType as mongoose.Model<LeavesType>) ||
  mongoose.model("LeaveType", leavesTypesSchema);

export default LeaveTypesModel;
