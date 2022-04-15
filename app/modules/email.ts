import nodemailer from 'nodemailer';
import { emailConfig } from '../../config/index';
import os from 'os';
/**
 * 获取内网ip
 * @returns
 */
const getIPAddress = () => {
  let IPAddress = '';
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    const iface: any = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        IPAddress = alias.address;
      }
    }
  }
  return IPAddress;
};
const obj = {
  host: emailConfig.host,
  secureConnection: true,
  port: 465,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass
  }
};
const transporter = nodemailer.createTransport(obj);
export default class Email {
  // async..await is not allowed in global scope, must use a wrapper
  static async send(_to: string, _subject: string, _html: string) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();
    // create reusable transporter object using the default SMTP transport
    const blackList = [
      'UnauthorizedError: Authorization token expired',
      'UnauthorizedError: Authorization token is invalid: invalid token'
    ];
    if (blackList.includes(_html)) return false; // 如果十黑名单内容  就不发
    // send mail with defined transport object
    const info =
      emailConfig.status && process.env.NODE_ENV != undefined
        ? await transporter.sendMail({
            from: emailConfig.user,
            to: _to,
            subject: `${emailConfig.title}${_subject}`,
            html: `env:${
              process.env.NODE_ENV
            };<br/>serverIp:${getIPAddress()};<br/>pid:${
              process.pid
            };<br/>content:${_html};`
          })
        : { response: '未启用邮件功能或process.env.NODE_ENV为空' };
    // console.log(info);
    return info;
  }
}
