/*
 * @Description:redis
 * @Author: lanchao
 * @Date: 2021-12-Mo 02:12:12
 * @Last Modified by:   lanchao
 * @Last Modified time: 2021-12-Mo 02:12:12
 */
import redis from '../middleware/redis';
import { redisNode } from '../../config/index'; // 引入配置文件
class RedisModules {
  /**
   * 读取string
   * @param {*} _redisName
   * @returns
   */
  static async get(_redisName: string) {
    return await redis.subscriberRedis1.get(`${redisNode.prefix}${_redisName}`);
  }

  /**
   * 写入redis string
   * @param {*} _redisName
   * @param {*} _data
   * @param {*} _ex
   * @param {*} _time
   * @returns
   */
  static async set(_redisName: string, _data: any, _ex = 'EX', _time = 30) {
    return await redis.publisherRedis.set(
      `${redisNode.prefix}${_redisName}`,
      _data,
      _ex,
      _time
    );
  }

  /**
   * 只有在 key 不存在时设置 key 的值
   * @param {*} _redisName
   * @param {*} _data
   * @returns
   */
  static async setnx(_redisName: string, _data: any) {
    return await redis.publisherRedis.setnx(
      `${redisNode.prefix}${_redisName}`,
      _data
    );
  }

  /**
   * 将值 value 关联到 key ，并将 key 的过期时间设为 seconds (以秒为单位)
   * @param {*} _redisName
   * @param {*} _seconds
   * @param {*} _data
   * @returns
   */
  static async setex(_redisName: string, _seconds: any, _data: any) {
    return await redis.publisherRedis.setex(
      `${redisNode.prefix}${_redisName}`,
      _seconds,
      _data
    );
  }

  /**
   * 自增1
   * @param {*} _redisName
   * @returns
   */
  static async incr(_redisName: string) {
    return await redis.publisherRedis.incr(`${redisNode.prefix}${_redisName}`);
  }

  /**
   * 自减1
   * @param {*} _redisName
   * @returns
   */
  static async decr(_redisName: string) {
    return await redis.publisherRedis.decr(`${redisNode.prefix}${_redisName}`);
  }

  /**
   * 删除
   * @param {*} _redisName
   * @returns
   */
  static async del(_redisName: string) {
    return await redis.publisherRedis.del(`${redisNode.prefix}${_redisName}`);
  }

  /**
   * 存储hash
   * @param {*} _redisName
   * @param {*} _data
   * @returns
   */
  static async hmset(_redisName: string, _data: any) {
    return await redis.publisherRedis.hmset(
      `${redisNode.prefix}${_redisName}`,
      _data
    );
  }

  /**
   * 获取hash表字段数量
   * @param {*} _redisName
   * @returns
   */
  static async hlen(_redisName: string) {
    return await redis.subscriberRedis1.hlen(
      `${redisNode.prefix}${_redisName}`
    );
  }

  /**
   * 查找hash单个值
   * @param {*} _redisName
   * @param {*} _key
   * @returns
   */
  static async hget(_redisName: string, _key: any) {
    return await redis.subscriberRedis1.hget(
      `${redisNode.prefix}${_redisName}`,
      _key
    );
  }

  /**
   * 查找hash全部值
   * @param {*} _redisName
   * @returns
   */
  static async hgetAll(_redisName: string) {
    return await redis.subscriberRedis1.hgetall(
      `${redisNode.prefix}${_redisName}`
    );
  }

  /**
   * 更新一个hash值
   * @param {*} _redisName
   * @param {*} _key
   * @param {*} _value
   * @returns
   */
  static async hset(_redisName: string, _key: any, _value: any) {
    return await redis.publisherRedis.hset(
      `${redisNode.prefix}${_redisName}`,
      _key,
      _value
    );
  }

  /**
   * 为hash中整数增加值
   * @param {*} _redisName
   * @param {*} _key
   * @param {*} _number
   * @returns
   */
  static async hincrby(_redisName: string, _key: any, _number: any) {
    return await redis.publisherRedis.hincrby(
      `${redisNode.prefix}${_redisName}`,
      _key,
      _number
    );
  }

  /**
   * 判断hash中某个值是否存在
   * @param {*} _redisName
   * @param {*} _key
   * @returns
   */
  static async hexists(_redisName: string, _key: any) {
    const result = await redis.subscriberRedis1.hexists(
      `${redisNode.prefix}${_redisName}`,
      _key
    );
    return !result ? 0 : result;
  }

  /**
   * 向sort中插入数据
   * @param {*} _redisName
   * @param {*} _data
   * @returns
   */
  static async zadd(_redisName: string, _data: any) {
    return await redis.publisherRedis.zadd(
      `${redisNode.prefix}${_redisName}`,
      _data
    );
  }

  /**
   * 有序集合中对指定成员的分数加上增量 increment
   * @param {*} _redisName
   * @param {*} _num
   * @param {*} _key
   * @returns
   */
  static async zincrby(_redisName: string, _num: any, _key: any) {
    return await redis.publisherRedis.zincrby(
      `${redisNode.prefix}${_redisName}`,
      _num,
      _key
    );
  }

  /**
   * 返回有序集中，成员的分数值
   * @param {*} _redisName
   * @param {*} _key
   * @returns
   */
  static async zscore(_redisName: string, _key: any) {
    return await redis.publisherRedis.zscore(
      `${redisNode.prefix}${_redisName}`,
      _key
    );
  }

  /**
   * 获取有序集合成员数
   * @param {*} _redisName
   * @returns
   */
  static async zcard(_redisName: string) {
    return await redis.subscriberRedis1.zcard(
      `${redisNode.prefix}${_redisName}`
    );
  }

  /**
   * 返回有序集中指定区间内的成员，通过索引，分数从高到低
   * @param {*} _redisName
   * @param {*} _start
   * @param {*} _stop
   * @returns
   */
  static async zrevrange(_redisName: string, _start: any, _stop: any) {
    return await redis.subscriberRedis1.zrevrange(
      `${redisNode.prefix}${_redisName}`,
      _start,
      _stop
    );
  }

  /**
   * 返回有序集中成员的排名。其中有序集成员按分数值递减(从大到小)排序
   * @param {*} _redisName
   * @param {*} _member
   * @returns
   */
  static async zrevrank(_redisName: string, _member: any) {
    return redis.subscriberRedis1.zrevrank(
      `${redisNode.prefix}${_redisName}`,
      _member
    );
  }

  /**
   * 通过索引区间返回有序集合指定区间内的成员
   * @param {*} _redisName
   * @param {*} _start
   * @param {*} _stop
   * @returns
   */
  static async zrange(_redisName: string, _start: any, _stop: any) {
    return await redis.subscriberRedis1.zrange(
      `${redisNode.prefix}${_redisName}`,
      _start,
      _stop
    );
  }

  /**
   * 移除有序集合中的一个或多个成员
   * @param {*} _redisName
   * @param {*} _member
   * @returns
   */
  static async zrem(_redisName: string, _member: any) {
    return await redis.publisherRedis.zrem(
      `${redisNode.prefix}${_redisName}`,
      _member
    );
  }

  /**
   * 判断成员是否存在
   * @param {*} _redisName
   * @param {*} _member
   * @returns
   */
  static async zrank(_redisName: string, _member: any) {
    const result = await redis.subscriberRedis1.zrank(
      `${redisNode.prefix}${_redisName}`,
      _member
    );
    return result == null ? -1 : result;
  }

  /**
   * 无序集合
   * @param {*} _redisName
   * @param {*} _data
   * @returns
   */
  static async sadd(_redisName: string, _data: any) {
    return await redis.publisherRedis.sadd(
      `${redisNode.prefix}${_redisName}`,
      _data
    );
  }

  /**
   * 判断值是否存在
   * @param {*} _redisName
   * @param {*} _member
   * @returns
   */
  static async sismember(_redisName: string, _member: any) {
    const result = await redis.subscriberRedis1.sismember(
      `${redisNode.prefix}${_redisName}`,
      _member
    );
    return !result ? 0 : result;
  }

  /**
   * 订阅
   * @param {*} _redisName
   * @param {*} _data
   * @returns
   */
  static async pub(_redisName: string, _data: any) {
    return await redis.publisherRedis.publish(
      `${redisNode.prefix}${_redisName}`,
      _data
    );
  }
}
export default RedisModules;
