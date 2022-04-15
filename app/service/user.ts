/*
 * @Description:用户
 * @Author: lanchao
 * @Date: 2021-12-Mo 02:12:12
 * @Last Modified by:   lanchao
 * @Last Modified time: 2021-12-Mo 02:12:12
 */
import UserModel from '../model/user';
class UserService {
  /**
   * 获取user信息
   * @param {*} _guid
   * @returns
   */
  static async getUserOne(_guid: number) {
    const where = { guid: _guid };
    const user = await UserModel.find(where);
    return user;
  }
}
export default UserService;
