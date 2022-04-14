
/*
 * @Description:mongodb
 * @Author: lanchao
 * @Date: 2021-12-Mo 02:12:12
 * @Last Modified by:   lanchao
 * @Last Modified time: 2021-12-Mo 02:12:12
 */
const MongoDB = require('mongodb');
const MongoClient = MongoDB.MongoClient;
const ObjectID = MongoDB.ObjectID;
const { mongoNode } = require('../../config/index'); // 引入配置文件
let dbURL = `mongodb://${mongoNode.db_user}:${mongoNode.db_pwd}@${mongoNode.db_host}/${mongoNode.db_name}`;
if (mongoNode.type === 1) dbURL = dbURL + '?replicaSet=rs0';
const { clog } = require('../filter/logs');
class Db {
    static getInstance () {
        /* 1、单例  多次实例化实例不共享的问题 */
        if (!Db.instance) {
            Db.instance = new Db();
        }
        return Db.instance;
    }

    constructor() {
        this.dbClient = ''; /* 属性 放db对象 */
        this.connect().then(_data => {
            clog('info', ['mongodb connect success']);
        }).catch(_error => {
            // 此处做重连
            clog('error', ['mongodb connect error', _error]);
        }); /* 实例化的时候就连接数据库 */
    }

    /**
       * 连接数据库
       * @returns
       */
    connect () {
        const _that = this;
        return new Promise((resolve, reject) => {
            if (!_that.dbClient) {
                /* 1、解决数据库多次连接的问题 */
                MongoClient.connect(
                    dbURL,
                    { useNewUrlParser: true, useUnifiedTopology: true },
                    (err, client) => {
                        if (err) {
                            reject(err);
                        } else {
                            _that.dbClient = client.db(mongoNode.db_name);
                            resolve(_that.dbClient);
                        }
                    }
                );
            } else {
                resolve(_that.dbClient);
            }
        });
    }

    /**
       * 查询
       * @param {*} _collectionName 集合名
       * @param {*} _where where
       * @param {*} _sort 排序
       * @param {*} _skip 开始
       * @param {*} _limit 数量
       */
    find (_collectionName, _where = {}, _sort = {}, _skip = 0, _limit = 0) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                let result = db.collection(_collectionName).find(_where);
                if (_skip > 0) result = result.skip(_skip);
                if (_limit > 0) result = result.limit(_limit);
                if (_sort != {}) result = result.sort(_sort);
                result.toArray(function (_err, _docs) {
                    if (_err) {
                        reject(_err);
                        return;
                    }
                    resolve(_docs);
                });
            });
        });
    }

    /**
       * 数量
       * @param {*} _collectionName 表名
       * @param {*} _where where
       * @param {*} _sort 排序
       * @param {*} _skip 开始
       * @param {*} _limit 数量
       */
    count (_collectionName, _where = {}) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(_collectionName).countDocuments(_where, (_err, result) => {
                    if (_err) {
                        reject(_err);
                    } else {
                        resolve(result);
                    }
                });
            });
        });
    }

    /**
       * 聚合
       * @param {*} _collectionName 集合名
       * @param {*} _json 条件
       * @returns
       */
    aggregate (_collectionName, _json = {}) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                const result = db.collection(_collectionName).aggregate(_json);
                result.toArray(function (_err, _docs) {
                    if (_err) {
                        reject(_err);
                        return;
                    }
                    resolve(_docs);
                });
            });
        });
    }

    /**
       * 更新单条数据
       * @param {*} _collectionName 集合名
       * @param {*} _where where
       * @param {*} _json2 修改内容
       * @param {*} _json3
       * @returns
       */
    update (_collectionName, _where, _json2, _json3 = {}) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(_collectionName).updateOne(
                    _where,
                    _json2,
                    _json3,
                    (_err, result) => {
                        if (_err) {
                            reject(_err);
                        } else {
                            resolve(result);
                        }
                    }
                );
            });
        });
    }

    /**
       * 更新多条数据
       * @param {*} _collectionName 集合名
       * @param {*} _where where
       * @param {*} _json2 内容
       * @returns
       */
    updates (_collectionName, _where, _json2) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(_collectionName).updateMany(
                    _where,
                    _json2,
                    (_err, result) => {
                        if (_err) {
                            reject(_err);
                        } else {
                            resolve(result);
                        }
                    }
                );
            });
        });
    }

    /**
       * 保存或更新
       * @param {*} _collectionName 集合名
       * @param {*} _json 内容
       * @returns
       */
    save (_collectionName, _json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(_collectionName).save(_json, function (_err, _result) {
                    if (_err) {
                        reject(_err);
                    } else {
                        resolve(_result);
                    }
                });
            });
        });
    }

    /**
       * 插入单条数据
       * @param {*} _collectionName 集合名
       * @param {*} _json 内容
       * @returns
       */
    insert (_collectionName, _json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(_collectionName).insertOne(_json, function (_err, _result) {
                    if (_err) {
                        reject(_err);
                    } else {
                        resolve(_result);
                    }
                });
            });
        });
    }

    /**
       * 插入多条数据
       * @param {*} _collectionName 集合名
       * @param {*} _json 内容
       * @returns
       */
    insertMany (_collectionName, _json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(_collectionName).insertMany(_json, function (_err, _result) {
                    if (_err) {
                        reject(_err);
                    } else {
                        resolve(_result);
                    }
                });
            });
        });
    }

    /**
       * 删除数据
       * @param {*} _collectionName 集合名
       * @param {*} _where 条件
       * @returns
       */
    remove (_collectionName, _where) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(_collectionName).removeOne(_where, function (_err, _result) {
                    if (_err) {
                        reject(_err);
                    } else {
                        resolve(_result);
                    }
                });
            });
        });
    }

    /**
       * 删除多条数据
       * @param {*} _collectionName 集合名
       * @param {*} _where 条件
       * @returns
       */
    deleteMany (_collectionName, _where) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(_collectionName).deleteMany(_where, function (_err, _result) {
                    if (_err) {
                        reject(_err);
                    } else {
                        resolve(_result);
                    }
                });
            });
        });
    }

    /**
       * mongodb里面查询 _id 把字符串转换成对象
       * @param {*} _id _id
       * @returns
       */
    getObjectId (_id) {
        return new ObjectID(_id);
    }
}
module.exports = Db.getInstance();
