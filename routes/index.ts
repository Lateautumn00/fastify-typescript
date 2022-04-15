import UserController from '../app/controller/user';
import { getUser } from '../schema/user';
// opts为父级目录名称（相对routes而言）
module.exports = async function (_fastify: any) {
  // _fastify.get('/user/getUser', { preValidation: [_fastify.auth], schema: { querystring: getUser }, attachValidation: true }, UserController.getUser); // 获取个人用户信息
  // _fastify.post('/user/getUser', { schema: { body: getUser }, attachValidation: true }, UserController.getUser); // 获取个人用户信息
  _fastify.get(
    '/user/getUser',
    { schema: { querystring: getUser }, attachValidation: true },
    UserController.getUser
  ); // 获取个人用户信息
};
