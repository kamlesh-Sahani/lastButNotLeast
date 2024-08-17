import { arrangementTemplate } from "../template/arrangementTemplate";
import handlebars from "handlebars";

export function compileArrangementTemplate(
  faculty: string,
  course: string,
  subject: string,
  department: string,
  semester: string,
  timing: string,
  link: string
): string {
  const template = handlebars.compile(arrangementTemplate);
  return template({
    faculty,
    course,
    subject,
    department,
    semester,
    timing,
    link,
  });
}
