import mongoose, { Schema, Document } from "mongoose";

export interface LeaveBalanceType extends Document {
  employeeId: mongoose.Schema.Types.ObjectId;
  leaveTypeId: mongoose.Schema.Types.ObjectId;
  leaveBalance: number;
  createdAt: Date;
  updatedAt: Date;
}
const leaveBalanceSchema = new Schema<LeaveBalanceType>(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "Please enter the employee ID"]
    },
    leaveTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LeaveType",
      required: [true, "Please enter the leave type ID"]
    },
    leaveBalance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const LeaveBalanceModel =
  (mongoose.models.LeaveBalance as mongoose.Model<LeaveBalanceType>) ||
  mongoose.model("LeaveBalance", leaveBalanceSchema);

export default LeaveBalanceModel;
