import { tokens } from '../config/index';
import fp from 'fastify-plugin';
// jwt验证所需的数据
module.exports = fp(async function (_fastify: any) {
  _fastify.register(require('fastify-jwt'), {
    secret: tokens.jwtToken
  });
  // 前端接口验证
  _fastify.decorate('auth', async function (_request: any, _reply: any) {
    try {
      const jwt = await _request.jwtVerify();
      if (!jwt.guid) throw new Error('无权限');
    } catch (err) {
      _reply.send(err);
    }
  });
  // 后端接口验证
  _fastify.decorate('adminAuth', async function (_request: any, _reply: any) {
    try {
      const jwt = await _request.jwtVerify();
      if (!jwt.isAdmin) throw new Error('无权限');
    } catch (err) {
      _reply.send(err);
    }
  });
});
