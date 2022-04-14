const nodemailer = require('nodemailer');
const { email } = require('../../config/index');
const os = require('os');
/**
 * 获取内网ip
 * @returns
 */
const getIPAddress = () => {
    let IPAddress = '';
    const interfaces = os.networkInterfaces();
    for (const devName in interfaces) {
        const iface = interfaces[devName];
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
class Email {
    // async..await is not allowed in global scope, must use a wrapper
    static async send (to, subject, html) {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        // let testAccount = await nodemailer.createTestAccount();
        // create reusable transporter object using the default SMTP transport
        const blackList = ['UnauthorizedError: Authorization token expired', 'UnauthorizedError: Authorization token is invalid: invalid token'];
        if (blackList.includes(html)) return false;// 如果十黑名单内容  就不发
        const transporter = nodemailer.createTransport({
            host: email.host,
            secureConnection: true,
            port: 465,
            auth: {
                user: email.user,
                pass: email.pass
            }
        });
        // send mail with defined transport object
        const info = email.status && process.env.NODE_ENV != undefined
            ? await transporter.sendMail({
                from: email.user,
                to: to,
                subject: `${email.title}${subject}`,
                html: `env:${process.env.NODE_ENV};<br/>serverIp:${getIPAddress()};<br/>pid:${process.pid};<br/>content:${html};`
            })
            : { response: '未启用邮件功能或process.env.NODE_ENV为空' };
        // console.log(info);
        return info;
    }
}
module.exports = Email;
