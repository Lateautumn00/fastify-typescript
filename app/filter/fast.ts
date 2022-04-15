/*
 * @Description:日志
 * @Author: lanchao
 * @Date: 2021-12-Mo 02:12:12
 * @Last Modified by:   lanchao
 * @Last Modified time: 2021-12-Mo 02:12:12
 */
import fast from 'fastify';
const fastify = fast({
  ignoreTrailingSlash: true,
  logger: {
    level: process.env.NODE_ENV !== 'production' ? 'info' : 'warn'
  }
}); // Fastify 只支持 application/json
import Email from '../modules/email'; // 引入封装好的函数
/**
 * 日志
 * @param {*} _type
 * @param {*} _list
 */
const clog = (_type: string, _list: any) => {
  const content = _list.join(',');
  switch (_type) {
    case 'info':
      fastify.log.info(content);
      break;
    case 'error':
      fastify.log.error(content);
      Email.send('cuilanchao@qknode.com', `${_type}提醒`, content);
      break;
    case 'warn':
      fastify.log.warn(content);
      Email.send('cuilanchao@qknode.com', `${_type}提醒`, content);
      break;
    default:
      break;
  }
};

export default { clog, fastify };
