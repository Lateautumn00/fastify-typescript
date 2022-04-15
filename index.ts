import fast from './app/filter/fast';
import path from 'path';
import AutoLoad from 'fastify-autoload';
if (process.env.NODE_ENV) require('./app/modules/subscribe');
fast.fastify.register(require('fastify-multipart')); // 处理 form-data 类型请求
fast.fastify.register(require('fastify-formbody')); // 解析 x-www-form-urlencoded
fast.fastify.register(require('fastify-cors'), {
  origin: '*',
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
});
fast.fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins')
});
fast.fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'routes')
});
fast.fastify.setErrorHandler((_error: any, _request: any, _reply: any) => {
  fast.clog('error', [_error]);
  _reply.send(_error);
});
// @Server
fast.fastify.listen(5555, '0.0.0.0', (_error: any) => {
  if (_error) {
    fast.clog('error', ['fastify exit', _error]);
    process.exit(1);
  } else {
    fast.clog('info', ['Server running, navigate to  http://0.0.0.0:5555']);
  }
});
