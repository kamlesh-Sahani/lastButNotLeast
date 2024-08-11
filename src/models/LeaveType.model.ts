import mongoose, { Schema, Document } from "mongoose";

export interface LeavesType extends Document {
  name: string;
  daysPerYear: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const leavesTypesSchema = new Schema<LeavesType>(
  {
    name: {
      type: String,
      required: [true, "please enter the leave name"],
    },
    daysPerYear: {
      type: Number,
      required: [true, "please enter the number of days leaves in a year"],
    },
    description: {
      type: String,
      required: [true, "please enter the description"],
    },
  },
  { timestamps: true }
);

const LeaveTypesModel =
  (mongoose.models.LeaveType as mongoose.Model<LeavesType>) ||
  mongoose.model("LeaveType", leavesTypesSchema);

export default LeaveTypesModel;
