import dbConnect from "@/src/app/lib/dbConnect";
import LeaveApplicationModel from "@/src/models/LeaveApplication.model";
import LeaveApprovalModel from "@/src/models/LeaveApproval.model";
import { NextResponse, NextRequest } from "next/server";
dbConnect();

async function updateLeaveApplication(leaveApplicationId: any) {
  try {
    const leaveApprovals = await LeaveApprovalModel.find({ leaveApplicationId });
    const leaveApplication = await LeaveApplicationModel.findById(leaveApplicationId);

    if (!leaveApplication) {
      return;
    }

    const isRejected = leaveApprovals.some(approval => approval.approvalStatus === "REJECTED");

    if (isRejected) {
      leaveApplication.status = "REJECTED";
      await leaveApplication.save({ validateBeforeSave: false });
      return;
    }

    const approvedCount = leaveApprovals.filter(approval => approval.approvalStatus === "APPROVED").length;

    if (approvedCount === 3) {
      leaveApplication.status = "APPROVED";
      await leaveApplication.save({ validateBeforeSave: false });
    }
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: `Something went wrong: ${error.message}`
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { leaveApplicationId, approverId, approvalStatus, comments } = reqBody;

    if (!leaveApplicationId || !approverId || !approvalStatus) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all fields.",
        },
        { status: 400 }
      );
    }

    const existingApproval = await LeaveApprovalModel.findOne({
      approverId,
      leaveApplicationId,
    });

    if (existingApproval) {
      existingApproval.approvalStatus = approvalStatus;
      existingApproval.comments = comments;

      const updatedApproval = await existingApproval.save({
        validateBeforeSave: false,
      });

      if (!updatedApproval) {
        return NextResponse.json(
          {
            success: false,
            message: "Failed to update approval.",
          },
          { status: 400 }
        );
      }

      await updateLeaveApplication(leaveApplicationId);
      return NextResponse.json(
        {
          success: true,
          message: "Successfully updated leave approval.",
          updatedApproval,
        },
        { status: 200 }
      );
    }

    const newLeaveApproval = await LeaveApprovalModel.create({
      leaveApplicationId,
      approverId,
      approvalStatus,
      comments,
    });

    if (!newLeaveApproval) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create leave approval.",
        },
        { status: 400 }
      );
    }

    await updateLeaveApplication(leaveApplicationId);

    return NextResponse.json(
      {
        success: true,
        message: "Successfully applied leave approval.",
        leaveApproval: newLeaveApproval,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: `Failed to create leave approval: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
