const schedule = require('node-schedule');
const { redisNode } = require('../../config/index'); // 引入配置文件
const { clog } = require('../filter/logs');
; (() => {
    schedule.scheduleJob({ dayOfWeek: 1, hour: 3, minute: 0, second: 0 }, async () => {
        clog('warn', ['定时任务']);
    });
})();
// 订阅消息
; (() => {
    // 客户端连接redis成功后执行回调
    subscriberRedis2.on('ready', function () { });
    // 订阅频道内容
    subscriberRedis2.subscribe(
        `__keyevent@${redisNode.db}__:expired`
    );
    subscriberRedis2.on('error', function (_error) {
        clog('error', [`Redis Error ${_error}`]);
    });
    subscriberRedis2.on('connect', function () {
        clog('info', ['redis connect ok']);
    });
    // 监听订阅成功事件
    // eslint-disable-next-line no-unused-vars
    subscriberRedis2.on('subscribe', function (_channel, _count) {
    });

    // 收到消息后执行回调，message是redis发布的消息
    // 需要将 将redis.conf  中notify-keyspace-events Ex 前注释去掉
    subscriberRedis2.on('message', async (channel, data) => {
        clog('info', [`订阅消息${channel} ${data}`]);
        // 倒计时任务完成 处理 发送邮件
        if (channel === `__keyevent@${redisNode.db}__:expired`) {
            //监听redis过期数据
        }
    });
})();
