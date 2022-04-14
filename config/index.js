let redisNode = {}; // redis
let mongoNode = {}; // mongodb
const tokens = {
    jwtToken: 'cb47c0ac79a1396g',
    md5Token: 'f9ea6befeb703fb5'
}; // 机密密钥
const email = {
    host: 'smtp.exmail.qq.com',
    user: 'cuilanchao@qknode.com',
    pass: 'Clc911024',
    status: false, // 是否启用邮件功能
    title: 'fastify-typescript:'// 标题头
};
if (process.env.NODE_ENV === 'production') {
    // 生产 yarn run start
} else if (process.env.NODE_ENV === 'test') {
    // 开发 yarn run start:test

} else if (process.env.NODE_ENV === 'dev') {
    // 开发 yarn run start:dev
} else {
    redisNode = {
        host1: '192.168.1.14',
        host2: '192.168.1.17',
        port: 6379,
        prefix: 'animal:',
        password: 'qknodeonline',
        db: 2
    };
    mongoNode = {
        db_user: 'game_animal_demo',
        db_pwd: 'x9b7wxpf6qlr',
        db_host: '192.168.1.10:27017,192.168.1.46:27017,192.168.1.42:27017',
        db_name: 'game_animal',
        prefix: 'an_',
        type: 1 // 0单库 1副本集
    };
}

module.exports = {
    redisNode: redisNode,
    mongoNode: mongoNode,
    tokens: tokens,
    email: email
};
