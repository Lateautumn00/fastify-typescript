/*
 * @Description:用户数据
 * @Author: lanchao
 * @Date: 2021-12-Mo 02:12:12
 * @Last Modified by:   lanchao
 * @Last Modified time: 2021-12-Mo 02:12:12
 */
const Model = require('./model');
class UserModel extends Model {
    constructor() {
        super();
        this.table = 'user';
    }

    async join (_body) {
        const data = await this.mongodb.join(this.table, _body);
        return data;
    }
}
module.exports = new UserModel();
