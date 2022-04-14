
/*
 * @Description:用户
 * @Author: lanchao
 * @Date: 2021-12-Mo 02:12:12
 * @Last Modified by:   lanchao
 * @Last Modified time: 2021-12-Mo 02:12:12
 */
const UserService = require('../service/user');
class UserController {
    /**
     * 获取个人用户信息
     * @param {*} _req 接收数据
     * @param {*} _res 发送数据
     * @returns
     */
    static async getUser (_req) {
        if (_req.validationError) return { statusCode: 1001, message: '参数错误', data: {} };// 校验失败时
        //const { guid } = _req.body;//post
        //const { guid } = _req.user//获取auth guid
        const { guid } = _req.query; //get
        const userData = await UserService.getUserOne(guid);
        return { statusCode: 1000, message: '成功', data: userData };
    }
}
module.exports = UserController;
