/*
 * @Description:用户数据
 * @Author: lanchao
 * @Date: 2021-12-Mo 02:12:12
 * @Last Modified by:   lanchao
 * @Last Modified time: 2021-12-Mo 02:12:12
 */
import Model from './model';
class UserModel extends Model {
  constructor() {
    super();
    this.table = 'user';
  }

  async join(_body: any) {
    const data = await this.mongodb.join(this.table, _body);
    return data;
  }
}
export default new UserModel();
