
/*
 * @Description:mongodb
 * @Author: lanchao
 * @Date: 2021-12-Mo 02:12:12
 * @Last Modified by:   lanchao
 * @Last Modified time: 2021-12-Mo 02:12:12
 */
const mongodb = require('../middleware/mongo');
const { mongoNode } = require('../../config/index'); // 引入配置文件;
const ObjectID = require('mongodb').ObjectID;
const { clog } = require('../filter/logs');
class MongodbModules {
    /**
       * 获取数量
       * @param {*} _collectionName
       * @param {*} _where
       * @returns
       */
    static async count (_collectionName, _where = {}) {
        return await mongodb.count(`${mongoNode.prefix}${_collectionName}`, _where);
    }

    /**
       * 查询
       * @param {*} _collectionName
       * @param {*} _where
       * @param {*} _sort
       * @param {*} _skip
       * @param {*} _limit
       * @returns
       */
    static async find (_collectionName, _where = {}, _sort = {}, _skip = 0, _limit = 0) {
        return await mongodb.find(`${mongoNode.prefix}${_collectionName}`, _where, _sort, _skip, _limit);
    }

    /**
       * 插入单条数据
       * @param {*} _collectionName
       * @param {*} _json
       * @returns
       */
    static async insert (_collectionName, _json) {
        let data = { insertedCount: 0 };
        try {
            data = await mongodb.insert(`${mongoNode.prefix}${_collectionName}`, _json);
        } catch (_err) {
            clog('error', [_err]);
        }
        return data;
    }

    /**
       * 批量插入
       * @param {*} _collectionName
       * @param {*} _json
       * @returns
       */
    static async insertMany (_collectionName, _json) {
        let data = { insertedCount: 0 };
        try {
            data = await mongodb.insertMany(`${mongoNode.prefix}${_collectionName}`, _json);
        } catch (_err) {
            clog('error', [_err]);
        }
        return data;
    }

    /**
       * 插入 或 更新 (丢弃，使用在服务器会报警告)
       * @param {*} _collectionName
       * @param {*} _json
       * @returns
       */
    static async save (_collectionName, _json) {
        let data = { result: { n: 0 } };
        try {
            data = await mongodb.save(`${mongoNode.prefix}${_collectionName}`, _json);
        } catch (_err) {
            clog('error', [_err]);
        }
        return data.result;
    }

    /**
       * 修改
       * @param {*} _collectionName
       * @param {*} _where
       * @param {*} _json2
       * @param {*} _json3
       * @returns
       */
    static async update (_collectionName, _where, _json2, _json3 = {}) {
        let data = { result: { n: 0 } };
        try {
            data = await mongodb.update(
                `${mongoNode.prefix}${_collectionName}`,
                _where,
                _json2,
                _json3
            );
        } catch (_err) {
            clog('error', [_err]);
        }
        return data.result;
    }

    /**
      * 批量更新
      * @param {*} _collectionName
      * @param {*} _where
      * @param {*} _json2
      * @returns
      */
    static async updates (_collectionName, _where, _json2) {
        let data = { result: { n: 0 } };
        try {
            data = await mongodb.updates(
                `${mongoNode.prefix}${_collectionName}`,
                _where,
                _json2
            );
        } catch (_err) {
            clog('error', [_err]);
        }
        return data.result;
    }

    /**
       * 聚合查询
       * @param {*} _collectionName
       * @param {*} _json
       * @returns
       */
    static async join (_collectionName, _json) {
        return await mongodb.aggregate(`${mongoNode.prefix}${_collectionName}`, _json);
    }

    /**
       * 批量删除
       * @param {*} _collectionName
       * @param {*} _where
       * @returns
       */
    static async deleteMany (_collectionName, _where) {
        let data = { n: 0 };
        try {
            data = await mongodb.deleteMany(`${mongoNode.prefix}${_collectionName}`, _where);
        } catch (_err) {
            clog('error', [_err]);
        }
        return data.result;
    }

    /**
       * 删除
       * @param {*} _collectionName
       * @param {*} _where
       * @returns
       */
    static async remove (_collectionName, _where) {
        let data = { result: { n: 0 } };
        try {
            data = await mongodb.remove(`${mongoNode.prefix}${_collectionName}`, _where);
        } catch (_err) {
            clog('error', [_err]);
        }
        return data.result;
    }

    /**
       * mongodb里面查询 _id 把字符串转换成对象
       * @param {*} _id
       * @returns
       */
    static async getObjectID (_id) {
        return ObjectID(_id);
    }
}
module.exports = MongodbModules;
