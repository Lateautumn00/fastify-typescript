const { clog, fastify } = require('./app/filter/logs');
const path = require('path');
const AutoLoad = require('fastify-autoload');
if (process.env.NODE_ENV) require('./app/modules/subscribe');
fastify.register(require('fastify-multipart')); // 处理 form-data 类型请求
fastify.register(require('fastify-formbody')); // 解析 x-www-form-urlencoded
fastify.register(require('fastify-cors'), {
    origin: '*',
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
});
fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins')
});
fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes')
});
fastify.setErrorHandler((_error, _request, _reply) => {
    clog('error', [_error]);
    _reply.send(_error);
});
// @Server
fastify.listen(5555, '0.0.0.0', (_error) => {
    if (_error) {
        clog('error', ['fastify exit', _error]);
        process.exit(1);
    } else {
        clog('info', ['Server running, navigate to  http://0.0.0.0:5555']);
    }
});
