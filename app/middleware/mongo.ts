/*
 * @Description:mongodb
 * @Author: lanchao
 * @Date: 2021-12-Mo 02:12:12
 * @Last Modified by:   lanchao
 * @Last Modified time: 2021-12-Mo 02:12:12
 */
import { MongoClient, ObjectID } from 'mongodb';
import fast from '../filter/fast';
const { mongoNode } = require('../../config/index'); // 引入配置文件
const dbURL = `mongodb://${mongoNode.db_user}:${mongoNode.db_pwd}@${mongoNode.db_host}/${mongoNode.db_name}`;

class Db {
  static instance: any;
  dbClient: any;
  static getInstance() {
    /* 1、单例  多次实例化实例不共享的问题 */
    if (!Db.instance) {
      Db.instance = new Db();
    }
    return Db.instance;
  }

  constructor() {
    this.dbClient = null; /* 属性 放db对象 */
    this.connect()
      .then((_data) => {
        fast.clog('info', ['mongodb connect success']);
      })
      .catch((_error) => {
        // 此处做重连
        fast.clog('error', ['mongodb connect error', _error]);
      }); /* 实例化的时候就连接数据库 */
  }

  /**
   * 连接数据库
   * @returns
   */
  connect() {
    const _that = this;
    return new Promise((resolve, reject) => {
      if (!_that.dbClient) {
        /* 1、解决数据库多次连接的问题 */
        const client = new MongoClient(dbURL); /* 属性 放db对象 */
        client
          .connect()
          .then((_data: any) => {
            _that.dbClient = _data.db(mongoNode.db_name);
            resolve(_that.dbClient);
          })
          .catch((_err: any) => {
            reject(_err);
          });
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
  find(
    _collectionName: string,
    _where = {},
    _sort = {},
    _skip = 0,
    _limit = 0
  ) {
    return new Promise((resolve, reject) => {
      this.connect().then((db: any) => {
        let result = db.collection(_collectionName).find(_where);
        if (_skip > 0) result = result.skip(_skip);
        if (_limit > 0) result = result.limit(_limit);
        if (_sort != {}) result = result.sort(_sort);
        result.toArray(function (_err: any, _result: any) {
          if (_err) {
            reject(_err);
            return;
          }
          resolve(_result);
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
  count(_collectionName: string, _where = {}) {
    return new Promise((resolve, reject) => {
      this.connect().then((db: any) => {
        db.collection(_collectionName).countDocuments(
          _where,
          function (_err: any, _result: any) {
            if (_err) {
              reject(_err);
            } else {
              resolve(_result);
            }
          }
        );
      });
    });
  }

  /**
   * 聚合
   * @param {*} _collectionName 集合名
   * @param {*} _json 条件
   * @returns
   */
  aggregate(_collectionName: string, _json = {}) {
    return new Promise((resolve, reject) => {
      this.connect().then((db: any) => {
        const result = db.collection(_collectionName).aggregate(_json);
        result.toArray(function (_err: any, _result: any) {
          if (_err) {
            reject(_err);
            return;
          }
          resolve(_result);
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
  update(_collectionName: string, _where: any, _json2: any, _json3: any = {}) {
    return new Promise((resolve, reject) => {
      this.connect().then((db: any) => {
        db.collection(_collectionName).updateOne(
          _where,
          _json2,
          _json3,
          (_err: any, _result: any) => {
            if (_err) {
              reject(_err);
            } else {
              resolve(_result);
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
  updates(_collectionName: string, _where: any, _json2: any) {
    return new Promise((resolve, reject) => {
      this.connect().then((db: any) => {
        db.collection(_collectionName).updateMany(
          _where,
          _json2,
          (_err: any, _result: any) => {
            if (_err) {
              reject(_err);
            } else {
              resolve(_result);
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
  save(_collectionName: string, _json: any) {
    return new Promise((resolve, reject) => {
      this.connect().then((db: any) => {
        db.collection(_collectionName).save(
          _json,
          function (_err: any, _result: any) {
            if (_err) {
              reject(_err);
            } else {
              resolve(_result);
            }
          }
        );
      });
    });
  }

  /**
   * 插入单条数据
   * @param {*} _collectionName 集合名
   * @param {*} _json 内容
   * @returns
   */
  insert(_collectionName: string, _json: any) {
    return new Promise((resolve, reject) => {
      this.connect().then((db: any) => {
        db.collection(_collectionName).insertOne(
          _json,
          function (_err: any, _result: any) {
            if (_err) {
              reject(_err);
            } else {
              resolve(_result);
            }
          }
        );
      });
    });
  }

  /**
   * 插入多条数据
   * @param {*} _collectionName 集合名
   * @param {*} _json 内容
   * @returns
   */
  insertMany(_collectionName: string, _json: any) {
    return new Promise((resolve, reject) => {
      this.connect().then((db: any) => {
        db.collection(_collectionName).insertMany(
          _json,
          function (_err: any, _result: any) {
            if (_err) {
              reject(_err);
            } else {
              resolve(_result);
            }
          }
        );
      });
    });
  }

  /**
   * 删除数据
   * @param {*} _collectionName 集合名
   * @param {*} _where 条件
   * @returns
   */
  remove(_collectionName: string, _where: any) {
    return new Promise((resolve, reject) => {
      this.connect().then((db: any) => {
        db.collection(_collectionName).removeOne(
          _where,
          function (_err: any, _result: any) {
            if (_err) {
              reject(_err);
            } else {
              resolve(_result);
            }
          }
        );
      });
    });
  }

  /**
   * 删除多条数据
   * @param {*} _collectionName 集合名
   * @param {*} _where 条件
   * @returns
   */
  deleteMany(_collectionName: string, _where: any) {
    return new Promise((resolve, reject) => {
      this.connect().then((db: any) => {
        db.collection(_collectionName).deleteMany(
          _where,
          function (_err: any, _result: any) {
            if (_err) {
              reject(_err);
            } else {
              resolve(_result);
            }
          }
        );
      });
    });
  }

  /**
   * mongodb里面查询 _id 把字符串转换成对象
   * @param {*} _id _id
   * @returns
   */
  getObjectId(_id: any) {
    return new ObjectID(_id);
  }
}
export default Db.getInstance();
