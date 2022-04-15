/*
 * @Description:redis
 * @Author: lanchao
 * @Date: 2021-12-Mo 02:12:12
 * @Last Modified by:   lanchao
 * @Last Modified time: 2021-12-Mo 02:12:12
 */
import Redis from 'ioredis';
import { redisNode } from '../../config/index'; // 引入配置文件
import fast from '../filter/fast';
let publisherRedisNum = 0; // 0连接正常,1不正常
let subscriberRedis1Num = 0;
let subscriberRedis2Num = 0;
const pubRedis = {
  host: redisNode.host1, // Redis host
  port: redisNode.port, // Redis port
  password: redisNode.password,
  prefix: redisNode.prefix, // 存诸前缀
  ttl: 60 * 60 * 23, // 过期时间
  family: 4, // ip4
  db: redisNode.db
};
const subRedis1 = {
  host: redisNode.host2, // Redis host
  port: redisNode.port, // Redis port
  password: redisNode.password,
  prefix: redisNode.prefix, // 存诸前缀
  ttl: 60 * 60 * 23, // 过期时间
  family: 4, // ip4
  db: redisNode.db
};
const publisherRedis = new Redis(pubRedis); // 增删改
const subscriberRedis1 = new Redis(subRedis1); // 查
const subscriberRedis2 = new Redis(pubRedis); // 监听
publisherRedis.on('connect', () => {
  publisherRedisNum = 0;
  fast.clog('info', ['publisherRedis connect success']);
});
publisherRedis.on('error', (_error: any) => {
  publisherRedisNum += 1;
  if (publisherRedisNum === 1)
    fast.clog('error', ['publisherRedis error', _error]);
});
subscriberRedis1.on('connect', () => {
  subscriberRedis1Num = 0;
  fast.clog('info', ['subscriberRedis1  connect success']);
});
subscriberRedis1.on('error', (_error: any) => {
  subscriberRedis1Num += 1;
  if (subscriberRedis1Num === 1)
    fast.clog('error', ['subscriberRedis1 error', _error]);
});
subscriberRedis2.on('connect', () => {
  subscriberRedis2Num = 0;
  fast.clog('info', ['subscriberRedis2  connect success']);
});
subscriberRedis2.on('error', (_error: any) => {
  subscriberRedis2Num += 1;
  if (subscriberRedis2Num === 1)
    fast.clog('error', ['subscriberRedis2 error', _error]);
});
export default { publisherRedis, subscriberRedis1, subscriberRedis2 };
