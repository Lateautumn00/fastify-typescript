/*
 * @Description: 
 * @Author: lanchao
 * @Date: 2022-04-15 14:04:12
 * @LastEditTime: 2022-04-27 11:19:09
 * @LastEditors: lanchao
 * @Reference: 
 */
export const tokens: any = {
  jwtToken: 'cb47c0ac79a1396g',
  md5Token: 'f9ea6befeb703fb5'
}; // 机密密钥
export const emailConfig = {
  host: 'smtp.exmail.qq.com',
  user: '',
  pass: '',
  status: false, // 是否启用邮件功能
  title: 'fastify-typescript:' // 标题头
};
export let redisNode: any = {}; // redis;
export let mongoNode: any = {}; // mongodb
if (process.env.NODE_ENV === 'production') {
  // 生产 yarn run start
} else if (process.env.NODE_ENV === 'test') {
  // 开发 yarn run start:test
} else if (process.env.NODE_ENV === 'dev') {
  // 开发 yarn run start:dev
} else {
  redisNode = {
    host1: '192.168.184.128',
    host2: '192.168.184.128',
    port: 6379,
    prefix: 'zhzy:',
    password: '',
    db: 2
  };
  mongoNode = {
    db_user: 'zhzy',
    db_pwd: 'zhzy',
    db_host: '192.168.184.128:27017',
    db_name: 'zhzy',
    prefix: 'z_'
  };
}
