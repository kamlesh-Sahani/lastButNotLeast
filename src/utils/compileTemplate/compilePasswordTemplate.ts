import { passwordTemplate } from './../template/passwordTemplate';
import handlebars from "handlebars";
export function compilePasswordTemplate(fullName:string,password: string) {
  const template = handlebars.compile(passwordTemplate);
  const htmlBody = template({
    name:fullName,
    password:password,
    // login_url:login_url
  });
  return htmlBody;
}
