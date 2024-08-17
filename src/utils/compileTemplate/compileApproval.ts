import { approvalTemplate } from "../template/approvalTemplate";
import handlebars from "handlebars";
export function compileApprovalTemplate(
  role: string,
  faculty: string,
  department: string,
  leaveType: string,
  startDate: string,
  endDate: string,
  reason: string,
  link: string
) {
  const template = handlebars.compile(approvalTemplate);
  const htmlBody = template({
    role: role,
    faculty: faculty,
    department: department,
    leaveType: leaveType,
    startDate: startDate,
    endDate: endDate,
    reason: reason,
    link: link,
  });
  return htmlBody;
}
