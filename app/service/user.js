
/*
 * @Description:用户
 * @Author: lanchao
 * @Date: 2021-12-Mo 02:12:12
 * @Last Modified by:   lanchao
 * @Last Modified time: 2021-12-Mo 02:12:12
 */

const Jwt = require('../modules/jwt');
const redis = require('../modules/redis');
const UserModel = require('../model/user');
const { getDateFormat, getValueOf } = require('../filter/time');
class UserService {
    /**
       * 获取user信息
       * @param {*} _guid
       * @returns
       */
    static async getUserOne (_guid) {
        const where = { guid: _guid }
        const user = await UserModel.find(where);
        return user;
    }
}
module.exports = UserService;
