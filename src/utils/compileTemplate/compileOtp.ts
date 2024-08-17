import { otpTemplate } from "../template/otpTemplate";
import handlebars from "handlebars";
export function compileOtpTemplate(otp: string, username: string) {
  const template = handlebars.compile(otpTemplate);
  const htmlBody = template({
    otp: otp,
    username: username,
  });
  return htmlBody;
}
