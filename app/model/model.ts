import mongodb from '../modules/mongodb';
class Model {
  table: string = '';
  mongodb: any = null;
  constructor() {
    this.table = '';
    this.mongodb = mongodb;
  }

  /**
   * 获取id
   * @param {*} _id
   * @returns
   */
  async getObjectID(_id: any) {
    return await this.mongodb.getObjectID(_id);
  }

  /**
   * 增加数据
   * @param {*} _data
   */
  async add(_data: any) {
    return await this.mongodb.insert(this.table, _data);
  }

  /**
   * 批量增加
   * @param {*} _data
   */
  async addMany(_data: any) {
    return await this.mongodb.insertMany(this.table, _data);
  }

  /**
   * 获取数据
   * @param {*} _where
   */
  async find(_where: any, _sort = {}, _skip: number = 0, _limit: number = 0) {
    return await this.mongodb.find(this.table, _where, _sort, _skip, _limit);
  }

  /**
   * 获取数据数量
   * @param {*} _where
   * @returns
   */
  async count(_where: any) {
    return await this.mongodb.count(this.table, _where);
  }

  /**
   * 修改数据
   * @param {*} _where
   * @param {*} _data
   */
  async update(_where: any, _data: any) {
    return await this.mongodb.update(this.table, _where, _data);
  }

  /**
   * 删除数据
   * @param {*} _where
   */
  async remove(_where: any) {
    return await this.mongodb.remove(this.table, _where);
  }

  /**
   * 批量删除
   * @param {*} _where
   * @returns
   */
  async deleteMany(_where: any) {
    return await this.mongodb.deleteMany(this.table, _where);
  }
}
export default Model;
